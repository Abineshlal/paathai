/*jslint browser: true*/
/*global console, Framework7, Paathai, $document*/

Paathai.angular.factory('DataService', ['$document', '$http' , function ($document, $http) {
  'use strict';

  var pub = {},
    eventListeners = {
      'getCategories' : []
    };

  pub.addEventListener = function (eventName, callback) {
    eventListeners[eventName].push(callback);
  };

  pub.getApi = function() {
    var key = {};
    key.google = 'AIzaSyB_yiyBowVTazG6j-NQY70VhZKOwjtFNCg';
    return key;
  };

  pub.getCurrentLocationDetails = function(lat, long) {
    /*var apiKey = $cookies.get('googleApi');
    var apiUri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key='+apiKey;
    return $http.get(apiUri);*/
  }
  
  /*pub.getCategories = function() {
    var categories = {};

    $http.get('js/data/categoryList.json').then(function(result) {
      categories = result;
      for(var callback = 0; callback < eventListeners.getCategories.length; callback++) {
        eventListeners.getCategories[callback](categories);
      }
    }, function(err) {
      console.error(err);
      for(var callback = 0; callback < eventListeners.getCategories.length; callback++) {
        eventListeners.getCategories[callback](categories);
      }
    });
  }*/
 
  return pub;
}]);