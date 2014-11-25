'use strict';

angular.module('mean.events').controller('ModalEventController', ['$scope','$modal', '$log', function ($scope, $modal, $log){

    $scope.open = function (event) {

        var modalInstance = $modal.open({
          backdrop: true,
          keyboard: true,
          templateUrl: 'events/views/register.html',
          controller: 'ModalEventInstanceCtrl',
          //size: size  //Not being used?
          resolve: {
              eventId : function() {
                  return event._id;
              }
          }
        });

        modalInstance.result.then(function () {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };
}])
.controller('ModalEventInstanceCtrl', ['$scope', '$modalInstance', '$rootScope', '$http', '$location', 'usSpinnerService', 'eventId',
    function ($scope, $modalInstance, $rootScope, $http, $location, usSpinnerService,  eventId) {

      $scope.ok = function (method) {
          var registration = {
              eventId : eventId,
              //userId : $rootScope.user._id,
              //vehicleId : $scope.vehicle._id,
              skillClass : this.skillClass,
              giveRideAlongs : this.giveRideAlongs,
              requestRideAlongs : this.requestRideAlongs,
              paymentMethod : method,
              returnUrl : $location.absUrl()
          };

          console.log(registration);
          $http.post('/events/register',registration)
              .success(function(response){
                  window.location.href=response.approval_url;
              })
              .error(function(response){
                  usSpinnerService.stop('registration-spinner');
              });
          usSpinnerService.spin('registration-spinner');
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
])
.controller('ModalRegisteredController', ['$scope','$modal', '$log', '$stateParams', function ($scope, $modal, $log, $stateParams){

    $scope.open = function () {

        console.log($stateParams.registered);

        if ($stateParams.registered !== '1') return;

        console.log('opening modal');

        var modalInstance = $modal.open({
            backdrop: true,
            keyboard: true,
            templateUrl: 'events/views/registered.html',
            controller: 'ModalRegisteredInstanceCtrl',
            //size: size  //Not being used?
        });

        modalInstance.result.then(function () {

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}])
    .controller('ModalRegisteredInstanceCtrl', ['$scope', '$modalInstance',
        function ($scope, $modalInstance) {
            $scope.finish = function () {
                $modalInstance.dismiss('finished');
            };
        }
    ]);