(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .factory('UserService', UserService);

    UserService.$inject = ['$resource', '$q', '$http'];

    function UserService($resource, $q, $http) {
        var resource = $resource('/api/User/:action/:param', { action: '@action', param: '@param' }, {
            'update': { method: 'PUT' }
        });


        var _getAllUser = function () {
            var deferred = $q.defer();
            $http.get('/api/User/GetAllUsers')
                .then(function (result) {
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;

        };

        var _getUserById = function (userId) {
            var deferred = $q.defer();
          //  console.log("User Service is userId " + userId);
            $http.get('/api/User/GetUserById?userId=' + userId)
                .then(function (result) {
                    console.log("_getUserById result " + JSON.stringify(result));
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;

        };

        var _addUser = function (user) {
            var deferred = $q.defer();
         //   console.log("service user create " + JSON.stringify(user));
            $http.post('/api/User/Create', user)
                .then(function (result) {
                    console.log(result);
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                            console.log(response);
                        });

            return deferred.promise;



        };

        var _updateUser = function (userDto) {
            var deferred = $q.defer();
         //   console.log("from user service:" + JSON.stringify(userDto));
            $http.post('/api/User/Update', userDto)
                .then(function (result) {
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _deleteUser = function (userId) {
            var deferred = $q.defer();

            $http.post('/api/User/Delete', '"' + userId + '"')
                .then(function (result) {
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _getAllRoles = function () {

            var deferred = $q.defer();
        
            $http.get('/api/User/GetAllRoles' )
                .then(function (result) {
                  //  console.log("_role list result " + JSON.stringify(result));
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };
      
        var _getAllProject = function () {

            var deferred = $q.defer();
        
            $http.get('/api/Project/GetProject')
                .then(function (result) {
                    console.log(result);
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                            console.log(response);
                        });

            return deferred.promise;


           
        };

        var _getAllProjectAssignedToUser = function (userId) {
            var deferred = $q.defer();
          //  console.log("User Service is userId " + userId);
            $http.get('/api/User/GetProjectAssignedToUser?userId=' + userId)
                .then(function (result) {
                   //console.log("GetProjectAssignedToUser result " + JSON.stringify(result));
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _getAllRolesAssignedToUser = function (userId) {
            var deferred = $q.defer();
           // console.log("User Service is userId " + userId);
            $http.get('/api/User/GetRolesAssignedToUser?userId=' + userId)
                .then(function (result) {
                  //  console.log("GetRolesAssignedToUser result " + JSON.stringify(result));
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        return {

            getAllUser: _getAllUser,
            getUserById: _getUserById,
            addUser: _addUser,
            updateUser: _updateUser,
            deleteUser: _deleteUser,
            getAllRoles: _getAllRoles,
            getAllProject: _getAllProject,
            getAllRolesAssignedToUser: _getAllRolesAssignedToUser,
            getAllProjectAssignedToUser: _getAllProjectAssignedToUser,


        };

    }

})();