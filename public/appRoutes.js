var app = angular.module('simbaApp');

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
        // home page that will use the MainController
        .when('/', {
            templateUrl: 'home/view/home.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: 'authentication/view/login.html',
            controller: 'UserCtrl'
        })
        .when('/signup', {
            templateUrl: 'authentication/view/signup.html',
            controller: 'UserCtrl'
        })
        .when('/profile', {
            templateUrl: 'home/view/profile.html',
            controller: 'ProfileCtrl'
        });

        $locationProvider.html5Mode(true);
    }
]);
