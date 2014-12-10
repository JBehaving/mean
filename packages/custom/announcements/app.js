'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Announcements = new Module('announcements');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Announcements.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Announcements.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Announcements.menus.add({
    title: 'announcements page',
    link: 'announcements page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Announcements.aggregateAsset('css', 'announcements.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Announcements.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Announcements.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Announcements.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Announcements;
});
