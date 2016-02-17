/**
 * estadisticaCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("EstadisticaCtrl",
        EstadisticaCtrl);

    function EstadisticaCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };
})();