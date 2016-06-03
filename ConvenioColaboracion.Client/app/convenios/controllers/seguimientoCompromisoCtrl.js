/* seguimientoCompromisoCtrl.js 
 * Created by victor
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("SeguimientoCompromisoCtrl",
        [
            "$scope",
            "$uibModal",
            "$window",
            "$stateParams",
            "convenioEditResource",
            "compromisoResource",
            "actividadResource",
            "appSettings",
            SeguimientoCompromisoCtrl
        ]);

    function SeguimientoCompromisoCtrl(
        $scope,
        $uibModal,
        $window,
        $stateParams,
        convenioEditResource,
        compromisoResource,
        actividadResource,
        appSettings) {
        var vm = this;

        // Initialize the object model for CONVENIO.
        vm.compromisoId = $stateParams.id;

        vm.convenio = {};
        vm.compromiso = {};
        vm.actividades = [];

        // Get the Compromiso
        vm.getCompromiso = function () {
            compromisoResource.get({ id: vm.compromisoId }).$promise.then(function (compromiso) {
                if (compromiso !== undefined && compromiso !== null) {
                    vm.compromiso = compromiso;
                }
            });
        };

        // Get the actividades
        vm.getActividades = function () {
            actividadResource.getAllById({ id: vm.compromisoId }).$promise.then(function (actividades) {
                if (actividades !== undefined && actividades !== null) {
                    vm.actividades = actividades;
                }
            });
        };

        // Display the toggle modal window for ACTIVIDAD.
        vm.toggleModalActividad = function (entity) {
            $scope.entidad = {};
            $scope.editEntity = entity;

            // Open the modal window.
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/actividad.html",
                controller: "ModalCtrl",
                backdrop: "static",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    },
                    editEntity: entity
                }
            });

            // Get modal window results.
            modalInstance.result.then(function (data) {
                if (data !== undefined && data !== null) {
                    data.compromisoId = vm.compromisoId;

                    /// update
                    if (data.actividadId > 0 && $scope.editEntity !== null) {
                        // Send the CONVENIO information to the API
                        new actividadResource.put(data).$promise.then(
                            function () {
                                toastr.success("Actividad actualizada correctamente.", "Exito.");
                            });

                    } else {
                        // Send the ACTIVIDAD information to the API
                        new actividadResource(data).$save().then(
                            function (result) {
                                if (result !== undefined && result !== null) {
                                    toastr.success("Actividad guardada correctamente.", "Exito.");
                                }
                            });
                    }

                    // Load all the Actividades for this compromisoId
                    vm.getActividades();
                }
            }, function () {
                // Error
            });
        };

        // Download the file
        vm.downloadFile = function (actividadId) {
            if (actividadId !== undefined && actividadId !== null) {
                var downloadPath = appSettings.serverPath + "/api/file/getactividad/" + actividadId;
                window.open(downloadPath, "_self", "");
            }
        };

        // TODO: Pendiente implementar vm.deleteItemFromArray(vm.actividades, actividad)
        // Deletes an item from the specified array
        vm.delete = function (actividad) {
            $scope.entidad = {};

            // Open the modal window.
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/dialog.html",
                controller: "ModalCtrl",
                backdrop: "static",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    },
                    editEntity: undefined
                }
            });

            // Get modal window results.
            modalInstance.result.then(function (result) {
                if (result) {

                    //// delete the actividad from the database and then reload all the actividades.
                    new actividadResource().$delete({ id: actividad.actividadId }).$promise.then(
                        function () {
                            // Load all the Actividades for this compromisoId
                            vm.getActividades();
                            toastr.success("Actividad eliminada correctamente.", "Exito.");
                        });
                }
            },
        // Dismiss the window and clean resources.
            function () {
            });
        };

        vm.getCompromiso();

        vm.getActividades();

        // Get the general convenio info
        if ($stateParams.id !== undefined && $stateParams.id > 0) {
            var getConvenio = convenioEditResource.get({ id: $stateParams.id });

            getConvenio.$promise.then(function (convenio) {
                if (convenio !== undefined && convenio !== null) {
                    // Asign the result values to the convenio
                    vm.convenio = convenio;
                }
            });
        }
    }
})();