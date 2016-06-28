(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$location', '$timeout', 'AuthService'];

    function RegisterController($scope, $location, $timeout, AuthService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";

        $scope.registration = {
            firstName: "",
            lastName: "",
            email : "",
            userName: "",
            password: ""
        };
        $scope.hasError = false;
      
        $scope.signUp = function () {
            $scope.loadingAccountRegister = true;
            AuthService.saveRegistration($scope.registration)
                .then(function (response) {
                  
                    $scope.message = {
                       // success: true,
                        description: "Registered successfully!!!!!"
                    };
                    $scope.loadingAccountRegister = false;
                    $location.path('/Account/CheckEmail');
                   // startTimer();
            },
             function (response) {
                 var errors = [];
                 for (var key in response.data.modelState) {
                     for (var i = 0; i < response.data.modelState[key].length; i++) {
                         errors.push(response.data.modelState[key][i]);
                     }
                 }
                 $scope.hasError = true;
                 $scope.loadingAccountRegister = false;
                 $scope.message = {
                  //   success: false,
                     description: "Failed to register user : " + errors.join(' ')
                 };


             });
        };

        //var startTimer = function () {
        //    var timer = $timeout(function () {
        //        $timeout.cancel(timer);
        //        $location.path('/Account/Login');
        //    }, 2000);
        //}

        $scope.passwordValidator = function (password) {

            if (!password) { return; }

            if (password.length < 6) {
                return "Password must be at least " + 6 + " characters long";
            }

            //if (!password.match(/[A-Z]/)) {
            //    return "Password must have at least one capital letter";
            //}

            //if (!password.match(/[0-9]/)) {
            //    return "Password must have at least one number";
            //}

            return true;
        };
    }
})();
