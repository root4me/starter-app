/**
 * Authenticator
 *
 */

var jwt = require('jsonwebtoken');
var log = require('./log');

// TODO move these to config
var tokenSecret = "long winding road";
var tokenExpiresIn = 60;

/**
 * Looks up token from incoming request. Confirm validty of the token
 */
var isAuthenticated = function(req, res, next) {

  var token = req.headers['x-access-token'];
  log.debug("token : " + token);

  if (token) {
    jwt.verify(token, tokenSecret, function(err, decoded) {
      if (err) {
        log.debug(err.message);
        return res.json(401, {
          authenticated: false,
          errorCode: 401,
          message: 'Invalid token'
        });
      } else {
        // if everything is good with token, set it to request
        req.token = token;
        req.decoded = decoded;
        log.debug(decoded);
        return next();
      }
    });
  } else {
    log.debug("No Token Provided");
    return res.json(401, {
      authenticated: false,
      errorCode: 401,
      message: 'No Authentication token found'
    });
  }
};


/**
 * Authenticate user and generate token
 */

var authenticate = function(req, res, next) {

  var user = req.body.user;
  var pwd = req.body.pwd;

  //TODO convert this to db lookup
  if (user == "admin" && pwd == "password") {
    var token = jwt.sign({ user: user }, tokenSecret, { expiresIn: tokenExpiresIn });
    req.token = token;
    return next();

  } else {
    return res.json(401, {
      authenticated: false,
      errorCode: 401,
      message: 'Incorrect user name or password'
    });
  }
};

module.exports.isAuthenticated = isAuthenticated;
module.exports.authenticate = authenticate;
