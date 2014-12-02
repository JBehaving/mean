'use strict';

angular.module('mean.users').controller('AccountsController', ['$scope', 'Accounts',
    function($scope, Accounts) {

        Accounts.get(function (accounts) {
            $scope.accounts = accounts;
        });

        $scope.glyph = 'glyphicon-chevron-down';
        $scope.activeOrder = 'Last Name';
        $scope.orderBy = 'Last Name';
        $scope.newOrder = function(str) {
            if (this.orderBy === str) {
                this.orderBy = '-' + str;
                this.glyph = 'glyphicon-chevron-up';
            }
            else {
                this.orderBy = str;
                this.glyph = 'glyphicon-chevron-down';
            }
            this.activeOrder = str;
        };

        $scope.showAcct = function(account) {
            $scope.currAcct = account;
        };
    }
]);