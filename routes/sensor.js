'use strict';

var express = require('express'),
		router = express.Router(),
		Collect = require('../models/collect'),
		Sensor = require('../models/sensor');

router.get('/', function(req, res, next) {
	Sensor.find(function(err, data) {
    if (err) throw console.log({ error: true, message: 'Sensor: error.', data: err });
  	res.send({ error: false, message: 'Sensor: success.', data: data });
  });
});

router.post('/', function(req, res, next) {
	Sensor.findById(req.body._id, function(err, sensor) {
		if(sensor === null){
			sensor = new Sensor();
			sensor.name = req.body.name;
			sensor.created_at = new Date;
		}
	  sensor.description = req.body.description;
	  sensor.updated_at = new Date();
    sensor.save(function(err, data) {
		  if (err) throw console.log({ error: true, message: 'Sensor: error.', data: err });
		  res.send({ error: false, message: 'Sensor: success.', data: data });
		});
	});
});

router.delete('/:id', function(req, res, next) {
	Sensor.remove({
  	_id: req.param('id')
  }, function(err, data) {
    if (err) throw console.log({ error: true, message: 'Sensor: error.', data: err });
    Collect.remove({ sensor: req.param('id') }).exec();
	  res.send({ error: false, message: 'Sensor: success.', data: data });
  });
});

module.exports = router;