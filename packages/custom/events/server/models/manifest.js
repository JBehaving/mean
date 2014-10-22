var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ManifestSchema = new Schema({
    amtPaid: { type: String, required: false },
    basePrice: {  type: String, required: false },
    eventDesc: {  type: String, required: false },
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
        required: true },

    status : String,
    paymentResponse : Schema.Types.Mixed,
    paymentMethod : String,

});


mongoose.model('Manifest', ManifestSchema);