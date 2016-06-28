(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('EmployeeFormModalController', EmployeeFormModalController);

    EmployeeFormModalController.$inject = ['$scope', '$q','$uibModalInstance'];

    function EmployeeFormModalController($scope,$q ,$uibModalInstance) {


        $scope.ok = function ()
        {    
        $uibModalInstance.close($scope.employee);
        };

        $scope.cancel = function () {            
            $uibModalInstance.dismiss('cancel');
        };       
    }
})();