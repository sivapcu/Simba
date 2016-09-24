// public/js/controllers/MainCtrl.js
angular.module('SignupCtrl', ['ngMessages']).controller('SignupCtrl', function($scope, UserService) {
    $scope.message = '';
    $scope.error = false;
    $scope.dataLoading = false;

    $scope.signup = function () {
        $scope.dataLoading = true;
        UserService.signup($scope.email, $scope.password, function(response){
            $scope.dataLoading = false;
            if(response.status === 200) {
                $scope.message = response.data[0];
                $scope.error = false;
            } else {
                $scope.message = response.data[0];
                $scope.error = true;
            }
        });
    };
});
