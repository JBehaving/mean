'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TrackSchema = new Schema({
    deactivatedFlag: { type: String, required: false },
    trackAddress: { type: String, required: true },
    trackCity: { type: String, required: true },
    trackState: { type: String, required: true },
    trackZip: { type: Number, required: true},
    trackContactName: { type: String, required: false },
    trackContactEmail: { type: String, required: false },
    trackContactPhone: { type: String, required: false },
    trackDescription: { type: String, required: false },
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