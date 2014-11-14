'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'system/views/index.html'
      })
      .state('faq', {
        url: '/faq',
        templateUrl: 'system/views/faq.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: ''
      })
      .state('contact', {
        url: '/contact',
        templateUrl: ''
      });
  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);