var restify = require('restify');
var config = require('./config/config');
var glob = require('glob');
var log = require('./services/log');
var mongoose = require('mongoose');

mongoose.connect(config.dburl(), { useNewUrlParser: true, useCreateIndex: true });
var db = mongoose.connection;

db.on('connected', function () {
  log.info('Default database connection open to %s', config.dburl());
});

db.on('error', function () {
  log.error('Unable to connect to database at ' + config.dburl());
  throw new Error('unable to connect to database at ' + config.dburl());
});

process.on('SIGINT', function () {
  db.close(function () {
    log.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

var models = glob.sync(config.root + '/models/*.js');
models.forEach(function (model) {
  require(model);
});

var server = restify.createServer({
  name: config.app.name,
  log: log
});

module.exports = require('./services/restify')(server, config);

server.listen(config.app.port, function () {
  log.info('Application %s listening at %s:%s', config.app.name, config.app.address, config.app.port);
});

module.exports = server; // Used in mocha tests