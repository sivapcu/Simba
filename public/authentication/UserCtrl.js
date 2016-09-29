var app = angular.module('simbaApp');

app.controller('UserCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.message = '';
    $scope.error = false;
    $scope.dataLoading = false;

    $scope.signup = function () {
        $scope.message = '';
        $scope.error = false;
        $scope.dataLoading = true;

        var formData = $scope.form;

        $http.post('/api/signup', formData)
        .then(function(response){
            if(response.data.success) {
                return $location.path('/profile');
            } else {
                $scope.message = response.data.message;
                $scope.error = true;
                $scope.dataLoading = false;
            }
        })
        .catch(function(response){
            $scope.message = response.data[0];
            $scope.error = true;
            $scope.dataLoading = false;
        })
        .finally(function(){

        });
    };

    $scope.login = function () {
        $scope.message = '';
        $scope.error = false;
        $scope.dataLoading = true;

        var formData = $scope.form;

        $http.post('/api/login', formData)
        .then(function(response){
            if(response.data.success) {
                return $location.path('/profile');
            } else {
                $scope.message = response.data.message;
                $scope.error = true;
                $scope.dataLoading = false;
            }
        })
        .catch(function(response){
            $scope.message = response.data[0];
            $scope.error = true;
            $scope.dataLoading = false;
        })
        .finally(function(){

        });
    };
}]);
