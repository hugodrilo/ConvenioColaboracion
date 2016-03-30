/* convenioCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    // Module and convenio controller definition.
    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl",
                    ["$scope",
                     "$uibModal",
                     "$window",
                     "convenioResource",
                     "materiaResource",
                     "areaResource",
                     "parteResource",
                     ConvenioCtrl]);

    // The Convenio controller function.
    function ConvenioCtrl($scope,
                          $uibModal,
                          $window,
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

        // Setting the animations flag for the modal window.
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
                if (data.parte !== undefined) {
                    data.parteId = data.parte.parteId;
                }

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
                if (data.parte !== undefined) {
                    data.partes = data.parte.parte;
                }

                if (data.area !== undefined) {
                    data.areaVinculante = data.area.area;
                }

                vm.convenio.compromisos.push(data);
            }, function () {
                ////console.log("Modal dismissed at: " + new Date());
            });
        };

        // Submit data to the server
        vm.submit = function (isValid) {

            if (isValid) {
                new convenioResource(vm.convenio).$save().then(
                    function (nuevoConvenio) {
                        toastr.success("Convenio guardado correctamente.", "Exito.");
                    });

            } else {
                toastr.error("Favor de ingresar los valores requeridos.", "Error");
            }
        }

        // Cancel the operation and returns to the previous menu.
        vm.cancel = function () {
            toastr.warning("Redireccionando...", "Info");
            $window.location.href = "#menuConvenio";
        }
    };

    // The Modal Instance controller
    angular
       .module("convenioColaboracion")
       .controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, entidad) {
           $scope.entidad = entidad;

           //Agregado calendario con estilo de gobmx
           $(".calendarioGobMx").datepicker();

           // Boton de aceptar para la ventana modal.
           $scope.ok = function (isValid) {

               if (isValid) {
                   $uibModalInstance.close($scope.entidad);
               }
               else {
                   toastr.error("Favor de ingresar los campos obligatorios", "Error");
               }
           };

           // Cancel function to dismiss the modal window.
           $scope.cancel = function () {
               $uibModalInstance.dismiss("cancelar");
           };
       });
})();
