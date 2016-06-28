(function () {
    'use strict';

    angular
        .module('aspNetMvcSample')
        .controller('UserFormModalController', UserFormModalController);

    UserFormModalController.$inject = ['$scope','$uibModalInstance'];

    function UserFormModalController($scope, $uibModalInstance) {

        $scope.boolToStrInDropDownActivated = function (arg) { return arg ? 'Active' : 'Inactive' };

        //start of test
    //    $scope.testroles = [
    //{ id: 1, text: 'guest' },
    //{ id: 2, text: 'user' },
    //{ id: 3, text: 'customer' },
    //{ id: 4, text: 'admin' }
    //    ];
    //    $scope.testuser = {
    //        roles: [2, 4]
    //    };
        //end of test
        //$scope.selection = [];

        //$scope.projectSelection = [];

        //$scope.toggleSelection = function toggleSelection(name) {

        //    var idx = $scope.selection.indexOf(name);

        //    if (idx > -1) {
        //        $scope.selection.splice(idx, 1);
        //    }

        //    else {
        //        $scope.selection.push(name);
        //    }

        //};

        //$scope.toggleProjectSelection = function toggleProjectSelection(name) {

        //    var idx = $scope.projectSelection.indexOf(name);

        //    if (idx > -1) {
        //        $scope.projectSelection.splice(idx, 1);
        //    }

        //    else {
        //        $scope.projectSelection.push(name);
        //    }

        //};


        $scope.ok = function (action) {
            $uibModalInstance.close($scope.user);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();