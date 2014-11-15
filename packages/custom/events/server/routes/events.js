'use strict';


// The Package is past automatically as first parameter
module.exports = function(Events, app, auth, database) {
    var events = require('../controllers/events');

    app.route('/events')
        .get(events.all)
        .post(events.create);

<<<<<<< HEAD
    app.route('/events/:eventId')
      .get(events.show);

    // Finish with setting up the eventId param
    app.param('eventId', events.event);

  /*
=======
    app.route('/events/update')
        .post(events.updateEvent);

>>>>>>> origin/eventsDevMike
  app.get('/events/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/events/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/events/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/events/example/render', function(req, res, next) {
    Events.render('index', {
      package: 'events'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
  */

};
