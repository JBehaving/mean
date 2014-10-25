'use strict';

// The Package is past automatically as first parameter
module.exports = function(Tracks, app, auth, database) {

  app.get('/tracks/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/tracks/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/tracks/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/tracks/example/render', function(req, res, next) {
    Tracks.render('index', {
      package: 'tracks'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

    var tracks = require('../controllers/tracks');

    app.get('/tracks', tracks.all);
    app.post('/tracks:trackName', tracks.create);
};
