/**
 * Drop users collection
 */
const mongoose = require('mongoose'),
    config = require('../config/config');

mongoose.connect(config.dburl(), { useNewUrlParser: true, useCreateIndex: true })
    .then((mongo) => {
        mongo.connection.db.dropCollection('users')
            .then((success) => { console.log('Dropped collection users'); })
            .catch((err) => {
                if (err.code == 26) { console.error("Collection users do not exist"); }
                else { console.error(err.code); }
            })
            .then(() => { mongo.connection.close() })
    })
    .catch((err) => { console.error(err) })
