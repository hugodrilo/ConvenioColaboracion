﻿/** convenioCtrl.js 
 * Created by victor
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl",
        ConvenioCtrl);

    function ConvenioCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };

})();