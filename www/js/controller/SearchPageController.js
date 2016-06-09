/*jslint browser: true*/
/*global console, Paathai*/

Paathai.angular.controller('SearchPageController', ['$scope', '$http', 'InitService', 'DataService', 
  function ($scope, $http, InitService, DataService) {
  'use strict';
    $scope.location = '';
    $scope.destination = '';
    $scope.isNotaValidTrip = true;

  	navigator.geolocation.getCurrentPosition(function(position) {
      DataService.getCurrentLocationDetails(position.coords.latitude, position.coords.longitude).then(function(result) {
        var locationObject = result.data.results[0].address_components;
        var location = '';
        angular.forEach(locationObject, function(object) {
          var types = object.types;
          if($.inArray('locality', types) >= 0) {
            location += object.long_name;
          } else if($.inArray('administrative_area_level_1', types) >= 0) {
            if(location != '') {
              location += ', ';
            }
            location += object.long_name;
          }
        });
        $scope.location = location;
      }, function(error) {
        console.err(error);
      });
  	});

    var options = {
      types: ['(regions)'],
      componentRestrictions: {country: 'in'}
    };
    new google.maps.places.Autocomplete(document.getElementById('destination'), options);
    new google.maps.places.Autocomplete(document.getElementById('source'), options);

    $scope.validateTrip = function() {
      var source = $scope.location;
      var destination = $scope.destination;
console.log(source);
console.log(destination);
      if(source == '' || destination == '') {
        $scope.isNotaValidTrip = true;
      } else {
        $scope.isNotaValidTrip = false;
      }
    }
  }
]);