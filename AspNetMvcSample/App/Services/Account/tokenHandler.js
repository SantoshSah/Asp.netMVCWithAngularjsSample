(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .factory('tokenHandler', tokenHandler);

    tokenHandler.inject = ['storageHandler'];

    function tokenHandler(storageHandler) {
        var loginTokenId = 'aspNetMvcSample-app-loginToken-2016';
        var nameTokenId = 'aspNetMvcSample-app-loginName-2016';
        var roleTokenId='aspNetMvcSample-app-roleName-2016';
        var redirectUrl = null;

        return {
            setLoginToken: function (token) {
                storageHandler.setItem(loginTokenId, token);

            },
            getLoginToken: function () {
                return storageHandler.getItem(loginTokenId);

            },
            removeLoginToken: function () {
                storageHandler.removeItem(loginTokenId);
            },
            hasLoginToken: function () {
                return this.getLoginToken() != null;
            },
            setRedirectUrl: function (url) {
                redirectUrl = url;
            },
            getRedirectUrl: function () {
                return redirectUrl;
            },
            setLoginName: function (name) {
                storageHandler.setItem(nameTokenId, name);
            },
            getLoginName: function () {
                return storageHandler.getItem(nameTokenId);
            },
            removeLoginName: function () {
                storageHandler.removeItem(nameTokenId);
            },
            //added by dilip for role in 9 march 2016
            setRoleName: function (role) {
                storageHandler.setItem(roleTokenId, role);
            },
            getRoleName: function () {
                return storageHandler.getItem(roleTokenId);
            },
            removeRoleName: function () {
                storageHandler.removeItem(roleTokenId);
            }
        }

    }

}());