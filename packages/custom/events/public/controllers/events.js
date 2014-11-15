'use strict';

angular.module('mean.events').controller('EventsController', ['$scope', 'Global', 'Events', '$http',
  function($scope, Global, Events, $http) {
      $scope.global = Global;
      $scope.foo = 'bar';


      var eventStartDate = '12/12/14';
      var trackID = '546045c251d6b51818cb8a17';
      //-- set up variables
      $scope.eventD = [];
      $scope.trackN = [];
      $http.get('/events?eventStartDate=' + eventStartDate + '&trackID=' + trackID)
        .success(function (data) {
            $scope.eventD =  data[0].eventDesc;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
      $http.get('/events')
          .success(function (data) {
              $scope.events =  data;
          })
          .error(function (data) {
              console.log('Error: ' + data);
          });

      $http.get('/manifests')
          .success(function (data) {
              $scope.manifest =  data;
          })
          .error(function (data) {
              console.log('Error: ' + data);
          });
//-- 546045c251d6b51818cb8a17/
      /*
      $http.get('/tracks?trackID='+trackID)
          .success(function (track) {
              console.log(track);
              $scope.trackN =  track.trackName;
          })
          .error(function (err) {
              console.log('Error: ' + err);
          });*/
  }
]);