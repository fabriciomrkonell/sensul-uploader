(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('usergreenhouseCtrl', usergreenhouseCtrl);

	usergreenhouseCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function usergreenhouseCtrl($scope, $http, Constant, $rootScope) {

		angular.extend($scope, {
			data: {},
			loader: true
		});

		$scope.search = function(user){
			$scope.loader = true;
			$http.get(Constant.url.UserGreenHouse + '/' + user).success(function(data){
				$rootScope.options.usergreenhouses = data.data;
				$scope.loader = false;
			}).error(function(error){
				alert(error);
			});
		};

		if($rootScope.options.users.length === 0){
			$http.get(Constant.url.User).success(function(data){
				$rootScope.options.users = data.data;
				$scope.data.user = data.data[0];
				$scope.search($scope.data.user._id);
			}).error(function(error){
				alert(error);
			});
		}else{
				$scope.data.user = $rootScope.options.users[0];
				$scope.search($scope.data.user._id);
		}

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

		$scope.hasChecked = function(user, greenhouse){
			var exit = '';
			$rootScope.options.usergreenhouses.forEach(function(item){
				if((item.user === user) && (item.greenhouse === greenhouse)) exit = item._id;
			});
			return exit;
		};

		$scope.saveUserGreenHouse = function(user, greenhouse){
			$http.post(Constant.url.UserGreenHouse, {
				user: user,
				greenhouse: greenhouse
			}).success(function(data){
				$rootScope.options.usergreenhouses.push(data.data);
			}).error(function(error){
				alert(error);
			});
		};

		$scope.deleteUserGreenHouse = function(user, greenhouse){
			$http.delete(Constant.url.UserGreenHouse + '/' + $scope.hasChecked(user, greenhouse)).success(function(data){
				if(data.error){
					alert(data.message);
				}else{
					for(var i = 0; i < $rootScope.options.usergreenhouses.length; i++){
						if($scope.hasChecked(user, greenhouse) === $rootScope.options.usergreenhouses[i]._id){
							$rootScope.options.usergreenhouses.splice(i, 1);
						}
					};
				}
			}).error(function(error){
				alert(error);
			});
		};

  }

}());