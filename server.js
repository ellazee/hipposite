var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var ejsLayouts = require("express-ejs-layouts");
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/hipposite');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api + json'}));
app.use(methodOverride());
app.use(ejsLayouts);

app.set("view engine", "ejs");


var User = require('./models/user');
var Shift = require('./models/shift');

// User.create({ name: "ella", email: "ellazerickson@gmail.com"}, function(err, user) {
// 	if(err) return console.log(err);
// 	console.log(user);
// })

app.use('/', require('./controllers/users.js'));









app.listen(8000);
console.log("listening to port 8000");
