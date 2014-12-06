'use strict';

angular.module('mean.vehicles').controller('VehiclesController', ['$scope','$stateParams', '$location', 'Global', 'Vehicles','$http',
  function($scope, $stateParams, $location, Global, Vehicles, $http) {
    $scope.global = Global;
    $scope.package = {
      name: 'vehicles'
    };

    $scope.hasAuthorization = function(vehicle) {
      if (!vehicle || !vehicle.userID) return false;
      return $scope.global.isAdmin || vehicle.userID._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var vehicle = new Vehicles({
		  vehicleModel: this.vehicleModel,
		  vehicleMake: this.vehicleMake,
		  vehicleColor: this.vehicleColor,
		  vehicleYear:  this.vehicleYear
        });
        vehicle.$save(function(response) {
          $location.path('garage');
        });

        this.vehicleModel= '';
        this.vehicleMake = '';
		this.vehicleColor = '';
		this.vehicleYear = '';
      } 
	  else {
        $scope.submitted = true;
      }
    };
	
	$scope.remove = function(vehicle) {
      if (vehicle) {
        vehicle.$remove();

        for (var i in $scope.vehicles) {
          if ($scope.vehicles[i] === vehicle) {
            $scope.vehicles.splice(i, 1);
          }
        }
      } else {
        $scope.vehicle.$remove(function(response) {
          $location.path('garage');
        });
      }
    };
	
	$scope.update = function(isValid) {
      if (isValid) {
        var vehicle = $scope.vehicle;
        if (!vehicle.updated) {
          vehicle.updated = [];
        }

        vehicle.$update(function() {
          $location.path('garage');
        });
      } else {
        $scope.submitted = true;
      }
    };
	
	$scope.defaultShow = function(isValid) {
	
        $http.get('/garage')
        .success(function(data) {
        $scope.vehicles = data;
        })
        .error(function(data) {
        console.log('Error: ' + data);
    });
		
	};
  }
]);
