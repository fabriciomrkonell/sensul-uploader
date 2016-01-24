(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('collecttableCtrl', collecttableCtrl);

	collecttableCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function collecttableCtrl($scope, $http, Constant, $rootScope) {

		angular.extend($scope, {
			filter: {
				page: 0,
				chart: false
			},
			data: {
				options: [],
				greenhouse: null,
				pages: 0
			}
		});

		$http.get(Constant.url.UserGreenHouse).success(function(data){
			$rootScope.options.meusergreenhouses = data.data;
		}).error(function(error){
			alert(error);
		});

		if($rootScope.options.growers.length === 0){
			$http.get(Constant.url.Grower).success(function(data){
				$rootScope.options.growers = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		$scope.search = function(page){
			if(page === 0){
				$scope.filter.greenhouse = angular.isObject($scope.data.greenhouse) ? $scope.data.greenhouse.greenhouse._id : null;
			}
			$http.post(Constant.url.Collect, $scope.filter).success(function(data){
				$scope.filter.page = data.data.page;
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