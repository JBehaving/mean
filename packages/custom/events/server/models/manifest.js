var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ManifestSchema = new Schema({
    amtPaid: { type: String, required: false },
    conformationID: { type: String, required: true },
    basePrice: {  type: String, required: true },
    eventDesc: {  type: String, required: true },
    rideAlong: { type: String, required: false },
    riderWanted: {  type: String,  required: true },
    skillClass: {  type: String, required: true },
    userID: { type: Schema.ObjectId,
        ref: 'User',
        required: true },
    vehicleID: { type: Schema.ObjectId,
        ref:'Vehicle',
        required: false },
    eventID: { type: Schema.ObjectId,
        ref: 'Event',
        required: true }
});


mongoose.model('Manifest', ManifestSchema);