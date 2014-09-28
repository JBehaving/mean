'use strict';

// The Package is past automatically as first parameter
module.exports = function(Announcements, app, auth, database) {

  app.get('/announcements/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/announcements/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/announcements/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/announcements/example/render', function(req, res, next) {
    Announcements.render('index', {
      package: 'announcements'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
