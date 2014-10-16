var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    advancedCap: { type: String, required: false },
    advancedRemaining: {type : String, required: false},
    albumLink: { type: String, required: false },
    basePrice: {  type: String, required: false },
    eventDesc: {  type: String, required: true },
    eventState: { type: String,required: false },
    eventStatus: {  type: String,  required: true },
    eventSartTime: {  type: String, required: true },
    eventStartDate: { type: String, required: true },
    noviceCap: { type: String,  required: false },
    noviceRemaining: {type: String, required: false},
    trackID: { type: Schema.ObjectId,
        ref: 'Track',
        required: true }
    });

mongoose.model('Event',EventSchema);
