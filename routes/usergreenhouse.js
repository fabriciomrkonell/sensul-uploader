'use strict';

var express = require('express'),
		router = express.Router(),
		UserGreenHouse = require('../models/usergreenhouse');

router.get('/:user', function(req, res, next) {
	UserGreenHouse.find({
		user: req.param('user')
	}).exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'UserGreenHouse: error.', data: err });
  	res.send({ error: false, message: 'UserGreenHouse: success.', data: data });
  });
});

router.get('/', function(req, res, next) {
	UserGreenHouse.find({
		user: req.user._id
	}).populate('greenhouse').exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'UserGreenHouse: error.', data: err });
  	res.send({ error: false, message: 'UserGreenHouse: success.', data: data });
  });
});

router.post('/', function(req, res, next) {
	var	usergreenhouse = new UserGreenHouse();
  usergreenhouse.user = req.body.user;
  usergreenhouse.greenhouse = req.body.greenhouse;
  usergreenhouse.updated_at = new Date();
  usergreenhouse.created_at = new Date;
  usergreenhouse.save(function(err, data) {
	  if (err) throw console.log({ error: true, message: 'UserGreenHouse: error.', data: err });
	  res.send({ error: false, message: 'UserGreenHouse: success.', data: data });
	});
});

router.delete('/:id', function(req, res, next) {
	UserGreenHouse.remove({
  	_id: req.param('id')
  }, function(err, data) {
    if (err) throw console.log({ error: true, message: 'UserGreenHouse: error.', data: err });
	  res.send({ error: false, message: 'UserGreenHouse: success.', data: data });
  });
});

module.exports = router;