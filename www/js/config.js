/*jslint browser: true*/
/*global console, Paathai, angular, Framework7*/

// Init angular
var Paathai = {};

Paathai.config = {
};

Paathai.angular = angular.module('Paathai', ['ngCordova']);

Paathai.fw7 = {
  app : new Framework7({
    animateNavBackIcon: true,
    material: true
  }),
  options : {
    domCache: true //enable inline pages
  },
  views : []
};

Paathai.api = {
	google: 'AIzaSyB_yiyBowVTazG6j-NQY70VhZKOwjtFNCg'
};

Paathai.travelMode = {};