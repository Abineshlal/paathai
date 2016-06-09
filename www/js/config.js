/*jslint browser: true*/
/*global console, Paathai, angular, Framework7*/

// Init angular
var Paathai = {};

Paathai.config = {
};

Paathai.angular = angular.module('Paathai', []);

Paathai.fw7 = {
  app : new Framework7({
    animateNavBackIcon: true,
    material: true
  }),
  options : {
  },
  views : []
};

