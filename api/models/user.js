var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: { type: String, trim: true, required: true, index: { unique: true } },
  password: { type: String, trim: true, required: true },
  name: {
    firstName: { type: String, trim: true, required: false },
    lastName: { type: String, trim: true, required: false }
  }
});

UserSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  user.password = bcrypt.hashSync(this.password, 10);

  next();
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  return callback(null, bcrypt.compareSync(candidatePassword, this.password));
};

module.exports = mongoose.model("User", UserSchema);
