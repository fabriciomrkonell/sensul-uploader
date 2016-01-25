(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('userCtrl', userCtrl);

	userCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function userCtrl($scope, $http, Constant, $rootScope) {

		angular.extend($scope, {
			data: {}
		});

		$scope.clear = function(){
			angular.extend($scope.data, {
				_id: null,
				name: '',
			  email: '',
			  password: '',
			  type: Constant.options.Users[0]
			});
		};

		$scope.clear();

		if($rootScope.options.users.length === 0){
			$http.get(Constant.url.User).success(function(data){
				$rootScope.options.users = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		$scope.saveUser = function(item){
			if($scope.validForm()) return false;
			$http.post(Constant.url.User, item).success(function(data){
				if(item._id == null){
					$rootScope.options.users.push(data.data);
				}else{
					$rootScope.options.users.forEach(function(item){
						if(item._id === data.data._id){
							item.name = data.data.name;
					    item.email = data.data.email;
					    item.password = data.data.password;
					    item.type = data.data.type;
						}
					});
				}
				$scope.clear();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.editUser = function(item){
			angular.copy(item, $scope.data);
			$scope.data.type = $rootScope.getUserType(item.type);
		};

		$scope.deleteUser = function(item, index){
			$http.delete(Constant.url.User + '/' + item._id).success(function(data){
				if(data.error){
					alert(data.message);
				}else{
					$rootScope.options.users.splice(index, 1);
				}
			}).error(function(error){
				alert(error);
			});
		};

		$scope.validForm = function(){
			if($scope.data.name === '') { alert('Favor preencher o campo Nome!'); return true }
			if($scope.data.email === '') { alert('Favor preencher o campo Email!'); return true }
			if($scope.data.password === '') { alert('Favor preencher o campo Senha!'); return true }
			return false;
		}

  }

}());