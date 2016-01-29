(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('uploadCtrl', uploadCtrl);

	uploadCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function uploadCtrl($scope, $http, Constant, $rootScope, Util) {

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		$rootScope.eventOkButton = function(){
			window.location.href = '/#/file';
		};

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
			Util.hideLoader();
		}).error(function(error){
			alert(error);
		});

		$scope.sendUpload = function(){
			if($scope.validForm()) return false;
			Util.showLoader('Enviando Arquivo', 'Aguarde enquanto o arquivo é enviado');
      $('#formUpload').ajaxSubmit({
        dataType: 'text',
        error: function(error) {
          alert(error);
        },
        success: function(data) {
        	Util.showLoaderInfo('Arquivo Enviado', 'O arquivo foi enviado com sucesso');
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
