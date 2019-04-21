require('../models/user')
const mongoose = require('mongoose'),
    config = require('../config/config'),
    userService = require('../services/user'),
    chai = require('chai'),
    expect = chai.expect;

mongoose.connect(config.dburl(), {
    useNewUrlParser: true
});
const db = mongoose.connection;

db.on('connected', function () {
    db.collections.users.drop();

    describe('User service', function () {
        it('Create User', (done) => {
            userService.createUser("admin", "password", "", "", function (err, u) {
                if (err) console.log(err);
                //if (!err) console.log(u);
                expect(u._id).to.be.not.null;
                done();
            });
        });
    });
});