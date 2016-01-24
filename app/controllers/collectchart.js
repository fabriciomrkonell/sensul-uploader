(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('collectchartCtrl', collectchartCtrl);

	collectchartCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function collectchartCtrl($scope, $http, Constant, $rootScope) {

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
		}).error(function(error){
			alert(error);
		});

		if($rootScope.options.growers.length === 0){
			$http.get(Constant.url.Grower).success(function(data){
				$rootScope.options.growers = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		$scope.search = function(page){
			if(page === 0){
				$scope.filter.greenhouse = angular.isObject($scope.data.greenhouse) ? $scope.data.greenhouse.greenhouse._id : null;
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
		    jQuery("[text-anchor='end'][zIndex=8]").css('display', 'none');
			}).error(function(error){
				alert(error);
			});
		};
  }

}());