
(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
      
        .controller('UserController',UserController) ;
           

    UserController.$inject = ['$scope', '$q', 'UserService', 'errorHandler', '$uibModal'];

    function UserController($scope, $q, UserService, errorHandler, $uibModal) {

        $scope.selection=[];

        $scope.projectSelection = [];

        $scope.toggleSelection = function toggleSelection(name) {

            var idx = $scope.selection.indexOf(name);

            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }

            else {
                $scope.selection.push(name);
            }

        };

        $scope.toggleProjectSelection = function toggleProjectSelection(name) {

            var idx = $scope.projectSelection.indexOf(name);

            if (idx > -1) {
                $scope.projectSelection.splice(idx, 1);
            }

            else {
                $scope.projectSelection.push(name);
            }

        };

        $scope.saveUser = function () {

            $scope.loadingAdd = true;
            $scope.userFormSubmitting = true;
            var user = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                phoneNumber: $scope.phoneNumber,
                userName: $scope.userName,
                password: $scope.password,
                roleId: $scope.selection.toString(),               
              
            }
            console.log("user role " + user);
            UserService.addUser(user).then(function (result) {
                if (result.data.errorMessage) {
                
                    $scope.message1 = result.data.errorMessage;
                    console.log("Error Message of User: " + result.data.errorMessage);
                    $scope.loadingAdd = false;
                    $scope.userFormSubmitting = false;
                    $scope.showSuccessAlert = false;
                    $scope.showErrorAlert = true;
                    loadAllUser();
                    
                }
                else {
                    $scope.userForm.reset();
                    //$scope.selection = [];
                    //console.log("selection is :"+$scope.selection);
                    $scope.message = "Success! User is added successfully!!!!";
                    $scope.loadingAdd = false;
                    $scope.userFormSubmitting = false;
                    $scope.showSuccessAlert = true;
                    $scope.showErrorAlert = false;
                    loadAllUser();
                }
               
            },
                function (response) {
                console.log(response);
            });
          
            
        };

      
        loadAllRoles();
        loadAllUser();

        $scope.Queries = {
            getUser: function () {
                return UserService.getAllUsers();
            },
            getUserById: function (userId) {
                return UserService.getUserById(userId);
            },
           
            getRolesAssignedToUser: function (userId) {
                return UserService.getAllRolesAssignedToUser(userId);
            }
        };


        $scope.Commands = {
            saveUser: function (user) {
                UserService.addUser(user).then(
                    function (result) {
                        console.log("from save user command");
                        loadAllUser();
                        
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            updateUser: function (user) {

                UserService.updateUser(user).then(
                    function (result) {
                        $scope.message = "Success! User is updated successfully!!!!";
                        $scope.showSuccessAlert = true;
                        $scope.showErrorAlert = false;
                        console.log("from update user command");
                        loadAllUser();
                    },
                    function (response) {
                        console.log(response);
                    });
            },
            deleteUser: function (userId) {
                UserService.deleteUser(userId).then(
                 function (result) {
                     $scope.message = "Success! User is de-activated successfully!!!!";
                     $scope.showSuccessAlert = true;
                     $scope.showErrorAlert = false;
                     console.log('user is deleted successfully!!!!!');
                     loadAllUser();
                 },
                 function (response) {
                     console.log(response);
                 });

            },
           

        };

        $scope.Modals = {

            open: function (user, action) {

                $scope.Queries.getUserById(user.id).then(function (result) {

                  
                    var roles = $scope.Queries.getRolesAssignedToUser(user.id);
                 
                    $q.all([roles]).then(function (data) {
                        if (data != null) {
                            var records = data[0];
                            $scope.assignedRoles = records.data;
                            var urole = [];
                            for (var i = 0; i < records.data.length; i++) {
                                urole.push(records.data[i].id);
                                console.log("urole is:" + urole);
                                $scope.user.userRoleArray = urole;
                            }
                            console.log("assigned role is", JSON.stringify(records.data));

                        }
                    }, function (reason) {
                        errorHandler.logServiceError('UserController', reason);
                    }, function (update) {
                        errorHandler.logServiceNotify('UserController', update);
                    });

                    //console.log("roles1 is " + JSON.stringify($scope.roles1));

                    $scope.user = result.data;
                    console.log("user is " + $scope.user);
                    $scope.user.action = '';
                    $scope.user.action = action;

                    $scope.title = '';
                    if (action == 'Delete') {
                        console.log("here goes");
                        $scope.title = 'Are you sure want to delete this record?';
                    }
                    else {
                        $scope.title = 'Edit the log information. ';
                    }
                  //  console.log("title when action " + $scope.user.action + " is " + $scope.title);

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/App/Templates/User/UserFormModal.html',
                        controller: 'UserFormModalController',
                        size: 'lg',
                        scope: $scope,
                        backdrop: 'static'
                    });

                    modalInstance.result.then(
                        function (user) {
                            if (user.id != null) {                              
                                if (user.action == 'Edit') {                                  
                                    user.roleId = $scope.user.userRoleArray.toString();                                   
                                    $scope.Commands.updateUser(user);                              
                                }
                                else if (user.action = 'Delete') {
                                    $scope.Commands.deleteUser(user.id);
                                    console.log("delete code here goes " + user.id);
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


        function loadAllUser() {

            $scope.userLoader = true;
            var users = UserService.getAllUser()

            $q.all([users]).then(function (data) {
                if (data != null) {
                    var records = data[0];
                    $scope.users = records.data;
                    $scope.allUsers = records.data;
                    console.log("users1111", $scope.users);
                    $scope.userLoader = false;
                }
            }, function (reason) {
                errorHandler.logServiceError('UserController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('UserController', update);
            });

        }
        
        function loadAllRoles () {

            var roles = UserService.getAllRoles();

            $q.all([roles]).then(function (data) {
                if (data != null) {
                    var records = data[0];
                    $scope.roles = records.data;
                   // console.log("roles1111", $scope.roles);

                }
            }, function (reason) {
                errorHandler.logServiceError('UserController', reason);
            }, function (update) {
                errorHandler.logServiceNotify('UserController', update);
            });

        }

    }
})();
