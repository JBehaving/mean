'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

/**
 * Generic require Admin routing middleware
 * Basic Role checking - future release with full permission system
 */
exports.requiresAdmin = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('Admin')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresMember = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('Member')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresEmployee = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('Standard Employee')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresEventManager = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('Event Manager')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresAccountManager = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('Account Manager')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresOwner = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('Owner')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};