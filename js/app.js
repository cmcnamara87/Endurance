var timeout = angular.module('timeout', []);


timeout.config(function($routeProvider) {

    $routeProvider.
        // Login
        when('/', {
            controller: 'TimeoutCtrl',
            templateUrl: 'partials/home.html'
        }).
        when('/game', {
            controller: 'GameCtrl',
            templateUrl: 'partials/game.html'
        });
        // Register
//        when('/register', {
//            controller: 'RegisterCtrl',
//            templateUrl: 'partials/register.html'
//        }).
//        // User Details (height age)
//        when('/details', {
//            controller: 'DetailsCtrl',
//            templateUrl: 'partials/details.html'
//        }).
//        // View Day
//        when('/day/:dayId', {
//            controller: 'DayCtrl',
//            templateUrl: 'partials/day.html'
//        }).
//        // Enter weights
//        when('/weights', {
//            controller: 'WeightsCtrl',
//            templateUrl: 'partials/weights.html'
//        });
});
