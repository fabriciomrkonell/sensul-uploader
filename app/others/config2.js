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
      }).when('/file', {
        templateUrl: '/partials/file.html',
        resolve: {
          deps: angular.module('Sensul.controllers').resolveScriptDeps([ '/app/controllers/file.js' ])
        }
      }).otherwise({
        redirectTo: '/home'
      });
    }
  ]);

}());