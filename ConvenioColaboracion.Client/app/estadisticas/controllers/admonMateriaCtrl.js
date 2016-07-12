/**
 * admonMateriaCtrl.js 
 * Created by victor */

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

        // Get todos los convenios
        vm.getConveniosByAdminId = function (admonId, matId) {
            // Redireccionar a los convenios de la presente administracion y materia
            if (admonId > 0 && matId > 0) {
                // TODO: Programar este comportamiento
                ////$location.path("/consulta");    

                $location.path("/convenio/" + admonId + "/" + matId);
            }
        };

        // Get the informe
        vm.getInforme();

        // Get the administracion info
        vm.getAdministracion(vm.administracionId);
    };
})();