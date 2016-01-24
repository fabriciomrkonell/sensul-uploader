(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('collecttableCtrl', collecttableCtrl);

	collecttableCtrl.$inject = ['$scope', '$http', 'Constant'];

	function collecttableCtrl($scope, $http, Constant) {

		angular.extend($scope, {
			data: {}
		});

		$http.get(Constant.url.Collect).success(function(data){
			$scope.data = data.data;
		}).error(function(error){
			alert(error);
		});
  }

}());