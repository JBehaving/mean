'use strict';

angular.module('mean.events').config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('event detail', {
      url: '/events/details/',
      templateUrl: 'events/views/details.html'
    });


  }
]);
