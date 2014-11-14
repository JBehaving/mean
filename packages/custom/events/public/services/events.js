'use strict';

angular.module('mean.events').factory('Events', [
  function() {
    var Events = {};

    Events.upcoming = [
      {
        date: '11/27/2014',
        track: 'Laguna Seca',
        location: 'Los Angeles, CA',
        novice: '10',
        intermediate: '14',
        advanced: '24',
        price: '109.99'
      },
      {
        date: '12/04/2014',
        track: 'Wipeout',
        location: 'San Diego, CA',
        novice: '22',
        intermediate: '13',
        advanced: '18',
        price: '89.99'
      }
    ];

    Events.past = [
      {
        date: '09/12/2014',
        track: 'Laguna Seca',
        location: 'Los Angeles'
      },
      {
        date: '08/17/2014',
        track: 'Woodbury',
        location: 'Sacramento, CA'
      }
    ];

    return Events;
  }
]);
