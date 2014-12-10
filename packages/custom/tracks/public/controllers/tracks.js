'use strict';

angular.module('mean.tracks').controller('TracksController', ['$scope', '$stateParams', '$location', 'Global', 'Tracks',
  function($scope, $stateParams, $location, Global, Tracks) {
    $scope.global = Global;

    $scope.create = function(isValid) {
      if (isValid) {
        var track = new Tracks({
          trackName: this.trName,
          trackAddress: this.trAddr,
          trackCity: this.trCity,
          trackState: this.trState,
          trackZip: this.trZip,
          trackContactName: this.contactName,
          trackContactEmail: this.contactEmail,
          trackContactPhone: this.contactPhone,
          trackDescription: this.trDesc
        });
        track.$save(function(response) {
          $location.path('tracks');
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(track) {
      if (track) {
        track.$remove();

        for (var i in $scope.tracks) {
          if ($scope.tracks[i] === track) {
            $scope.tracks.splice(i, 1);
          }
        }
      } else {
        $scope.track.$remove(function(response) {
          $location.path('tracks');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var track = $scope.track;
        if (!track.updated) {
          track.updated = [];
        }
        track.updated.push(new Date().getTime());

        track.$update(function() {
          $location.path('tracks/' + track._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.findAll = function() {
      Tracks.query(function(tracks) {
        $scope.tracks = tracks;
      });
    };

    $scope.findOne = function() {
      Tracks.get({
        trackId: $stateParams.trackId
      }, function(track) {
        $scope.track = track;
      });
    };

    $scope.showTrack = function(track) {
      $scope.currTrack=track;
    };
  }
]);
