'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home page', {
        url: '/',
        templateUrl: 'system/views/index.html'
      })
      .state('faq page', {
        url: '/faq',
        templateUrl: 'system/views/faq.html'
      })
      .state('about page', {
        url: '/about',
        templateUrl: 'system/views/about.html'
      })
      .state('contact page', {
        url: '/contact',
        templateUrl: 'system/views/contact.html'
      });
  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);