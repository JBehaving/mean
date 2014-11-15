'use strict';
var mongoose = require('mongoose'),
    ForumLog = mongoose.model('ForumLog'),
    ObjectId = require('mongoose').Types.ObjectId;

var findByID = function(req, res) {
    if (req.query.eventID !== undefined) {
        var query = {eventID: new ObjectId(req.query.eventID)};
        ForumLog.find(query, function (err, logs) {
            if (err) {
                console.log('failed to find a log ' + err);
                res.status(500).json( {error: 'Error while searching ' + err});
            } else {
                console.log('tried to find a log' + err);
                res.jsonp(logs);

            }
        });
    }
    else {
        console.log('No log found by that Event ID');

    }
};

exports.findLog = function(req, res) {
    if (req.query.eventID !== undefined) {
        findByID(req, res);
    }
    else {
        ForumLog.find(function (err, logs) {
            if (err) {
                console.log('failed to create a log ' + err);
                res.send(err);
            } else {
                console.log('created log ' + err);
                res.jsonp(logs);
            }
        });
    }
};
exports.create = function(req, res) {
    //-- assumed content-type of application/JSON (in header)
    var forumlog = new ForumLog(req.body);
    console.log(req.body);
    forumlog.save(function (err) {
        if (err) {
            console.log('failed to create a log ' + err);
            return res.json(500, {
                error: 'Cannot save the log' + err
            });
        }
        res.json(forumlog);
    });
};
