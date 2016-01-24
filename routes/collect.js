'use strict';

var express = require('express'),
		router = express.Router(),
		Collect = require('../models/collect');

router.get('/', function(req, res, next) {
	Collect.find().populate('sensor upload').exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'Collect: error.', data: err });
  	res.send({ error: false, message: 'Collect: success.', data: data });
  });
});

module.exports = router;