'use strict';

var express = require('express'),
		router = express.Router(),
		GrennHouse = require('../models/greenhouse');

router.get('/', function(req, res, next) {
	GrennHouse.find().populate('grower').exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'GrennHouse: error.', data: err });
  	res.send({ error: false, message: 'GrennHouse: success.', data: data });
  });
});

router.post('/', function(req, res, next) {
	GrennHouse.findById(req.body._id, function(err, greenhouse) {
		if(greenhouse === null){
			greenhouse = new GrennHouse();
		}
	  greenhouse.name = req.body.name;
	  greenhouse.grower = req.body.grower;
    greenhouse.save(function(err, data) {
		  if (err) throw console.log({ error: true, message: 'GrennHouse: error.', data: err });
		  res.send({ error: false, message: 'GrennHouse: success.', data: data });
		});
	});
});

router.delete('/:id', function(req, res, next) {
	GrennHouse.remove({
  	_id: req.param('id')
  }, function(err, data) {
    if (err) throw console.log({ error: true, message: 'GrennHouse: error.', data: err });
	  res.send({ error: false, message: 'GrennHouse: success.', data: data });
  });
});

module.exports = router;