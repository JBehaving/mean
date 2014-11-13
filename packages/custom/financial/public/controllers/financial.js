'use strict';

angular.module('mean.financial').controller('FinancialController', ['$scope', 'Global', 'Financial',
  function($scope, Global, Financial) {
    $scope.global = Global;
    $scope.package = {
      name: 'financial'
    };

    $scope.test_csv = [{
        eventDate : '11/11/2014',
        eventPrice : 150,
        eventAttendees : 45,
        eventRevenue : 150 * 45
    }];
  }
]);
