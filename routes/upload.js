'use strict';

var express = require('express'),
		router = express.Router(),
		Upload = require('../models/upload'),
		UserGreenHouse = require('../models/usergreenhouse'),
		Sensor = require('../models/sensor'),
		Collect = require('../models/collect'),
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
		}).populate('greenhouse').exec(function(err, data) {
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
		  upload.status = 1;
		  upload.created_at = new Date();
	    upload.save(function(err, data) {
			  if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
			  res.send({ error: false, message: 'Upload: success.', data: data });
			});
  });
});

router.post('/process/:upload', function(req, res, next){
	var converter_csv = require("csvtojson").Converter,
			converter = new converter_csv({
				noheader: true,
				headers: ['val']
			});
  Upload.findById(req.param('upload')).exec(function(err, upload) {
	  upload.status = 2;
    upload.save(function(err, data) {
    	if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
  		res.send({ error: false, message: 'Upload: success.', data: data });

  		var object_sensors = {},
  				object_collect = {};

  		Sensor.find().exec(function(err, sensors) {

				sensors.forEach(function(item){
					object_sensors[item.name] = {};
					object_sensors[item.name].description = item.description;
					object_sensors[item.name]._id = item._id;
				});

		   	converter.fromFile(upload.path, function(err, result){

		   		var _key = 0,
		   				_value = 1,
		   				_date = 2;

			 		result.forEach(function(item){
			 			object_collect = new Collect();
			 			object_collect.type = 1;
			 			object_collect.value = item.val.split(';')[_value];
			 			object_collect.sensor = object_sensors[item.val.split(';')[_key]]._id;
			 			object_collect.upload = upload._id;
			 			object_collect.created_at = new Date();
			 			object_collect.save();
			 		});

			 		 upload.status = 3;
			 		 upload.save();

				});
		  });

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
			Collect.remove({ upload: req.param('id') }).exec();
		  res.send({ error: false, message: 'Upload: success.', data: data });
	  });
	});
});

module.exports = router;