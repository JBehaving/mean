/**
 * Created by watsonm on 10/8/14.
 */
'use strict';

var mongoose = require('mongoose'),
    Track = mongoose.model('Track');

//-- get all tracks
exports.all = function(req, res) {
    Track.find(function(err, tracks) {
        if (err) {
            console.log('failed to find tracks ' + err);
            res.send(err);
        } else {
            console.log('found tracks');
            res.jsonp(tracks);
        }
    });
};

//-- search by track name
exports.search = function(req, res) {
    Track.find().where('trackName').equals(req.body.text).exec(function(err, tracks) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(tracks);
        }
    });
};

//-- create a track
exports.create = function(req, res) {
    var tracks = new Track({trackName: req.body.text});
    tracks.save(function (err) {
        if (err) {
            console.log('failed to create a track ' + err);
            return res.send('/index');
        } else {
            res.jsonp(events);
            console.log('tried to create a track' + err);
        }
    });
};/**
 * Created by watsonm on 10/8/14.
 */
