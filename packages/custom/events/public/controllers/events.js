'use strict';


angular.module('mean.events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Global', 'Events', 'Tracks',
  function($scope, $stateParams, $location, Global, Events, Tracks) {
    $scope.global = Global;
    //$scope.events = Events; //can remove when pulling events from backend

    /*$scope.hasAuthorization = function(event) {
      if (!event || !event.user) return false;
      return $scope.global.isAdmin || event.user._id === $scope.global.user._id;
    };*/

    $scope.create = function(isValid) {
      if (isValid) {
        var event = new Events({
          eventStartDate: this.date
        });
        event.$save(function(response) {
          $location.path('events/' + response._id);
        });

        this.eventStartDate = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(event) {
      if (event) {
        event.$remove();

        for (var i in $scope.events) {
          if ($scope.events[i] === event) {
            $scope.events.splice(i, 1);
          }
        }
      } else {
        $scope.event.$remove(function(response) {
          $location.path('events');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var event = $scope.event;
        if (!event.updated) {
          event.updated = [];
        }
        event.updated.push(new Date().getTime());

        event.$update(function() {
          $location.path('events/' + event._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Events.query(function(events) {
        $scope.events = events;
      });
    };

    $scope.findOne = function() {
      Events.get({
        eventId: $stateParams.eventId
      }, function(event) {
        $scope.event = event;
      });
    };

      $scope.findAllTracks = function() {
          Tracks.query(function(tracks) {
              $scope.tracks = tracks;
          });
      };

      //$scope.package = {
    //  name: 'events'
    //};
  }
]);
