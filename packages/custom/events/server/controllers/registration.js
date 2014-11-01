/**
 * Created by dan on 10/21/14.
 */
'use strict';

var paypal = require('paypal-rest-sdk'),
    config = require('meanio').loadConfig(),
    mongoose = require('mongoose'),
    Manifest = mongoose.model('Manifest'),
    _Event = mongoose.model('Event');

paypal.configure({
    'mode' : config.paypal.mode,
    'client_id' : config.paypal.client_id,
    'client_secret' : config.paypal.client_secret
});

var restoreEventState = function(event,transaction) {
    var skillLevel = transaction.skillClass;
    var update = { $inc : {}};
    update.$inc[skillLevel + 'Registered'] = -1;

    _Event.findByIdAndUpdate(event._id, update, function(err,update) {
        if (err) {
            console.log('Serious errors, event is in inconsistent state : Event(' + event._id + ') Trans(' + transaction._id + ')');
        }
        else if (update) {
            console.log(update);
            console.log('Event ' + update._id + 'rolled back sucessfully');
        }
    });

};

var createPaypalPayment = function (req,res) {

    //build payment JSON
    var payment_json = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': config.paypal.return_url + '?transId=' + req.transaction._id + '&paymentMethod=paypal' ,
            'cancel_url': config.paypal.cancel_url + '?transId=' + req.transaction._id
        },
        'transactions': [{
            'amount': {
                'currency': 'USD',
                'total': req.event.basePrice
            },
            'description': req.event.eventDesc
        }]
    };


    //Create the paypal payment
    paypal.payment.create(payment_json, function (error, payment) {
        if (error) {
            console.log('An error creating a paypal Paypal payment');
            console.log(error);
            res.json(500, { error : 'Could not create payment with Paypal'});
            restoreEventState(req.event,req.transaction);
        } else {
            console.log('Created Payment Response');
            console.log(payment);
            req.transaction.paymentResponse = payment;
            req.transaction.save(function(err) {
                if (err) {
                    console.log('An error occured saving state for transaction ' + req.transaction._id);
                    console.log(err);
                    res.json(500, { error : 'Could not save transaction information'});
                    restoreEventState(req.event,req.transaction);
                }
                else {
                    for (var i=0; i<payment.links.length; i=i+1) {
                        var link = payment.links[i];
                        console.log(link);
                        if (link.rel === 'approval_url') {
                            console.log('Responding with link: ' + link.approval_url);
                            res.json(200, { 'approval_url' : link.href });
                        }
                    }
                }
            });

        }
    });


};

var createPayment = function(req,res) {

    switch (req.body.paymentMethod) {
        case 'paypal' :
            createPaypalPayment(req,res);
            break;
        default :
            res.json(500, {error : 'Invalid or missing payment method'});
    }
};

var updateEventSlots = function (req,res) {
    // Get desired skill level
    var skillClass = req.body.skillClass;

    if (req.event[skillClass + 'Registered'] >= req.event[skillClass + 'Cap']) {
        res.json(500, {error : 'No more slots for + ' + skillClass + ' available'});
        return;
    }

    //build query for updating
    var query = {};
    query._id = req.event._id;
    query[skillClass+'Registered'] = { $lt : req.event[skillClass+'Cap']};

    //build update object
    var update =  {};
    update.$inc = {};
    update.$inc[skillClass + 'Registered'] = 1;

    _Event.findOneAndUpdate(query, update,
        function(err, event) {
            if (err) {
                console.log(err);
                res.json(500, {error : 'Error updating event when registering'});
                return;
            }
            if (event) {
                req.event = event;
                createPayment(req, res);
            }
            else {
                res.status(404).json({error : 'No event found with ID: ' + query._id});
            }
        });



    /*
    switch(req.body.skillClass) {
        case 'advanced' :

            if (req.event.advancedRegistered >= req.event.advancedCap) {
                res.json(500, {error : 'No more slots of this kind available'});
                return;
            }

            _Event.findOneAndUpdate({ _id : req.event._id, advancedRegistered : { $lt : req.event.advancedCap }},
                { $inc : { advancedRegistered : 1}},
                function(err, event) {
                    if (err) {
                        console.log(err);
                        res.json(500, {error : 'Error updating event when registering'});
                        return;
                    }
                    req.event = event;
                    createPayment(req,res);
                });
            break;

        default:
            res.json(500, {error : 'Invalid or missing skill level'});
    }*/
};



exports.registerForEvent = function (req,res) {

    _Event.find({_id : req.body.eventId}, function (err,event){

        if (err) {
            console.log('registerForEvent: Error looking up event');
            req.status(500).json({error : err});
        }
        else if (event) {
            req.event = event;

            req.transaction = new Manifest(req.body);
            req.transaction.basePrice = req.event.basePrice;
            req.transaction.eventDesc = req.event.eventDesc;
            req.transaction.status = 'created';

            updateEventSlots(req,res);
        }
        else {
            req.status(404).json({error : 'No event with ID ' + req.body.eventId});
        }
    });
};

var completePaypalPayment = function(req,res) {
    Manifest.findOne({_id : req.query.transId}).exec(
        function(err,transaction) {
            if (err) {
                console.log(err);
                res.json(500, {error : 'Error finding transaction id'});
            }
            if (transaction && transaction.paymentMethod === 'paypal' ) {
                var payment_id = transaction.paymentResponse.id;
                paypal.payment.execute(payment_id, { 'payer_id' : req.query.PayerID }, function(error,payment){
                    if (error) {
                        console.log(error.response);
                        res.json(500, { error : 'Paypal payment could not be executed: ' + error.response});
                    }
                    else {
                        transaction.payment = payment;
                        transaction.status = 'complete';
                        transaction.save(function(error) {
                            if (error) {
                                console.log('Transaction information could not be saved.  Verify transaction information for ' + transaction._id);
                            }
                            else {
                                console.log('Transaction complete');
                                console.log(transaction);
                                 res.json(200, transaction);
                            }
                        });
                    }
                });
            }

        }
    );
};

exports.completeRegistration = function (req,res) {
    switch (req.query.paymentMethod) {
        case 'paypal' :
            completePaypalPayment(req,res);
            break;
        default :
            res.json(500, { error : 'Payment method not recognized'});
    }
};


exports.cancelRegistration = function (req,res) {
    Manifest.remove( { _id : req.query.transId }, function (err,transaction) {
        if (err) {
            console.log('cancelRegistration: failed when finding transaction ' + req.query.transId);
            console.log(err);
            res.status('500').json({error: 'Error when finding transaction'});
        }

        else if (transaction) {
            transaction.status='cancelled';
            _Event.find({_id : transaction.eventId}, function (err,event) {
                if (err) {
                    console.log('cancelRegistration: failed when finding event ' + transaction.eventId);
                    console.log(err);
                }
                else if (event) {
                    restoreEventState(event,transaction);
                    res.status(200).json(transaction);
                }
                else {
                    console.log('cancelRegistration: Transaction for event that no longer exists');
                    console.log(transaction);
                    res.status(200).json(transaction);
                }
            });
        }

        else {
            console.log('cancelRegistration: No transaction with id ' + req.query.transId );
            res.status(404).json({error : 'Transaction not found or already removed'});
        }
    });
};




