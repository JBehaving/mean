'use strict';

angular.module('mean.vehicles').factory('Garage', [ '$resource',
  function($resource) {
    return $resource('/garage', {
      update : {
          method : 'PUT'
      }
    });
  }
]);
