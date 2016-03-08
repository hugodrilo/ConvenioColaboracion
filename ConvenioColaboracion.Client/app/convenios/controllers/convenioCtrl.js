/* convenioCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    // Convenio controller
    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl", ["$scope", "$uibModal", ConvenioCtrl]);

    function ConvenioCtrl($scope, $uibModal, convenioResource) {
        var vm = this;
        vm.convenio = {};
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
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/parte.html",
                controller: "ModalInstanceCtrl"
            });

            modalInstance.result.then(function () {
                console.log("algo");
            }, function () {
                console.log("Modal dismissed at: " + new Date());
            });
        };

        // Ventana modal para agregar compromisos
        vm.toggleModalCompromiso = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "app/convenios/templates/compromiso.html",
                controller: "ModalInstanceCtrl"
            });

            modalInstance.result.then(function () {
                console.log("algo");
            }, function () {
                console.log("Modal dismissed at: " + new Date());
            });
        };
    };

    // Modal Instance controller
    angular
       .module("convenioColaboracion")
       .controller("ModalInstanceCtrl", function ($scope, $uibModalInstance) {

           console.log("Depende");

           $scope.ok = function () {
               console.log("Ok");
           };

           $scope.cancel = function () {
               console.log("Cancel");
               $uibModalInstance.dismiss("cancel");
           };
       });
})();
