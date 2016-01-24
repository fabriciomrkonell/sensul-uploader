'use strict';

var express = require('express'),
		router = express.Router(),
		Collect = require('../models/collect');

function transformChart(data){
	var exit = [];
	return exit;
};

router.post('/', function(req, res, next) {
	var perpage = 50,
			exit = {},
			page = Math.max(0, req.body.page),
			filter = {};

			if(req.body.greenhouse) filter['greenhouse'] = req.body.greenhouse;

	Collect.find(filter).limit(perpage).skip(perpage * page).populate('sensor upload').exec(function(err, data) {
    if (err) throw console.log({ error: true, message: 'Collect: error.', data: err });
    if(req.body.chart === true){
    	res.send({ error: false, message: 'Collect: success.', data: transformChart(data) });
    }else{
    	Collect.count(filter).exec(function(err, count) {
	    	exit.data = data;
		    exit.page = page;
		    exit.pages = Math.round(count / perpage);
		  	res.send({ error: false, message: 'Collect: success.', data: exit });
	    });
    }
  });
});

module.exports = router;