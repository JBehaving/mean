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
  if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresMember = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('member')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresEmployee = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('employee')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresEventManager = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('eventManager')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresAccountManager = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('accountManager')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

exports.requiresOwner = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('owner')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};