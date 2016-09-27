/**
 * consultaCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConsultaCtrl",
        [
            "$scope",
            "$location",
            "convenioResource",
            ConsultaCtrl
        ]);

    // The consulta controller function
    function ConsultaCtrl($scope,
        $location,
        convenioResource) {
        var vm = this;
        vm.convenios = [];

        // Get all the convenios.
        vm.convenios = convenioResource.query();

        // Wait for the response in order to get the pagination
        vm.convenios.$promise.then(function (convenios) {
            if (convenios !== undefined && convenios !== null) {
                $scope.data = convenios;
                $scope.viewBy = 5;
                $scope.totalItems = $scope.data.length;
                $scope.currentPage = 1;
                $scope.itemsPerPage = $scope.viewBy;
                $scope.maxSize = 3; //Number of pager buttons to show
            }
        });

        // Set the page number.
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        // The page changed method.
        $scope.pageChanged = function () {
            console.log("Page changed to: " + $scope.currentPage);
        };

        // Set number of elements per page.
        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        }

        // Get specific convenio by id
        vm.getConvenioById = function (id) {
            if (id !== undefined) {
                $scope.convenioId = id;
                $location.path("/estadistica/fichaConvenio/" + id);
            }
        }
    };
})();