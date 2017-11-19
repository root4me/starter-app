'use strict';

var bunyan = require('bunyan');

var config = require('./config');

var log = bunyan.createLogger({
  name: config.log.name,
  level: config.log.level,
  stream: process.stdout,
  serializers: bunyan.stdSerializers
});

module.exports = log;
