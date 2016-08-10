var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
//user schema
var UserSchema = new mongoose.Schema({
	name: String,
	email: { type: String, required: true, unique: true },
	password: String
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      name: ret.name,
      email: ret.email,
      password: ret.password
    };
    return returnJson;
  }
});

UserSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});


var User = mongoose.model('User', UserSchema);



module.exports = User;