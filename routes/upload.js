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

	function persistForEach(req, res, next, index){
		if(index === _itens.length){
			_itens = [];
			res.send({ error: false, message: 'Upload: success.', data: upload });
		}else{
			_itens[index].save(function(err, _upload) {
				persistForEach(req, res, next, index + 1);
			});
		}
	};

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

		   	converter.fromFile(upload.path, function(err, result){

			 		result.forEach(function(item, key){
			 			var date = item.date;
			 			delete item.date;
			 			for(var prop in item){
			 				object_collect = new Collect();
				 			object_collect.type = 1;
				 			object_collect.value = item[prop];
				 			object_collect.sensor = object_sensors[prop]._id;
				 			object_collect.upload = upload._id;
				 			object_collect.greenhouse = upload.greenhouse;
				 			object_collect.created_at = new Date(date);
				 			_itens.push(object_collect);
			 			}
			 		});

			 		persistForEach(req, res, next, 0);

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