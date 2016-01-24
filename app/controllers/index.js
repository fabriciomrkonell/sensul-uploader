(function(){

	'use strict';

	angular.module('Sensul.controllers').controller('indexCtrl', indexCtrl);

	indexCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function indexCtrl($scope, $http, Constant, $rootScope) {

		angular.extend($scope, {
			data: {}
		});

		$scope.clear = function(){
			angular.extend($scope.data, {
				greenhouse: null,
				filecsv: ''
			});
			$("#filecsv").val('');
			if (!$scope.$$phase) {
			  $scope.$apply();
			}
		};

		$scope.clear();

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

		$scope.sendUpload = function(){
			if($scope.validForm()) return false;
      $('#formUpload').ajaxSubmit({
        dataType: 'text',
        error: function(error) {
          alert(error);
        },
        success: function(data) {
        	window.location.href = "#/upload";
          $scope.clear();
        }
      });
		};

		$scope.validForm = function(){
			if($scope.data.greenhouse === null) { alert('Favor preencher o campo Abrigo!'); return true }
			if($("#filecsv").val() === '') { alert('Favor preencher o campo Arquivo!'); return true }
			return false;
		}

  }

}());