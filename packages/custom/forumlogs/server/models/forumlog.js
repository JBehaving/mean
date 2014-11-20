'use strict';
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
/**
 * Statics
 */
ForumLogSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};
mongoose.model('ForumLog',ForumLogSchema);