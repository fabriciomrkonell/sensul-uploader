'use strict'

angular.module('Sensul.controllers', []);

angular.module('Sensul.config', ['ngRoute']);

angular.module('Sensul.constant', []);

angular.module('Sensul', ['Sensul.controllers', 'Sensul.config', 'Sensul.constant']);

angular.module('Sensul').run(['$rootScope', 'Constant', '$http', function($rootScope, Constant, $http){

	angular.extend($rootScope, {
		me: {},
		options: {
			meusergreenhouses: [],
			usergreenhouses: [],
			status: Constant.options.Status,
			types: Constant.options.Users,
			users: [],
			greenhouses: [],
			growers: [],
			uploads: [],
			sensors: []
		}
	});

	$http.get(Constant.url.User + '/me').success(function(data){
		$rootScope.me = data.data;
	});

	$rootScope.hasAccess = function(values){
		return jQuery.inArray($rootScope.me.type, values) !== -1;
	};

	$rootScope.getGrower = function(data){
		if(data === undefined) return {};
		var exit = {};
		$rootScope.options.growers.forEach(function(item){
			if(item._id === data._id) exit = item;
			if(item._id === data) exit = item;
		});
		return exit;
	};

	$rootScope.getGreenhouse = function(data){
		if(data === undefined) return {};
		var exit = {};
		$rootScope.options.greenhouses.forEach(function(item){
			if(item._id === data._id) exit = item;
			if(item._id === data) exit = item;
		});
		return exit;
	};

	$rootScope.getUserType = function(type){
		if(type === undefined) return {};
		var exit = {};
		$rootScope.options.types.forEach(function(item){
			if(item.id === type) exit = item;
		});
		return exit;
	};

	$rootScope.getUploadStatus = function(status){
		if(status === undefined) return {};
		var exit = {};
		$rootScope.options.status.forEach(function(item){
			if(item.id === status) exit = item;
		});
		return exit;
	};

}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['Sensul']);
});