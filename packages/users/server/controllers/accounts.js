'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Account = mongoose.model('Account'),
User = mongoose.model('User'),
_ = require('lodash'),
ObjectId = require('mongoose').Types.ObjectId;
  
/**
 * Create Account (Note: This requires that the user object be created ahead of time)
 */ 
 
exports.create = function(req,res) 
{
	var account = new Account(req.body); //Why does this work?
	account.userID = req.user;
 
	account.save(function(err) {
    if (err) 
	{
      return res.json(500, { error: 'Error in creating new account' });
    }
    res.json(account);
	});
};

/**
 * Register test (attempting to bypass the need to create the user object beforehand by creating the user in the account
 */
 exports.register = function(req,res)
 {
	var account = new Account(req.body); 
	//Need to test
	account.userID.push({'email': req.body.email, 'password': req.body.password });
 
	account.save(function(err) {
    if (err) 
	{
      return res.json(500, { error: 'Error in creating new account' });
    }
    res.json(account);
	});
};

/**
 * Update Account
 */
 
exports.update = function(req, res) 
{
	var updatedAccount = new Account(req.body); 
	
    if (updatedAccount._id !== undefined) 
	{ 
		//Mongodb does not like it when you try to update a doc by _id when the object still exists, so we have to delete the original
		var searchID = updatedAccount._id; 
        delete updatedAccount._id;
			
		
        Account.update(searchID, updatedAccount, function (err) { 
            if (err) 
			{ 
                console.log('Account info update failed: ' + err); 
                return res.json(500, { error: 'Failed to update account' + err } ); 
            } 
        }); 
        res.send('Account successfully updated. '); 
    } 
	else 
	{ //We're updating a non existant account
		res.send('ERROR: Attempted to update non-existant account');
	}


};

 
 
/**
 * Find all accounts
 */
 
exports.all = function(req, res) 
{
	Account.find().sort('userLastName userFirstName').populate('userID').exec(function(err, account) { //Sort by last,first ascending, should I actually populate?
    if (err) 
	{
		return res.json(500, { error: 'Error in listing Account information' });
    }
    res.json(account);

  });
};
 
/**
 * Find account by USER id
 */
 
exports.account = function(req, res, id) 
{
	if(id !== undefined)
	{
		var search = { userID: new ObjectId(id) };
		Account.find( (search).populate('userID').exec(function(err, account) { 
		if (err) 
		{
			return res.json(500, { error: 'Error in listing Account information' });
		}
		res.json(account);
		});
	}
	else
	{
		res.send('ERROR: No account id specified');
	}
};

/**
 * Find user's own account
 */
 
exports.own = function(req, res) 
{
	var search = { userID: new ObjectId(req.user.id) };
	Account.find(search).populate('userID').exec(function(err, account) { 
    if (err) 
	{
		return res.json(500, { error: 'Error in listing Account information' });
    }
    res.json(account);
	});
};

/**
 * Show account info
 */
 
exports.show = function(req, res) 
{
	res.json(req.account);
};
 