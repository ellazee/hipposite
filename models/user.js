var mongoose = require("mongoose");

//user schema
var userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, required: true, unique: true },
	userPhoto: String

});


userSchema.methods.sayHello = function() {
	return "Hi " + this.name + "! Safety third!";
};

var User = mongoose.model('User', userSchema);



module.exports = User;