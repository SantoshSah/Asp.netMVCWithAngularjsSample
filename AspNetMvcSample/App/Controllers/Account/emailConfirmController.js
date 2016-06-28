(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('EmailConfirmController', EmailConfirmController);
    EmailConfirmController.$inject = ['$scope','$location', 'AuthService','$routeParams'];
    function EmailConfirmController($scope,$location, AuthService,$routeParams) {
     console.log("dilip param is userId :" + $routeParams.userId);
        console.log("dilip param is code :" + $routeParams.code);
        if ($routeParams.userId && $routeParams.code) {
            var confirmEmailData = {
                userId: $routeParams.userId,
                code: $routeParams.code
            }
            AuthService.confirmEmail(confirmEmailData).then(
               function (response) {
                   console.log("successfully email is confirmed");
               },
            function (data) {
                console.log("error in email confirmed");
            });           
        }
    }
})();
