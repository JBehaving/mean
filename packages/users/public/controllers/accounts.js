'use strict';

angular.module('mean.events').controller('AccountController', ['$scope', 'Global', 'Account',
  function($scope, Global, Account) {
    $scope.global = Global;
    $scope.package = {
      name: 'account'
    };
  }
]);
