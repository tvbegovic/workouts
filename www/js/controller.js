angular.module('starter').controller('controller', Controller);

function Controller($scope, $ionicPopup, $timeout, $ionicLoading,factory) {
    $scope.page = 1;

    $scope.resultObject = { totalReps: 0, totalTime: 0, datePlayed: null };

    $scope.exercise = { name: '', picture: '', reps: 0 };
    var workout = {};
    
    var currentIndex = 0;
    $scope.counter = 0;
    var timer;

    $scope.start = function () {
        $scope.page = 2;
        timer = $timeout(countUp, 1000);
        showExercise();
    };

    function countUp()
    {
        $scope.counter++;
        timer = $timeout(countUp, 1000);
    }

    function showExercise()
    {
        $scope.exercise = workout.exercises[currentIndex];
    }

    $scope.increaseReps = function () {
        $scope.exercise.reps++;
    };

    $scope.decreaseReps = function () {
        $scope.exercise.reps--;
        if ($scope.exercise.reps < 0)
            $scope.exercise.reps = 0;
    };

    $scope.next = function () {
        if (currentIndex < workout.exercises.length - 1) {
            currentIndex++;
            $scope.resultObject.totalReps += $scope.exercise.reps;
            showExercise();
        }
        else {
            showEndScreen();
        }
    };

    function showEndScreen() {
        $scope.page = 3;
        $scope.resultObject.totalTime = $scope.counter;
        $timeout.cancel(timer);
        $scope.resultObject.datePlayed = new Date();
        localStorage.setItem('result', JSON.stringify($scope.resultObject));
    };

    function loadFromServer()
    {
        $ionicLoading.show({ template: 'Čitam sa servera...' });
        factory.getWorkout().then(function () {
            $ionicLoading.hide();
            workout = factory.workout;
            
        });
    }

    function checkResult()
    {
        var storage = localStorage.getItem('result');
        if (storage != null)
            $scope.resultObject = JSON.parse(storage);
    }

    $scope.formatDate = function (isodate) {
        return moment(isodate).format('DD.MM.YYYY HH:mm');
    };

    loadFromServer();
    checkResult();
}