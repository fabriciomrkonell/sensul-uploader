(function(){

	'use strict';

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

	angular.module('Sensul.services').service('Util', ['$rootScope', function($rootScope){
		this.showLoader = function(message, submessage){
			$rootScope.loader.message = message;
			$rootScope.loader.submessage = submessage;
			$rootScope.loader.status = true;
			$rootScope.loader.type = 2;
		},
		this.showLoaderConfirm = function(message, submessage){
			$rootScope.loader.message = message;
			$rootScope.loader.submessage = submessage;
			$rootScope.loader.status = true;
			$rootScope.loader.type = 3;
		},
		this.showLoaderInfo = function(message, submessage){
			$rootScope.loader.message = message;
			$rootScope.loader.submessage = submessage;
			$rootScope.loader.status = true;
			$rootScope.loader.type = 1;
		},
		this.hideLoader = function(){
			$rootScope.loader.status = false;
		}
	}]);

}());