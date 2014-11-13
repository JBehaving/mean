'use strict';

angular.module('mean.announcements').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('announcements page', {
      url: '/announcements/example',
      templateUrl: 'announcements/views/index.html'
    })
    .state('create announcement', {
      url: '/announcements/create',
      templateUrl: 'announcements/views/create.html',
    })
    .state('edit announcement', {
      url: '/announcements/:announcementId/edit',
      templateUrl: 'announcements/views/edit.html',
//          resolve: {
//            loggedin: checkLoggedin
//          }
    });
  }
]);
