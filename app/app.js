'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.personal',
  'myApp.work',
  'myApp.version'
]);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/personal'});
}]);
