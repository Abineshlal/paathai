/*jslint browser: true*/
/*global console, MyApp*/

Paathai.angular.controller('CategoryPageController', ['$scope', '$http', 'InitService', function ($scope, $http, InitService) {
  'use strict';

  $scope.category = '';

  $scope.selectCategory = function () {
	Paathai.fw7.views[0].router.load({pageName: 'place'});
  }
}]);