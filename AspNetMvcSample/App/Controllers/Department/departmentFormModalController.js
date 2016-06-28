(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('DepartmentFormModalController', DepartmentFormModalController);

    DepartmentFormModalController.$inject = ['$scope', '$uibModalInstance'];

    function DepartmentFormModalController($scope, $uibModalInstance) {

        $scope.ok = function ()
        {    
        $uibModalInstance.close($scope.department);
        };

        $scope.cancel = function () {            
            $uibModalInstance.dismiss('cancel');
        };    
    }
})();