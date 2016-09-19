angular.module('UserService', []).factory('UserService', ['$http', function($http) {

    var self = {};

    self.signup = function(email, password, callback){
        $http.post('/api/signup', {'email':email, 'password':password})
        .then(function(response){
            console.log('UserService.signup() - Inside then block');
            console.log('data = ' + response.data);
            console.log('status = ' + response.status);
            callback(response);
        })
        .catch(function(response){
            console.log('UserService.signup() - Inside catch block');
            console.log('data = ' + response.data);
            console.log('status = ' + response.status);
            callback(response);
        })
        .finally(function(){
            console.log("UserService.signup() - Inside finally block");
        });
    };

    self.login = function(email, password){
        $http.post('/api/login', {'email':email, 'password':password})
        .success(function(data, status){
            console.log('UserService - Login Successful');
            console.log('data = ' + data);
            console.log('status = ' + status);
            // $state.go('profile');
        })
        .error(function(data){
            console.trace(data);
            // $state.go('login');
        });
    };

    return self;
}]);
