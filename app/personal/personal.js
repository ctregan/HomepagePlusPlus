'use strict';

angular.module('myApp.personal', ['ngRoute', 'myApp.todo'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/personal', {
    templateUrl: 'personal/personal.html',
    controller: 'PersonalCtrl'
  });
}])

.controller('PersonalCtrl', ['$scope', function($scope) {
        $scope.type = "Personal";
}]);