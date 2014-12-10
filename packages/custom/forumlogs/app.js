'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Forumlogs = new Module('forumlogs');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Forumlogs.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Forumlogs.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Forumlogs.menus.add({
    title: 'forumlogs example page',
    link: 'forumlogs example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Forumlogs.aggregateAsset('css', 'forumlogs.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Forumlogs.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Forumlogs.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Forumlogs.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Forumlogs;
});
