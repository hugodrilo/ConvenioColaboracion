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
                     "convenioUpdateResource",
                     "materiaResource",
                     "subMateriaResource",
                     "areaResource",
                     "tipoAreaResource",
                     "parteResource",
                     "appSettings",
                     ConvenioCtrl]);

    // The Convenio controller function.
    function ConvenioCtrl($scope,
                          $uibModal,
                          $window,
                          $stateParams,
                          convenioResource,
                          convenioEditResource,
                          convenioUpdateResource,
                          materiaResource,
                          subMateriaResource,
                          areaResource,
                          tipoAreaResource,
                          parteResource,
                          appSettings) {
        var vm = this;

        // Show the Guardar button.
        vm.showGuardar = true;

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
        vm.convenio.partesCompromiso = [];
        vm.message = "";

        // The GobMx calendar style.
        $(".calendarioGobMx").datepicker();

        // Setting the animations flag for the modal window.
        $scope.animationsEnabled = true;

        // Changed value in the materia dropdown list
        vm.changedValueMateria = function (materia) {
            if (materia !== undefined && materia !== null) {
                subMateriaResource.query({ id: materia.materiaId }).$promise.then(function (subMaterias) {
                    if (subMaterias !== undefined && subMaterias !== null) {
                        vm.subMaterias = subMaterias;
                    }
                });
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
                backdrop: "static",
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
                    // if we have elements in the array do not duplicate area values
                    if (vm.convenio.areas.length > 0) {
                        var areaExists = false;

                        // Check if the element already exist in the collection
                        angular.forEach(vm.convenio.areas, function (area) {
                            if (area.areaId === data.area.areaId && area.tipoAreaId === data.tipoArea.tipoAreaId) {
                                areaExists = true;
                                alert("El área y tipo de área ya existen.");
                            }
                        });

                        // If the area does not exists in the array we add the element
                        if (!areaExists) {
                            data.areaId = data.area.areaId;
                            data.tipoAreaId = data.tipoArea.tipoAreaId;
                            vm.convenio.areas.push(data);
                        }
                    } else {
                        data.areaId = data.area.areaId;
                        data.tipoAreaId = data.tipoArea.tipoAreaId;
                        vm.convenio.areas.push(data);
                    }
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
                backdrop: "static",
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
                if (vm.convenio.partes.length > 0 && vm.convenio.partesCompromiso.length > 0) {
                    var parteExists = false;

                    // Check if the element already exist in the collection
                    angular.forEach(vm.convenio.partes, function (parte) {
                        if (parte.parteId === data.parte.parteId) {
                            parteExists = true;
                            alert("La parte indicada ya existe.");
                        }
                    });

                    // If the element does not exists in the array we add the element
                    if (!parteExists) {
                        data.parteId = data.parte.parteId;
                        vm.convenio.partes.push(data);
                        vm.convenio.partesCompromiso.push(data.parte);
                    }
                } else {
                    data.parteId = data.parte.parteId;
                    vm.convenio.partes.push(data);
                    vm.convenio.partesCompromiso.push(data.parte);
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
                backdrop: "static",
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
            function (result) {
                if (result.editEntity !== undefined) {
                    // Set the selected flag to false when we dismiss the modal window.
                    angular.forEach(vm.areas, function (area) {
                        area.selected = false;
                    });
                }
            });
        };

        // Submit data to the server
        vm.submit = function (isValid) {
            if (isValid) {
                // Send the CONVENIO information to the API
                new convenioResource(vm.convenio).$save().then(
                    function (nuevoConvenio) {
                        toastr.success("Convenio guardado correctamente.", "Exito.");
                        $window.location.href = "#consulta";
                    });
            } else {
                toastr.error("Favor de ingresar los valores requeridos.", "Error");
            }
        };

        // Update the CONVENIO.
        vm.update = function (isValid) {
            if (isValid) {
                // Send the CONVENIO information to the API
                new convenioUpdateResource.update({ id: $stateParams.id }, vm.convenio).then(
                    function (edited) {
                        toastr.success("Convenio actualizado correctamente.", "Exito.");
                        $window.location.href = "#consulta";
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

        // Download the file
        vm.downloadFile = function (convenioId) {
            if (convenioId !== undefined && convenioId !== null) {
                var downloadPath = appSettings.serverPath + "/api/file/" + convenioId;
                window.open(downloadPath, "_self", "");
            }
        }

        /*Get all the information to edit the convenio*/
        if ($stateParams.id !== undefined && $stateParams.id > 0) {
            vm.showGuardar = false;
            var getConvenio = convenioEditResource.get({ id: $stateParams.id });

            getConvenio.$promise.then(function (convenio) {
                if (convenio !== undefined && convenio !== null) {
                    // Execute the changedValueMateria event manually to load the subMaterias
                    vm.changedValueMateria(convenio.materia);

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
           $scope.entidad.btnSave = "Agregar";
           $scope.editEntity = editEntity;
           var backup = {};
           $scope.areas = vm.areas;
           $scope.partes = vm.partes;
           $scope.tipoAreas = vm.tipoAreas;
           $scope.partesCompromiso = vm.convenio.partesCompromiso;

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

           // Cancel function to dismiss the modal window and undo the changes to the original model.
           $scope.cancel = function () {
               angular.copy(backup, $scope.entidad);
               $uibModalInstance.dismiss("cancelar");
           };

           // Assign the Edit model entity
           if ($scope.editEntity !== undefined && $scope.editEntity !== null) {
               if ($scope.editEntity.areas !== undefined && $scope.editEntity.areas !== null) {
                   angular.forEach($scope.areas, function (area) {
                       angular.forEach($scope.editEntity.areas, function (areaSeleccionada) {
                           if (area.areaId === areaSeleccionada.areaId) {
                               area.selected = true;
                           }
                       });
                   });
               }

               /// Backup the original object
               backup = angular.copy($scope.editEntity);

               // Set the entity values to edit.
               $scope.entidad = $scope.editEntity;

               $scope.entidad.btnSave = "Actualizar";
           } else {
               if ($scope.areas !== undefined && $scope.areas !== null) {
                   // Set the selected flag to false is not edit mode.
                   angular.forEach($scope.areas, function (area) {
                       area.selected = false;
                   });
               }
           }

           // Set the dropdown language options
           $scope.localLang = {
               selectAll: "Seleccionar todos",
               selectNone: "Ninguno",
               reset: "Deshacer",
               search: "Buscar...",
               nothingSelected: "Ninguno seleccionado"
           }
       });
})();
