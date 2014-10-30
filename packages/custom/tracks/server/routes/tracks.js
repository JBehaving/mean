'use strict';

var tracks = require('../controllers/tracks');
// The Package is past automatically as first parameter
module.exports = function(Tracks, app, auth, database) {

    app.route('/tracks')
        .get(tracks.findTrack)
        .post(tracks.create);

    app.route('/tracks/:trackName')
        .get(tracks.findTrack);

    app.param('trackName', tracks.findTrack);

};
