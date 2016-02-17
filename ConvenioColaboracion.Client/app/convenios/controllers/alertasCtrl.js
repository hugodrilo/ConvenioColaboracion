/** alertasCtrl.js 
 * Created by victor
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("AlertasCtrl",
        AlertasCtrl);

    function AlertasCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };

})();