'use strict';

var announcement = require('../controllers/announcements');

// Announcement authorization helper
var hasAuthorization = function(req, res, next) {
    if (req.announcement.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized to access Announcements');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(Announcements, app, auth, database) {

  app.route('/announcements/')
    .get(announcement.defaultShow)
    .post(announcement.create);

  app.route('announcements/:announcementId')
    .get(announcement.show)
    .put(auth.requiresEmployee, hasAuthorization, announcement.update)
    .delete(auth.requiresEmployee, hasAuthorization, announcement.destroy);

  app.get('/announcements/render', function(req, res, next) {
    announcement.render('index', {
      package: 'announcements'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  // Finish with setting up the articleId param
  app.param('announcementId', announcement.announcement);
};
