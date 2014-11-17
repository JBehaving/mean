'use strict';

// The Package is past automatically as first parameter
module.exports = function(Vehicles, app, auth, database) {

  var vehicles = require(../controllers/vehicles);

  app.get('/vehicles/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/vehicles/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/vehicles/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/vehicles/example/render', function(req, res, next) {
    Vehicles.render('index', {
      package: 'vehicles'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  app.get('/vehicles', vehicles.all)
      .post(vehicles.create);

  app.route('/vehicles/:vehicleId')
      .get(vehicles.show)
      .put(vehicles.update);

  app.param('vehicleId', vehicles.vehicle);
};
