'use strict';

var mongoose = require('mongoose'),
    Announcement = mongoose.model('Announcement');

/*
 * Create Announcement
 */
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

/**
 * Update an announcement
 */
exports.update = function (req, res) {
    var announcement = req.announcement;

    announcement = _.extend(announcement, req.body);

    announcement.save(function(err) {
        if(err) {
            return res.json(500, {
                error: 'Cannot update the announcement'
            });
        }
        res.json(announcement);

    });
};

/**
 * Delete an announcement
 */
exports.destroy = function(req, res) {
  var announcement = req.announcement;

  announcement.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the announcement'
      });
    }
    res.json(announcement);

  });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.announcement);
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