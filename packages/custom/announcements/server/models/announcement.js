var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnnouncementSchema = new Schema({
    userID: { type: Schema.ObjectId,
        ref:'User',
        required: false },
    newsBody: { type: String, required: false },
    newsEditedDate: { type: String, required: false },
    newsEditedTime: { type: String, required: false },
    newsEnteredTime: { type: String, required: false },
    newsTitle: { type: String, required: false }}
    );

mongoose.model('Announcement',AnnouncementSchema);