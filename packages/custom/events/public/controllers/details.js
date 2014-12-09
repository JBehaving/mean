'use strict';

angular.module('mean.events').controller('EventDetailsController', ['$scope', '$rootScope', '$stateParams', '$location', '$http', 'Global', 'Events', 'Garage',
    function($scope, $rootScope, $stateParams, $location, $http, Global, Events, Garage) {
        $scope.global = Global;
        $scope.vehicles = [];

        $scope.updateEvent = function() {
            $location.url('/events/details/'+$stateParams.eventId);
        };

        //-- set up rootscope for this controller
        $scope.global = {
            authenticated: !! Global.user,
            isEventManager: !! Global.user,
            user: Global.user
        };
        var thisEventId = $stateParams.eventId;

        Events.get({
            eventId: $stateParams.eventId
        }, function (event) {
            $scope.event = event;
            console.log($scope.event);
            $scope.groups = [
                {
                    title: 'advanced',
                    spots: $scope.event.advancedCap - $scope.event.advancedRegistered,
                    content: [
                        {'page': 'events/views/parts/advanced.html'}
                    ],
                    expanded: true
                },
                {
                    title: 'intermediate',
                    spots: $scope.event.intermediateCap - $scope.event.intermediateRegistered,
                    content: [
                        {'page': 'events/views/parts/intermediate.html'}
                    ],
                    expanded: false
                },
                {
                    title: 'novice',
                    spots: $scope.event.noviceCap - $scope.event.noviceRegistered,
                    content: [
                        {'page': 'events/views/parts/novice.html'}
                    ],
                    expanded: false
                }
            ];
        });

        /*$http.get('/events')
            .success(function (data, status, header, config) {
                console.log('made it' + data);
                $scope.events = data;

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });*/

        $http.get('/attendees?'+'eventId=' + thisEventId)
            .success(function (data) {
                console.log('Got data: ' + data);
                $scope.attendees = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


       Garage.query( function (vehicles) {
            $scope.vehicles = vehicles;
       });




            /*  $scope.attendees = [
                  {
                      "skill": "advanced",
                      "name": "Jake Speed",
                      "vehicle": "2012 Ford Mustang",
                      "allows": true,
                      "wants": false,
                      "checkedin": false
                  },
                  {
                      "skill": "novice",
                      "name": "Allie Khat",
                      "vehicle": "2001 Mitsubishi Lancer",
                      "allows": false,
                      "wants": true,
                      "checkedin": true
                  },
                  {
                      "skill": "intermediate",
                      "name": "Allan Fedreich",
                      "vehicle": "2015 Hyundai Elantra",
                      "allows": false,
                      "wants": false,
                      "checkedin": true
                  }
              ];*/


        /*$scope.getTrack = function (trackId) {
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
        };*/

        /*var getUsersFromManifests = function (manifest) {
            if (manifest !== undefined && manifest !== null) {
                $http.get('/manifests/' + eventId)
                    .success(function (data) {
                        return data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                        return null;
                    });
            }
        };*/



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


    }
]);

