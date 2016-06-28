/// <reference path="taskController.js" />
(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('EmployeeController', EmployeeController);

    EmployeeController.$inject = ['$scope', '$q', 'EmployeeService', 'errorHandler', '$uibModal', '$parse', '$log', '$filter'];

    function EmployeeController($scope, $q, EmployeeService, errorHandler, $uibModal, $parse, $log, $filter) {
       

        //load employee  list
        loadEmployeeList();
       
        // load all department
        loadAllDepartment();

        function loadEmployeeList() {
            $scope.employeeLoader = true;
            var employeeList = EmployeeService.getEmployee();

           $q.all([employeeList]).then(function (data) {
            if (data != null) {
                var records = data[0];
                $scope.employeeList = records.data;
               console.log("employee task list " + JSON.stringify(records.data));
          
                $scope.employeeListLoader = false;
             
            }
        }, function (reason) {
            errorHandler.logServiceError('EmployeeController', reason);
        }, function (update) {
            errorHandler.logServiceNotify('EmployeeController', update);
        });
}

        function loadAllDepartment() {
            console.log('helllo');
            var depart = EmployeeService.getAllDepartment();

            $q.all([depart]).then(function (data) {
                if (data != null) {
                    var records = data[0];
                    $scope.departments = data[0].data;
                    //console.log($scope.allProjects);

                }
            }, function (reason) {
                errorHandler.logServiceError('EmployeeController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('EmployeeController', update);
            });
        }
        $scope.saveEmployee = function () {

            $scope.loadingAdd = true;           
            $scope.employeeFormSubmitting = true;
         
            var employee = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                address:$scope.address,
                departmentId:$scope.departmentId
            }

            EmployeeService.addEmployee(employee).then(function (response) {
                $scope.employeeForm.reset();              
                $scope.message = "Success! Employee is added successfully!!!!";
                $scope.loadingAdd = false;
                $scope.showSuccessAlert = true;
                $scope.showErrorAlert = false;
                $scope.employeeFormSubmitting = false;
                loadEmployeeList();
            }, function (response) {
                console.log(response);
            });

        };

        $scope.Commands = {
            saveEmployee: function (employee) {
                EmployeeService.addEmployee(employee).then(
                    function (result) {                       
                        loadEmployeeList();
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            updateEmployee: function (employee) {
                EmployeeService.updateEmployee(employee).then(
                    function (result) {                       
                        $scope.message = "Employee record is updated Successfully.";
                        $scope.showSuccessAlert = true;
                        $scope.showErrorAlert = false;
                         loadEmployeeList();
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            deleteEmployee: function (employeeId) {
                EmployeeService.deleteEmployee(employeeId).then(
                 function (result) {
                     $scope.message = "Employee record is deleted Successfully.";
                     $scope.showSuccessAlert = true;
                     $scope.showErrorAlert = false;                   
                     loadEmployeeList();
                 },
                 function (response) {
                     console.log(response);
                 }

               );

            }
        };
        $scope.Queries = {
            getEmployee: function () {
               return EmployeeService.getEmployee();
            },
            getEmployeeById: function (employeeId) {
                return EmployeeService.getEmployeeById(employeeId);
            }
        };
        
        $scope.Modals = {
            open: function (employee, action) {
           
                $scope.Queries.getEmployeeById(employee.id).then(
                    function (result) {
                         
                         $scope.employee = result.data;                         
                         $scope.employee.action = '';
                         $scope.employee.action = action;
                         $scope.isDeleteForm = false;
                         //console.log("action after open " + action);
                         $scope.title = '';
                         
                         if (action == 'Delete') {                             
                             $scope.title = 'Are you sure want to delete this record?';
                             $scope.isDeleteForm = true;
                         }
                         else if(action=='Edit') {
                             $scope.title = 'Edit the employee information. ';                    
                         }
                        
                        
                         var modalInstance = $uibModal.open({
                             animation: true,
                             templateUrl: '/App/Templates/Employee/EmployeeFormModal.html',
                             controller: 'EmployeeFormModalController',
                             size: 'lg',
                             scope: $scope,
                             backdrop: 'static'
                         });

                         modalInstance.result.then(
                             function (employee) {
                        
                                 if (employee.id != null) {
                                     if (employee.action == 'Edit') {
                                      $scope.Commands.updateEmployee(employee);
                      
                                  }
                                      //console.log("update code here goes " + task.id);
                                     else if (employee.action == 'Delete') {
                                      $scope.Commands.deleteEmployee(employee.id);                                  
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


        var that = $scope;

        $scope.open = {
            date: false
        };
        $scope.buttonBar = {
            show: true,
            now: {
                show: true,
                text: 'Now!'
            },
            today: {
                show: true,
                text: 'Today!'
            },
            clear: {
                show: false,
                text: 'Wipe'
            },
            date: {
                show: true,
                text: 'Date'
            },
            time: {
                show: true,
                text: 'Time'
            },
            close: {
                show: true,
                text: 'Shut'
            }
        };
        $scope.onClosed = function (args) {
            that.closedArgs = args;
        };
        $scope.openCalendar = function (e, date) {
            console.log('date is  ' + date + ' e is :' + e);
            that.open[date] = true;

        };
      
       
    };
})
();