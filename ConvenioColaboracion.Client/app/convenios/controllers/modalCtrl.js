/* modalCtrl.js
 * Created by arquitectonet2
 */

(
    function () {
        "use strict";

        // Module and controller definition.
        angular
            .module("convenioColaboracion")
            .controller("ModalCtrl",
                        ["$scope",
                         "$uibModal",
                         "$window",
                         "$stateParams",
                         ModalCtrl]);

        function ModalCtrl($scope, $uibModalInstance) {
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
                $uibModalInstance.dismiss("cancelar");
            };
        }
    })();
