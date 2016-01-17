'use strict'

angular.module('Sensul.controllers', []);

angular.module('Sensul.config', ['ngRoute']);

angular.module('Sensul.constant', []);

angular.module('Sensul', ['Sensul.controllers', 'Sensul.config', 'Sensul.constant']);

angular.module('Sensul').run(['$rootScope', function($rootScope){
	angular.extend($rootScope, {
		options: {
			greenhouses: [],
			growers: [],
			uploads: []
		}
	});
}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['Sensul']);
});