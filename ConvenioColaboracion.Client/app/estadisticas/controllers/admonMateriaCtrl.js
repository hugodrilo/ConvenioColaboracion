/**
 * admonMateriaCtrl.js 
 * Created by victor 
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("AdmonMateriaCtrl",
        [
            "$scope",
            "$window",
            "$stateParams",
            "$location",
            "informePeriodoResource",
            AdmonMateriaCtrl
        ]);

    function AdmonMateriaCtrl(
        $scope,
        $window,
        $stateParams,
        $location,
        informePeriodoResource) {
        var vm = this;

        // Initialize the object model for CONVENIO.
        vm.administracionId = $stateParams.id;
        vm.sexenio = {};
        vm.nombreMateria = "";

        // get the administracion
        vm.getAdministracion = function (id) {
            informePeriodoResource.getSexenio({ id: id }).$promise.then(function (sexenio) {
                if (sexenio !== undefined && sexenio !== null) {
                    vm.sexenio = sexenio;
                }
            });
        };

        // Get the informe
        vm.getInforme = function () {
            informePeriodoResource.getInformeMateria({ id: vm.administracionId }).$promise.then(function (informe) {
                if (informe !== undefined && informe !== null) {
                    vm.informe = informe;
                }
            });
        };

        // Get all the convenios by admin and materiaId 
        vm.getConveniosByAdminId = function (admonId, matId, areaId, estatus, nombre) {
            if (vm.administracionId > 0 && matId > 0) {
                // Redireccionar a los convenios de la presente administracion y materia
                var dest = "/estadistica/resultados/" + admonId + "/" + matId + "/" + areaId + "/" + estatus + "/" + nombre;
                $location.path(dest);
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

        // Get the informe
        vm.getInforme();

        // Get the administracion info
        vm.getAdministracion(vm.administracionId);
    }
})();