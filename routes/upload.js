'use strict';

var express = require('express'),
		router = express.Router(),
		Upload = require('../models/upload'),
		UserGreenHouse = require('../models/usergreenhouse'),
		Sensor = require('../models/sensor'),
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
    }).single('filecsv'),
    solr_client = require('../config/solr');

router.get('/', function(req, res, next) {
	UserGreenHouse.find({
		user: req.user._id
	}, 'greenhouse').exec(function(err, usergreenhouse) {
		var search = [{ 'greenhouse': '00a0aaaaaaa00aaa000a00aa' }];
		usergreenhouse.forEach(function(item){
			search.push({ 'greenhouse': item.greenhouse });
		});
    Upload.find({
			$or: search
		}).populate('greenhouse').populate({
	    path: 'greenhouse',
	    populate: { path: 'grower',
	    model: 'Grower' }
	  }).sort('-created_at').exec(function(err, data) {
	    if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
	  	res.send({ error: false, message: 'Upload: success.', data: data });
	  });
  });
});

router.post('/', function(req, res, next){

	var _itens = [];

  upload(req, res, function(err, data) {
    if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
		var upload = new Upload();
	  upload.name = req.file.originalname;
	  upload.greenhouse = req.body.greenhouse;
	  upload.path = req.file.path;
	  upload.backup = false;
	  upload.status = 2;
	  upload.created_at = new Date();
    upload.save(function(err, upload) {
		  if (err) throw console.log({ error: true, message: 'Upload: error.', data: err });
		  var converter_csv = require("csvtojson").Converter,
					converter = new converter_csv({
						noheader: false,
						delimiter: ';'
					});

  		var object_sensors = {},
  				object_collect = {};

  		Sensor.find().exec(function(err, sensors) {

				sensors.forEach(function(item){
					object_sensors[item.name] = {};
					object_sensors[item.name].description = item.description;
					object_sensors[item.name]._id = item._id;
				});

				Upload.populate(upload, { path: "greenhouse" }, function(err, upload) {
					converter.fromFile(upload.path, function(err, result){
				 		result.forEach(function(item, key){
				 			var date = item.date;
				 			delete item.date;
				 			for(var prop in item){
				 				object_collect = {};
					 			object_collect.collectValue = item[prop];
					 			object_collect.sensorName = object_sensors[prop].description;
					 			object_collect.sensorId = object_sensors[prop]._id;
					 			object_collect.uploadId = upload._id;
					 			object_collect.greenhouseName = upload.greenhouse.name;
					 			object_collect.greenhouseId = upload.greenhouse._id;
					 			object_collect.created = new Date(date);
					 			_itens.push(object_collect);
				 			}
				 		});
				 		solr_client.add(_itens,function(err,obj){
						  if (err) throw console.log({ error: true, message: 'Solr: error.', data: err });
						  solr_client.commit();
						  upload.status = 3;
						 	upload.save();
						  res.send({ error: false, message: 'Upload: success.', data: upload });
						});
					});
				})
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
		  res.send({ error: false, message: 'Upload: success.', data: data });
	  });
	});
});

module.exports = router;