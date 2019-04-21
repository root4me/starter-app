'use strict';

module.exports = function (server, authenticator) {

  server.get({ path: '/', version: ['1.0.0'] }, function (req, res, next) {
    //console.log(req.params.id);
    res.json(200, {
      id: req.params.id,
      status: 'alive'
    });
    return next();
  });

  server.get({ path: '/protected', version: ['1.0.0'] }, authenticator.isAuthenticated, function (req, res, next) {
    res.json(200, {
      status: 'protected content'
    });
    return next();
  });

  server.post({ path: '/', version: ['1.0.0'] }, function (req, res, next) {
    /*
    for (let i = 0; i < 10000; i++) {
      console.log(i)
    }
    */

    res.json(200, {
      id: req.body.id,
      status: 'posted'
    });
    return next();
  });

}
