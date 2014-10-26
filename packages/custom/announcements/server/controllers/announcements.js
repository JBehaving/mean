'use strict';

var mongoose = require('mongoose'),
    Announcement = mongoose.model('Announcement');

/**
 * Find announcement by id
 */
exports.announcement = function(req, res, next, id) {
  Announcement.load(id, function(err, announcement) {
    if (err) return next(err);
    if (!announcement) return next(new Error('Failed to load announcement ' + id));
    req.announcement = announcement;
    next();
  });
};

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

/*    announcement = _.extend(announcement, req.body);*/

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
 * Show an announcement
 */
exports.show = function(req, res) {
  res.json(req.announcement);
};

/**
 * Default Display of 5 latest Announcments
 *
 * First sort in descending order (most current entered announcement first) via -1
 *
 */
exports.defaultShow = function(req, res) {
    Announcement.find().sort({newsEnteredTime:-1}).limit(5).exec(function(err, announcements) {
        if(err) {
            return res.json(500, {
                error: 'Cannot list the announcements'
            });
        }
        res.json(announcements);
    });
};

/**
 * Show all announcements
 */
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