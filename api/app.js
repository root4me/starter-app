var restify = require('restify');
var config = require('./config/config');
var glob = require('glob');
var mongoose = require('mongoose');
var log = require('./config/log');

mongoose.connect(config.dburl());
var db = mongoose.connection;
db.on('error', function() {
  log.error('Unable to connect to database at ' + config.dburl());
  throw new Error('unable to connect to database at ' + config.dburl());
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function(model) {
  require(model);
});

var server = restify.createServer({
  name: config.app.name,
  log: log
});

module.exports = require('./config/restify')(server, config);

server.listen(config.app.port, function() {
  log.info('Application %s listening at %s:%s', config.app.name, config.app.address, config.app.port);
});
