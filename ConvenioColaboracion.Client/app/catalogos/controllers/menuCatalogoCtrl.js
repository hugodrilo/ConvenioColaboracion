/** menuCatalogoCtrl.js 
 * Created by victor
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("MenuCatalogoCtrl",
        MenuCatalogoCtrl);

    function MenuCatalogoCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };
})();