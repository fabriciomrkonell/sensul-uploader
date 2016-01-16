'use strict';

var express = require('express'),
		router = express.Router(),
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
	Grower.remove({
  	_id: req.param('id')
  }, function(err, data) {
    if (err) throw console.log({ error: true, message: 'Grover: error.', data: err });
	  res.send({ error: false, message: 'Grover: success.', data: data });
  });
});

module.exports = router;