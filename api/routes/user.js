'use strict';

module.exports = function (server, authenticator) {

  var PATH = '/user';
  var User = require('../services/user');

  server.post({ path: PATH + '/login', version: ['1.0.0'] }, authenticator.authenticate, function (req, res, next) {
    if (req.token != undefined) {
      res.json(200, {
        authenticated: true,
        message: 'Authentication successful',
        token: req.token
      });
    } else {
      return res.json(401, {
        authenticated: false,
        errorCode: 401,
        message: 'Authentication failed'
      });
    }
  });

  server.get({ path: PATH + '/', version: ['1.0.0'] }, function (req, res, next) {
    User.findUser('admin', function (err, user) {
      if (!err) console.log(user);

      res.json(200, {
        user: user
      });
    });
  });

}