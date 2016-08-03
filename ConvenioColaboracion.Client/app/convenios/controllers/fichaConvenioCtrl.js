/* fichaConvenioCtrl.js 
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("FichaConvenioCtrl",
        [
            "$scope",
            "$uibModal",
            "$window",
            "$stateParams",
            "convenioResource",
            "convenioEditResource",
            "appSettings",
            FichaConvenioCtrl
        ]);

    function FichaConvenioCtrl(
        $scope,
        $uibModal,
        $window,
        $stateParams,
        convenioResource,
        convenioEditResource,
        appSettings) {
        var vm = this;

        vm.convenioId = 0;
        vm.convenio = {};

        // Gets the convenioId
        vm.getConvenio = function (id) {
            if (id !== undefined && id > 0) {
                vm.convenioId = id;

                var getConvenio = convenioEditResource.get({ id: vm.convenioId });

                getConvenio.$promise.then(function (convenio) {
                    if (convenio !== undefined && convenio !== null) {
                        // Asign the result values to the convenio
                        vm.convenio = convenio;
                    }
                });
            }
        };

        // Evento para regresar a la pagina anterior
        vm.goBack = function () {
            $window.history.back();
        };

        // Download the file
        vm.downloadFile = function (convenioId) {
            if (convenioId !== undefined && convenioId !== null) {
                var downloadPath = appSettings.serverPath + "/api/file/getconvenio/" + convenioId;
                window.open(downloadPath, "_self", "");
            }
        };

        // Gets the convenio by id
        vm.getConvenio($stateParams.id);
    }
})();