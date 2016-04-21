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
                     "$stateParams",
                     "convenioResource",
                     "convenioEditResource",
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
                          $stateParams,
                          convenioResource,
                          convenioEditResource,
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

        vm.partesCompromiso = [];

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

        // Changed value in the materia dropdown list
        vm.changedValueMateria = function (materia) {
            if (materia !== undefined && materia !== null) {
                vm.subMaterias = subMateriaResource.query({ id: materia.materiaId });
            }
        };

        // Deletes an item from the specified array
        vm.deleteItemFromArray = function (array, item) {
            if (array !== undefined && array !== null) {
                array.splice(array.indexOf(item), 1);
            }
        };

        // Display the toggle modal window for AREA.
        vm.toggleModalArea = function () {
            $scope.entidad = {};

            // Open the modal window.
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/convenioArea.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    },
                    editEntity: undefined,
                    vm: vm
                }
            });

            // Get modal window results.
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
        vm.toggleModalParte = function (entity) {
            $scope.entidad = {};
            $scope.editEntity = entity;

            // Open the modal window.
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/parte.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    },
                    editEntity: entity,
                    vm: vm
                }
            });

            // Get modal window results.
            modalInstance.result.then(function (data) {
                if (data.parte !== undefined) {
                    data.parteId = data.parte.parteId;
                    vm.convenio.partes.push(data);
                    vm.partesCompromiso.push(data.parte);
                }
            }, function () {
            });
        };

        // Display de toggle modal window for COMPROMISO.
        vm.toggleModalCompromiso = function (entity) {
            $scope.entidad = {};
            $scope.editEntity = entity;

            // Open the modal window.
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/compromiso.html",
                controller: "ModalInstanceCtrl",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    },
                    editEntity: entity,
                    vm: vm
                }
            });

            // Get modal window results.
            modalInstance.result.then(function (data) {
                if (data !== undefined) {
                    vm.convenio.compromisos.push(data);
                }
            },
            // Dismiss the window and clean resources.
            function () {
                // Set the selected flag to false when we dismiss the modal window.
                angular.forEach(vm.areas, function (area) {
                    area.selected = false;
                });
            });
        };

        // Submit data to the server
        vm.submit = function (isValid) {
            if (isValid) {
                // Send the CONVENIO information to the API
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

        /*Edit the convenio*/
        if ($stateParams.id !== undefined && $stateParams.id > 0) {
            var getConvenio = convenioEditResource.get({ id: $stateParams.id });

            getConvenio.$promise.then(function (convenio) {
                if (convenio !== undefined && convenio !== null) {

                    // Asign the result values to the convenio
                    vm.convenio = convenio;
                }
            });
        }
    };

    // The Modal Instance controller
    angular
       .module("convenioColaboracion")
       .controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, entidad, editEntity, vm) {
           $scope.entidad = entidad;
           $scope.editEntity = editEntity;
           $scope.areas = vm.areas;
           $scope.partes = vm.partes;
           $scope.tipoAreas = vm.tipoAreas;
           $scope.partesCompromiso = vm.partesCompromiso;

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

           // Set the dropdown language options
           $scope.localLang = {
               selectAll: "Seleccionar todos",
               selectNone: "Ninguno",
               reset: "Deshacer",
               search: "Buscar...",
               nothingSelected: "Ninguno seleccionado"
           }

           // Assign the Edit model entity
           if ($scope.editEntity !== undefined) {
               $scope.entidad = $scope.editEntity;
           }
       });
})();
