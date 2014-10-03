'use strict';

angular.module('mean.vehicles').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('vehicles example page', {
      url: '/vehicles/example',
      templateUrl: 'vehicles/views/index.html'
    });
  }
]);
