/**
 * resultadosCtrl.js 
 * Created by arquitectonet2 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ResultadosCtrl",
        [
            "$scope",
            "$window",
            "$stateParams",
            "$location",
            "convenioResource",
            "informePeriodoResource",
            ResultadosCtrl
        ]);

    function ResultadosCtrl(
        $scope,
        $window,
        $stateParams,
        $location,
        convenioResource,
        informePeriodoResource
    ) {
        var vm = this;

        // Initialize default values
        $scope.admonId = $stateParams.admonId;
        $scope.matId = $stateParams.matId;
        $scope.areaId = $stateParams.areaId;
        $scope.estatusId = $stateParams.estatusId;
        $scope.nombre = $stateParams.nombre;

        // Get all the convenios by gradoId
        vm.getConvenios = function () {
            // Get all the requested convenios
            informePeriodoResource.getConvenioAdmon(
                {
                    admonId: $scope.admonId,
                    matId: $scope.matId,
                    areaId: $scope.areaId,
                    estatusId: $scope.estatusId
                }).$promise.then(function (convenios) {
                    if (convenios !== undefined && convenios !== null) {
                        $scope.data = convenios;
                        $scope.viewBy = 5;
                        $scope.totalItems = $scope.data.length;
                        $scope.currentPage = 1;
                        $scope.itemsPerPage = $scope.viewBy;
                        $scope.maxSize = 3;
                        vm.nombreMateria = $scope.nombre;
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

        // Back 2 pages back
        vm.goBack = function goBack() {
            $window.history.go(-2);
        }

        vm.getConvenios();
    };
})();