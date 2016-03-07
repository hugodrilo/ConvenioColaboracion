/* seguimientoCtrl.js 
 * Created by victor
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("SeguimientoCtrl",
        SeguimientoCtrl);

    function SeguimientoCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };

})();