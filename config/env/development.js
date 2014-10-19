'use strict';

module.exports = {
  db: 'mongodb://localhost/mean-dev',
  mongoose: {
    debug: true
  },
  app: {
    name: 'MEAN - FullStack JS - Development'
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
  }
};
