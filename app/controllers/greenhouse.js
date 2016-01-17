(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('greenhouseCtrl', greenhouseCtrl);

	greenhouseCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function greenhouseCtrl($scope, $http, Constant, $rootScope) {

		angular.extend($scope, {
			data: {}
		});

		$scope.clear = function(){
			angular.extend($scope.data, {
				_id: null,
				name: '',
				grower: null
			});
		};

		$scope.clear();

		if($rootScope.options.greenhouses.length === 0){
			$http.get(Constant.url.GreenHouse).success(function(data){
				$rootScope.options.greenhouses = data.data;
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

		$scope.saveGreenHouse = function(item){
			if($scope.validForm()) return false;
			$http.post(Constant.url.GreenHouse, item).success(function(data){
				if(item._id == null){
					data.data.grower = $scope.data.grower;
					$rootScope.options.greenhouses.push(data.data);
				}else{
					$rootScope.options.greenhouses.forEach(function(item){
						if(item._id === data.data._id){
							item.name = data.data.name;
							item.grower = $scope.data.grower;
						}
					});
				}
				$scope.clear();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.editGreenHouse = function(item){
			angular.copy(item, $scope.data);
			$rootScope.options.growers.forEach(function(item){
				if(item._id === $scope.data.grower._id){
					$scope.data.grower = item;
				}
			});
		};

		$scope.deleteGreenHouse = function(item, index){
			$http.delete(Constant.url.GreenHouse + '/' + item._id).success(function(data){
				if(data.error){
					alert(data.message);
				}else{
					$rootScope.options.greenhouses.splice(index, 1);
					for(var i = 0; i < $rootScope.options.uploads.length; i++){
						if($rootScope.options.uploads[i].greenhouse._id === item._id){
							$rootScope.options.uploads.splice(i, 1);
							i--;
						}
					};
				}
			}).error(function(error){
				alert(error);
			});
		};

		$scope.getGrowerName = function(data, exit){
			data = data || {};
			$rootScope.options.growers.forEach(function(item){
				if(item._id === data.grower._id) exit = item.name;
				if(item._id === data.grower) exit = item.name;
			});
			return exit;
		};

		$scope.validForm = function(){
			if($scope.data.name === '') { alert('Favor preencher o campo Nome!'); return true }
			if($scope.data.grower === null) { alert('Favor preencher o campo Produtor!'); return true }
			return false;
		}

  }

}());