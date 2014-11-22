'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ManifestSchema = new Schema({
    amtPaid: { type: String, required: false },
    basePrice: {  type: String, required: false },
    eventDesc: {  type: String, required: false },
    rideAlong: { type: Boolean, required: false },
    riderWanted: {  type: Boolean,  required: false },
    skillClass: {  type: String, required: true },
    userId: { type: Schema.ObjectId,
        ref: 'User',
        required: true },
    vehicleId: { type: Schema.ObjectId,
        ref:'Vehicle',
        required: false },
    eventId: { type: Schema.ObjectId,
        ref: 'Event',
        required: true },

    status : String,
    paymentResponse : Schema.Types.Mixed,
    paymentMethod : String,
    created : {
        type : Date,
        default : Date.now
    }
});

ManifestSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};
mongoose.model('Manifest', ManifestSchema);