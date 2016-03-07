/**
 * consultaCtrl.js 
 * Created by victor */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConsultaCtrl",
        ConsultaCtrl);

    function ConsultaCtrl(convenioResource) {
        var vm = this;
        vm.convenios = [];

        vm.convenios = convenioResource.query();        

        $(".calendarioGobMx").datepicker();
    };
})();