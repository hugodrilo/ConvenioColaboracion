/* alertaVencimientoCtrl.js 
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("AlertaVencimientoCtrl",
            [
                "$scope",
                "$uibModal",
                "$window",
                "$location",
                "$stateParams",
                "alertaResource",
                AlertaVencimientoCtrl
            ]
        );

    function AlertaVencimientoCtrl(
        $scope,
        $uibModal,
        $window,
        $location,
        $stateParams,
        alertaResource) {
        var vm = this;
        $scope.onlyNumbers = /^\d+$/;
        vm.meses = 1;

        // Get all the convenios 
        vm.getConvenios = function (meses) {
            var getAlertas = alertaResource.getVencimiento({ id: meses }).$promise.then(function (convenios) {
                if (convenios !== undefined && convenios !== null) {
                    $scope.data = convenios;
                    $scope.viewBy = 5;
                    $scope.totalItems = $scope.data.length;
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = $scope.viewBy;
                    $scope.maxSize = 3;
                }
            });
        };

        // Get specific convenio by id
        vm.getConvenioById = function (id) {
            if (id !== undefined) {
                $scope.convenioId = id;
                $location.path("/estadistica/fichaConvenio/" + id);
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

        // Evento para regresar a la pagina anterior
        vm.goBack = function () {
            $window.history.back();
        };

        // Call the get convenios method with default value
        vm.getConvenios(vm.meses);
    }
})();