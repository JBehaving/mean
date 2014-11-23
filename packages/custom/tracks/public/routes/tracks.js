'use strict';

angular.module('mean.tracks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('tracks page', {
        url: '/tracks',
        templateUrl: 'tracks/views/index.html'
      })
      .state('create track', {
        url: '/tracks/create',
        templateUrl: 'tracks/views/create.html'
      });
  }
]);
