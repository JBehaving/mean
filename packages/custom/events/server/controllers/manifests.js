'use strict';


var mongoose = require('mongoose'),
    GTDEvent = mongoose.model('Event'),
    Manifest = mongoose.model('Manifest'),
    Account = mongoose.model('Account'),
    Vehicle = mongoose.model('Vehicle'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('lodash');


var attendees = function(manifests) {
    var usersInAllManifests = null;
    for(var i = 0; i < manifests.length; i++){
        usersInAllManifests[i] = attendee(manifests[i]);
    }
    return usersInAllManifests;
};

var attendee = function (manifest) {
    var userid = manifest.userId;
    var vehicleid = manifest.vehicleId;

    var account = Account.find({userId: userid}, function (err, account) {
        if (err) {
            console.log('Error retrieving account');
            return null;
        } else {
            return account;
        }
    });

    var userName = account.userFirstName + ' ' + account.userFirstName;

    var vehicle = Vehicle.find({vehicleId: vehicleid}, function (err, vehicle) {
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



exports.findManifest = function(req, res) {
    if (req.query.eventID!== undefined) {
        var query = {eventId: new ObjectId(req.query.eventID)};
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

exports.findByUser = function(req, res) {
    var query = {userId: new ObjectId(req.query.userId)};
    Manifest.find(query, function(err, manifests){
        if (err) {
            console.log('failed to find a manifest ' + err);
            res.status(500).json( {error: 'Error while searching ' + err});
        } else {
            console.log('tried to find a manifest' + err);
            res.jsonp(manifests);

        }
    });
};

exports.findByEvent = function(req, res) {
    var query = {eventId: new ObjectId(req.query.eventId)};
    Manifest.find(query, function(err, manifests){
        if (err) {
            console.log('failed to find a manifest ' + err);
            res.status(500).json( {error: 'Error while searching ' + err});
        } else {
            console.log('tried to find a manifest' + err);
            res.jsonp(manifests);

        }
    });
};