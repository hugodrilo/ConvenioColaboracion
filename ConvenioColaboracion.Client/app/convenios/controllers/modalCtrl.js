/* modalCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    // Module and controller definition.
    angular
        .module("convenioColaboracion")
        .controller("ModalCtrl",
        [
            "$scope",
            "$uibModalInstance",
            "entidad",
            "editEntity",
            ModalCtrl
        ]);

    function ModalCtrl(
        $scope,
        $uibModalInstance,
        entidad,
        editEntity) {
        $scope.entidad = entidad;
        $scope.entidad.btnSave = "Agregar";
        $scope.editEntity = editEntity;
        var backup = {};

        // Boton de Ok para la ventana modal.
        $scope.ok = function (isValid) {
            if (isValid) {
                $uibModalInstance.close($scope.entidad);
            } else {
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
            /// Backup the original object
            backup = angular.copy($scope.editEntity);

            // Set the entity values to edit.
            $scope.entidad = $scope.editEntity;

            $scope.entidad.btnSave = "Actualizar";
        }
    }
})();