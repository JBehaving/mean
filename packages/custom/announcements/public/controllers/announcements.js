'use strict';

angular.module('mean.announcements').controller('AnnouncementsController', ['$scope', 'Global', 'Announcements',
  function($scope, $stateParams, $location, Global, Announcements,$http) {
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
        $http.get('/announcements')
        .success(function(data) {
        $scope.announcement = data;
        })
        .error(function(data) {
        console.log('Error: ' + data);
        });
    };

     $scope.findOne = function() {
          Announcements.get({
            announcementsId: $stateParams.announcementsId
          }, function(announcement) {
            $scope.announcement = announcement;
          });
        };
  }
]);

angular.module('mean.announcements').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
/*      resolve: {
        items: function () {
          return $scope.items;
        }
      }*/
    });

    modalInstance.result.then(function (selectedItem) {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('mean.announcements').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

/*  $scope.create = function () {
    $modalInstance.close($scope.selected.item);
  };*/

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});