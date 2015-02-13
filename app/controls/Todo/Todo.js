angular.module('myApp.todo', [])
    .controller("todoController", function($scope, $filter, storage){
        var todos = $scope.todos = [];
        $scope.loading = true;
        storage.get("toDo-" + $scope.namespace).then(function(loadedTDs){
            $scope.todos = loadedTDs ? loadedTDs : [];
            $scope.loading = false;
        });

        $scope.storage = storage;
        $scope.newTodo = '';
        $scope.editedTodo = null;

        function saveTodos(){
            $scope.saving = true;
            $scope.storage.insert("toDo-" + $scope.namespace, $scope.todos).then(function success() {
                $scope.newTodo = '';
            })
                .finally(function () {
                    $scope.saving = false;
                });
        };


        $scope.$watch('todos', function () {
            $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
        }, true);

        $scope.addTodo = function () {
            var newTodo = {
                title: $scope.newTodo.trim(),
                completed: false
            };

            if (!newTodo.title) {
                return;
            }


            $scope.todos.push(newTodo);
            saveTodos();
        };

        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            // Clone the original todo to restore it on demand.
            $scope.originalTodo = angular.extend({}, todo);
        };

        $scope.saveEdits = function (todo, event) {
            // Blur events are automatically triggered after the form submit event.
            // This does some unfortunate logic handling to prevent saving twice.
            if (event === 'blur' && $scope.saveEvent === 'submit') {
                $scope.saveEvent = null;
                return;
            }

            $scope.saveEvent = event;

            if ($scope.reverted) {
                // Todo edits were reverted-- don't save.
                $scope.reverted = null;
                return;
            }

            todo.title = todo.title.trim();

            if (todo.title === $scope.originalTodo.title) {
                $scope.editedTodo = null;
                return;
            }
            var index =  todos.indexOf(todo);
            if(todo.title){
                $scope.todos[index] = todo;
            }else{
                $scope.todos.splice(index, 1);
            }
            $scope.editedTodo = null;

            saveTodos();
        };

        $scope.revertEdits = function (todo) {
            $scope.todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.editedTodo = null;
            $scope.originalTodo = null;
            $scope.reverted = true;
        };

        $scope.removeTodo = function (todo) {
            $scope.todos.splice(todos.indexOf(todo), 1);
        };

        $scope.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.completed = completed;
            }

            $scope.todos[todos.indexOf(todo)] = todo;

            saveTodos();
        };

        $scope.clearCompletedTodos = function () {
            //store.clearCompleted();
            var notCompleted = [];
            $scope.todos.forEach(function(todo, index){
                if(!todo.completed){
                    notCompleted.push(todo);
                }
            });

            angular.copy(notCompleted, $scope.todos);
        };

        $scope.markAll = function (completed) {
            $scope.todos.forEach(function (todo) {
                if (todo.completed !== completed) {
                    $scope.toggleCompleted(todo, completed);
                }
            });
        };

        $scope.changeFilter = function(filter){
            var status = $scope.status = filter;

            $scope.statusFilter = (status === 'active') ?
            { completed: false } : (status === 'completed') ?
            { completed: true } : null;
        }


    })
    .directive("todo", function(){
        return {
            restrict: 'E',
            templateUrl: 'controls/Todo/Todo.html',
            scope: {
                namespace : "=type"
            },
            controller: 'todoController'
        };

});