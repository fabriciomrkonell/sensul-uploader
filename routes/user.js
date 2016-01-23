'use strict';

var express = require('express'),
		router = express.Router(),
		User = require('../models/user');

router.get('/me', function(req, res, next) {
	res.send({ error: false, message: 'User: success.', data: req.user });
});

router.get('/', function(req, res, next) {
	User.find(function(err, data) {
    if (err) throw console.log({ error: true, message: 'User: error.', data: err });
  	res.send({ error: false, message: 'User: success.', data: data });
  });
});

router.post('/', function(req, res, next) {
	User.findById(req.body._id, function(err, user) {
		if(user === null){
			user = new User();
			user.created_at = new Date;
		}
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.type = req.body.type.id;
    user.update_at = new Date();
    user.save(function(err, data) {
		  if (err) throw console.log({ error: true, message: 'User: error.', data: err });
		  res.send({ error: false, message: 'User: success.', data: data });
		});
	});
});

router.delete('/:id', function(req, res, next) {
	User.remove({
  	_id: req.param('id')
  }, function(err, data) {
    if (err) throw console.log({ error: true, message: 'User: error.', data: err });
	  res.send({ error: false, message: 'User: success.', data: data });
  });
});

module.exports = router;