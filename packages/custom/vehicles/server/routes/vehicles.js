'use strict';

module.exports = function(Vehicles, app, auth, database) {


  var vehicles = require('../controllers/vehicles');

  app.route('/garage')
  .get(auth.requiresLogin, vehicles.all)
  //.put(auth.requiresLogin, vehicles.update)
  .post(auth.requiresLogin, vehicles.create)
  .delete(auth.requiresLogin, vehicles.remove);

};
