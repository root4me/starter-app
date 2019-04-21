var restify = require('restify');
var log = require('./log');
var glob = require('glob');
var authenticator = require('./authenticator');

var init = function (server, config) {
  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.gzipResponse());
  server.pre(restify.pre.sanitizePath());
  server.use(
    function crossOrigin(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      return next();
    }
  );

  /*jslint unparam:true*/
  // Default error handler. Personalize according to your needs.
  server.on('uncaughtException', function (req, res, route, err) {
    log.info('******* Begin Error *******\n%s\n*******\n%s\n******* End Error *******', route, err.stack);
    if (!res.headersSent) {
      return res.send(500, {
        ok: false
      });
    }
    res.write('\n');
    res.end();
  });

  var routes = glob.sync(config.root + '/routes/*.js');
  routes.forEach(function (route) {
    require(route)(server, authenticator);
  });

  /*
    server.get('/', function(req, res, next) {
      res.send(config.app.name);
      return next();
    });
  */

};

module.exports = init;
