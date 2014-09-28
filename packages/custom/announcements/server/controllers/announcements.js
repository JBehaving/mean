'use strict';

var mongoose = require('mongoose'),
    Announcement = mongoose.model('Announcement');


exports.create = function(req,res){
    var announcement = new Announcement(req.body);

    announcement.save(function(err) {
        if (err) {
          return res.json(500, {
            error: 'Cannot save the announcement'
          });
        }
        res.json(announcement);
        });
};


exports.all = function(req,res) {
    Announcement.find().exec(function(err, announcements) {
        if (err) {
          return res.json(500, {
            error: 'Cannot list the announcements'
          });
        }
        res.json(announcements);
      });
};