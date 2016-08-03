/* consultaSeguimientoCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConsultaSeguimientoCtrl", [
            "$scope",
            "$location",
            "busquedaResource",
            ConsultaSeguimientoCtrl
        ]);

    function ConsultaSeguimientoCtrl(
        $scope,
        $location,
        busquedaResource) {
        var vm = this;

        // Expected result of convenios
        vm.convenios = [];

        // Search the expected text.
        vm.buscar = function (searchText) {
            if (searchText !== undefined && searchText !== null) {
                var convenios = busquedaResource.query({ searchText: searchText });

                convenios.$promise.then(function (convenios) {
                    if (convenios !== undefined && convenios !== null) {
                        $scope.data = convenios;
                        $scope.viewBy = 5;
                        $scope.totalItems = $scope.data.length;
                        $scope.currentPage = 1;
                        $scope.itemsPerPage = $scope.viewBy;
                        $scope.maxSize = 3; //Number of pager buttons to show
                    }
                });
            } else {
                alert("Favor de ingresar el texto a buscar.");
            }
        };

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
        };

        // Get specific convenio by id
        vm.getConvenioById = function (id) {
            if (id !== undefined) {
                $scope.convenioId = id;
                $location.path("/seguimiento/" + id);
            }
        };
    }
})();