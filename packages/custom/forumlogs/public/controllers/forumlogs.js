'use strict';

angular.module('mean.forumlogs').controller('ForumlogController', ['$scope', 'Global', 'Forumlogs',
  function($scope, Global, Forumlogs) {
    //var _ = require('lodash');
    $scope.global = Global;
    $scope.package = {
      name: 'forumlogs'
    };

      $scope.logs = [
          {
              comment: 'Cassi asked questions and showed interest. John stevens seems like.',
              dateentered: '12/12/14',
              forumlink: 'http://vwvortex.com/g5xZTz35k',
              username: 'Cody Lanier'
          },
          {
              comment: 'Initial Post',
              dateentered: '12/12/14',
              forumlink: 'http://vwvortex.com/g5xZTz35k',
              username: 'Juan'
          },
          {
              comment: 'John says he will go. Posted more links.',
              dateentered: '12/12/14',
              forumlink: 'http://nasoic.com',
              username: 'asdfsdfasdfasdf'
          }


      ];
      //$scope.links = _.groupBy(logs, 'forumlink');
      $scope.logGroups = [
          {
              content: [{'page':'events/views/parts/advanced.html'}],
              expanded: true
          },
          {
              content: [{'page':'events/views/parts/intermediate.html'}],
              expanded: false
          },
          {
              content: [{'page': 'events/views/parts/novice.html'}],
              expanded: false
          }
      ];
  }
]);
