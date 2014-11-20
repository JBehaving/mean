var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TrackSchema = new Schema({
    deactivatedFlag: { type: String, required: false },
    trackAddress: { type: String, required: true },
    trackCity: { type: String, required: true },
    trackState: { type: String, required: true },
    trackContactName: { type: String, required: false },
    trackContactEmail: { type: String, required: false },
    trackDescription: { type: String, required: false },
    trackPhoneNumber: { type: String, required: false },
    timeEntered: { type: String, required: true },
    trackName: { type: String, required: true }});

mongoose.model('Track',TrackSchema);