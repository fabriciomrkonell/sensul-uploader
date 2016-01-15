(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('greenhouseCtrl', greenhouseCtrl);

	greenhouseCtrl.$inject = ['$scope', '$http', 'Constant'];

	function greenhouseCtrl($scope, $http, Constant) {

		angular.extend($scope, {
			growers: [],
			greenhouses: [],
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

		$http.get(Constant.url.GreenHouse).success(function(data){
			$scope.greenhouses = data.data;
		}).error(function(error){
			alert(error);
		});

		$http.get(Constant.url.Grower).success(function(data){
			$scope.growers = data.data;
		}).error(function(error){
			alert(error);
		});

		$scope.saveGreenHouse = function(item){
			$http.post(Constant.url.GreenHouse, item).success(function(data){
				if(item._id == null){
					$scope.greenhouses.push(data.data);
				}else{
					$scope.greenhouses.forEach(function(item){
						if(item._id === data.data._id){
							item.name = data.data.name;
						}
					});
				}
				$scope.clear();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.editGreenHouse = function(item){
			angular.copy(item, $scope.data)	;
		};

		$scope.deleteGreenHouse = function(item, index){
			$http.delete(Constant.url.GreenHouse + '/' + item._id).success(function(data){
				$scope.greenhouses.splice(index, 1);
			}).error(function(error){
				alert(error);
			});
		};

  }

}());