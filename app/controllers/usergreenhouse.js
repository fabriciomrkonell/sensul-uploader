(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('usergreenhouseCtrl', usergreenhouseCtrl);

	usergreenhouseCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function usergreenhouseCtrl($scope, $http, Constant, $rootScope, Util) {

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		angular.extend($scope, {
			data: {}
		});

		$scope.search = function(user){
			Util.showLoader('Carregando Informações', 'Aguarde enquanto os dados sāo carregados');
			$http.get(Constant.url.UserGreenHouse + '/' + user).success(function(data){
				$rootScope.options.usergreenhouses = data.data;
				Util.hideLoader();
			}).error(function(error){
				alert(error);
			});
		};

		$http.get(Constant.url.User).success(function(data){
			$rootScope.options.users = data.data;
			$scope.data.user = data.data[0];
			$scope.search($scope.data.user._id);
		}).error(function(error){
			alert(error);
		});

		$http.get(Constant.url.GreenHouse).success(function(data){
			$rootScope.options.greenhouses = data.data;
		}).error(function(error){
			alert(error);
		})

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