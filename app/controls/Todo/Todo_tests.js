'use strict';

describe('myApp.todo module', function() {

    beforeEach(module('myApp.todo'));
    beforeEach(module('myApp.storage'));

    describe('todo controller', function(){
        var ctrl, scope, storage, data, saveDataCount;
        beforeEach(inject(function($controller, $rootScope, localStorage){
            scope = $rootScope.$new();
            saveDataCount = 0;
            storage = localStorage;
            data = [];
            localStorage._getFromLocalStorage = function(id){
                this.dataDictionary[id] = data;
                return data;
            };
            localStorage._setInLocalStorage = function(id, value){
                saveDataCount++;
                this.dataDictionary[id] = value;
                return;
            }

            ctrl = $controller('todoController', { $scope : scope, storage: storage});
        }))
        it('should have empty add to do', function() {
            expect(scope.newTodo).toBe('');
        });

        it('should not have an edited Todo to start', function() {
            expect(scope.editedTodo).toBeNull();
        });

        it('should not have any Todos on start', function(){
           expect(scope.todos.length).toBe(0);
        });

        describe('loading todos', function(){
            var ctrl;

            beforeEach(inject(function($controller){
                data = [
                    {
                        completed: false,
                        title: "incomplete"
                    },
                    {
                        completed: true,
                        title: "complete"
                    },
                    {
                        completed: true,
                        title: "complete2"
                    }]


                ctrl = $controller('todoController', {
                    $scope : scope,
                    storage: storage
                })

                scope.$digest();
            }));

            it('should set initial todos', function(){
                expect(scope.todos.length).toBe(3);
            });

            it('should update counts', function(){
                expect(scope.remainingCount).toBe(1);
                expect(scope.completedCount).toBe(2);
                expect(scope.allChecked).toBeFalsy();
            });

            it('markAll() should mark all Todos completed', function(){
                scope.markAll(true);
                scope.$digest()

                expect(scope.completedCount).toBe(scope.todos.length);
                expect(scope.allChecked).toBeTruthy();
            });

            it('clearCompletedTodos() should remove completed todos', function(){
                scope.clearCompletedTodos();
                scope.$digest()

                expect(scope.completedCount).toBe(0);
                expect(scope.todos.length).toBe(1);
            });

            describe('adding todos', function(){

                it('should update counts', function(){
                    scope.newTodo = "new Todo";

                    scope.addTodo();
                    scope.$digest();
                    expect(scope.todos.length).toBe(4);
                    expect(scope.remainingCount).toBe(2);
                    expect(saveDataCount).toBe(1);
                });

                it('should ignore empty', function(){
                    scope.newTodo = "";

                    scope.addTodo();
                    scope.$digest();
                    expect(scope.todos.length).toBe(3);
                    expect(scope.remainingCount).toBe(1);
                    expect(saveDataCount).toBe(0);
                });
            })
        });



    });
});/**
 * Created by CharlesR on 2/12/2015.
 */
