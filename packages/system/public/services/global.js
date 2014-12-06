'use strict';

//Global service for global variables
angular.module('mean.system').factory('Global', [

  function() {
    var _this = this;
    _this._data = {
      user: window.user,
      authenticated: false,
      isAdmin: false,
      isAccountManager: false,
      isEventManager: false,
      isOwner: false,
      isMember: false,
      hasRole: false
    };
    if (window.user && window.user.roles) {
      _this._data.authenticated = window.user.roles.length;
      _this._data.isAdmin = window.user.roles.indexOf('Admin') !== -1;
      _this._data.isAccountManager = window.user.roles.indexOf('Account Manager') !== -1;
      _this._data.isAccountant = window.user.roles.indexOf('Accountant') !== -1;
      _this._data.isEventManager = window.user.roles.indexOf('Event Manager') !== -1;
      _this._data.isOwner = window.user.roles.indexOf('Owner') !== -1;
      _this._data.isMember = window.user.roles.indexOf('Member') !== -1;
     // _this._data.hasRole = window.user.roles.indexOf(r) !== -1;
    }
    return _this._data;
  }
]);
