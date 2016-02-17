/** menuConvenioCtrl.js 
 * Created by victor
 **/

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