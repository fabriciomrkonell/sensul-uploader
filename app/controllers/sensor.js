(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('sensorCtrl', sensorCtrl);

	sensorCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function sensorCtrl($scope, $http, Constant, $rootScope) {

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

		if($rootScope.options.sensors.length === 0){
			$http.get(Constant.url.Sensor).success(function(data){
				$rootScope.options.sensors = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		$scope.saveSensor = function(item){
			if($scope.validForm()) return false;
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
			}).error(function(error){
				alert(error);
			});
		};

		$scope.editSensor = function(item){
			angular.copy(item, $scope.data)	;
		};

		$scope.deleteSensor = function(item, index){
			$http.delete(Constant.url.Sensor + '/' + item._id).success(function(data){
				if(data.error){
					alert(data.message);
				}else{
					$rootScope.options.sensors.splice(index, 1);
				}
			}).error(function(error){
				alert(error);
			});
		};

		$scope.validForm = function(){
			if($scope.data.name === '') { alert('Favor preencher o campo Nome!'); return true }
			if($scope.data.description === '') { alert('Favor preencher o campo Decrição!'); return true }
			return false;
		}

  }

}());