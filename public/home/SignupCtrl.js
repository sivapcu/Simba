// public/js/controllers/MainCtrl.js
angular.module('SignupCtrl', []).controller('SignupCtrl', function($scope, UserService) {
    $scope.message = '';
    $scope.dataLoading = false;

    $scope.signup = function () {
        $scope.dataLoading = true;
        UserService.signup($scope.email, $scope.password, function(response){
            $scope.dataLoading = false;
            if(response.status === 200) {
                $scope.message = response.data;
                $scope.message = 'Signup Successful';
            } else {
                $scope.message = response.data;
                $scope.message = 'Signup Failed';
            }
        });
    };
});
