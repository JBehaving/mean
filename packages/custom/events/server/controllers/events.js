/**
 * Created by watsonm on 10/8/14.
 */
'use strict';
var mongoose = require('mongoose'),
    GTDEvent = mongoose.model('Event');
exports.all = function(req, res) {
    GTDEvent.find(function(err, events) {
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