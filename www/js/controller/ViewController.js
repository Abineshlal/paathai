/*jslint browser: true*/
/*global console, Paathai*/

Paathai.angular.controller('ViewController', ['$scope', '$http', 'InitService', 'DataService', 
	function ($scope, $http, InitService, DataService) {
  		'use strict';
		InitService.addEventListener('ready', function () {

	  	});

		$scope.applicationHeight = window.innerHeight;
	}
]);