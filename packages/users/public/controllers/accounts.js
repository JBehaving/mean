'use strict';

angular.module('mean.accounts').controller('AccountController', ['$scope', 'Global', 'Account',
  function($scope, Global, Account) {
    $scope.global = Global;
    $scope.package = {
      name: 'account'
    };
  }
]);
