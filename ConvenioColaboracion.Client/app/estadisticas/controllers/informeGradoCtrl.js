/**
 * informeGradoCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("InformeGradoCtrl",
        [
            "$scope",
            "$window",
            "$location",
            "informePeriodoResource",
            InformeGradoCtrl
        ]);

    function InformeGradoCtrl(
         $scope,
        $window,
        $location,
        informePeriodoResource) {
        var vm = this;

        // Get the informe
        vm.getInforme = function () {
            informePeriodoResource.getInformeGrado().$promise.then(function (informe) {
                if (informe !== undefined && informe !== null) {
                    vm.informe = informe;
                }
            });
        };

        // Get all the convenios by areaId 
        vm.getConveniosByGradoId = function (admonId, matId, areaId, estatus, nombre) {
            if (estatus > 0) {
                // Redireccionar a los convenios de la presente area
                admonId = 0;
                matId = 0;
                areaId = 0;
                var dest = "/estadistica/resultados/" + admonId + "/" + matId + "/" + areaId + "/" + estatus + "/" + nombre;
                $location.path(dest);
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

        // Evento para regresar a la pagina anterior
        vm.goBack = function () {
            $window.history.back();
        };

        vm.getInforme();
    }
})();