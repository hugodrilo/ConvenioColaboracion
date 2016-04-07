/* convenioCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    // Module and controller definition.
    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl",
                    ["$scope",
                     "$uibModal",
                     "$window",
                     "convenioResource",
                     "materiaResource",
                     "subMateriaResource",
                     "areaResource",
                     "tipoAreaResource",
                     "parteResource",
                     ConvenioCtrl]);

    // The Convenio controller function.
    function ConvenioCtrl($scope,
                          $uibModal,
                          $window,
                          convenioResource,
                          materiaResource,
                          subMateriaResource,
                          areaResource,
                          tipoAreaResource,
                          parteResource) {
        var vm = this;

        // Load the form catalogs.
        vm.materias = [];
        vm.materias = materiaResource.query();

        vm.subMaterias = [];

        vm.areas = [];
        vm.areas = areaResource.query();

        vm.tipoAreas = [];
        vm.tipoAreas = tipoAreaResource.query();

        vm.partes = [];
        vm.partes = parteResource.query();

        // Initialize the object model for CONVENIO.
        vm.convenio = {};
        vm.convenio.areas = [];
        vm.convenio.partes = [];
        vm.convenio.compromisos = [];
        vm.message = "";

        // The GobMx calendar style.
        $(".calendarioGobMx").datepicker();

        // Setting the animations flag for the modal window.
        $scope.animationsEnabled = true;

        // Display the toggle modal window for AREA.
        vm.toggleModalArea = function () {

            $scope.entidad = {};

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/convenioArea.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    }
                }
            });

            modalInstance.result.then(function (data) {
                if (data.area !== undefined) {
                    data.areaId = data.area.areaId;
                    data.tipoAreaId = data.tipoArea.tipoAreaId;
                    vm.convenio.areas.push(data);
                }
            }, function () {
            });
        };

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
                    vm.convenio.partes.push(data);
                }
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
                if (data !== undefined) {
                    vm.convenio.compromisos.push(data);
                }
            }, function () {
                ////console.log("Modal dismissed at: " + new Date());
            });
        };

        // Changed value in the materia dropdown list
        vm.changedValueMateria = function (materia) {
            if (materia !== undefined && materia !== null) {
                vm.subMaterias = subMateriaResource.query({ id: materia.materiaId });
            }
        };

        // Submit data to the server
        vm.submit = function (isValid) {

            if (isValid) {
                // send the information to the API
                new convenioResource(vm.convenio).$save().then(
                    function (nuevoConvenio) {
                        toastr.success("Convenio guardado correctamente.", "Exito.");
                        //// TODO: Preguntar para donde redireccionar.
                        ////$window.location.href = "#menuConvenio";
                    });
            } else {
                toastr.error("Favor de ingresar los valores requeridos.", "Error");
            }
        };

        // Cancel the operation and returns to the previous menu.
        vm.cancel = function () {
            toastr.warning("Redireccionando...", "Info");
            $window.location.href = "#menuConvenio";
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

           $scope.localLang = {
               selectAll: "Seleccionar todos",
               selectNone: "Ninguno",
               reset: "Deshacer",
               search: "Buscar...",
               nothingSelected: "Ninguno seleccionado"         //default-label is deprecated and replaced with this.
           }

           /* http://stackoverflow.com/questions/27323500/open-modal-inside-a-modal
            // Open second modal inside the modal
           $scope.openSecond = function () {
               var modalInstanceSecond = $modal.open({
                   templateUrl: "mySecondModalContent.html",
                   controller: "ModalInstanceCtrl
               });
           };
           */
       });
})();
