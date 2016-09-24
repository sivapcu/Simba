// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    // home page that will use the MainController
    .when('/', {
        templateUrl: 'home/view/home.html',
        controller: 'MainCtrl'
    })
    .when('/login', {
        templateUrl: 'authentication/view/login.html',
        controller: 'LoginCtrl'
    })
    .when('/signup', {
        templateUrl: 'authentication/view/signup.html',
        controller: 'SignupCtrl'
    })
    .when('/profile', {
        templateUrl: 'home/view/profile.html',
        controller: 'ProfileCtrl'
    });

    $locationProvider.html5Mode(true);

}]);
