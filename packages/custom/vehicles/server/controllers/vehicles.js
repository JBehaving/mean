'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Vehicle = mongoose.model('Vehicle'),
    ObjectId = mongoose.Types.ObjectId;
/*
exports.update = function(req,res) {
    if (req.vehicle) {
        var vehicle = req.vehicle;
        vehicle = _.extend(vehicle, req.body);
        console.log(vehicle);
        req.vehicle.save(function (err,vehicle) {
            if (err) {
                console.log('Error updating vehicle ' + vehicle.id);
                console.log(err);
                res.status(500).json({error : err});
            }
            if (vehicle) {
                res.status(200).json(vehicle);
            }
        });
    }

    else res.status(404);
};
======= */

/**
 * Create Vehicle
 */

exports.create = function(req,res) 
{
	var vehicle = new Vehicle(req.body); 
	vehicle.userID = req.user;
    console.log('Creating car');
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
};


/**
 * Find user's garage
 */
exports.findByUser = function(req,res,id) {
	//var uid = req.user;
    Vehicle.find({userID : new ObjectId(id)}, function(err,vehicles){});
	//userID : new ObjectId(id)
};

/**
 * Find vehicle
 */
 
 /*exports.vehicle = function(req,res,next,id) {
    Vehicle.findOne({ _id : id },function(err,vehicle) {
        if (err) {
            console.log('Error loading vehicle from database');
            console.log(err);
            res.status(500).json({error : 'Error loading vehicle from database'});
        }
        if (vehicle) {
            req.vehicle = vehicle;
            next();
        }
        else res.status(404).json({error : 'Requested vehicle ID not found in database'});
    });
};*/

exports.vehicle = function(req, res, next, id) {
  Vehicle.load(id, function(err, vehicle) {
    if (err) return next(err);
    if (!vehicle) return next(new Error('Failed to load vehicle ' + id));
    req.vehicle = vehicle;
    next();
  });
};

/**
 * Find all vehicles
 */
 
 exports.all = function(req,res) {
    Vehicle.find().exec(function(err, vehicles) {
        if (err) {
          return res.json(500, {
            error: 'Cannot list the announcements'
          });
        }
        res.json(vehicles);
      });
};

/**
 * Delete vehicle
 */
 
 exports.remove = function(req,res) {
    if (req.vehicle) {
        req.vehicle.remove(function (err,vehicle) {
            if (err) {
                console.log('Error occured deleting vehicle ' + req.vehicle._id);
                console.log(err);
                res.status(500).json(err);
            }
            if (vehicle) {
                res.status(200).json(vehicle);
            }
            else res.status(404);
        });
    }

    else res.status(404);
};


