'use strict';

describe('myApp.todo module', function() {

    beforeEach(module('myApp.todo'));

    describe('todo controller', function(){
        var ctrl, scope, storage;
        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();

            //storage = localStorage;

            //localStorage._getFromLocalStorage = function(){
            //    return {};
           // };
            //localStorage._setInLocalStorage = function(){
           //     return;
           // }

            ctrl = $controller('todoController', { $scope : scope});
        }))
        it('should ....', inject(function($) {
            expect(ctrl).toBeDefined();
        }));

    });
});/**
 * Created by CharlesR on 2/12/2015.
 */
