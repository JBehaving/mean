'use strict';

module.exports = {
    db: 'mongodb://dev:dev@ds035750.mongolab.com:35750/gtddev',
    //db: 'mongodb://localhost:27017',
    mongoose: {
        debug: true
    },
  app: {
    name: 'Got Track Days'
  },
  facebook: {
    clientID: '1496580357293604',
    clientSecret: 'ca87e378d5c185cfb7704312fe28b562',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  google: {
    clientID: '957775977393-vttaqnlmr5lhtfg4n6rppthbpq8udl6f.apps.googleusercontent.com',
    clientSecret: 'nXd2IA_lj4htKiq-Lr3j4JJO',
    callbackURL: 'http://localhost:3000/auth/google/callback'
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
      'return_url' : 'http://localhost:3000/events/register/complete',
      'cancel_url' : 'http://localhost:3000/events/register/cancel'
  }
};
