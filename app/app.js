'use strict'

angular.module('Sensul.controllers', []);

angular.module('Sensul.config', ['ngRoute']);

angular.module('Sensul.constant', []);

angular.module('Sensul', ['Sensul.controllers', 'Sensul.config', 'Sensul.constant']);

angular.module('Sensul').run(['$rootScope', 'Constant', function($rootScope, Constant){

	angular.extend($rootScope, {
		options: {
			types: Constant.options.Users,
			users: [],
			greenhouses: [],
			growers: [],
			uploads: []
		}
	});

	$rootScope.getGrower = function(data){
		var exit = {};
		$rootScope.options.growers.forEach(function(item){
			if(item._id === data._id) exit = item;
			if(item._id === data) exit = item;
		});
		return exit;
	};

	$rootScope.getGreenhouse = function(data){
		var exit = {};
		$rootScope.options.greenhouses.forEach(function(item){
			if(item._id === data._id) exit = item;
			if(item._id === data) exit = item;
		});
		return exit;
	};

	$rootScope.getUserType = function(type){
		var exit = {};
		$rootScope.options.types.forEach(function(item){
			if(item.id === type) exit = item;
		});
		return exit;
	};

}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['Sensul']);
});