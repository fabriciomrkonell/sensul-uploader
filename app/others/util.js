(function(){

	'use strict';

	angular.module('Sensul.service').service('Util', [function(){
		this.loaderShow = function(message){
			if(message) $rootScope.loader.message = message;
			$rootScope.loader.status = true;
		}
	}]);

}());