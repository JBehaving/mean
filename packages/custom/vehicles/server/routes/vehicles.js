'use strict';

var vehicles = require('../controllers/vehicles');
module.exports = function(Vehicles, app, auth, database) {

  app.route('/garage')
  .get(auth.requiresLogin, vehicles.mine)
  .put(auth.requiresLogin, vehicles.update)
  .post(auth.requiresLogin, vehicles.add);
};
