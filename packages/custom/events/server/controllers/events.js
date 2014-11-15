/**
 * Created by watsonm on 10/8/14.
 */
'use strict';


var mongoose = require('mongoose'),
    GTDEvent = mongoose.model('Event'),
    ObjectId = require('mongoose').Types.ObjectId,
 //   MongoDate = require('mongoose').Types.Date,
    _ = require('lodash');


exports.all = function(req, res) {

    if (req.query.trackID !== undefined && req.query.eventStartDate !== undefined) {
        var trackid = new ObjectId(req.query.trackID);
        var startdate = new Date(req.query.eventStartDate);
       // console.log('Searched for ' + req.query.trackID + ' ' + req.query.eventStartDate);
        GTDEvent.find().where('eventStartDate').equals(startdate).where('trackID').equals(trackid).sort('-eventStartDate').exec(function (err, events) {
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
    else if (req.query.eventID !== undefined) {
        var eventid = new ObjectId(req.query.eventID);
        GTDEvent.find({_id: eventid}, function (err, events) {
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
        GTDEvent.find().sort('-eventStartDate').exec(function (err, events) {
            if (err) {
                return res.json(500, {
                    error: 'Cannot list the events'
                });
            }
            res.json(events);
        });
    }
};


/**
 * Find event by id
 */
exports.event = function(req, res, next, id) {
    GTDEvent.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));
        req.event = event;
        next();
    });
};


/**
 * Show an event
 */
exports.show = function(req, res) {
    res.json(req.event);
};


/**
 * List of Events
 */

/*
exports.all = function(req, res) {
    GTDEvent.find().sort('-eventStartDate').exec(function (err, events) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the events'
            });
        }
        res.json(events);
    });
};
*/
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




/**
 * Create an event
 */
exports.create = function(req, res) {
    var event = new GTDEvent(req.body);

    event.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the event'
            });
        }
        res.json(event);

    });
};


/**
 * Update an event
 */
exports.update = function(req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the event'
            });
        }
        res.json(event);

    });
};

