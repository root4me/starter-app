const mongoose = require('mongoose'),
    User = mongoose.model('User');

function findUser(userName, callback) {
    User.findOne({ username: userName }, function (err, user) {
        if (err) throw err;
        
        var u = {
            "_id": user._id,
            username: user.username,
            lastName: user.lastName
        }
        delete user.password;
        callback(err,u);
    });
}

function validatePassword(userName, inputPassword, callback) {
    User.findOne({ username: userName }, function (err, user) {
        if (err) throw err;
        user.comparePassword(inputPassword, function (err, isMatch) {
            callback(err,isMatch);
        });
    });

}

function createUser(userName, password, firstNamr, lastName,callback ) {
    const u = {
        username: userName,
        password: password,
    };

    User.create(u, function (err, user) {
        callback(err,user)
    });
}

module.exports.findUser = findUser;
module.exports.createUser = createUser;
module.exports.validatePassword = validatePassword;