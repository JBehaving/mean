/**
 * Created by Cody on 10/7/2014.
 */
'use strict';
angular.module('mean.users')
    .controller('SwitcherCtrl', function($scope) {
        $scope.active = true;
    })
    /*.directive('switcher', function() {
        return {
            link: function(scope, elem, attr){
                scope.active = true;
                scope.toggle = function(){
                    scope.active = !scope.active;
                };
            }
        };
    })*/
    .directive('foldToggle', function() {
        return {
            restrict: 'A',
            scope:{
                isOpen: '=foldToggle'
            },
            link: function(scope, element) {

                scope.$watch('isOpen', function(newVal,oldVal){
                    if(newVal !== oldVal){
                        element.toggle(200);
                    }
                });
            }
        };
    });