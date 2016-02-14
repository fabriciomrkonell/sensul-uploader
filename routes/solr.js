'use strict';

var express = require('express'),
		router = express.Router(),
		solr_client = require('../config/solr');

function transformChart(data){
	var array_exit = [],
			object_exit = {};

	data.forEach(function(item){
		console.log(item)
		if(object_exit[item.sensorName] === undefined) object_exit[item.sensorName] = [];
		object_exit[item.sensorName].push([new Date(item.created).getTime(), parseFloat(item.collectValue)]);
	});

	for(var index in object_exit) {
		array_exit.push({
			name: index,
			data: object_exit[index]
		});
	}

	return array_exit;
};

router.post('/', function(req, res, next) {


	var perpage = 5000,
			exit = {},
			page = Math.max(0, req.body.page),
			filter = {},
			or_sensor = [];

  var query = solr_client.createQuery().q('*:*').start(0).rows(perpage);

	req.body.sensors.forEach(function(item){
		or_sensor.push(item);
	});

	query.qf({ sensorId: or_sensor });

	if(req.body.greenhouse) query.qf({ greenhouseId: req.body.greenhouse });

	solr_client.search(query, function(err, data){
    if (err) throw console.log({ error: true, message: 'Solr: error.', data: err });
    if(req.body.chart === true){
    	res.send({ error: false, message: 'Solr: success.', data: transformChart(data.response.docs) });
    }else{
    	exit.data = data.response.docs;
	    exit.page = page;
	    exit.pages = Math.round(100 / perpage);
	  	res.send({ error: false, message: 'Solr: success.', data: exit });
    }
  });
});

module.exports = router;