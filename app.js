'use strict';

var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    route_grower = require('./routes/grower'),
    route_upload = require('./routes/upload'),
    route_greenhouse = require('./routes/greenhouse'),
    route_user = require('./routes/user'),
    route_usergreenhouse = require('./routes/usergreenhouse'),
    route_sensor = require('./routes/sensor'),
    route_collect = require('./routes/collect'),
    route_index = require('./routes/index'),
    googleDrive = require('./credentials/google'),
    passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    db_passport = require('./config/passport'),
    init = require('./config/init'),
    crontab = require('node-crontab');

var app = express(),
    db = mongoose.connection;

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
    db_passport.findByUsername(username, function(err, user) {
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
  db_passport.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '/')));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'sensul-uploader', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
  res.sendfile(__dirname + '/views/index.html');
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

app.use('/', require('connect-ensure-login').ensureLoggedIn(), route_index);
app.use('/grower', require('connect-ensure-login').ensureLoggedIn(), route_grower);
app.use('/greenhouse', require('connect-ensure-login').ensureLoggedIn(), route_greenhouse);
app.use('/upload', require('connect-ensure-login').ensureLoggedIn(), route_upload);
app.use('/user', require('connect-ensure-login').ensureLoggedIn(), route_user);
app.use('/usergreenhouse', require('connect-ensure-login').ensureLoggedIn(), route_usergreenhouse);
app.use('/sensor', require('connect-ensure-login').ensureLoggedIn(), route_sensor);
app.use('/collect', require('connect-ensure-login').ensureLoggedIn(), route_collect);

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

init.initialize();

module.exports = app;