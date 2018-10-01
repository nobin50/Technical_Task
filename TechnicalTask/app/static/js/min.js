var app = angular.module('myapp', ['ui.router']);
app.constant('BASE_URL', 'http://127.0.0.1:8000/api/v1/contact/');

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home',{
            url : '/',
            templateUrl : '/static/templates/home.html',
            controller : 'mycontroller'
        })
        .state('add-todo',{
            url : '/add',
            templateUrl : '/static/templates/add_todo.html',
            controller : 'mycontroller'
        });
    $urlRouterProvider.otherwise('/');

});




app.controller('fessCntrl', function ($scope) {
 

});

app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;





            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);



app.service('Todos', function($http, BASE_URL){
    var Todos = {};

    Todos.all = function(){
        return $http.get(BASE_URL);
    };
    Todos.update = function(updatedTodo){
        return $http.put(BASE_URL + updatedTodo.id, updatedTodo);
    };
    Todos.delete = function(id){
        return $http.delete(BASE_URL + id + '/');
    };
    Todos.addOne = function(newTodo){
        return $http.post(BASE_URL, newTodo);
    };
    return Todos;
});


app.controller('mycontroller', function($scope, Todos, $state){
    $scope.newTodo = {};
    $scope.addTodo = function(){
        Todos.addOne($scope.newTodo)
            .then(function(res){
                $state.go('home');
        });
    };
    $scope.toggleCompleted = function(Todo){
        Todos.update(todo);
    };

    $scope.deleteTodo = function(id){
        Todos.delete(id);
        $scope.todos = $scope.todos.filter(function(todo){
            return todo.id !== id;
        });
    };

    Todos.all()
        .then(function(res){
            $scope.todos = res.data;
        });
});