/* menuConvenioCtrl.js 
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("MenuConvenioCtrl",
        MenuConvenioCtrl);

    function MenuConvenioCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };

})();