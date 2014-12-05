'use strict';

angular.module('mean.users').controller('AccountsController', ['$scope', 'Accounts',
    function($scope, Accounts) {

        $scope.glyph = 'glyphicon-chevron-down';
        $scope.activeOrder = 'userLastName';
        $scope.orderBy = 'userLastName';
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

        $scope.find = function() {
            Accounts.query(function(accounts) {
                $scope.accounts = accounts;
            });
        };

        $scope.possibleRoles = [
            'Member',
            'Standard Employee',
            'Event Manager',
            'Accountant',
            'Account Manager'
        ];

        $scope.editting = false;
    }
]);