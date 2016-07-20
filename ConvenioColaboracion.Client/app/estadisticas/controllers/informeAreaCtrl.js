/**
 * informeAreaCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("InformeAreaCtrl",
        [
            "$scope",
            "$window",
            "$location",
            "informePeriodoResource",
            InformeAreaCtrl
        ]);

    function InformeAreaCtrl(
        $scope,
        $window,
        $location,
        informePeriodoResource) {
        var vm = this;

        // Get the informe
        vm.getInforme = function () {
            informePeriodoResource.getInformeArea().$promise.then(function (informe) {
                if (informe !== undefined && informe !== null) {
                    vm.informe = informe;
                }
            });
        };

        // Get all the convenios by admin and materiaId 
        vm.getConveniosByAreaId = function (admonId, matId, area) {
            // Redireccionar a los convenios de la presente administracion y materia
            if (area !== undefined && area !== null) {
                // Get all the convenios
                informePeriodoResource.getConvenioAdmon({ admonId: admonId, matId: matId, areaId: area.areaId, estatusId: 0 }).$promise.then(function (convenios) {
                    if (convenios !== undefined && convenios !== null) {
                        $scope.data = convenios;
                        $scope.viewBy = 5;
                        $scope.totalItems = $scope.data.length;
                        $scope.currentPage = 1;
                        $scope.itemsPerPage = $scope.viewBy;
                        $scope.maxSize = 3; //Number of pager buttons to show
                        vm.nombreMateria = area.area;
                    }
                });
            }
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

        // Get todos los convenios
        vm.getTodosConvenios = function () {
            // redirecionar y obtener todos los convenios
            $location.path("/consulta");
        };

        vm.getInforme();
    }
})();