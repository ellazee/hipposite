var mongoose = require('mongoose');

var shiftSchema = new mongoose.Schema({
	eventName: String,
	day: Date,
	time: String,
	userName: String
})

var Shift = mongoose.model('Shift', shiftSchema);



module.exports = Shift;