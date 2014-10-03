'use strict';

angular.module('mean.vehicles').controller('VehiclesController', ['$scope', 'Global', 'Vehicles',
  function($scope, Global, Vehicles) {
    $scope.global = Global;
    $scope.package = {
      name: 'vehicles'
    };
  }
]);
