(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .factory('DepartmentService', DepartmentService);

    DepartmentService.$inject = ['$resource', '$q', '$http'];

    function DepartmentService($resource, $q, $http) {
        
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

        }

      
        var _addDepartment = function (department) {
            var deferred = $q.defer();          
            $http.post('/api/Department/Save', department)
                .then(function (result) {
                    deferred.resolve(result);
                   
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _getDepartmentById = function (departmentId) {
            var deferred = $q.defer();
          
            $http.get('/api/department/GetdepartmentById?departmentId='+ departmentId)       
                .then(function (result) {               
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _updateDepartment= function (employeeDto) {
            var deferred = $q.defer();           
            $http.post('/api/Department/Save',employeeDto)
                .then(function (result) {
                    deferred.resolve(result);
                },
                        function (response) {
                            deferred.reject(response);
                        });

            return deferred.promise;
        };

        var _deleteDepartment= function (employeeId) {
            var deferred = $q.defer();
           
           $http.post('/api/Department/Delete','"'+employeeId+'"')
               .then(function (result) {                   
                   deferred.resolve(result);
               },
                       function (response) {
                           deferred.reject(response);
                       });
            
            return deferred.promise;
        };


            return {
            getDepartment: _getDepartment,
            addDepartment:_addDepartment,           
            updateDepartment:_updateDepartment,
            deleteDepartment: _deleteDepartment  ,         
            getDepartmentById: _getDepartmentById,          
        };

    }

})();