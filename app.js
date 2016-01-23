'use strict';

var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    route_grower = require('./routes/grower'),
    route_upload = require('./routes/upload'),
    route_greenhouse = require('./routes/greenhouse'),
    googleDrive = require('./credentials/google'),
    passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    crontab = require('node-crontab');

var app = express(),
    db = mongoose.connection,
    db2 = require('./config');

// Database
mongoose.connect('mongodb://localhost/sensul');

// Database - Log
db.on('error', function(){
  console.log('Database: error.');
}).once('open', function() {
  console.log('Database: success.');
});

// Configuration Strategy Local
passport.use(new Strategy(
  function(username, password, cb) {
    db2.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

// Configuration Sessions
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db2.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '/')));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'sensul-uploader', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/partials/:file', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
  res.sendfile(__dirname + '/views/partials/' + req.param('file'));
});

app.get('/login', function(req, res){
  res.sendfile(__dirname + '/views/login.html');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

app.use('/grower', route_grower);
app.use('/greenhouse', route_greenhouse);
app.use('/upload', route_upload);

app.use(function(req, res, next) {
  var err = new Error('Não encontrado!');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

crontab.scheduleJob("*/60 * * * *", function(){
  googleDrive.search(function(auth){
   googleDrive.refresh(auth);
  });
});

module.exports = app;