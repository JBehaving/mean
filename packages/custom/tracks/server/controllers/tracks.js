/**
 * Created by watsonm on 10/8/14.
 */
'use strict';

var mongoose = require('mongoose'),
    Track = mongoose.model('Track'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('lodash');

/**
 * Find event by id
 */
exports.track = function(req, res, next, id) {
    Track.load(id, function(err, track) {
        if (err) return next(err);
        if (!track) return next(new Error('Failed to load track ' + id));
        req.track = track;
        next();
    });
};

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

/**
 * Find track by id
 */
exports.track = function(req, res, next, id) {
    Track.findById(id, function(err, track) {
        if (err) return next(err);
        if (!track) return next(new Error('Failed to load event ' + id));
        req.track = track;
        next();
    });
};

/**
 * Show a track
 */
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
var findByID = function(req, res) {
    if (req.query.trackID !== undefined) {
        var query = {_id: new ObjectId(req.query.trackID)};
        Track.find(query, function (err, tracks) {
            if (err) {
                console.log('failed to find a track ' + err);
                res.status(500).json( {error: 'Error while searching ' + err});
            } else {
                console.log('tried to find a track' + err);
                res.jsonp(tracks);

            }
        });
    }
    else {
        console.log('No Track found by that ID');

    }
};

//-- search by track name
exports.findTrack = function(req, res) {
    if (req.track !== undefined) {
        console.log(req.track);
        res.status(200).json(req.track);
        return;
    }
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
    else if (req.query.trackID !== undefined) {
        findByID(req, res);
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
/**
 * Update a track
 */
exports.update = function(req, res) {
    var track = req.track;
    track = _.extend(track, req.body);

    track.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the track'
            });
        }
        res.json(track);

    });
};

//-- update one event using  _id field
exports.updateTrack = function(req, res) {
    //-- assumed content-type of application/JSON (in header)
    // var gtdEvent = new GTDEvent(req.body);
    var updatedTrack = req.body;

    //-- assumes validated request
    if (updatedTrack._id !== undefined || updatedTrack.trackID !== undefined) {
        var query = updatedTrack._id;
        delete updatedTrack._id;
        Track.update(query, updatedTrack, function (err, res) {
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

exports.destroy = function(req, res) {
  var track = req.track;

  track.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the track'
      });
    }
    res.json(track);

  });
};
