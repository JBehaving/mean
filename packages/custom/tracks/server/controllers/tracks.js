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
exports.findTrack = function(req, res) {
    var trackName = req.query.trackName;
    if (trackName !== undefined) {

        Track.find().where('trackName').equals(trackName).exec(function (err, tracks) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(tracks);
            }
        });
    }
    else {
        Track.find(function (err, tracks) {
            if (err) {
                console.log('failed to find tracks ' + err);
                res.send(err);
            } else {
                console.log('found tracks');
                res.jsonp(tracks);
            }
        });
    }

};
exports.show = function(req, res) {
    res.json(req.track);
};
//-- create a track
exports.create = function(req, res) {
    var tracks = new Track(req.body);
    tracks.save(function (err) {
        if (err) {
            console.log('failed to create a track ' + err);
            return res.send('/index');
        } else {
            res.jsonp(tracks);
            console.log('tried to create a track' + err);
        }
    });
};
