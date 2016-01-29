(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('collecttableCtrl', collecttableCtrl);

	collecttableCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function collecttableCtrl($scope, $http, Constant, $rootScope, Util) {

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		angular.extend($scope, {
			showResult: false,
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
			Util.hideLoader();
		}).error(function(error){
			alert(error);
		});

		$scope.search = function(page){
			if($scope.validForm()) return false;
			Util.showLoader('Carregando Informações', 'Aguarde enquando os dados sāo carregados');
			if(page === 0){
				$scope.filter.greenhouse = $scope.data.greenhouse.greenhouse._id;
			}
			$http.post(Constant.url.Collect, $scope.filter).success(function(data){
				$scope.showResult = (data.data.data.length > 0);
				$scope.filter.page = data.data.page;
				$scope.data.pages = data.data.pages;
				if(page === 0){
					$scope.data.options = data.data.data;
				}else{
					$scope.data.options = $scope.data.options.concat(data.data.data);
				}
				Util.hideLoader();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.validForm = function(){
			if(!angular.isObject($scope.data.greenhouse)) { alert('Favor preencher o campo Abrigo!'); return true }
			return false;
		}

  }

}());