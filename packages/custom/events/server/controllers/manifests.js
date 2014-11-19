'use strict';


var mongoose = require('mongoose'),
    GTDEvent = mongoose.model('Event'),
    Manifest = mongoose.model('Manifest'),
    Account = mongoose.model('Accounts'),
    Vehicle = mongoose.model('Vehicle'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('lodash');



var attendee = function (manifest) {
    var userid = manifest._id;
    var vehicleid = manifest._id;

    var account = Account.find({_id: userid}, function (err, account) {
        if (err) {
            console.log('Error retrieving account');
            return null;
        } else {
            return account;
        }
    });

    var userName = account.userFirstName + ' ' + account.userFirstName;

    var vehicle = Vehicle.find({_id: vehicleid}, function (err, vehicle) {
        if (err) {
            console.log('Error retrieving vehicle.');
            return null;
        } else {
            return vehicle;
        }
    });
    var thisAttendee = null;
    thisAttendee.userName = userName;
    thisAttendee.vehicleName = vehicle.vehicleYear + ' ' + vehicle.vehicleColor + ' ' + vehicle.vehicleMake + ' ' + vehicle.vehicleModel;
    thisAttendee.riderAllowed = manifest.rideAlong;
    thisAttendee.riderWanted = manifest.riderWanted;

    return thisAttendee;

};

var attendees = function(manifests) {
    var usersInAllManifests = null;
    for(var i = 0; i < manifests.length; i++){
        var userid = new ObjectId(manifests[i]._id);
        usersInAllManifests[i] = attendee(manifests[i]);
    }
};

exports.findManifest = function(req, res) {
    if (req.query.eventID !== undefined) {
        var query = {eventID: new ObjectId(req.query.eventID)};
        Manifest.find(query, function (err, manifests) {
            if (err) {
                console.log('failed to find a manifest ' + err);
                res.status(500).json( {error: 'Error while searching ' + err});
            } else {
                console.log('tried to find a manifest' + err);
                res.jsonp(attendees(manifests));

            }
        });
    }
    else {
        console.log('No Manifests found by that ID');
    }
};


/**
 * Find event by id
 */
exports.account = function(req, res, next, id) {
    Account.load(id, function(err, account) {
        if (err) return next(err);
        if (!account) return next(new Error('Failed to load account ' + id));
        req.account = account;
        next();
    });
};