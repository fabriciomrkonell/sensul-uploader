'use strict'

angular.module('Sensul.controllers', []);

angular.module('Sensul', ['Sensul.controllers']);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['Sensul']);
});