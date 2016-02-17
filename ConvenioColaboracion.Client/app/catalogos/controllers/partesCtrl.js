/** PartesCtrl.js 
 * Created by victor
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("PartesCtrl",
        PartesCtrl);

    function PartesCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };
})();