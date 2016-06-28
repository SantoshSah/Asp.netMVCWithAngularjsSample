(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
       // , ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])
        .controller('GlobalController', GlobalController);

    GlobalController.$inject = ['$scope', '$location', 'AuthService'];

    function GlobalController($scope, $location, AuthService) {
        $scope.$on('$viewContentLoaded', onLoaded);
        $scope.$on('viewContentLoadComplete', onLoadComplete);

        //$scope.$on('LOAD', function () {
        //    // todo 
        //});
        //$scope.$on('UNLOAD', function () {
        //    //todo
        //});
        function onLoaded() {
            $scope.$broadcast('viewContentLoadComplete');

        }

        function onLoadComplete() {

        }
        //console.log("role: " + AuthService.roleName());
        //console.log("isRole Admin: " + AuthService.isRoleAdmin());

        $scope.Global = {
            logOut : function () {
                AuthService.logOut();
                $scope.Global.isAuthenticated = false;
               // $scope.Global.userName='';
                //$scope.Global.roleName='';
                $location.path('/Account/Login');
            },
            isAuthenticated: AuthService.isAuthenticated(),
            userName: AuthService.userName(),
            roleName: AuthService.roleName(),
            isRoleAdmin:AuthService.isRoleAdmin()
        }
   
        $scope.menuClass = function (path) {
            //console.log("location is : " + $location.path().substr(0, path.length));
           // console.log("from view path is : " + path);
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
           }
    };
})();
