'use strict';

var express = require('express'),
		router = express.Router(),
		GreenHouse = require('../models/greenhouse'),
		Grower = require('../models/grower');

router.get('/', function(req, res, next) {
	Grower.find(function(err, data) {
    if (err) throw console.log({ error: true, message: 'Grover: error.', data: err });
  	res.send({ error: false, message: 'Grover: success.', data: data });
  });
});

router.post('/', function(req, res, next) {
	Grower.findById(req.body._id, function(err, grower) {
		if(grower === null){
			grower = new Grower();
		}
	  grower.name = req.body.name;
	  grower.city = req.body.city;
    grower.save(function(err, data) {
		  if (err) throw console.log({ error: true, message: 'Grover: error.', data: err });
		  res.send({ error: false, message: 'Grover: success.', data: data });
		});
	});
});

router.delete('/:id', function(req, res, next) {
	GreenHouse.count({ grower: req.param('id') }).exec(function(err, count){
		if(count === 0){
			Grower.remove({
		  	_id: req.param('id')
		  }, function(err, data) {
		    if (err) throw console.log({ error: true, message: 'Grover: error.', data: err });
			  res.send({ error: false, message: 'Grover: success.', data: data });
		  });
		}else{
			res.send({ error: true, message: 'Este produtor contém ' + count + ' abrigo(s) relacionados.', data: count });
		}
	});
});

module.exports = router;