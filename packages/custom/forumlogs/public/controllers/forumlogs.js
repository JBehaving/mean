'use strict';

angular.module('mean.forumlogs').controller('ForumlogsController', ['$scope', 'Global', 'Forumlogs',
  function($scope, Global, Forumlogs) {
    $scope.global = Global;
    $scope.package = {
      name: 'forumlogs'
    };
  }
]);
