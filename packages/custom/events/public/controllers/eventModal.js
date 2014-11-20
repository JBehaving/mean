'use strict';

angular.module('mean.announcements').controller('ModalEventController', function ($scope, $modal, $log){

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
})
.controller('ModalEventInstanceCtrl', ['$scope', '$modalInstance', '$rootScope', '$http', '$location', 'eventId',
    function ($scope, $modalInstance, $rootScope, $http, $location, eventId) {

      $scope.ok = function (method) {
          var registration = {
              eventId : eventId,
              //userId : $rootScope.user._id,
              //vehicleId : $scope.vehicle._id,
              skqillClass : this.skillClass,
              giveRideAlongs : this.giveRideAlongs,
              requestRideAlongs : this.requestRideAlongs,
              paymentMethod : method,
              returnUrl : $location.url()
          };

          console.log(registration);
          $http.post('/events/register',registration)
              .success(function(response){
                  window.location.href=response.approval_url;
              });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);