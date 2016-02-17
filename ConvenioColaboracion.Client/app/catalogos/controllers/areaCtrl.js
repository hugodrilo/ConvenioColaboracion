/** areasCtrl.js 
 * Created by victor
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("AreasCtrl",
        AreasCtrl);

    function AreasCtrl() {
        var vm = this;

        $(".calendarioGobMx").datepicker();
    };
})();