'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.personal',
  'myApp.work',
  'myApp.version'
]);

angular.module('myApp')
    .factory('storage', function($injector){
        return $injector.get('localStorage')
    })

    .factory('localStorage',function($q){
        var STORAGENAMESPACE = 'HomePagePlusPlus';

        var store = {
            _IsJsonString: function(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            },

            _getFromLocalStorage: function(id){
                var retrievedValue = localStorage.getItem(STORAGENAMESPACE + "_" + id);
                if(store._IsJsonString(retrievedValue))
                    return JSON.parse(retrievedValue);

                return retrievedValue;
            },

            _setInLocalStorage: function(id, value){
                var toSave = "";
                //If the item to save is an object, then convert to string
                if(typeof value === 'object')
                    toSave = JSON.stringify(value);
                else
                    toSave = value;

                localStorage.setItem(STORAGENAMESPACE + "_" + id, toSave);
            },

            get: function(key){
                var deferred = $q.defer();

                deferred.resolve(store._getFromLocalStorage(key));

                return deferred.promise;
            },

            insert: function(key, value){
                var deferred = $q.defer();

                store._setInLocalStorage(key, value);

                deferred.resolve("success");

                return deferred.promise;
            }
        };

        return store;
    });

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/personal'});
}]);
