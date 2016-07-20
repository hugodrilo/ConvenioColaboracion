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
        vm.getConveniosByAdminId = function (informe) {
            // Redireccionar a los convenios de la presente administracion y materia
            if (informe !== undefined && informe !== null) {
                // Get all the convenios
                informePeriodoResource.getConvenioAdmon({ admonId: informe.administracionId, matId: informe.materiaId }).$promise.then(function (convenios) {
                    if (convenios !== undefined && convenios !== null) {
                        $scope.data = convenios;
                        $scope.viewBy = 5;
                        $scope.totalItems = $scope.data.length;
                        $scope.currentPage = 1;
                        $scope.itemsPerPage = $scope.viewBy;
                        $scope.maxSize = 3; //Number of pager buttons to show
                        vm.nombreMateria = informe.materia;
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

        // Get the informe
        vm.getInforme();

        // Get the administracion info
        vm.getAdministracion(vm.administracionId);
    }
})();