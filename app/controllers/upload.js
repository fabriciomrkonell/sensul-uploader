(function(){

	'use strict';

	angular.module('Sensul.controllers').registerCtrl('uploadCtrl', uploadCtrl);

	uploadCtrl.$inject = ['$scope', '$http', 'Constant', '$rootScope'];

	function uploadCtrl($scope, $http, Constant, $rootScope) {

		if($rootScope.options.growers.length === 0){
			$http.get(Constant.url.Grower).success(function(data){
				$rootScope.options.growers = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		$scope.search = function(){
			$http.get(Constant.url.Upload).success(function(data){
				$rootScope.options.uploads = data.data;
			}).error(function(error){
				alert(error);
			});
		};

		$scope.process = function(item, index){
			$http.post(Constant.url.Upload + '/process/' + item._id).success(function(data){
				$rootScope.options.uploads[index].status = 2;
			}).error(function(error){
				alert(error);
			});
		};

		$scope.search();

		$scope.deleteUpload= function(item, index){
			$http.delete(Constant.url.Upload + '/' + item._id).success(function(data){
				$rootScope.options.uploads.splice(index, 1);
			}).error(function(error){
				alert(error);
			});
		};

  }

}());