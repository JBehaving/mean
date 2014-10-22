'use strict';

module.exports = {
    //db: 'mongodb://dev:dev@ds035750.mongolab.com:35750/gtddev',
    db: 'mongodb://localhost:27017',
    mongoose: {
        debug: true
    },
  app: {
    name: 'MEAN - FullStack JS - Development'
  },
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  },
  paypal: {
      'mode' : 'sandbox',
      'client_id' : 'ARblYBAFKYEnLKmBkrnMGlhX70gpNwIBX0GtbBXC5fVeiAWHC9c4tVeXn23K',
      'client_secret' : 'EDvGjhBwlIbHFDwhy8S7bz04r-l6krTyxtf0O2xtovBH4sb1DkSgOuUA_X06',
      'return_url' : 'http://localhost:3000/events/completeRegistration',
      'cancel_url' : 'http://localhost:3000/events/cancelRegistration'
  }
};
