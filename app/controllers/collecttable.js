(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('collecttableCtrl', collecttableCtrl);

	collecttableCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function collecttableCtrl($scope, $http, Constant, $rootScope) {

		angular.extend($scope, {
			data: {
				options: [],
				greenhouse: null,
				page: 0,
				pages: 0
			}
		});

		if($rootScope.options.meusergreenhouses.length === 0){
			$http.get(Constant.url.UserGreenHouse).success(function(data){
				$rootScope.options.meusergreenhouses = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		if($rootScope.options.growers.length === 0){
			$http.get(Constant.url.Grower).success(function(data){
				$rootScope.options.growers = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		$scope.search = function(page){
			$http.post(Constant.url.Collect, {
				page: page
			}).success(function(data){
				$scope.data.page = data.data.page;
				$scope.data.pages = data.data.pages;
				if(page === 0){
					$scope.data.options = data.data.data;
				}else{
					$scope.data.options = $scope.data.options.concat(data.data.data);
				}
			}).error(function(error){
				alert(error);
			});
		};

  }

}());