/**
 * Created by CharlesR on 2/13/2015.
 */
angular.module('myApp.topReddit', [])
    .controller('topRedditController', function($scope, $http){
        var redditBaseUrl_constant = "http://www.reddit.com";
        var redditSubreddit = "/r/";
        $scope.redditModifiers = {
            top: "/top.json",
            new: "/new.json",
            rising: "/rising.json",
            hot: ".json"
        };
        $scope.redditTimeModifiers = {
            hour: "t=hour",
            day: "",
            week: "t=week",
            month: "t=month",
            year: "t=year"
        };
        var redditCountModifier = "limit=";

        $scope.topLinks = [];
        $scope.modifier = $scope.redditModifiers.hot;
        $scope.time = $scope.redditTimeModifiers.day;
        $scope.count = 5;
        $scope.loading = false;
        $scope.url = function(){
            if($scope.time == $scope.redditTimeModifiers .day)
                var queryString = "?" + redditCountModifier + $scope.count;
            else
                queryString = "?" + $scope.time + "&" + redditCountModifier + $scope.count;

            return redditBaseUrl_constant + redditSubreddit + $scope.subreddit + $scope.modifier + queryString;
        }

        $scope.$watch('modifier',function(){
            getLinks();
        });

        $scope.$watch('time',function(){
            getLinks();
        });

        getLinks();

        setInterval(getLinks, 60000);

        function getLinks(){
            var now = new Date();
            $scope.lastRefresh = now.toDateString() + " " + now.toLocaleTimeString();
            $scope.loading = true;
            $http.get($scope.url()).success(function(response){
                $scope.topLinks = response.data.children;
                $scope.loading = false;
            });
        };

    })
    .directive('topreddit', function(){
        return {
            restrict: 'E',
            templateUrl: 'controls/topReddit/topReddit.html',
            scope: {
                subreddit : "=type"
            },
            controller: 'topRedditController'
        };
    });