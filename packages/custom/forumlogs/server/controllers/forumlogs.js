'use strict';
var mongoose = require('mongoose'),
    ForumLog = mongoose.model('ForumLog'),
    _ = require('lodash'),
    ObjectId = mongoose.Types.ObjectId;







exports.show = function(req, res) {
    if (req.forumLog) {
        res.status(200).json(req.forumLog);
    }
    else {
        res.status(404).json({error : 'Requested forumLog ID not found in database'});
    }
};

exports.all = function(req, res) {
    ForumLog.find(function(err, forumLogs) {
        if (err) {
            console.log('failed to create a forumLog ' + err);
            res.send(err);
        } else {
            console.log('created forumLog ' + err);
            res.jsonp(forumLogs);
        }
    });
};

exports.show = function(req, res) {
    if (req.forumLog) {
        res.status(200).json(req.forumLog);
    }
    else {
        res.status(404).json({error : 'Requested forumLog ID not found in database'});
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

exports.update = function(req, res) {
    if (req.forumLog) {
        var forumLog = req.forumLog;
        forumLog = _.extend(forumLog, req.body);
        console.log(forumLog);
        req.forumLog.save(function (err, forumLog) {
            if (err) {
                console.log('Error updating forumLog ' + forumLog._id);
                console.log(err);
                res.status(500).json({error : err});
            }
            if (forumLog) {
                res.status(200).json(forumLog);
            }
        });
    }
    else res.status(404);
};

exports.forumlog = function(req, res, next, id) {
    Forumlog.findOne({ _id : id },function(err, forumlog) {
        if (err) {
            console.log('Error loading forumlog from database');
            console.log(err);
            res.status(500).json({error : 'Error loading forumlog from database'});
        }
        if (forumlog) {
            req.forumlog = forumlog;
            next();
        }
        else res.status(404).json({error : 'Requested forumlog ID not found in database'});
    });
};

exports.delete = function(req, res) {
    if (req.forumLog) {
        req.forumLog.remove(function (err, forumLog) {
            if (err) {
                console.log('Error occured deleting forumLog ' + req.forumLog._id);
                console.log(err);
                res.status(500).json(err);
            }
            if (forumLog) {
                res.status(200).json(forumLog);
            }
            else res.status(404);
        });
    }

    else res.status(404);
};

exports.findByUser = function(req, res, id) {
    ForumLog.find({userId : ObjectId(id)}, function(err, forumLog){});
};

exports.findByEvent = function(req, res, id) {
    ForumLog.find({eventId : ObjectId(id)}, function(err, forumLog){});
};

