'use strict';

// The Package is passed automatically as first parameter
module.exports = function(Tracks, app, auth, database) {
    var tracks = require('../controllers/tracks');

    app.route('/tracks')
        .get(tracks.findTrack)
        .post(auth.requiresEventManager, tracks.create);

    //app.route('/tracks/:trackName')
        //.get(tracks.findTrack);

    app.route('/tracks/:trackID')
        .get(tracks.show)
        .put(auth.requiresEventManager, tracks.update)
        .delete(auth.requiresEventManager, tracks.destroy);


    //app.param('trackName', tracks.findTrack);
    app.param('trackID', tracks.track);
};
