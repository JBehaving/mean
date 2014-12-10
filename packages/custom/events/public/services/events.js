'use strict';

angular.module('mean.events').factory('Events', ['$resource',
  function($resource) {
    return $resource('events/:eventId', {
      eventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      'get': {
          transformResponse : function(event) {
              event = angular.fromJson(event);
              event.eventStartDate = new Date(event.eventStartDate);
              event.basePrice = parseInt(event.basePrice);
              return event;
          }
      }
    });
  }
]);
