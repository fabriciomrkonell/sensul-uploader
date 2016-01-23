'use strict';

var express = require('express'),
		router = express.Router(),
		Upload = require('../models/upload'),
		UserGreenHouse = require('../models/usergreenhouse'),
		fs = require('fs'),
		multer = require('multer'),
		upload = multer({
      storage: multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname);
       }
      })
    }).single('filecsv');

router.get('/', function(req, res, next) {
	UserGreenHouse.find({
		user: req.user._id
	}, 'greenhouse').exec(function(err, usergreenhouse) {
		var search = [];
		usergreenhouse.forEach(function(item){
			search.push({ 'greenhouse': item.greenhouse });
		});
    Upload.find({
			$or: search
		}).exec(function(err, data) {
	    if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
	  	res.send({ error: false, message: 'Upload: success.', data: data });
	  });
  });
});

router.post('/', function(req, res, next){
  upload(req, res, function(err, data) {
    if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
			var upload = new Upload();
		  upload.name = req.file.originalname;
		  upload.greenhouse = req.body.greenhouse;
		  upload.path = req.file.path;
		  upload.created_at = new Date();
	    upload.save(function(err, data) {
			  if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
			  res.send({ error: false, message: 'Upload: success.', data: data });
			});
  });
});

router.delete('/:id', function(req, res, next) {
	Upload.findById(req.param('id'), function(err, upload) {
		Upload.remove({
	  	_id: req.param('id')
	  }, function(err, data) {
	    if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
	    fs.unlinkSync('./' + upload.path);
		  res.send({ error: false, message: 'Upload: success.', data: data });
	  });
	});
});

module.exports = router;