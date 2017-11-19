'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/..');

var NODE_ENV = process.env.NODE_ENV || 'development';
var NODE_HOST = process.env.NODE_HOST || '127.0.0.1';
var NODE_PORT = process.env.NODE_PORT || 3000;
var MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';
var MONGO_PORT = process.env.MONGO_PORT || 27017;
var LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

var APP_NAME = 'starter-app';

var config = {
  development: {
    root: rootPath,
    app: {
      name: APP_NAME + '-' + NODE_ENV,
      address: NODE_HOST,
      port: NODE_PORT
    },
    db: {
      host: MONGO_HOST,
      port: MONGO_PORT,
      name: APP_NAME + '-' + NODE_ENV
    },
    log: {
      name: APP_NAME + '-' + NODE_ENV,
      level: LOG_LEVEL
    }
  },
  test: {
    root: rootPath,
    app: {
      name: APP_NAME + NODE_ENV,
      address: NODE_HOST,
      port: NODE_PORT
    },
    db: {
      host: MONGO_HOST,
      port: MONGO_PORT,
      name: APP_NAME + NODE_ENV
    },
    log: {
      name: APP_NAME + NODE_ENV,
      level: LOG_LEVEL
    }
  },
  production: {
    root: rootPath,
    app: {
      name: APP_NAME + NODE_ENV,
      address: NODE_HOST,
      port: NODE_PORT
    },
    db: {
      host: MONGO_HOST,
      port: MONGO_PORT,
      name: APP_NAME + '-' + NODE_ENV
    },
    log: {
      name: APP_NAME + NODE_ENV,
      level: LOG_LEVEL
    }
  }
};

var dbUrl = function() {
  return 'mongodb://'.concat(config[NODE_ENV].db.host, ':', config[NODE_ENV].db.port, '/', config[NODE_ENV].db.name)
};

module.exports = config[NODE_ENV];
module.exports.dburl = dbUrl;
