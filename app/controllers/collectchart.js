(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('collectchartCtrl', collectchartCtrl);

	collectchartCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function collectchartCtrl($scope, $http, Constant, $rootScope, Util) {

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		angular.extend($scope, {
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

		$scope.search = function(page){
			Util.showLoader('Carregando Informações', 'Aguarde enquando os dados sāo carregados');
			if(page === 0){
				$scope.filter.greenhouse = angular.isObject($scope.data.greenhouse) ? $scope.data.greenhouse._id : null;
			}
			$http.post(Constant.url.Collect, $scope.filter).success(function(data){
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
  }

}());