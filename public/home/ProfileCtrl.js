var app = angular.module('simbaApp');

app.controller('ProfileCtrl', ['$scope', '$location', '$http', '$routeParams',
    function($scope, $location, $http, $routeParams) {
        var init = function(){
            $scope.title = 'Profile Page Title';
            $http.post('/api/profile')
            .then(function(response){
                console.log('Got response from /api/profile');
                console.log(response);
                if(response.data.success){
                    $scope.user = response.data.user;
                }
            })
            .catch(function(response){
                console.log('Got exception from /api/profile');
                console.error(response);
                $http.get('/');
            })
            .finally(function(){
                console.log('In the finally block of profile controller init method');
            });
        }();
    }
]);
