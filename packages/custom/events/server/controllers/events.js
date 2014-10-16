/**
 * Created by watsonm on 10/8/14.
 */
'use strict';

var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode' : 'sandbox',
    'clientId' : 'ARblYBAFKYEnLKmBkrnMGlhX70gpNwIBX0GtbBXC5fVeiAWHC9c4tVeXn23K',
    'client_secret' : 'EDvGjhBwlIbHFDwhy8S7bz04r-l6krTyxtf0O2xtovBH4sb1DkSgOuUA_X06'
});

var mongoose = require('mongoose'),
    _Event = mongoose.model('Event');
    exports.all = function(req, res) {
    _Event.find(function(err, events) {
        if (err) {
            console.log('failed to create an event ' + err);
            res.send(err);
        } else {
            console.log('tried to create an event ' + err);
            res.jsonp(events);
        }
    });
};

exports.create = function(req, res) {
    var events = new _Event({eventName: req.body.text});
    events.save(function (err) {
        if (err) {
            console.log('failed to create an event ' + err);
            return res.send('/index');
        } else {
            res.jsonp(events);
            console.log('tried to create an event ' + err);
        }
    });


};

exports.event = function (req, res, next, id) {
    req.event = {
        _id : id,
        basePrice : '100.00',
        noviceCap : '15',
        advancedCap : '15',
        eventDesc : 'Event at Infineon 1/15/2015'
    };
    next();
};


exports.registerForEvent = function (req,res) {
    console.log(req);

    res.json(200, 'everything is fine');
};



var createPaypalPayment = function (req,res) {
    //build payment JSON
    var payment_json = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': 'http://localhost:3000/events/completeRegistration',
            'cancel_url': 'http://localhost:3000/events/cancelRegistration'
        },
        'transactions': [{
            'amount': {
                'currency': 'USD',
                'total': req.event.basePrice
            },
            'description': req.event.eventDesc
        }]
    };

    paypal.payment.create(payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            res.json('500', { error : 'Could not create payment with Paypal'});
        } else {
            console.log('Create Payment Response');
            console.log(payment);
            for (var link in payment.links) {
                if (link.rel === 'approval_url') {
                    res.json( { 'approval_url' : link.href });
                }
            }
        }
    });
};

var createPayment = function(req,res) {
    switch (req.body.payment_method) {
        case 'paypal' :
            createPaypalPayment(req,res);
            break;
        default :
            res.json(500, {error : 'Invalid or missing payment method'});
    }
};


var registerForEvent = function (req,res) {
    // Get event
    var advSlots = parseInt(req.event.advancedRemaining);
    var noviceSlots = parseInt(req.event.noviceRemaining);

    // Get desired experience level
    switch(req.body.expLevel) {
        case 'advanced' :
            if (advSlots < 1) {
                res.json(500, {error : 'No more slots of this kind available'});
                return;
            }
            advSlots -= 1;
            _Event.findByIdAndUpdate({_id : req.event._id}, {$set: { advancedRemaining : advSlots.toString()}},
                function(err, event) {
                    if (err) {
                        console.log(err);
                        res.json(500, {error : 'Error updating event when registering'});
                        return;
                    }
                    res.json(event);
            });
            break;

        case 'novice' :
            if (noviceSlots < 1) {
                res.json(500, {error : 'No more slots of this kind available'});
                return;
            }
            noviceSlots -= 1;
            _Event.findByIdAndUpdate({_id : req.event._id}, {$set: { noviceRemaining : noviceSlots.toString()}},
                function(err, event) {
                    if (err) {
                        console.log(err);
                        res.json(500, {error : 'Error updating event when registering'});
                    return;
                    }
                    res.json(event);
               });
            break;

        default:
            res.json(500, {error : 'Invalid or missing experience level'});
    }

    createPayment(req,res);



};





