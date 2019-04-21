/**
 * Create user 
 * TODO need to let this gather input from command line
 */

require('../models/user')
const mongoose = require('mongoose'),
    config = require('../config/config'),
    userService = require('../services/user');

mongoose.connect(config.dburl(), { useNewUrlParser: true, useCreateIndex: true })
    .then((mongo) => {
        userService.createUser("admin", "root4me", "root4me", "xyz", function (err, u) {
            if (err) console.log(err);
            if (!err) { console.log("User admin created"); }
            mongo.connection.close();
        });
    })
    .catch((err) => { console.log(err); });

