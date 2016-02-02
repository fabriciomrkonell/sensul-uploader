(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('collectchartCtrl', collectchartCtrl);

	collectchartCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function collectchartCtrl($scope, $http, Constant, $rootScope, Util) {

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		$('#sensors-multiselect').multiselect();

		angular.extend($scope, {
			showResult: false,
			filter: {
				page: 0,
				chart: true
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
			}
			$http.post(Constant.url.Collect, $scope.filter).success(function(data){
				$scope.showResult = (data.data.length > 0);
				$('#container').highcharts({
		      chart: {
		        type: 'line'
		      },
		      exporting: {
		      	enabled: false
		      },
		      title: {
		         text: ''
		      },
		      xAxis: {
		        type: 'datetime'
		      },
		      yAxis: {
			      title: {
			        text: ''
			      }
		      },
		      series: data.data
		    });
		    Util.hideLoader();
		    jQuery("[text-anchor='end'][zIndex=8]").css('display', 'none');
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