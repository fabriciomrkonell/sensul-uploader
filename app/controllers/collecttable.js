(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('collecttableCtrl', collecttableCtrl);

	collecttableCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function collecttableCtrl($scope, $http, Constant, $rootScope, Util) {

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		$('#sensors-multiselect').multiselect();

		var date = new Date(),
				startDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0),
				endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0);

		$('#daterange').daterangepicker({
      startDate: startDate,
      endDate: endDate,
      timePicker24Hour: true,
      timePicker: true,
      timePickerIncrement: 5,
      locale: {
        format: 'DD/MM/YYYY HH:mm'
      }
    });

		angular.extend($scope, {
			showResult: false,
			filter: {
				startDate: startDate,
				endDate: endDate,
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

		$http.get(Constant.url.Sensor).success(function(data){
			var options = [];
			data.data.forEach(function(item){
				options.push({
					label: item.description,
					title: item.description,
					value: item._id,
					selected: true
				})
			});
			$('#sensors-multiselect').multiselect('dataprovider', options);
		}).error(function(error){
			alert(error);
		});

		$scope.search = function(page){
			if($scope.validForm()) return false;
			Util.showLoader('Carregando Informações', 'Aguarde enquando os dados sāo carregados');

			if(page === 0){
				$scope.filter.greenhouse = $scope.data.greenhouse.greenhouse._id;
				$scope.filter.sensors = $('#sensors-multiselect').val();
				$scope.filter.startDate = Util.transformDate($('#daterange').val().split(" - ")[0]);
				$scope.filter.endDate = Util.transformDate($('#daterange').val().split(" - ")[1]);
			}

			$http.post(Constant.url.Solr, $scope.filter).success(function(data){
				$scope.showResult = (data.data.data.length > 0);
				$scope.filter.page = page;
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