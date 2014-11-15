'use strict';

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