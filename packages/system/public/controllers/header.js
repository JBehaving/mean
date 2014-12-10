'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
  function($scope, $rootScope, Global, Menus) {
    $scope.global = Global;
    $scope.menus = {};

    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {

      window.user = $rootScope.user;
      console.log(window.user);

      $scope.global = {
        authenticated: !! $rootScope.user,
        user: $rootScope.user
      };
    });

    $scope.showTools=function() {
        var user = $scope.global;
        return user.isEventManager || user.isAccountManager || user.isAccountant || user.isOwner;
    };
  }
])
.controller('ActiveCtrl', ['$scope', '$location',
      function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
          var active = (viewLocation === $location.path());
          return active;
        };
      }
]);