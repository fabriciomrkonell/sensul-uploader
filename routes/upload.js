'use strict';

var express = require('express'),
		router = express.Router(),
		Upload = require('../models/upload'),
		googleDrive = require('../credentials/google'),
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

/*
googleDrive.search(function(auth){
	googleDrive.listAllFiles(auth, req, res, next);
});
*/

router.get('/', function(req, res, next) {
	Upload.find().populate('greenhouse').exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
  	res.send({ error: false, message: 'Upload: success.', data: data });
  });
});

router.post('/', function(req, res, next){
  upload(req, res, function(err, data) {
    if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
			var upload = new Upload();
		  upload.name = req.file.filename;
		  upload.greenhouse = req.body.greenhouse;
		  upload.path = req.file.path;
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