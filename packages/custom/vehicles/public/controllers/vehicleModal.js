'use strict';

angular.module('mean.vehicles').controller('ModalVehicleController', ['$scope','$modal', '$log', function ($scope, $modal, $log){

    $scope.open = function (size) {

        var modalInstance = $modal.open({
          backdrop: true,
          keyboard: true,
          templateUrl: 'vehicles/views/create.html',
          controller: 'ModalVehicleInstanceCtrl',
          size: size
        });

        modalInstance.result.then(function () {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };
}])
.controller('ModalVehicleInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});