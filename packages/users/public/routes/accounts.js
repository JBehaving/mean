'use strict';

angular.module('mean.users').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('accounts page', {
          url: '/accounts',
          templateUrl: 'users/public/views/accounts.html'
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