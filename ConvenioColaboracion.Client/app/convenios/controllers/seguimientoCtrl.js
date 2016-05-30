/* seguimientoCtrl.js 
 * Created by victor
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("SeguimientoCtrl",
        [
            "$scope",
            "$stateParams",
            "$window",
            "$location",
            "$state",
            "convenioEditResource",
            SeguimientoCtrl
        ]);

    function SeguimientoCtrl(
        $scope,
        $stateParams,
        $window,
        $location,
        $state,
        convenioEditResource) {
        var vm = this;

        // Initialize the object model for CONVENIO.
        vm.convenio = {};

        vm.getCompromisoById = function (id) {
            if (id !== undefined) {
                $scope.compromisoId = id;
                $location.path("seguimiento/compromiso/" + id);
            }
        }

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