(function(){

  'use strict';

  angular.module('Sensul.config').config(['$routeProvider', '$controllerProvider',
    function($routeProvider, $controllerProvider) {
      angular.module('Sensul.controllers').registerCtrl = $controllerProvider.register;
      angular.module('Sensul.controllers').resolveScriptDeps = function(dependencies){
        return function($q,$rootScope){
          var deferred = $q.defer();
          $script(dependencies, function() {
            $rootScope.$apply(function(){
              deferred.resolve();
            });
          });
          return deferred.promise;
        }
      };

      $routeProvider.when('/home', {
        templateUrl: '/partials/home.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/home.js'])
        }
      }).when('/upload', {
        templateUrl: '/partials/upload.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/upload.js', '/app/libraries/jquery/js/jquery-form.js'])
        }
      }).when('/grower', {
        templateUrl: '/partials/grower.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/grower.js' ])
        }
      }).when('/greenhouse', {
        templateUrl: '/partials/greenhouse.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/greenhouse.js' ])
        }
      }).when('/user', {
        templateUrl: '/partials/user.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/user.js' ])
        }
      }).when('/usergreenhouse', {
        templateUrl: '/partials/usergreenhouse.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/usergreenhouse.js' ])
        }
      }).when('/file', {
        templateUrl: '/partials/file.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/file.js' ])
        }
      }).when('/sensor', {
        templateUrl: '/partials/sensor.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/sensor.js' ])
        }
      }).when('/collecttable', {
        templateUrl: '/partials/collecttable.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/collecttable.js' ])
        }
      }).when('/collectchart', {
        templateUrl: '/partials/collectchart.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/collectchart.js', 'app/libraries/highcharts/js/highcharts.min.js' ])
        }
      }).otherwise({
        redirectTo: '/home'
      });
    }
  ]);

}());