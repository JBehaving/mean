'use strict';

angular.module('mean.announcements').factory('Announcements', ['$resource',
  function($resource) {
    return $resource('announcements/:announcementId', {
        announcements: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
    });
  }
]);
