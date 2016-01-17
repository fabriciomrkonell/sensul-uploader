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


		if($rootScope.options.growers.length === 0){
			$http.get(Constant.url.Grower).success(function(data){
				$rootScope.options.growers = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		if($rootScope.options.greenhouses.length === 0){
			$http.get(Constant.url.GreenHouse).success(function(data){
				$rootScope.options.greenhouses = data.data;
			}).error(function(error){
				alert(error);
			});
		}

		if($rootScope.options.uploads.length === 0){
			$http.get(Constant.url.Upload).success(function(data){
				$rootScope.options.uploads = data.data;
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
        	data = JSON.parse(data);
					data.data.greenhouse = $scope.data.greenhouse;
					$rootScope.options.uploads.push(data.data);
          $scope.clear();
        }
      });
		};

		$scope.getGrowerName = function(data, exit){
			data = data || {};
			$rootScope.options.growers.forEach(function(item){
				if(item._id === data.grower) exit = item.name;
				if(item._id === data.grower._id) exit = item.name;
			});
			return exit;
		};

		$scope.getGreenHouseName = function(data, exit){
			data = data || {};
			$rootScope.options.greenhouses.forEach(function(item){
				if(item._id === data._id) exit = item.name;
			});
			return exit;
		};

		$scope.deleteUpload= function(item, index){
			$http.delete(Constant.url.Upload + '/' + item._id).success(function(data){
				$rootScope.options.uploads.splice(index, 1);
			}).error(function(error){
				alert(error);
			});
		};

		$scope.validForm = function(){
			if($scope.data.greenhouse === null) { alert('Favor preencher o campo Abrigo!'); return true }
			if($("#filecsv").val() === '') { alert('Favor preencher o campo Arquivo!'); return true }
			return false;
		}

  }

}());