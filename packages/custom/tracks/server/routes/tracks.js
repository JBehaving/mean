'use strict';

var tracks = require('../controllers/tracks');
// The Package is passed automatically as first parameter
module.exports = function(Tracks, app, auth, database) {
//-- may need auth added
    app.route('/tracks')
        .get(tracks.findTrack)
        .post(tracks.create);

    app.route('/tracks/:trackName')
        .get(tracks.findTrack);

    app.route('/tracks/:trackID')
        .get(tracks.show)
        .put(tracks.update);


    app.param('trackName', tracks.findTrack);
    app.param('trackID', tracks.track);
};
