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

        $http.get('/events')
            .success(function (data, status, header, config) {
                console.log('made it' + data);
                $scope.events = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

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
                spots: event.advancedCap,
                content: [
                    {'page': 'events/views/parts/advanced.html'}
                ],
                expanded: true
            },
            {
                title: 'intermediate',
                spots: event.intermediateCap,
                content: [
                    {'page': 'events/views/parts/intermediate.html'}
                ],
                expanded: false
            },
            {
                title: 'novice',
                spots: event.noviceCap,
                content: [
                    {'page': 'events/views/parts/novice.html'}
                ],
                expanded: false
            }
        ];

    }
]).filter('filterAdv', function() {
    return function (items) {
        var adv = [];

        angular.forEach(items, function (item) {
            if (item.skillClass === 'advanced') {
                adv.push(item);
            }
        });

        return adv;
    };
}).filter('filterInt', function() {
    return function (items) {
        var int = [];

        angular.forEach(items, function (item) {
            if (item.skillClass === 'intermediate') {
                int.push(item);
            }
        });

        return int;
    };
}).filter('filterNov', function() {
    return function (items) {
        var nov = [];

        angular.forEach(items, function (item) {
            if (item.skillClass === 'novice') {
                nov.push(item);
            }
        });

        return nov;
    };
});

