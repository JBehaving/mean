'use strict';

angular.module('mean.announcements').controller('AnnouncementsController', ['$scope', 'Global', 'Announcements',
  function($scope, Global, Announcements) {
    $scope.global = Global;
    $scope.package = {
      name: 'announcements'
    };
  }
]);
