(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('sensorCtrl', sensorCtrl);

	sensorCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function sensorCtrl($scope, $http, Constant, $rootScope, Util) {

		var item = null, index = null;

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		$rootScope.eventOkButton = function(){
			Util.hideLoader();
		};

		$rootScope.eventSimButton = function(){
			$http.delete(Constant.url.Sensor + '/' + item._id).success(function(data){
				$rootScope.options.sensors.splice(index, 1);
				Util.showLoaderInfo('Sensor Deletado', 'O sensor foi deletado com sucesso');
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
			  description: ''
			});
		};

		$scope.clear();


		$http.get(Constant.url.Sensor).success(function(data){
			$rootScope.options.sensors = data.data;
			Util.hideLoader();
		}).error(function(error){
			alert(error);
		});

		$scope.saveSensor = function(item){
			if($scope.validForm()) return false;
			Util.showLoader('Salvando Sensor', 'Aguarde enquando o sensor é salvo');
			$http.post(Constant.url.Sensor, item).success(function(data){
				if(item._id == null){
					$rootScope.options.sensors.push(data.data);
				}else{
					$rootScope.options.sensors.forEach(function(item){
						if(item._id === data.data._id){
							item.name = data.data.name;
							item.description = data.data.description;
						}
					});
				}
				$scope.clear();
				Util.hideLoader();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.editSensor = function(item){
			angular.copy(item, $scope.data)	;
		};

		$scope.deleteSensor = function(_item, _index){
			item = _item;
			index = _index;
			Util.showLoaderConfirm('Deletar Sensor?', 'Deseja realmente excluir o sensor?');
		};

		$scope.validForm = function(){
			if($scope.data.name === '') { alert('Favor preencher o campo Nome!'); return true }
			if($scope.data.description === '') { alert('Favor preencher o campo Decrição!'); return true }
			return false;
		}

  }

}());