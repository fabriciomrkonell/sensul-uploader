(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('indexCtrl', indexCtrl);

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
			$rootScope.loader.status = false;
		}).error(function(error){
			alert(error);
		});

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