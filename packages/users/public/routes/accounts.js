'use strict';

angular.module('mean.users').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('accounts page', {
          url: '/accounts',
          templateUrl: 'users/views/accounts.html'
        })
        .state('account detail', {
          url: '/accounts/:accountId',
          templateUrl: 'users/views/detail.html'
        })
        .state('my account', {
          url: '/account',
          templateUrl: 'users/views/account.html'
        });
  }
]);