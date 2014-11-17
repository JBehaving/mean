var mongoose = require('mongoose'),
    Vehicle = mongoose.Model('Vehicle'),
    ObjectId = mongoose.Types.ObjectId;


exports.all = function (req,res) {
    Vehicle.find().exec(function (err, vehicles){
        if (err) {
            console.log('Error loading vehicles from database');
            console.log(err);
            res.status(500).json({error : 'Error loading vehicles from database'});
        }
        else {
            res.status(200).json(vehicles);
        }
    });
};


exports.show = function(req,res) {
    if (req.vehicle)
        res.status(200).json(req.vehicle);
    }
    else res.status(404);
};


exports.create = function(req,res) {
    var vehicle = new Vehicle(req.body);
    vehicle.save(function (err,vehicle) {
        if (err) {
            console.log('Error saving vehicle');
            console.log(err);
            res.status(500).json(err);
        }
        if (vehicle) {
            res.status(200).json(vehicle);
        }
    });
};

exports.vehicle = function(req,res,next,id) {
    Vehicle.findOne({ _id : id },function(err,vehicle) {
        if (err) {
            console.log('Error loading vehicle from database');
            console.log(err);
            res.status(500).json({error : 'Error loading vehicle from database'})
        }
        if (vehicle) {
            req.vehicle = vehicle;
            next();
        }
        else res.status(404);
    });
};

exports.update = function(req,res) {
    if (req.vehicle) {
        req.vehicle = req.body;
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
}