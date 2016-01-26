(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('uploadCtrl', uploadCtrl);

	uploadCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope', 'Util'];

	function uploadCtrl($scope, $http, Constant, $rootScope, Util) {

		var item = null, index = null;

		Util.showLoader('Carregando Informações', 'Aguarde enquando a página é carregada');

		$rootScope.eventOkButton = function(){
			Util.hideLoader();
		};

		$rootScope.eventSimButton = function(){
			$http.delete(Constant.url.Upload + '/' + item._id).success(function(data){
				$rootScope.options.uploads.splice(index, 1);
				Util.showLoaderInfo('Arquivo Deletado', 'O arquivo foi deletado com sucesso');
			}).error(function(error){
				alert(error);
			});
		};

		$rootScope.eventCancelarButton = function(){
			Util.hideLoader();
		};

		$scope.search = function(){
			Util.showLoader('Carregando Informações', 'Os arquivos estāo sendos carregados');
			$http.get(Constant.url.Upload).success(function(data){
				$rootScope.options.uploads = data.data;
				Util.hideLoader();
			}).error(function(error){
				alert(error);
			});
		};

		$scope.search();

		$scope.deleteUpload= function(_item, _index){
			item = _item;
			index = _index;
			Util.showLoaderConfirm('Deletar Arquivo?', 'Deseja realmente excluir o arquivo?');
		};

  }

}());