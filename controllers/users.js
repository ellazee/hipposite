var express = require('express');
var User = require('../models/user');
var router = express.Router();


// router.get("/", function (req,res) {
//   res.render("index.ejs");
// });
router.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);
      res.render('index.ejs', {users:users});
    });
  });


router.get('/signup', function(req, res) {
  res.render('signup.ejs');
});  
router.post('/signup', function(req, res) {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    if(err) return console.log(err);
    res.redirect('index');
  });  
});
 

router.route('/login')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);
      res.render('login.ejs', {users:users});
    });
  });

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  User.authenticated(email, password, function(err, user) {
    if (err) {
      req.flash('danger', 'Error:', err.message);
      res.redirect('/login');
    } else if (user) {
      req.session.userId = user.id;
      req.flash('success', 'You are logged in!');
      res.redirect('/');
    } else {
      req.flash('danger', 'Email and/or password invalid');
      res.redirect('/login');
    }
  });
});  

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});


module.exports = router;