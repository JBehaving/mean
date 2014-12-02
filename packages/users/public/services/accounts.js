'use strict';

angular.module('mean.users').factory('Accounts', ['$resource',
    function($resource) {
        return $resource ('users/:userId',{
            userId : '@_id'
        },{
            update: {
                method: 'PUT'
            }
        });
    }
]);