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
    }).otherwise('/index');

  }]);

}());