/**
 * Created by Cody on 10/31/2014.
 */
'use strict';
angular.module('mean.system').controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'What is a Track Day?',
            content: 'A Track Day also known as a High Performance Driving Event (HPDE) is an event put on by an ' +
            'organizer (such as us) at different race tracks throughout the country. The event organizer recruits ' +
            'drivers for the event who will spend time on a race track with their own personal vehicles. Drivers are ' +
            'separated into groups based on experience and 25 to 35 cars are allowed onto the racetrack at one time. ' +
            'There is absolutely no racing at the event.',
            expanded: false
        },
        {
            title: 'What kind of car can attend a Track Day?',
            content: 'Any car in good working mechanical condition will function well on the track. Everything from ' +
            'stock Honda Civics and Subaru Imprezas, to fully modified track only vehicles are allowed. For novice ' +
            'drivers we always recommend as close to stock vehicles to learn on and feel that brake and tire upgrades ' +
            'are the most vital before any horsepower or suspension upgrades are done to the vehicle.',
            expanded: false
        },
        {
            title: 'Will my car insurance cover track day accidents?',
            content: 'The answer is generally no. Read your policy and check with your insurance provider if necessary. ' +
            'You can look into track day insurance by companies who are specifically tailored to insurance cars on the ' +
            'race tracks.',
            expanded: false
        },
        {
            title: 'Are passengers allowed to ride in my vehicle?',
            content: 'Passengers are allowed, but it is not recommended for novice drivers (unless that passenger is ' +
            'advanced driver who is coaching or mentoring you).',
            expanded: false
        },
        {
            title: 'Can I ride as a passenger in other vehicles?',
            content: 'Many intermediate and advanced drivers will allow passengers in their vehicles, but it is at the ' +
            'option of those drivers. If you would like to ride as a passenger, talk to some of the more advanced drivers ' +
            'and feel free to ask them. Also ask the organizer if he knows anybody who is willing to allow a ride along ' +
            'and he can help you find somebody. It is very helpful to ride with more experienced drivers because you can ' +
            'learn the correct line, get pointers, and a better understanding of driving on the race track. In the future ' +
            'Got Track Days, Inc. will put something in place on the website to help facilitate this experience.',
            expanded: false
        },
        {
            title: 'Do you provide instructors at the event?',
            content: 'We do not provide instructors at our events. But please see our FAQ questions about passengers. ' +
            'Please realize that instructors with the majority of Track Day organizers are not free, usually there is a ' +
            'fee or prices are increased overall to cover the instructor’s time. If you are looking for one on one ' +
            'instruction, we can help direct you to Track Day organizers who excel in that instruction. We find there is ' +
            'a lot of value in instructors, but there is also a lot of value in seat time. We are not setup with ' +
            'instructors. As such I want you to have the best experience with an organizer that fits your needs (In the ' +
            'future we hope to be able to handle all your track needs, but unfortunately right now we are unable to). If ' +
            'you need more seat time, that is what we do best! Learn the basics with another organizer, comes to us to ' +
            'get lots of seat time, and then go back to the other organizer as you start to plateau on your technique. ' +
            'We understand and hope that in the future we can also meet your instructor needs!',
            expanded: false
        },
        {
            title: 'How do you handle cancellations and refunds?',
            content: 'Cancellations and refunds are handled manually. Attendance can be cancelled up to 2 weeks before ' +
            'the event, but there will be a $49 cancellation fee. No cancellations will be given with less than two ' +
            'weeks to go unless the event is sold out and we find somebody to replace your spot in the event (there will ' +
            'still be a $49 cancellation fee).',
            expanded: false
        },
        {
            title: 'Are helmets required?',
            content: 'Yes helmets are required and you must bring your own (We will work on having a few spare helmets ' +
            'in the future for first time novice drivers, but it is best to bring your own because we will not have very ' +
            'many). It is recommended that you have at least a SA2005 rating helmet. The newer the better.',
            expanded: false
        },
        {
            title: 'Are their vehicle sound restrictions?',
            content: 'Yes there are different vehicle sound restrictions based on the day and the track. When signing up ' +
            'for an event, it will be specified what the max db is for the event. One of the most restrictive sound ' +
            'restrictions are at Laguna Seca Raceway. Please make note that even some intakes may be too loud for their ' +
            'sound restriction.',
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