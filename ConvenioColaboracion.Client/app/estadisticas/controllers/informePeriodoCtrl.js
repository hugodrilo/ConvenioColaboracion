/**
 * informePeriodoCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("InformePeriodoCtrl",
        [
            "$scope",
            "$window",
            "$location",
            "informePeriodoResource",
            InformePeriodoCtrl
        ]);

    function InformePeriodoCtrl(
        $scope,
        $window,
        $location,
        informePeriodoResource) {
        // Inicializar valores del formulario.
        var vm = this;
        vm.convenios = [];
        vm.informe = [];

        // Get the actividades
        vm.getInforme = function () {
            informePeriodoResource.getInformePeriodo().$promise.then(function (informe) {
                if (informe !== undefined && informe !== null) {
                    vm.informe = informe;
                }
            });
        };

        // Get the materia data table
        vm.tablaMateria = function (informe) {
            if (informe !== undefined && informe !== null && informe.administracionId > 0) {
                // redirecionar y obtener todos los convenios
                $location.path("/estadistica/materia/administracion/" + informe.administracionId);
            }
        };

        // Get the actividades
        vm.tablaConvenios = function (informe) {
            // TODO: programar este metodo
            if (informe !== undefined && informe !== null) {

            }
        };

        // Get todos los convenios
        vm.getTodosConvenios = function () {
            // redirecionar y obtener todos los convenios
            $location.path("/consulta");
        };

        vm.getInforme();
    };
})();