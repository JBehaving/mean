'use strict';

angular.module('mean.financial').controller('FinancialController', ['$scope', 'Global', 'Financial', 'Events',
  function($scope, Global, Financial, Events) {
    $scope.global = Global;
    $scope.package = {
      name: 'financial'
    };

    $scope.test_csv = [];
    $scope.years = [];
    $scope.events = [];

    $scope.init = function() {
        Events.query(function(events) {
            $scope.events = events;
            console.log($scope.events);
            for (var i = 0; i < events.length; i++) {

            }
        });

    };


  }
]);
