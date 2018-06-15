/**
 * Created by Benson on 2016/9/23.
 */
app.controller('registerCtrl', ['$scope', '$state', '$timeout', 'dataService', function($scope, $state, $timeout, dataService) {
    $scope.userRegisterInfo = {
            "username": "",
            "password": "",
            "passValid": "",
            "tel": "",
            "email": ""
        }
        //实现注册功能
    $scope.register = function(params) {

            if ($scope.userRegisterInfo.password !== $scope.userRegisterInfo.passValid) {
                swal("两次输入的密码不一致，请重新输入！");
                return;
            }

            if ($scope.userRegisterInfo.username !== "" && $scope.userRegisterInfo.password !== "" && $scope.userRegisterInfo.passValid !== "" && $scope.userRegisterInfo.tel !== "" && $scope.userRegisterInfo.email !== "") {
                var userRegisterObj = {
                    "username": $scope.userRegisterInfo.username,
                    "password": $scope.userRegisterInfo.password,
                    "tel": $scope.userRegisterInfo.tel,
                    "email": $scope.userRegisterInfo.email
                }

                dataService.registerFun(function(data) {
                    swal(data);
                    $state.go("login");
                }, userRegisterObj);
            } else {
                swal("有点选项没填！");
            }
        }
        //实现注册功能
    $scope.reset = function() {
        $scope.userRegisterInfo = {
            "username": "",
            "password": "",
            "passValid": "",
            "tel": "",
            "email": ""
        }
    }
}]);