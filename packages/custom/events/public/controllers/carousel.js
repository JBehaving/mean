'use strict';

angular.module('mean.events').controller('CarouselCtrl', ['$scope', '$animate',
    function ($scope, $animate){
        $animate.enabled(false);
        $scope.myInterval = 3000;
        $scope.slides = [
            {
                image: 'http://drewphillipsphotography.com/blog/wp-content/uploads/2012/05/alms-laguna-seca-2012.jpg'
            },
            {
                image: 'http://www.rfactorcentral.com/screenshots/lge/11-LagunaSeca-9759.jpg'
            },
            {
                image: 'http://lorempixel.com/400/200/sports'
            },
            {
                image: 'http://lorempixel.com/400/200/people'
            }
        ];
}]);
