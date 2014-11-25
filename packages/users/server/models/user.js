'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * Validations
 */
var validatePresenceOf = function(value) {
  // If you are authenticating by any of the oauth strategies, don't validate.
  return (this.provider && this.provider !== 'local') || (value && value.length);
};

var validateUniqueEmail = function(value, callback) {
  var User = mongoose.model('User');
  User.find({
    $and: [{
      email: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, user) {
    callback(err || user.length === 0);
  });
};

/**
 * User Schema
 */

var UserSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    validate: [validateUniqueEmail, 'E-mail address is already in-use']
  },
  roles: {
    type: Array,
    default: ['authenticated']
  },
  hashed_password: {
    type: String,
    validate: [validatePresenceOf, 'Password cannot be blank']
  },
  provider: {
    type: String,
    default: 'local'
  },
  salt: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {},
  
  
  //*******************************************
  //  GTD Account fields
  //  Note!: The requirements are all being set to false for testing purposes. Add neccessary requirements back in later!
  //*******************************************
  //Birthday wasn't in original schema
  birthday: { type: Date, required: false },
  city: { type: String, required: true },
  deletionFlag: { type: String, required: false },
  drivingLevel: { type: String, required: false },
  emergencyContactName: {  type: String, required: true },
  primaryEmergencyPhoneNumber: { type: String, required: true },
  primaryPhoneNumber: {  type: String, required: true },
  secondaryEmergencyPhoneNumber: {  type: String, required: false },
  secondaryPhoneNumber: { type: String, required: false },
  state: { type: String,  required: true },
  userCreatedDate: { type: Date, default: Date.now },
  streetAddress: { type: String, required: false },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  zip: { type: String, required: false }
  //*******************************************
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.hashPassword(password);
}).get(function() {
  return this._password;
});

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
  if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
    return next(new Error('Invalid password'));
  next();
});

/**
 * Methods
 */
UserSchema.methods = {

  /**
   * HasRole - check if the user has required role
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  hasRole: function(role) {
    var roles = this.roles;
    return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
  },

  /**
   * IsAdmin - check if the user is an administrator
   *
   * @return {Boolean}
   * @api public
   */
  isAdmin: function() {
    return this.roles.indexOf('admin') !== -1;
  },

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.hashPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Hash password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  hashPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },
  
  //************************************
  // GTD Methods
  //************************************
  
  isEventManager: function()  {
    return this.roles.indexOf('event manager') !== -1;
  },
  
  isAccountant: function()  {
    return this.roles.indexOf('accountant') !== -1;
  },
  
  isEmployee: function()  {
    return this.roles.indexOf('employee') !== -1;
  }
  
};

mongoose.model('User', UserSchema);
