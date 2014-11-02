/**
 * Created by Cody on 10/31/2014.
 */
'use strict';
angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Question 1?',
            content: 'This is the answer to question 1',
            expanded: false
        },
        {
            title: 'Question 2?',
            content: 'This is the answer to question 2',
            expanded: false
        },
        {
            title: 'Question 3?',
            content: 'This is the answer to question 3',
            expanded: false
        },
        {
            title: 'Question 4?',
            content: 'This is the answer to question 4',
            expanded: false
        }
    ];

    $scope.removeGroup = function(group) {
        var index = this.groups.indexOf(group);
        if ( index !== -1 ) {
            this.groups.splice(index, 1);
        }
    };

    $scope.addGroup = function() {
        var group = {
            title: $scope.newQuestion,
            content: $scope.newAnswer,
            expanded: false
        };
        $scope.groups.push(group);
        $scope.newQuestion = '';
        $scope.newAnswer = '';
    };
});