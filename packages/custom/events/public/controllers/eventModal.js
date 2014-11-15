'use strict';

angular.module('mean.announcements').controller('ModalController', function ($scope, $modal, $log){

    $scope.open = function (size) {
        var modalInstance = $modal.open({
          backdrop: true,
          keyboard: true,
          templateUrl: 'events/views/register.html',
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