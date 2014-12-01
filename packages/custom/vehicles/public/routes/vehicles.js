'use strict';

angular.module('mean.vehicles').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('vehicles example page', {
      url: '/vehicles/example',
      templateUrl: 'vehicles/views/index.html'
    })
    .state('create vehicle', {
          url: '/vehicles/create',
          templateUrl: 'vehicles/views/create.html',
        });
  }
]);
