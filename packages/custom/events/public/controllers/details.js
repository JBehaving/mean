'use strict';

angular.module('mean.events').controller('EventDetailsController', ['$scope', 'Global', 'Events', '$http',
    function($scope, Global, Events, $http) {
        $scope.global = Global;


      //  var eventStartDate = '12/12/14';
      //  var trackID = '1';

        var eventId = '1';
        //-- set up variables
        $scope.eventD = [];
        $scope.trackN = [];
        $scope.trackname = 'laguna seca';

        var getTrack = function (trackId) {
            if (trackId !== undefined && trackId !== null) {
                $http.get('/tracks/' + trackId)
                    .success(function (data) {
                        console.log('Got a track: ' + data);
                        return data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                        return null;
                    });
            }
        };

        var getUsersFromManifests = function (manifests) {
            if (manifests !== undefined && manifests !== null) {
                $http.get('/manifests/' + eventId)
                    .success(function (data) {

                        return data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                        return null;
                    });
            }
        };

        $http.get('/events/1')
            .success(function (data) {
                $scope.eventD = data[0].eventDesc;
                $scope.track = getTrack(data[0].trackID);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        $http.get('/events')
            .success(function (data) {
                $scope.events = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        $http.get('/manifests/')
            .success(function (data) {
                $scope.manifest = data;
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
        $scope.oneAtATime = true;
        $scope.groups = [
            {
                title: 'advanced',
                content: 'wewrwer',
                expanded: true
            },
            {
                title: 'intermediate',
                content: 'werwe',
                expanded: false
            },
            {
                title: 'novice',
                content: 'wer',
                expanded: false
            }
        ];

    }

]);
