'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Account = mongoose.model('Account');
  
/**
 * Create Account
 */ 
 
 exports.create = function(req,res) {
 var account = new Account(req.body); //Why does this work?
 account.userID = req.user;
 
 account.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Error in creating new account'
      });
    }
    res.json(account);

  });
 };

/**
 * Update Account TODO
 */
 
 
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
 
 exports.account = function(req, res, id) {
 Account.find( {'userID': id} ).populate('userID').exec(function(err, account) { 
    if (err) {
      return res.json(500, {
        error: 'Error in listing Account information'
      });
    }
    res.json(account);

  });
};

/**
 * Find user's own account
 */
 
 exports.account = function(req, res) {
 Account.find( {'userID': req.user} ).populate('userID').exec(function(err, account) { 
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
 