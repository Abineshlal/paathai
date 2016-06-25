/*jslint browser: true*/
/*global console, Paathai*/

Paathai.angular.controller('RoutePageController', ['$scope', '$http', 'InitService', 'DataService', 
	function ($scope, $http, InitService, DataService) {
  		'use strict';

  		$scope.updateTravelMode = function(travelMode) {
  			DataService.renderMap(Paathai.travelMode[travelMode])
  		};

	}
]);