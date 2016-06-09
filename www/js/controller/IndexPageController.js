/*jslint browser: true*/
/*global console, Paathai*/

Paathai.angular.controller('IndexPageController', ['$scope', '$http', 'InitService', 'DataService', 
	function ($scope, $http, InitService, DataService) {
  		'use strict';
		InitService.addEventListener('ready', function () {
			/*var apiKey = DataService.getApi();
			$cookies.put('googleApi',apiKey.google);*/
	  	});
	}
]);