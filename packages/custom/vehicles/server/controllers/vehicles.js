'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Vehicle = mongoose.model('Vehicle'),
User = mongoose.model('User'),
_ = require('lodash'),
ObjectId = require('mongoose').Types.ObjectId;

/**
 * Create Vehicle
 */

exports.create = function(req,res) 
{
	var vehicle = new Vehicle(req.body); 
	vehicle.userID = req.user;
 
	vehicle.save(function(err) {
    if (err) 
	{
      return res.json(500, { error: 'Error in creating new car' });
    }
    res.json(vehicle);
	});
};

/**
 * Update Vehicle
 */
 
exports.update = function(req, res) 
{
	var updatedCar = new Vehicle(req.body); 
	
    if (updatedCar._id !== undefined) 
	{ 
		//Mongodb does not like it when you try to update a doc by _id when the object still exists, so we have to delete the original
		var searchID = updatedCar._id; 
        delete updatedCar._id;
			
		
        Vehicle.update(searchID, updatedCar, function (err) { 
            if (err) 
			{ 
                console.log('Vehicle update failed: ' + err); 
                return res.json(500, { error: 'Failed to update vehicle' + err } ); 
            } 
        }); 
        res.send('Vehicle successfully updated. '); 
    } 
	else 
	{ //We're updating a non existant vehicle
		res.send('ERROR: Attempted to update non-existant vehicle');
	}

/**
 * Find user's garage
 */

};

