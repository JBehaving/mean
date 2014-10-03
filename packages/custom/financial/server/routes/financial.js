'use strict';

// The Package is past automatically as first parameter
module.exports = function(Financial, app, auth, database) {

  app.get('/financial/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/financial/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/financial/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/financial/example/render', function(req, res, next) {
    Financial.render('index', {
      package: 'financial'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
