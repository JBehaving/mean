'use strict';

angular.module('mean.events').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('events page', {
          url: '/events?registered',
          templateUrl: 'events/views/index.html'
        })
        .state('create event', {
          url: '/events/create',
          templateUrl: 'events/views/create.html'
        })
        .state('event by id', {
          url: '/events/:eventId?registered',
          templateUrl: 'events/views/details.html'
        })
        .state('update event', {
            url: '/events/details/:eventId',
            templateUrl: 'events/views/update.html'
        })
        .state('event detail', {
          url: '/events/details/',
          templateUrl: 'events/views/details.html'
        })
        .state('event register', {
          url: '/events/register/',
          templateUrl: 'events/views/register.html'
        });


  }
]);
