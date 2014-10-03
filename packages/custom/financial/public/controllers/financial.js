'use strict';

angular.module('mean.financial').controller('FinancialController', ['$scope', 'Global', 'Financial',
  function($scope, Global, Financial) {
    $scope.global = Global;
    $scope.package = {
      name: 'financial'
    };
  }
]);
