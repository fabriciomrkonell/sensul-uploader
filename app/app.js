'use strict'

angular.module('Sensul.controllers', []);

angular.module('Sensul.config', ['ngRoute']);

angular.module('Sensul.constant', []);

angular.module('Sensul.services', []);

angular.module('Sensul', ['Sensul.controllers', 'Sensul.config', 'Sensul.constant', 'Sensul.services']);

angular.module('Sensul').run(['$rootScope', 'Constant', '$http', 'Util', function($rootScope, Constant, $http, Util){

	angular.extend($rootScope, {
		me: {},
		loader: {
			type: 2,
			// 1 = Message
			// 2 = Loader
			// 3 = Confirm
			status: true,
			message: 'Carregando Informações',
			submessage: 'O sistema está iniciando'
		},
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

	$rootScope.eventOkButton = function(){
		Util.hideLoader();
	};

	$rootScope.eventSimButton = function(){
		Util.hideLoader();
	};

	$rootScope.eventCancelarButton = function(){
		Util.hideLoader();
	};

}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['Sensul']);
});