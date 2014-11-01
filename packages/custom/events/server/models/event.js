var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    advancedCap: { type: Number, required: false },
    advancedRegistered: {type : Number, default: 0},
    albumLink: { type: String, required: false },
    basePrice: {  type: String, required: false },
    eventDesc: {  type: String, required: false },
    eventState: { type: String,required: false },
    eventStatus: {  type: String,  required: false },
    eventSartTime: {  type: String, required: false },
    eventStartDate: { type: String, required: false },
    intermediateCap: Number,
    intermediateRegistered: {type: Number, default: 0},
    noviceCap: { type: Number,  required: false },
    noviceRegistered: {type: Number, default: 0},
    trackID: { type: Schema.ObjectId,
        ref: 'Track',
        required: false }
    });

mongoose.model('Event', EventSchema);
