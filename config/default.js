const pkg = require('../package.json');
const messages = require('./messages.json');
// ports.
const DEV_SERVER_PORT   = 3000;
const APP_SERVER_PORT   = 7101;

const cspSelf = `'self'`;
const isProduction = process.env.NODE_ENV === 'production';

const contentSecurityPolicy = {
  defaultSrc: [cspSelf],

  scriptSrc: [
      cspSelf,
      'https://*.firebaseio.com'
    ]
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .concat(!isProduction && '\'unsafe-eval\'')
    .filter(Boolean),

  connectSrc: [
      cspSelf,
      'https://*.googleapis.com',
      'wss://*.firebaseio.com'
    ]
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .concat(!isProduction && `ws://localhost:${DEV_SERVER_PORT}`)
    .filter(Boolean),

  styleSrc: [
      cspSelf,
      'https://fonts.googleapis.com',
    ]
    .concat(!isProduction && 'blob:')
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .filter(Boolean),

  fontSrc: [cspSelf, 'https://fonts.gstatic.com/']
    .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
    .filter(Boolean),

  mediaSrc: [cspSelf],

  imgSrc: [
    cspSelf,
    '*.amazonaws.com'
  ]
  .concat(!isProduction && `http://localhost:${DEV_SERVER_PORT}`)
  .filter(Boolean)
};


const server = {
  name: pkg.name,
  version: pkg.version,
  port: APP_SERVER_PORT
};

const devServer = {
  name: pkg.name,
  version: pkg.version,
  port: DEV_SERVER_PORT
};

const firebase = {
  config: {
    apiKey: "AIzaSyBOEI_MFZMKyDfwGq4GRqd77drW0f54jkM",
    authDomain: "state2app.firebaseapp.com",
    databaseURL: "https://state2app.firebaseio.com",
    storageBucket: "state2app.appspot.com",
    messagingSenderId: "1079630100"
  }
};

const fonts = [
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
]

module.exports = {
  contentSecurityPolicy,
  server,
  devServer,
  messages,
  firebase,
  fonts
}
