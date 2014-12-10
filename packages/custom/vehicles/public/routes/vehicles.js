'use strict';

angular.module('mean.vehicles').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('garage page', {
            url: '/vehicles',
            templateUrl: 'vehicles/views/index.html'
        })
        .state('create vehicle', {
          url: '/vehicles/create',
          templateUrl: 'vehicles/views/create.html'
        });
  }
]);
