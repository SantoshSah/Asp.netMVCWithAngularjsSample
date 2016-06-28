/// <reference path="../Templates/Task/datetimepickerNew.html" />
/// <reference path="../Templates/Task/datetimepickerNew.html" />
/// <reference path="routeConfig.js" />
(function () {
    'use strict';

    angular.module('aspNetMvcSample')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
              .when('/', {
                templateUrl:'/App/Templates/Department/Index.html',
                requiresLogin: true,
                controller: 'DepartmentController',
                resolve: {
                    "check": function (AuthService, $location) {   //function to be resolved, accessFac and $location Injected
                        if (AuthService.isRoleAdmin()) {    //check if the user has permission -- This happens before the page loads
                            console.log("yes it is admin");
                            $location.path('/Employee/Index');
                        } 
                    }
                }
            })
           
          .when('/Account/Login', {
              templateUrl: '/App/Templates/Account/Login.html',
              controller: 'LoginController'
          })
          .when('/Account/Register', {
              templateUrl: '/App/Templates/Account/Register.html',
              controller: 'RegisterController'
          })
          .when('/Account/ForgetPassword',{
             templateUrl:'/App/Templates/Account/ForgetPassword.html',
             controller: 'LoginController'
          })
         .when('/Account/ForgetPasswordConfirmation', {
                templateUrl: '/App/Templates/Account/ForgetPasswordConfirmation.html',
                 controller: 'LoginController'
         })
         .when('/Account/CheckEmail', {
                 templateUrl: '/App/Templates/Account/CheckEmail.html',
                 controller: 'LoginController'
                 })
         .when('/Account/ResetPassword/userId/:userId/code/:code*', {
                    templateUrl: '/App/Templates/Account/ResetPassword.html',
                    controller: 'ResetPasswordController'
         })
          .when('/Account/ConfirmEmail/userId/:userId/code/:code*', {
                     templateUrl: '/App/Templates/Account/ConfirmEmail.html',
                     controller: 'EmailConfirmController'
          })        
          .when('/Account/ResetPasswordConfirmation', {
                   templateUrl: '/App/Templates/Account/ResetPasswordConfirmation.html',
                   controller: 'ResetPasswordController'
                 })
          .when('/Account/EditProfile', {
              templateUrl: '/App/Templates/Account/Edit.html',
              requiresLogin: true,
              controller: 'EditController'
          })

          .when('/Department/Index', {
                templateUrl:'/App/Templates/Department/Index.html',
               // requiresLogin: true,
                controller: 'DepartmentController'                 
            })
            .when('/Employee/Index', {
                templateUrl:'/App/Templates/Employee/Index.html',              
                controller: 'EmployeeController'                 
            })
         .when('/Log/Index', {
             templateUrl:'/App/Templates/Log/Index.html',
             requiresLogin: true,
             controller: 'LogController'                 

         })
            //.when('/Task/Index', {
            //    templateUrl:'/App/Templates/Task/Index.html',
            //   // requiresLogin: true,
            //    controller: 'TaskController'                 

            //})

            .when('/User/Index', {
                templateUrl: '/App/Templates/User/Index.html',
                requiresLogin: true,
                controller: 'UserController'

            })

           .when('/Admin/UserTask', {            
                templateUrl: '/App/Templates/Task/AdminTaskIndex.html',
                requiresLogin: true,
                controller: 'AdminTaskController',
                    resolve: {
                        "check": function (AuthService, $location) {   //function to be resolved, accessFac and $location Injected
                            if (AuthService.isRoleAdmin()) {    //check if the user has permission -- This happens before the page loads
                            //  console.log("yes it is admin");
                            } else {
                                $location.path('/Account/Login');				//redirect user to login page  if it does not have permission.
                                //alert("You don't have access here");
                            }
                        }
                    }              
                })
            .when('/Project/Index', {
                requiresLogin: true,
                templateUrl: '/App/Templates/Project/Index.html',
                controller: 'ProjectController',
                requiresLogin:true
            })
       
             //.when('/Task/DatePicker', {
             //   templateUrl: '/App/Templates/Task/datetimepicker.html',                    
             //   controller: 'MyController',                
             //   requiresLogin:true

             //})
              .when('/Task/Date', {
                  templateUrl: '/App/Templates/Task/DatePickTestNew.html',
                  controller: 'TestDateTimePicker',
                requiresLogin:true

             })
                 .when('/Task/Test', {
                     templateUrl: '/App/Templates/Task/Test.html',
                     controller: 'TestController',
                     requiresLogin: true

                 })
             .when('/AdminLog/Index', {
                 templateUrl: '/App/Templates/AdminLog/Index.html',
                 controller: 'AdminLogController',
                 requiresLogin: true

             })
             //.when('/Task/DatePicker', {
             //     templateUrl: '/App/Templates/Task/datetimepicker.html',
             //     controller: 'MyController',
             //     requiresLogin: true
             //     })

          .otherwise({
               templateUrl: '/App/Templates/Shared/_404.html'
           })
        }])
        .run(checkAuthentication);

        checkAuthentication.$inject = ['$rootScope', '$location', 'tokenHandler'];
        function checkAuthentication($rootScope, $location, tokenHandler) {
            
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                //   $rootScope.isViewLoading = true;
                
                $rootScope.isViewLoading = true;
             
            });

            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                console.log(' loading second ');
                var requiresLogin = next.requiresLogin || false;
                if (requiresLogin) {

                    var loggedIn = tokenHandler.hasLoginToken();

                    if (!loggedIn) {
                        $location.path('/Account/Login');
                    }                  
                }
            });
            $rootScope.$on("$routeChangeSuccess",
                            function (event, current, previous, rejection) {
                                $rootScope.isViewLoading = false;
                                console.log("route success is: "+ event);
                });

        }

  
  

})();