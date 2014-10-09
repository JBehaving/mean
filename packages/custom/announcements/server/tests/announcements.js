'use strict';

/**
 * Module dependencies.
 */
var /*should = require('should'),*/
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Announcement = mongoose.model('Announcement');

/**
 * Globals
 */
var user;
var announcement;

/**
 * Test Suites
 */
describe('<Unit Test', function() {
    describe('Model Announcement:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                announcement = new Announcement({
                    newsTitle: 'Announcement Title',
                    newsBody: 'Announcement Content',
                    user: user
                });

            done();

            });

        });
    });
});