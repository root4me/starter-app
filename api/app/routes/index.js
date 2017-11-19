'use strict';

module.exports = function(server, authenticator) {

  server.get({ path: '/', version: ['1.0.0'] }, function(req, res, next) {
    res.json(200, {
      status: 'alive'
    });
    return next();
  });


  server.get({ path: '/protected', version: ['1.0.0'] }, authenticator.isAuthenticated, function(req, res, next) {
    res.json(200, {
      status: 'protected content'
    });
    return next();
  });

}
