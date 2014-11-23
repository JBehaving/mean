'use strict';

angular.module('mean.events').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('events page', {
          url: '/events',
          templateUrl: 'events/views/index.html'
        })
        .state('create event', {
          url: '/events/create',
          templateUrl: 'events/views/create.html'
        })
        .state('event by id', {
          url: '/events/:eventId',
          templateUrl: 'events/views/details.html'
        })
        .state('event detail', {
          url: '/events/details/',
          templateUrl: 'events/views/details.html'
        });


  }
]);
