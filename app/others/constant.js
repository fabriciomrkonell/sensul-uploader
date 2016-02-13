(function(){

	'use strict';

	angular.module('Sensul.constant').constant('Constant', {
		url: {
			User: '/user',
			Grower: '/grower',
			GreenHouse: '/greenhouse',
			Upload: '/upload',
			UserGreenHouse: '/usergreenhouse',
			Sensor: '/sensor',
			Solr: '/solr'
		},
		options: {
			Status: [{
				id: 1,
				name: 'Upload'
			}, {
				id: 2,
				name: 'Processando'
			}, {
				id: 3,
				name: 'Finalizado'
			}],
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