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
            SeguimientoCompromisoCtrl
        ]);

    function SeguimientoCompromisoCtrl(
        $scope,
        $uibModal,
        $window,
        $stateParams,
        convenioEditResource) {
        var vm = this;

        // Initialize the object model for CONVENIO.
        vm.convenio = {};

        // TODO: Insert the actividad here???
        // Check if we can insert here

        // Implement toggle modal actividad here

        // Display the toggle modal window for AREA.
        vm.toggleModalActividad = function () {
            $scope.entidad = {};

            // Open the modal window.
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/actividad.html",
                controller: "ModalCtrl",
                backdrop: "static",
                resolve: {
                    entidad: function () {
                        return $scope.entidad;
                    }
                }
            });

            // Get modal window results.
            modalInstance.result.then(function (data) {
                if (data !== undefined) {
                }
            }, function () {
            });
        };

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
    };
})();