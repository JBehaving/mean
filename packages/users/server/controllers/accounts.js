'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Account = mongoose.model('Account');
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
	var search = { userID: new ObjectId(id) };
	Account.find( (search).populate('userID').exec(function(err, account) { 
    if (err) 
	{
		return res.json(500, { error: 'Error in listing Account information' });
    }
    res.json(account);
	});
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
 