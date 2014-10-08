var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ForumLogSchema = new Schema({
    comment: { type: String, required: true },
    dateEntered: { type: String, required: true },
    eventID: { type: Schema.ObjectId,
        ref:'Event',
        required: true },
    forumLink: { type: String, required: true },
    timeEntered: { type: String, required: true },
    userID: { type: Schema.ObjectId,
        ref:'User',
        required: true }

});

mongoose.model('ForumLog',ForumLogSchema);