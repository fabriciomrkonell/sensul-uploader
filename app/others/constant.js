(function(){

	'use strict';

	angular.module('Sensul.constant').constant('Constant', {
		url: {
			User: '/user',
			Grower: '/grower',
			GreenHouse: '/greenhouse',
			Upload: '/upload'
		},
		options: {
			Users: [{
				id: 1,
				name: 'Administrador'
			}, {
				id: 2,
				name: 'Epagri'
			}]
		}
	});

}());