'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Financial = new Module('financial');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Financial.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Financial.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Financial.menus.add({
    title: 'financial example page',
    link: 'financial example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Financial.aggregateAsset('css', 'financial.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Financial.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Financial.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Financial.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Financial;
});
