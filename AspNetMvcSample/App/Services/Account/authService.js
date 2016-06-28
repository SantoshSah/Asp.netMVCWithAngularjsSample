/// <reference path="authService.js" />
(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$q', '$window', 'errorHandler', '$http', 'tokenHandler'];

    function AuthService($q, $window, errorHandler, $http, tokenHandler) {

        var serviceBase = 'http://localhost:17410/';
      //var serviceBase = 'https://officetool.neptrox.net/';
      var authServiceFactory = {};

        var _saveRegistration = function (registration) {
            console.log("registration data is: " + registration);
            return $http.post('/api/account/register', registration)
                .then(function (response) {
                    return response;
                });
        };

        var _getProfile = function () {
            //console.log("registration data is: " + registration);
            return $http.get('/api/account/GetProfile')
                .then(function (response) {
                    return response;
                });
        };

        var _updateRegistration = function (registration) {
            console.log("registration data is: " + registration);
            return $http.post('/api/account/UpdateProfile', registration)
                .then(function (response) {
                    return response;
                });

        };


        var _login = function (loginData) {
            var deferred = $q.defer();
            var data = "userName=" + loginData.userName + "&password=" + loginData.password + "&grant_type=password";

            $http.post(serviceBase + 'token', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function (result) {
                    
                    tokenHandler.setLoginToken(result.access_token);
                    tokenHandler.setLoginName(result.userName);
                  //  console.log("user name is :" + result.userName);
                    tokenHandler.setRoleName(result.roles);
                   // console.log("user roles are: "+result.roles);
                  //  console.log("user information in authService is "+JSON.stringify(result));
                    //console.log("token handler is:" + tokenHandler)
                    //console.log("getloginname " + tokenHandler.getLoginName());
                    //console.log("username " + result.userName);
                  
                    deferred.resolve(result);
                })
                .error(function (err, status) {
                    _logOut();

                    deferred.reject(err);
                });

            return deferred.promise;

        };

        var _logOut = function () {
            var deferred = $q.defer();

            $http.post('/api/Account/Logout')
                .success(function (response) {
                    tokenHandler.removeLoginToken();
                    tokenHandler.removeLoginName();
                    tokenHandler.removeRoleName();
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _isAuthenticated = function () {
           
            return tokenHandler.hasLoginToken();

        };
        var _userName = function () {
           
            return tokenHandler.getLoginName();
        };
        var _roleName = function () {
           
            return tokenHandler.getRoleName();
        };
        var _isRoleAdmin = function () {
           // console.log("running111 is role admin" + tokenHandler.getRoleName());
            if (tokenHandler.getRoleName() != null) {
                var roleArr = tokenHandler.getRoleName().split(",");
                //console.log("role array is index :" + roleArr.indexOf("Admin"));               
                    if (roleArr.indexOf("Admin") >= 0) {
                       // console.log("index is greater than or equalt to 0");
                        return true;
                    }
                    else
                        return false;                             
            }
            return false;
           
        }

        //var _sendMailForForgetPassword=function(mailData){
        //    return $http.post('/api/account/UpdateProfile', mailData.userName)
        //     .then(function (response) {
        //         return response;
        //     });
       // };
        var _confirmEmail = function (confirmEmailData) {            
            //return $http.get('/api/account/ConfirmEmail?userId='+confirmEmailData.userId+"&code="+confirmEmailData.code)
             return $http.post('/api/account/ConfirmEmail',confirmEmailData)
               .then(function (response) {
                   return response;
               });
        }
        var _sendMailForForgetPassword = function (mailData) {
          return $http.get('/api/account/ForgotPassword?email='+mailData.userName)
                .then(function (response) {
                    return response;
                });
        }

        var _resetPassword=function(resetPasswordData){
            return $http.post('/api/account/ResetPassword', resetPasswordData)
               .then(function (response) {
                   return response;
               });
        }

        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.getProfile = _getProfile;
        authServiceFactory.updateRegistration = _updateRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.isAuthenticated = _isAuthenticated;
        authServiceFactory.userName = _userName;
        authServiceFactory.roleName = _roleName;
        authServiceFactory.isRoleAdmin = _isRoleAdmin;
        authServiceFactory.sendMailForForgetPassword = _sendMailForForgetPassword;
        authServiceFactory.resetPassword = _resetPassword;
        authServiceFactory.confirmEmail = _confirmEmail;
        return authServiceFactory;
    };
})();