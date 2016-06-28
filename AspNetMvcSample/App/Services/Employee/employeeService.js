(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .factory('EmployeeService', EmployeeService);

    EmployeeService.$inject = ['$resource', '$q', '$http'];

    function EmployeeService($resource, $q, $http) {
        
        var _getEmployee = function () {           
            var deferred = $q.defer();
            $http.get('/api/Employee/GetEmployee')
                .then(function (result) {
                    deferred.resolve(result);
                   
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;

        }

      
        var _addEmployee = function (employee) {
            var deferred = $q.defer();          
            $http.post('/api/Employee/Save', employee)
                .then(function (result) {
                    deferred.resolve(result);
                   
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _getEmployeeById = function (employeeId) {
            var deferred = $q.defer();
          console.log("employee id is :"+employeeId);
            $http.get('/api/Employee/GetEmployeeById?employeeId='+ employeeId)       
                .then(function (result) {               
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _updateEmployee= function (employeeDto) {
            var deferred = $q.defer();           
            $http.post('/api/Employee/Save',employeeDto)
                .then(function (result) {
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _deleteEmployee= function (employeeId) {
            var deferred = $q.defer();
           
           $http.post('/api/Employee/Delete','"'+employeeId+'"')
               .then(function (result) {                   
                   deferred.resolve(result);
               },
                       function (response) {
                           deferred.reject(response);
                       });
            
            return deferred.promise;
        };

        var _getDepartment = function () {

            var deferred = $q.defer();
            $http.get('/api/Department/GetDepartment')
                 .then(function (result) {
                     deferred.resolve(result);

                 },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

    

        var _getAllDepartment = function () {
            var deferred = $q.defer();
            $http.get('/api/Department/GetDepartment')
                 .then(function (result) {
                     deferred.resolve(result);

                 },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

            return {
            getEmployee: _getEmployee,
            addEmployee:_addEmployee,            
            updateEmployee: _updateEmployee,
            deleteEmployee: _deleteEmployee,
            getDepartment: _getDepartment,
            getAllDepartment: _getAllDepartment,
            getEmployeeById: _getEmployeeById,          
        };

    }

})();