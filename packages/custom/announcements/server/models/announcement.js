'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Announcement Schema
 */
var AnnouncementSchema = new Schema({
    userID: { type: Schema.ObjectId,
        ref:'User',
        required: true },
    newsBody: { type: String, required: true, trim: true },
    newsEditedDate: { type: String, required: false },
    newsEditedTime: { type: String, required: false },
    newsCreatedDate: { type: String, required: false },
    newsTitle: { type: String, required: true }}
    );

/**
 * Field validations
 */
AnnouncementSchema.path('newsTitle').validate(function(newsTitle) {
    return !!newsTitle;
}, 'Title cannot be blank');

AnnouncementSchema.path('newsBody').validate(function(newsBody) {
    return !!newsBody;
}, 'Announcement content cannot be blank');


mongoose.model('Announcement',AnnouncementSchema);