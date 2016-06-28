(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('EditController', EditController);

    EditController.$inject = ['$scope', '$location', '$timeout', 'AuthService'];

    function EditController($scope, $location, $timeout, AuthService) {

        $scope.savedSuccessfully = false;
        $scope.message = "";
         
        console.log("get user information 1");

       // var profile = AuthService.getProfile();
        AuthService.getProfile().then(
                       function (data) {
                           console.log("users informatioin is:", data.data);
                           $scope.registration = {
                               firstName: data.data.firstName,
                               lastName: data.data.lastName,
                               email: data.data.email                                                      
                           };
                       },
                       function (response) {
                           console.log(response);
                       });


        $scope.edit = function () {
            AuthService.updateRegistration($scope.registration)
                .then(function (response) {

                    $scope.savedSuccessfully = true;
                    location.href = '/';
                    $scope.message = {
                       // success: true,
                        description: "Profile updated successfully!!"
                    };                   
                },
             function (response) {
                 var errors = [];
                 for (var key in response.data.modelState) {
                     for (var i = 0; i < response.data.modelState[key].length; i++) {
                         errors.push(response.data.modelState[key][i]);
                     }
                 }

                 $scope.message = {
                     success: false,
                     description: "Failed to update profile : " + errors.join(' ')
                 };

             });
        };

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
