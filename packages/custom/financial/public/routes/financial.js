'use strict';

angular.module('mean.financial').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('financial example page', {
      url: '/financial/example',
      templateUrl: 'financial/views/index.html'
    });
  }
]);
