/* convenioCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    // Module and convenio controller definition.
    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl",
                    ["$scope", "$uibModal",
                     "convenioResource", "materiaResource", "areaResource", "parteResource",
                     ConvenioCtrl]);

    // Convenio controller function.
    function ConvenioCtrl($scope,
                          $uibModal,
                          convenioResource,
                          materiaResource,
                          areaResource,
                          parteResource) {
        var vm = this;

        console.log("Convenio controller ");

        // Carga de datos del formulario
        vm.materias = [];
        vm.materias = materiaResource.query();

        vm.areas = [];
        vm.areas = areaResource.query();

        vm.partes = [];
        vm.partes = parteResource.query();

        // Inicializacion de datos de convenio
        vm.convenio = {};
        vm.convenio.partes = [];
        vm.convenio.compromisos = [];
        vm.message = "";

        // The GobMx calendar style.
        $(".calendarioGobMx").datepicker();

        vm.submit = function () {
            new convenioResource(vm.convenio).$save().then(
                function (nuevoConvenio) {
                });
        }

        // Inicializacion de la ventana modal
        $scope.animationsEnabled = true;

        // Display the toggle modal window for PARTE.
        vm.toggleModalParte = function () {

            $scope.entidad = {};

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/parte.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                vm.convenio.partes.push(data);
            }, function () {
            });
        };

        // Display de toggle modal window for COMPROMISO.
        vm.toggleModalCompromiso = function () {

            $scope.entidad = {};

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/compromiso.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                vm.convenio.compromisos.push(data);
            }, function () {
                ////console.log("Modal dismissed at: " + new Date());
            });
        };
    };

    // The Modal Instance controller
    angular
       .module("convenioColaboracion")
       .controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, entidad) {
           $scope.entidad = entidad;

           //Agregado calendario con estilo de gobmx
           $(".calendarioGobMx").datepicker();

           // Boton de aceptar para la ventana modal.
           $scope.ok = function () {
               $uibModalInstance.close($scope.entidad);
           };

           // Boton para cancelar para la ventana modal.
           $scope.cancel = function () {
               $uibModalInstance.dismiss("cancelar");
           };
       });
})();
