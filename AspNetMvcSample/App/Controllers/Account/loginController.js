(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'AuthService', '$routeParams'];

    function LoginController($scope, $location, AuthService,$routeParams) {
       
        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.message = "";

        $scope.login = function () {
            $scope.loadingLogin = true;
            AuthService.login($scope.loginData).then(
                function (response) {
                    $scope.loadingLogin = false;
                    console.log("success login attempt");
                    $scope.Global.isAuthenticated = true;
                    $scope.Global.isRoleAdmin = AuthService.isRoleAdmin();
                    $scope.Global.userName=AuthService.userName();
                    $location.path('/');
                },
             function (data) {
                 $scope.loadingLogin = false;
                 $scope.message = data.error_description;
             });
        };

        $scope.sendMailForForgetPassword=function(){
            console.log("sent mail");
            $scope.loadingMail=true;
            $scope.mailData = {
                userName: $scope.userName               
            };            
            AuthService.sendMailForForgetPassword($scope.mailData).then(
                function (response) {
                    $scope.loadingMail=false;
                    $location.path('/Account/ForgetPasswordConfirmation');                      
                    console.log("succesfully email sent ");
                },
             function (data) {
              $scope.loadingMail=false;
                // $scope.loadingLogin = false;
                
             });
       }
    }
})();