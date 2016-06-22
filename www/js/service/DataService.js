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
        sessionStorage.setItem("lat", 11.0168);
        sessionStorage.setItem("lng", 76.9558);
      }, function(err) {
        sessionStorage.setItem("lat", "");
        sessionStorage.setItem("lng", "");
      });
  };

 
  return pub;
}]);