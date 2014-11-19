var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var VehicleSchema = new Schema({
    userId: { type: Schema.ObjectId,
        ref: 'User',
        required: true },
    vehicleModel: { type: String, required: true },
    vehicleMake: { type: String, required: true },
    vehicleColor: { type: String, required: true },
    vehicleYear:  { type: String, required: true }
});

mongoose.model('Vehicle', VehicleSchema);
