'use strict';

angular.module('mean.tracks').factory('Tracks', ['$resource',
    function($resource) {
        return $resource ('tracks/:trackId',{
            trackId : '@_id'
        },{
            update: {
                method: 'PUT'
            }
        });
    }
]);