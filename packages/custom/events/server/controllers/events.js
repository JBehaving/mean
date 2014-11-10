/**
 * Created by watsonm on 10/8/14.
 */
'use strict';


var mongoose = require('mongoose'),
    GTDEvent = mongoose.model('Event');
exports.all = function(req, res) {

    if (req.query.trackID !== undefined && req.query.eventStartDate !== undefined) {
       // console.log('Searched for ' + req.query.trackID + ' ' + req.query.eventStartDate);
        GTDEvent.find().where('eventStartDate').equals(req.query.eventStartDate).where('trackID').equals(req.query.trackID).exec(function (err, events) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                return res.jsonp(events);
            }
        });
        console.log('Error retrieving event.');
    }
    else {
        GTDEvent.find(function (err, events) {
            if (err) {
                console.log('failed to find an event ' + err);
                res.send(err);
            } else {
                console.log('tried find an event ' + err);
                res.jsonp(events);
            }
        });
    }


};

//-- search by event spefics .. to be finished later
exports.findEvent = function(req, res) {
    var fields = [
        req.query.advancedCap,
        req.query.albumLink,
        req.query.basePrice,
        req.query.eventDesc,
        req.query.eventState,
        req.query.eventStatus,
        req.query.eventSartTime,
        req.query.eventStartDate,
        req.query.noviceCap,
        req.query.trackID
        ];
    if (fields !== undefined) {

        GTDEvent.find().where('advancedCap').equals(fields[0]).exec(function (err, events) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(events);
            }
        });
    }
    else {
        GTDEvent.find(function (err, events) {
            if (err) {
                console.log('failed to find events ' + err);
                res.send(err);
            } else {
                console.log('found events');
                res.jsonp(events);
            }
        });
    }

};

exports.create = function(req, res) {
    //-- assumed content-type of application/JSON (in header)
    var gtdEvent = new GTDEvent(req.body);
    console.log(req.body);
    gtdEvent.save(function (err) {
        console.log('failed to create an event ' + err);
        if (err) {
            console.log('failed to create an event ' + err);
            return res.json(500, {
                error: 'Cannot save the event' + err
            });
        }
        res.json(gtdEvent);
    });

};


//-- update one event using  _id field
exports.updateEvent = function(req, res) {
    //-- assumed content-type of application/JSON (in header)
   // var gtdEvent = new GTDEvent(req.body);
    var updatedEvent = req.body;

    //-- assumes validated request
    if (updatedEvent._id !== undefined) {
        var query = updatedEvent._id;
        delete updatedEvent._id;
        GTDEvent.update(query, updatedEvent, function (err, res) {
            if (err) {
                console.log('failed to update event ' + err);
                return res.json(500, {
                error: 'Cannot update the event' + err
                });
            }
        });
        res.send('Event successfully updated. ' + query);
    }
    res.send('error updating event');
};





