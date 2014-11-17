'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TrackSchema = new Schema({
    deactivatedFlag: { type: String, required: false },
    trackAddress: { type: String, required: true },
    trackContactName: { type: String, required: false },
    trackContactEmail: { type: String, required: false },
    trackDescription: { type: String, required: false },
    trackPhoneNumber: { type: String, required: false },
    timeEntered: { type: String, required: true },
    trackName: { type: String, required: true }});


/**
 * Statics
 */
TrackSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);

};
mongoose.model('Track',TrackSchema);