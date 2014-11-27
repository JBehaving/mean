'use strict';

angular.module('mean.events').controller('EventDetailsController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Events',
    function($scope, $stateParams, $location, $http, Global, Events) {
        $scope.global = Global;

        var thisEventId = $stateParams.eventId;


            Events.get({
                eventId: $stateParams.eventId
            }, function (event) {
                $scope.event = event;
                console.log($scope.event);
            });

     /*   $scope.find = function () {
            Events.query(function (events) {
                $scope.events = events;
            });
        }; */

        $http.get('/events')
            .success(function (data, status, header, config) {
                console.log('made it' + data);
                $scope.events = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });



        //  var eventStartDate = '12/12/14';
        //  var trackID = '1';


        //-- set up variables
        $scope.eventD = [];
        $scope.trackN = [];
        $scope.trackname = 'laguna seca';


            $http.get('/attendees?'+'eventId=' + thisEventId)
                .success(function (data) {
                    console.log('Got data: ' + data);
                    $scope.attendees = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
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


        $scope.getTrack = function (trackId) {
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
                content: [
                    {'page': 'events/views/parts/advanced.html'}
                ],
                expanded: true
            },
            {
                title: 'intermediate',
                content: [
                    {'page': 'events/views/parts/intermediate.html'}
                ],
                expanded: false
            },
            {
                title: 'novice',
                content: [
                    {'page': 'events/views/parts/novice.html'}
                ],
                expanded: false
            }
        ];

    }
]);
