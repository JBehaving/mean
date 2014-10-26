'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
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

            describe('Method Save', function() {
              it('should be able to save without problems', function(done) {
                return announcement.save(function(err) {
                  should.not.exist(err);
                  announcement.newsTitle.should.equal('Announcement Title');
                  announcement.newsBody.should.equal('Announcement Content');
                  announcement.user.should.not.have.length(0);
                  announcement.created.should.not.have.length(0);
                  done();
                });
              });

              it('should be able to show an error when try to save without title', function(done) {
                announcement.newsTitle = '';

                return announcement.save(function(err) {
                  should.exist(err);
                  done();
                });
              });

              it('should be able to show an error when try to save without content', function(done) {
                announcement.newsBody = '';

                return announcement.save(function(err) {
                  should.exist(err);
                  done();
                });
              });

              it('should be able to show an error when try to save without user', function(done) {
                announcement.user = {};

                return announcement.save(function(err) {
                  should.exist(err);
                  done();
                });
              });

            });

            afterEach(function(done) {
              announcement.remove();
              user.remove();
              done();
            });
        });
});