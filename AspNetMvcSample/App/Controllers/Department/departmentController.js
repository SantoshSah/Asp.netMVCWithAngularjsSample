/// <reference path="taskController.js" />
(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('DepartmentController',DepartmentController);

    DepartmentController.$inject = ['$scope', '$q','DepartmentService','errorHandler', '$uibModal', '$parse', '$log', '$filter'];

    function DepartmentController($scope, $q, DepartmentService, errorHandler, $uibModal, $parse, $log, $filter) {
       

        //load loadDepartmentList 
       loadDepartmentList();

        function loadDepartmentList() {
            $scope.departmentLoader = true;
            var departmentList = DepartmentService.getDepartment();

           $q.all([departmentList]).then(function (data) {
            if (data != null) {
                var records = data[0];
                $scope.departmentList = records.data;
               //console.log("todo task list " + JSON.stringify(records.data));          
                $scope.departmentLoader = false;             
            }
        }, function (reason) {
            errorHandler.logServiceError('DepartmentController', reason);
        }, function (update) {
            errorHandler.logServiceNotify('DepartmentController', update);
        });
}

       
        $scope.saveDepartment = function () {
            $scope.loadingAdd = true;           
            $scope.departmentFormSubmitting = true;
         
            var department = {
                Name: $scope.name,
                Description: $scope.description,              
            }

            DepartmentService.addDepartment(department).then(function (response) {
                $scope.departmentForm.reset();              
                $scope.message = "Success! Department is added successfully!!!!";
                $scope.loadingAdd = false;
                $scope.showSuccessAlert = true;
                $scope.showErrorAlert = false;
                $scope.departmentFormSubmitting = false;
                loadDepartmentList();
            }, function (response) {
                console.log(response);
            });

        };

        $scope.Commands = {
            saveDepartment: function (department) {
                DepartmentService.addDepartment(department).then(
                    function (result) {                       
                         loadDepartmentList();
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            updateDepartment: function (department) {
                DepartmentService.updateDepartment(department).then(
                    function (result) {                       
                        $scope.message = "Department record is updated Successfully.";
                        $scope.showSuccessAlert = true;
                        $scope.showErrorAlert = false;
                         loadDepartmentList();
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            deleteDepartment: function (departmentId) {
                DepartmentService.deleteDepartment(departmentId).then(
                 function (result) {
                     $scope.message = "Department record is deleted Successfully.";
                     $scope.showSuccessAlert = true;
                     $scope.showErrorAlert = false;                   
                     loadDepartmentList();
                 },
                 function (response) {
                     console.log(response);
                 }

               );

            }
        };
        $scope.Queries = {
            getDepartment: function () {
               return DepartmentService.getDepartment();
            },
            getDepartmentById: function (departmentId) {
                return DepartmentService.getDepartmentById(departmentId);
            }
        };
        
        $scope.Modals = {
            open: function (department,action) {
           
                $scope.Queries.getDepartmentById(department.id).then(
                    function (result) {
                         
                         $scope.department = result.data;                         
                         $scope.department.action = '';
                         $scope.department.action = action;
                         $scope.isDeleteForm = false;
                         //console.log("action after open " + action);
                         $scope.title = '';
                         
                         if (action == 'Delete') {                             
                             $scope.title = 'Are you sure want to delete this record?';
                             $scope.isDeleteForm = true;
                         }
                         else if(action=='Edit') {
                             $scope.title = 'Edit the department information. ';                    
                         }
                        
                        
                         var modalInstance = $uibModal.open({
                             animation: true,
                             templateUrl: '/App/Templates/Department/DepartmentFormModal.html',
                             controller: 'DepartmentFormModalController',
                             size: 'lg',
                             scope: $scope,
                             backdrop: 'static'
                         });

                         modalInstance.result.then(
                             function (department) {
                        
                              if (department.id != null) {
                                  if (department.action == 'Edit') {                                                                                                                                       
                                      $scope.Commands.updateDepartment(department);                      
                                  }
                                      //console.log("update code here goes " + task.id);
                                  else if (department.action == 'Delete') {
                                      $scope.Commands.deleteDepartment(department.id);                                  
                                  }                                  
                                 }
                             },
                             function (event) {

                             }); 
                    },
                    function (response) {
                        console.log(response);
                    });
            },
        
        }
    };
})
();