'use strict';

angular.module('mean.tracks').controller('TracksController', ['$scope', 'Global', 'Tracks',
  function($scope, Global, Tracks) {
    $scope.global = Global;
    $scope.package = {
      name: 'tracks'
    };
  }
]);
