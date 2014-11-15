'use strict';

// The Package is past automatically as first parameter
module.exports = function(Account, app, auth, database) {

var accounts = require('../controllers/accounts');


//Authorization helper
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.account.userID._id !== req.user.id && !req.user.hasRole('event manager')) { //Not sure about syntax on second condition
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Accounts, app, auth) {

  app.route('/accounts') //Basic listing for employees Need to require authorization for this one
    .get(accounts.all);	 //No limit on number? Handled elsewhere? No authorization for now...
	
  app.route('/account/:accountId')
    .get(accounts.show)
    .put(auth.requiresLogin, hasAuthorization, accounts.update);
  app.param('accountId', accounts.account);
  
  app.route('/account/')
    .get(accounts.own)
	.put(auth.requiresLogin, hasAuthorization, accounts.update);


};