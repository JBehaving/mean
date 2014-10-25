var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    advancedCap: { type: String, required: false },
    albumLink: { type: String, required: false },
    basePrice: {  type: String, required: false },
    eventDesc: {  type: String, required: false },
    eventState: { type: String,required: false },
    eventStatus: {  type: String,  required: false },
    eventSartTime: {  type: String, required: false },
    eventStartDate: { type: String, required: false },
    noviceCap: { type: String,  required: false },
    trackID: { type: Schema.ObjectId,
        ref: 'Track',
        required: false }
    });

mongoose.model('Event', EventSchema);
