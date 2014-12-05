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
.controller('ModalEventInstanceCtrl', ['$scope', '$modalInstance', '$http', '$location', 'Global', 'usSpinnerService', 'eventId','Garage',
    function ($scope, $modalInstance, $http, $location, Global, usSpinnerService,  eventId, Garage) {

      $scope.vehicles = [];

      $scope.getGarage = function() {
          Garage.query(function(vehicles) {
              $scope.vehicles = vehicles;
          });
      };

      $scope.ok = function (method) {
          var registration = {
              eventId : eventId,
              //userId : $rootScope.user._id,
              vehicleId : $scope.vehicleId,
              skillClass : this.skillClass,
              riderWelcome : this.riderWelcome,
              rideAlong : this.rideAlong,
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
    .controller('ModalRegisteredInstanceCtrl', ['$scope', '$modalInstance', '$location',
        function ($scope, $modalInstance,$location) {
            $scope.finish = function () {
                $modalInstance.dismiss('finished');
                $location.url($location.url().split('?')[0]);
            };
        }
    ]);