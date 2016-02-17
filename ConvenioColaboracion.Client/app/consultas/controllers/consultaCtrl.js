/**
 * consultaCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConsultaCtrl",
        ConsultaCtrl);

    function ConsultaCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };
})();