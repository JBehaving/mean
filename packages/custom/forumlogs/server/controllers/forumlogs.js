'use strict';
var mongoose = require('mongoose'),
    ForumLog = mongoose.model('ForumLog');
exports.all = function(req, res) {
    ForumLog.find(function(err, logs) {
        if (err) {
            console.log('failed to create a log ' + err);
            res.send(err);
        } else {
            console.log('created log ' + err);
            res.jsonp(logs);
        }
    });
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