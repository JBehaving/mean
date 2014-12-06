'use strict';

angular.module('mean.vehicles').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('user garage', {
      url: '/garage',
      templateUrl: 'vehicles/views/index.html'
    })
    .state('create vehicle', {
          url: '/garage/create',
          templateUrl: 'vehicles/views/create.html',
        });
  }
]);
