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
            "convenioEditResource",
            SeguimientoCtrl
        ]);

    function SeguimientoCtrl(
        $scope,
        $stateParams,
        convenioEditResource) {
        var vm = this;

        // Initialize the object model for CONVENIO.
        vm.convenio = {};

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