/**
 * Created by Benson on 2016/9/23.
 */
app.controller('loginCtrl', ['$scope', '$state', 'dataService', function($scope, $state, dataService) {

    $scope.user_name_pass = {
        "username": "",
        "password": ""
    }
    $scope.submit = function(params) {
        var userObj = {
            "username": $scope.user_name_pass.username,
            "password": $scope.user_name_pass.password
        }
        dataService.loginFun(function(data) {
            console.log(data);
            if (data == "正确") {
                $state.go("user_create");

            } else {
                console.log(data);
                swal("用户名或密码不正确");
                // var  username={username:data.username}

            }
        }, userObj);

    }
    $scope.goRegister = function() {
        $state.go("register");
    }

}]);