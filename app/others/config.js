(function(){

  'use strict';

  angular.module('Sensul.config').config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/index', {
      templateUrl: '/partials/index.html',
      controller: 'indexCtrl'
    }).when('/grower', {
      templateUrl: 'partials/grower.html',
      controller: 'growerCtrl'
    }).when('/greenhouse', {
      templateUrl: 'partials/greenhouse.html',
      controller: 'greenhouseCtrl'
    }).when('/user', {
      templateUrl: 'partials/user.html',
      controller: 'userCtrl'
    }).when('/usergreenhouse', {
      templateUrl: 'partials/usergreenhouse.html',
      controller: 'usergreenhouseCtrl'
    }).when('/upload', {
      templateUrl: 'partials/upload.html',
      controller: 'uploadCtrl'
    }).when('/sensor', {
      templateUrl: 'partials/sensor.html',
      controller: 'sensorCtrl'
    }).when('/collecttable', {
      templateUrl: 'partials/collecttable.html',
      controller: 'collecttableCtrl'
    }).otherwise('/index');

  }]);

}());