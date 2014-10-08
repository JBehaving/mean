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
    newsEnteredTime: { type: String, required: false },
    newsTitle: { type: String, required: true }}
    );



mongoose.model('Announcement',AnnouncementSchema);