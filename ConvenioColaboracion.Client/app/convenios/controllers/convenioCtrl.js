/* convenioCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    // Definicion de modulo y controlador
    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl", ["$scope", "$uibModal", ConvenioCtrl]);

    // Controlador de convenio
    function ConvenioCtrl($scope, $uibModal, convenioResource) {
        var vm = this;
        vm.convenio = {};
        vm.convenio.partes = [];
        vm.convenio.compromisos = [];
        vm.message = "";

        //Agregado calendario con estilo de gobmx
        $(".calendarioGobMx").datepicker();

        vm.submit = function () {
            console.log("Submit working...");

            new convenioResource(vm.convenio).$save().then(
                function (nuevoConvenio) {
                    console.log("Save is working..");
                    console.log(nuevoConvenio);
                });
        }

        $scope.animationsEnabled = true;

        // Ventana modal para agregar partes
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
                console.log(data);
                vm.convenio.partes.push(data);
            }, function () {
                console.log("Modal dismissed at: " + new Date());
            });
        };

        // Ventana modal para agregar compromisos
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
                console.log(data);
                vm.convenio.compromisos.push(data);
            }, function () {
                console.log("Modal dismissed at: " + new Date());
                console.log();

            });
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
           $scope.ok = function () {
               $uibModalInstance.close($scope.entidad);
           };

           // Boton para cancelar para la ventana modal.
           $scope.cancel = function () {
               $uibModalInstance.dismiss("cancelar");
           };
       });
})();
