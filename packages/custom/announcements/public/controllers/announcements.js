'use strict';

angular.module('mean.announcements').controller('AnnouncementsController', ['$scope', 'Global', 'Announcements',
  function($scope, $stateParams, $location, Global, Announcements) {
    $scope.global = Global;

    $scope.package = {
      name: 'announcements'
    };

    $scope.hasAuthorization = function(announcements) {
        if (!announcements || !announcements.user) return false;
        return $scope.global.isAdmin || announcements.user._id === $scope.global.user._id;
    };

    $scope.announcements =

    $scope.create = function(isValid) {
        if (isValid) {
            var announcement = new Announcements({
              newsTitle: this.newsTitle,
              newsBody: this.newsBody
            });
            announcement.$save(function(response) {
              $location.path('announcements/' + response._id);
            });

            this.newsTitle = '';
            this.newsBody = '';
        } else {
            $scope.submitted = true;
        }
    };

    $scope.remove = function(announcements) {
        if (announcements) {
            announcements.$remove();

            for (var i in $scope.announcements) {
                if ($scope.announcements[i] === announcements) {
                    $scope.articles.splice(i, 1);
                }
            }
        } else {
            $scope.announcements.$remove(function(response) {
              $location.path('announcement');
            });
        }
    };

    $scope.defaultShow = function() {
        Announcements.query(function(announcements) {
            $scope.announcements = announcements;
        });
    };
  }
]);
