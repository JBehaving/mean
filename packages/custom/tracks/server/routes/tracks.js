'use strict';

// The Package is passed automatically as first parameter
module.exports = function(Tracks, app, auth, database) {
    var tracks = require('../controllers/tracks');

    app.route('/tracks')
        .get(tracks.findTrack)
        .post(tracks.create);

    //app.route('/tracks/:trackName')
        //.get(tracks.findTrack);

   app.route('/tracks/:trackID')
      .get(tracks.findTrack);


    //app.param('trackName', tracks.findTrack);
   app.param('trackID', tracks.track);

};
