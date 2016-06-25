/*jslint browser: true*/
/*global console, Framework7, Paathai, $document*/

Paathai.angular.factory('DataService', ['$document', '$http', '$cordovaGeolocation' , function ($document, $http, $cordovaGeolocation) {
  'use strict';

  var pub = {},
    eventListeners = {
      'getCategories' : []
    };

  pub.addEventListener = function (eventName, callback) {
    eventListeners[eventName].push(callback);
  };

  pub.getBasicData = function() {

    // get geo location: lat and long
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function (position) {
        //sessionStorage.setItem("lat", position.coords.latitude);
        //sessionStorage.setItem("lng", position.coords.longitude);

        //testing data
        sessionStorage.setItem("lat", 11.0028);
        sessionStorage.setItem("lng", 77.0305);
      }, function(err) {
        sessionStorage.setItem("lat", "");
        sessionStorage.setItem("lng", "");
      });
  };

  pub.setMap = function(myLoc, place, directionsService, directionsDisplay) {
    pub.myLoc = myLoc;
    pub.place = place;
    pub.directionsService = directionsService;
    pub.directionsDisplay = directionsDisplay;
  };

  pub.renderMap = function(travel_mode) {
    var myLoc = pub.myLoc;
    var place = pub.place;
    var directionsService = pub.directionsService;
    var directionsDisplay = pub.directionsDisplay;

    directionsService.route({
                  origin: pub.myLoc,
                  destination: {'placeId': place.place_id},
                  travelMode: travel_mode
                }, function(response, status) {
                  if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                  } else {
                    window.alert('Directions request failed due to ' + status);
                  }
                });
  };

 
  return pub;
}]);