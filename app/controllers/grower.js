(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('growerCtrl', growerCtrl);

	growerCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function growerCtrl($scope, $http, Constant, $rootScope) {

		angular.extend($scope, {
			data: {}
		});

		$scope.clear = function(){
			angular.extend($scope.data, {
				_id: null,
				name: '',
			  city: ''
			});
		};

		$scope.clear();

		if($rootScope.options.growers.length === 0){
			$http.get(Constant.url.Grower).success(function(data){
				$rootScope.options.growers = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		$scope.saveGrower = function(item){
			if($scope.validForm()) return false;
			$http.post(Constant.url.Grower, item).success(function(data){
				if(item._id == null){
					$rootScope.options.growers.push(data.data);
				}else{
					$rootScope.options.growers.forEach(function(item){
						if(item._id === data.data._id){
							item.name = data.data.name;
							item.city = data.data.city;
						}
					});
				}
				$scope.clear();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.editGrower = function(item){
			angular.copy(item, $scope.data)	;
		};

		$scope.deleteGrower = function(item, index){
			$http.delete(Constant.url.Grower + '/' + item._id).success(function(data){
				if(data.error){
					alert(data.message);
				}else{
					$rootScope.options.growers.splice(index, 1);
					for(var i = 0; i < $rootScope.options.greenhouses.length; i++){
						if($rootScope.options.greenhouses[i].growers._id === item._id){
							$rootScope.options.greenhouses.splice(i, 1);
							i--;
						}
					};
				}
			}).error(function(error){
				alert(error);
			});
		};

		$scope.validForm = function(){
			if($scope.data.name === '') { alert('Favor preencher o campo Produtor!'); return true }
			if($scope.data.city === '') { alert('Favor preencher o campo Cidade!'); return true }
			return false;
		}

  }

}());