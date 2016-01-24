'use strict';

var express = require('express'),
		router = express.Router(),
		Collect = require('../models/collect');

router.post('/', function(req, res, next) {
	var perpage = 50,
			exit = {},
			page = Math.max(0, req.body.page);

	Collect.find().limit(perpage).skip(perpage * page).populate('sensor upload').exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'Collect: error.', data: err });
    Collect.count().exec(function(err, count) {
    	exit.data = data;
	    exit.page = page;
	    exit.pages = Math.round(count / perpage);
	  	res.send({ error: false, message: 'Collect: success.', data: exit });
    });
  });
});

module.exports = router;