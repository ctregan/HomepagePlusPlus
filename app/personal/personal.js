'use strict';

angular.module('myApp.personal', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/personal', {
    templateUrl: 'personal/personal.html',
    controller: 'PersonalCtrl'
  });
}])

.controller('PersonalCtrl', [function() {

}]);