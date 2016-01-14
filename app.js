'use strict';

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    route_grower = require('./routes/grower');

var app = express(),
    db = mongoose.connection,
    upload = multer({
      storage: multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          callback(null, file.fieldname + '-' + Date.now());
       }
      })
    }).single('filecsv');

// Database
mongoose.connect('mongodb://localhost/sensul');

// Database - Log
db.on('error', function(){
  console.log('Database: error.');
}).once('open', function() {
  console.log('Database: success.');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', true);

// Routes - All
app.use('/grower', route_grower);

// Routes - Pages
app.get('/', function(req, res, next) {
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/partials/:file', function(req, res, next) {
  res.sendfile(__dirname + '/views/partials/' + req.param('file'));
});

// Upload
app.post('/upload', function(req,res){
  upload(req, res,function(err) {
    console.log(err);
    if(err) {
      return res.send({ error: true, message: "Error uploading file." });
    }
    res.send({ error: false, message: "File is uploaded" });
  });
});

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

module.exports = app;