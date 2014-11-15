'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    advancedCap: { type: Number, required: false },
    advancedRegistered: { type : Number, default: 0},
    albumLink: { type: String, required: false },
    basePrice: {  type: String, required: false },
    city: {type: String, required: false},
    eventDesc: {  type: String, required: false },
    eventState: { type: String,required: false },
    eventStatus: {  type: String,  required: false },
    eventStartTime: {  type: String, required: false },
    eventStartDate: { type: Date, required: false },
    intermediateCap: { type: Number, required: false },
    intermediateRegistered: {type: Number, default: 0},
    noviceCap: { type: Number,  required: false },
    noviceRegistered: {type: Number, default: 0},
    state: {type: String, required: false},
    trackID: { type: Schema.ObjectId,
        ref: 'Track',
        required: false }
    });

/**
 * Statics
 */
EventSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Event', EventSchema);
