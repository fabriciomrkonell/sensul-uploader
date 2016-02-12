'use strict';

var express = require('express'),
    pages = require('../pages.json'),
		router = express.Router();

router.get('/partials/:file', function(req, res, next) {
  if(req.param('file') === 'home.html'){
    var html = '<div ng-controller="homeCtrl" style="margin-bottom: 50px"><div class="container"><div class="row text-center"><h2>MENU</h2></div><br><div class="row">';
      pages.forEach(function(page){
        if(page.permission.indexOf(req.user.type) !== -1){
	       	html = html + '<a href="/#/' + page.url + '" class="link-menu">' +
	          '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">' +
	            '<div class="panel panel-default panel-default-menu">' +
	              '<div class="panel-heading panel-heading-menu"></div>' +
	              '<div class="panel-body panel-body-menu text-center">' + page.name + '</div>' +
	            '</div>' +
	          '</div>' +
	        '</a>';
        }
      });
    html = html + '</div></div></div>'
    res.send(html);
  }else{
    res.sendfile('./views/partials/' + req.param('file'));
  }
});

router.get('/app/others/config.js', function(req, res, next) {
	res.sendfile('./app/others/config' + req.user.type + '.js');
});

module.exports = router;