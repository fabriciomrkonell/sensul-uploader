(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope', 'Util'];

	function homeCtrl($scope, Util) {
	
		Util.hideLoader();

  }

}());
