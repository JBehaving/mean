'use strict';

angular.module('mean.users').factory('Accounts', ['$resource',
    function($resource) {
        return $resource ('accounts/:userId',{
            userId : '@_id'
        },{
            update: {
                method: 'PUT'
            }
        });
    }
]);