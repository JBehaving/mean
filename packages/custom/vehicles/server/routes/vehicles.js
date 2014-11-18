'use strict';

// The Package is past automatically as first parameter
module.exports = function(Vehicles, app, auth, database) {

  var vehicles = require('../controllers/vehicles');

  app.route('/vehicles')
      .get(vehicles.all)
      .post(vehicles.create);

  app.route('/vehicles/:vehicleId')
      .get(vehicles.show)
      .put(vehicles.update)
      .delete(vehicles.delete);

  app.param('vehicleId', vehicles.vehicle);
};
