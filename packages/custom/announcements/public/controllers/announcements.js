'use strict';

angular.module('mean.announcements').controller('AnnouncementsController', ['$scope','$stateParams', '$location', 'Global', 'Announcements','$http',
  function($scope, $stateParams, $location, Global, Announcements,$http) {
    $scope.global = Global;
    $scope.announcements=[];

    $scope.package = {
      name: 'announcements'
    };

//    $scope.hasAuthorization = function(announcements) {
//        if (!announcements || !announcements.user) return false;
//        return $scope.global.isAdmin || announcements.user._id === $scope.global.user._id;
//    };

    $scope.create = function(isValid) {
        if (isValid) {
            var announcement = new Announcements({
              newsTitle: this.newsTitle,
              newsBody: this.newsBody
            });
            announcement.$save(function(response) {
              $scope.defaultShow();
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
        $scope.announcements = data;
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
  },
])
.controller('ModalController', function ($scope, $modal, $log){

    $scope.open = function (size) {
        var modalInstance = $modal.open({
          backdrop: true,
          keyboard: true,
          templateUrl: 'announcements/views/create.html',
          controller: 'ModalInstanceCtrl',
          size: size
        });

        modalInstance.result.then(function () {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };
})
.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});