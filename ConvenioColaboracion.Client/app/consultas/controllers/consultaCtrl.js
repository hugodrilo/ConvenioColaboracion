/**
 * consultaCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConsultaCtrl",
        ["$scope",
         "$location",
         "convenioResource",
         ConsultaCtrl]);

    // The consulta controller function
    function ConsultaCtrl($scope,
                          $location,
                          convenioResource) {
        var vm = this;
        vm.convenios = [];

        // Get all the convenios.
        vm.convenios = convenioResource.query();

        // Get specific convenio by id
        vm.getConvenioById = function (id) {

            if (id !== undefined) {
                $scope.convenioId = id;
                $location.path("/convenios/" + id);
            }
        }

        // The gob.mx calendar
        $(".calendarioGobMx").datepicker();
    };
})();