'use strict';

angular.module('mean.users').factory('Accounts', ['$resource',
  function($resource) {
    return $resource('accounts/:accountId', {
      accountId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

