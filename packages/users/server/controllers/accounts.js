'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Account = mongoose.model('Account');
  
/**
 * Create Account
 */ 

/**
 * Update Account TODO
 */
 
 exports.update = function(req, res) {
 var account = req.account;

 };
 
/**
 * Find all accounts
 */
 
 
 exports.all = function(req, res) {
  Account.find().sort('userLastName userFirstName').populate('userID').exec(function(err, account) { //Sort by last,first ascending, get user information
    if (err) {
      return res.json(500, {
        error: 'Error in listing Account information'
      });
    }
    res.json(account);

  });
};
 
/**
 * Find account by USER id
 */
 
 exports.account = function(req, res, next, id) {
 Account.find( {"userID": id} ).populate('userID').exec(function(err, account) { //Unsure of whether or not that find will actually retrieve anything
    if (err) {
      return res.json(500, {
        error: 'Error in listing Account information'
      });
    }
    res.json(account);

  });
};

/**
 * Show account info
 */
 
 exports.show = function(req, res) {
  res.json(req.account);
};
 