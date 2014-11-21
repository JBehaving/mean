'use strict';


var mongoose = require('mongoose'),
    Manifest = mongoose.model('Manifest'),
    Account = mongoose.model('Account'),
    Vehicle = mongoose.model('Vehicle'),
    ObjectId = require('mongoose').Types.ObjectId,
    _ = require('lodash');



/*
var attendee = {
    "skill": skill,
    "name": fullName,
    "vehicle": vehicleDesc,
    "allows": allows,
    "wants": false,
    "checkedin": false

};*/
var attendee = {};


/*
exports.findAttendeesByEvent = function(req, res) {
    var attendees = [
        {
            "skill": "advanced",
            "name": "Jake Speed",
            "vehicle": "2012 Ford Mustang",
            "allows": true,
            "wants": false,
            "checkedin": false
        },
        {
            "skill": "novice",
            "name": "Allie Khat",
            "vehicle": "2001 Mitsubishi Lancer",
            "allows": false,
            "wants": true,
            "checkedin": true
        },
        {
            "skill": "intermediate",
            "name": "Allan Fedreich",
            "vehicle": "2015 Hyundai Elantra",
            "allows": false,
            "wants": false,
            "checkedin": true
        }
    ];
    res.jsonp(attendees);

};*/
function retrieveManifests(eventId, callback) {
    Manifest.find().where('eventId').equals(eventId).exec(function (err, manifests) {
        if (err) {
            console.log('Call was bad' + err);
            callback(err, null);
        } else {
            console.log('Call was good, calling back');
            callback(null, manifests);

        }
    });
};



function extractUserNameFromAccount(manifest, callback) {
    Account.find().where('userID').equals(manifest.userId).exec(function (err, account) {
        if (err) {
            console.log('Call was bad' + account.userFirstName + ' ' + account.userLastNName);
            callback(err, null);
        } else {
            console.log('Call was good, calling back' + account.userFirstName + ' ' + account.userLastNName);
            callback(null, account.userFirstName + ' ' + account.userLastNName);
        }
    });
};

function extractVehicleFromManifest(manifest, callback) {
    Vehicle.find().where('vehicleId').equals(manifest.vehicleId).exec(function (err, vehicle) {
        if (err) { callback(err, null); }
        else {
            console.log('Call was good, calling back');
            callback(null, vehicle.vehicleYear + vehicle.vehicleColor + ' ' + vehicle.vehicleMake + ' ' + vehicle.vehicleModel);
        }
    });
}

function addAttendeeNammesToManifests(manifests, callback) {

    var  m;

    //-- for each manifest, add username and vehicle name
    for(m in manifests) {
        extractUserNameFromAccount(manifests[m], function(err, name){
            if (err) {
                manifests[m]['name'] = 'John Doe';
                console.log(err);
            }
            else {
                console.log('got name from manifest');
                manifests[m]['name'] = name;
            }
        });
    }
}
function addVehicleToManifests(manifests, callback) {
    var m;
    for (m in manifests) {
        extractVehicleFromManifest(manifests[m], function (err, vehicle) {
            if (err) {
                manifests[m]['vehicle'] = '1988 Black Lamborghini Countach';
                concole.log(err);
            }
            else {
                console.log('Call was good, found ' + vehicle);
                manifest[m]['vehicle'] = vehicle;
            }
        });
        i++;
    }
}
function attendees(manifests) {
    var usersInAllManifests = null;


    for(var i = 0; i < manifests.length; i++){
        usersInAllManifests[i] = getAttendee(manifests[i]);
    }
    return usersInAllManifests;
};

function getAttendee(manifest, callback) {

    var userid = manifest.userId;
    var vehicleid = manifest.vehicleId;

    var account = Account.find({userId: userid}, function (err, account) {
        if (err) {
            console.log('Error retrieving account');
            callback(err, null);
        } else {
            console.log('found account for ' + account.id);
            callback(null, account);
        }
    });
    var userName = null;
    if (account !== undefined || account !== null) {
        userName = account.userFirstName + ' ' + account.userLastName;
    }
    else {userName = 'John Doe';}

    var vehicle = null;
    vehicle = Vehicle.find({vehicleId: new ObjectId(vehicleid)}, function (err, vehicle) {
        if (err) {
            console.log('Error retrieving vehicle.');
            return null;
        } else {
            return vehicle;
        }
    });
    if (vehicle === null || vehicle === undefined) { vehicle = '1988 Lamborghini Countach'; }

    var thisAttendee = {};
    thisAttendee['skill'] = manifest.skillClass;
    thisAttendee['name'] = userName;
    thisAttendee['vehicle'] = vehicle.vehicleYear + ' ' + vehicle.vehicleColor + ' ' + vehicle.vehicleMake + ' ' + vehicle.vehicleModel;
    thisAttendee['allowed'] = manifest.rideAlong;
    thisAttendee['riderWanted'] = manifest.riderWanted;
    thisAttendee['checkedin'] = true;
    // thisAttendee['checkedin'] = manifest.isCheckedin;

    return thisAttendee;

};
exports.findAttendeesByEvent = function(req, res) {
    if (req.query.eventId !== undefined && req.query.eventId !== null) {
        var eventId = new ObjectId(req.query.eventId);

        retrieveManifests(eventId, function (err, manifests) {
            console.log('tried to find a manifest');
            if (err) {
                console.log('failed to find a manifest ' + err);

            } else {
                addAttendeeNammesToManifests(manifests, function (err, attendees) {
                    if (err) {
                        console.log('failed to find a manifest ' + err);
                    }
                    else {
                        addVehicleToManifests(attendees, function (err, manifests) {
                            if (err) {
                                console.log('failed to find a manifest ' + err);
                            }
                            else {
                                res.jsonp(manifests);
                            }
                        });
                    }
                });
            }
        });
    }
 };


exports.findManifest = function(req, res) {
    if (req.query.eventId!== undefined) {
        var query = {eventId: new ObjectId(req.query.eventId)};
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
            res.json(manifests);

        }
    });
};