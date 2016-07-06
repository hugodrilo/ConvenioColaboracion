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
        vm.getConveniosByAdminId = function (administracionId) {
            // redirecionar y obtener todos los convenios
            // Redireccionar a todos los convenios de la presente administracion id
            $location.path("/consulta");
        };

        vm.getInforme();

        vm.getAdministracion(vm.administracionId);
    };
})();