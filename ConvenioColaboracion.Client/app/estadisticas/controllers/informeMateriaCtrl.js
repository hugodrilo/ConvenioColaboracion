/**
 * informeMateriaCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("InformeMateriaCtrl",
        [
            "$scope",
            "$window",
            "$location",
            "informePeriodoResource",
            InformeMateriaCtrl
        ]);

    function InformeMateriaCtrl(
        $scope,
        $window,
        $location,
        informePeriodoResource) {
        var vm = this;

        // Get the informe
        vm.getInforme = function () {
            informePeriodoResource.getInformeMateria().$promise.then(function (informe) {
                if (informe !== undefined && informe !== null) {
                    vm.informe = informe;
                }
            });
        };

        // Get todos los convenios
        vm.getTodosConvenios = function () {
            // redirecionar y obtener todos los convenios
            $location.path("/consulta");
        };

        vm.getInforme();
    };
})();