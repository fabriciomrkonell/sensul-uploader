(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('greenhouseCtrl', greenhouseCtrl);

	greenhouseCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function greenhouseCtrl($scope, $http, Constant, $rootScope, Util) {

		var item = null, index = null;

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		$rootScope.eventOkButton = function(){
			Util.hideLoader();
		};

		$rootScope.eventSimButton = function(){
			$http.delete(Constant.url.GreenHouse + '/' + item._id).success(function(data){
				if(data.error){
					Util.showLoaderInfo('Abrigo Nāo Deletado', data.message);
				}else{
					$rootScope.options.greenhouses.splice(index, 1);
					Util.showLoaderInfo('Abrigo Deletado', 'O abrigo foi deletado com sucesso');
				}
			}).error(function(error){
				alert(error);
			});
		};

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

		$scope.search = function(){
			$http.get(Constant.url.GreenHouse).success(function(data){
				$rootScope.options.greenhouses = data.data;
				Util.hideLoader();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.clear();
		$scope.search();

		$http.get(Constant.url.Grower).success(function(data){
			$rootScope.options.growers = data.data;
		}).error(function(error){
			alert(error);
		});

		$scope.saveGreenHouse = function(item){
			if($scope.validForm()) return false;
			Util.showLoader('Processando Informações', 'Aguarde enquando o abrigo é salvo');
			$http.post(Constant.url.GreenHouse, item).success(function(data){
				$scope.search();
				$scope.clear();
				Util.hideLoader();
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

		$scope.deleteGreenHouse = function(_item, _index){
			item = _item;
			index = _index;
			Util.showLoaderConfirm('Deletar Abrigo?', 'Deseja realmente excluir o abrigo?');
		};

		$scope.validForm = function(){
			if($scope.data.name === '') { alert('Favor preencher o campo Nome!'); return true }
			if($scope.data.grower === null) { alert('Favor preencher o campo Produtor!'); return true }
			return false;
		};

  }

}());