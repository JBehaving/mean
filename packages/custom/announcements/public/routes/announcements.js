'use strict';

angular.module('mean.announcements').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('announcements example page', {
      url: '/announcements/example',
      templateUrl: 'announcements/views/index.html'
    });
  }
]);
