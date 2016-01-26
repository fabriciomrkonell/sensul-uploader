(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('growerCtrl', growerCtrl);

	growerCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function growerCtrl($scope, $http, Constant, $rootScope, Util) {

		var item = null, index = null;

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		$rootScope.eventOkButton = function(){
			Util.hideLoader();
		};

		$rootScope.eventSimButton = function(){
			$http.delete(Constant.url.Grower + '/' + item._id).success(function(data){
				if(data.error){
					Util.showLoaderInfo('Produtor Nāo Deletado', data.message);
				}else{
					$rootScope.options.growers.splice(index, 1);
					Util.showLoaderInfo('Produtor Deletado', 'O produtor foi deletado com sucesso');
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
			  city: ''
			});
		};

		$scope.clear();

		$http.get(Constant.url.Grower).success(function(data){
			$rootScope.options.growers = data.data;
			Util.hideLoader();
		}).error(function(error){
			alert(error);
		});

		$scope.saveGrower = function(item){
			if($scope.validForm()) return false;
			Util.showLoader('Processando Informações', 'Aguarde enquando o produtor é salvo');
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
				Util.hideLoader();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.editGrower = function(item){
			angular.copy(item, $scope.data)	;
		};

		$scope.deleteGrower = function(_item, _index){
			item = _item;
			index = _index;
			Util.showLoaderConfirm('Deletar Produtor?', 'Deseja realmente excluir o produtor?');
		};

		$scope.validForm = function(){
			if($scope.data.name === '') { alert('Favor preencher o campo Produtor!'); return true }
			if($scope.data.city === '') { alert('Favor preencher o campo Cidade!'); return true }
			return false;
		}

  }

}());