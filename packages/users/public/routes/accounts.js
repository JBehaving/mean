'use strict';

angular.module('mean.users').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('manage accounts', {
          url: '/accounts',
          templateUrl: 'users/public/views/manage.html' //todo
        })
        .state('account detail', {
          url: '/accounts/:accountId',
          templateUrl: 'users/public/views/detail.html'
        })
        .state('my account', {
          url: '/account',
          templateUrl: 'users/public/views/account.html'
        });


  }
]);