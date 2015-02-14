'use strict';

angular.module('myApp.personal', ['ngRoute', 'myApp.todo', 'myApp.topReddit'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/personal', {
    templateUrl: 'personal/personal.html',
    controller: 'PersonalCtrl'
  });
}])

.controller('PersonalCtrl', ['$scope', function($scope) {
        $scope.type = "Personal";
        $scope.subreddit1 = "programming";
        $scope.subreddit2 = "gaming";
        $scope.subreddit3 = "funny";
        $scope.subreddits = ["programming", "gaming", "funny"]
}]);