(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('ResetPasswordController', ResetPasswordController);
    ResetPasswordController.$inject = ['$scope','$location', 'AuthService','$routeParams'];
    function ResetPasswordController($scope,$location, AuthService,$routeParams) {
   //  console.log("dilip param is userId :" + $routeParams.userId);
    // console.log("dilip param is code :" + $routeParams.code);

     $scope.resetPassword = function () {
        // console.log("reset password is clicked");
         // if ($routeParams.userId && $routeParams.code) {
                $scope.loadingReset=true;
                var resetPasswordData = {
                    userId: $routeParams.userId,
                    code: $routeParams.code,
                    email: $scope.userName,
                    password: $scope.password
                }
                console.log("reset password data are :" + JSON.stringify(resetPasswordData));
                AuthService.resetPassword(resetPasswordData).then(
                   function (response) {                       
                       $scope.loadingReset=false;
                       $location.path('/Account/ResetPasswordConfirmation');
                   },
                function (data) {
                    console.log("error in email confirmed");
                    $scope.loadingReset=false;
                });
           // }
     }

     $scope.passwordValidator = function (password) {

         if (!password) { return; }

         if (password.length < 6) {
             return "Password must be at least " + 6 + " characters long";
         }

         return true;
     };
    }
})();
