'use strict';

angular.module('mean.tracks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('tracks example page', {
      url: '/tracks/example',
      templateUrl: 'tracks/views/index.html'
    });
  }
]);
