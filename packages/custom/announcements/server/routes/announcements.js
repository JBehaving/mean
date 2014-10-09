'use strict';

var announcement = require('../controllers/announcements');

// Announcement authorization helper
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.announcement.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized to access Announcements');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Announcements, app, auth, database) {

/*  app.get('/announcements/access/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });*/

/*  app.get('/announcements/access/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/announcements/access/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });*/

  app.route('/announcements')
    .get(announcement.all)
    .post(auth.requiresLogin, announcement.create);

  app.route('announcements/admin')
    .get(announcement.show)
    .put(auth.requiresLogin, hasAuthorization, announcement.update)
    .delete(auth.requiresLogin, hasAuthorization, announcement.destroy);

/*  app.get('/announcements/render', function(req, res, next) {
    Announcements.render('index', {
      package: 'announcements'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });*/
};
