angular.module('starter').factory('factory', ['$http',Factory]);

function Factory($http) {
    var factory = {};
    factory.workout = {};
    factory.getWorkout = function () {
        return $http.get('http://tvbegovic-001-site2.etempurl.com/api/workout/1').then(function (response) {
            factory.workout = response.data;
            return factory.workout;
        });
    };
        

    return factory;
    
};