'use strict';

angular.module('mean.forumlogs').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('forumlogs example page', {
      url: '/forumlogs/example',
      templateUrl: 'forumlogs/views/index.html'
    });
  }
]);
