'use strict';

var express = require('express'),
		router = express.Router(),
		GreenHouse = require('../models/greenhouse'),
		UserGreenHouse = require('../models/usergreenhouse'),
		Upload = require('../models/upload');

router.get('/', function(req, res, next) {
	GreenHouse.find().populate('grower').exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'GreenHouse: error.', data: err });
  	res.send({ error: false, message: 'GreenHouse: success.', data: data });
  });
});

router.post('/', function(req, res, next) {
	GreenHouse.findById(req.body._id, function(err, greenhouse) {
		if(greenhouse === null){
			greenhouse = new GreenHouse();
			greenhouse.created_at = new Date;
		}
	  greenhouse.name = req.body.name;
	  greenhouse.grower = req.body.grower;
	  greenhouse.updated_at = new Date();
    greenhouse.save(function(err, data) {
		  if (err) throw console.log({ error: true, message: 'GreenHouse: error.', data: err });
		  res.send({ error: false, message: 'GreenHouse: success.', data: data });
		});
	});
});

router.delete('/:id', function(req, res, next) {
	Upload.count({ greenhouse: req.param('id') }).exec(function(err, count){
		if(count === 0){
			GreenHouse.remove({
		  	_id: req.param('id')
		  }, function(err, data) {
		  	UserGreenHouse.remove({ greenhouse: req.param('id') }).exec();
		    if (err) throw console.log({ error: true, message: 'GreenHouse: error.', data: err });
			  res.send({ error: false, message: 'GreenHouse: success.', data: data });
		  });
		}else{
			res.send({ error: true, message: 'Este abrigo contém ' + count + ' upload(s) relacionados.', data: count });
		}
	});


});

module.exports = router;