/**
 * Created by watsonm on 10/8/14.
 */
'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event');
exports.all = function(req, res) {
    Event.find(function(err, events) {
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
    var events = new Event({eventName: req.body.text});
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