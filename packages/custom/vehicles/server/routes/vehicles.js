'use strict';

module.exports = function(Vehicles, app, auth, database) {


  var vehicles = require('../controllers/vehicles');
/*
  app.route('/vehicles')
      .get(vehicles.all)
      .post(vehicles.create);

  app.route('/vehicles/:vehicleId')
      .get(vehicles.show)
      .put(vehicles.update)
      .delete(vehicles.delete);

  app.route('/user/garage/:userId')
      .get(vehicles.findByUser);

  app.param('vehicleId', vehicles.vehicle);
*/
  app.route('/garage')
  .get(auth.requiresMember, vehicles.findByUser)
  .put(auth.requiresMember, vehicles.update)
  .post(auth.requiresMember, vehicles.create);

};
