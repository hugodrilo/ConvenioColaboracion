/** menuCatalogoCtrl.js 
 * Created by victor
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("MenuCatalogoCtrl",
        [
            "$scope",

            MenuCatalogoCtrl
        ]);

    function MenuCatalogoCtrl($scope
        ) {
        var vm = this;

        $(".calendarioGobMx").datepicker();

    }
})();