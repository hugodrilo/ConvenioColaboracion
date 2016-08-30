/** menuCatalogoCtrl.js 
 * Created by victor
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("MenuCatalogoCtrl",
        [
            "$q",
            "authentication",
            MenuCatalogoCtrl
        ]);

    function MenuCatalogoCtrl($q, authentication) {
        var vm = this;

        $(".calendarioGobMx").datepicker();

        function getUser() {
            return authentication.login().then(function (data) {
                vm.user = data;
                return $q.when(data);
            });
        }

        getUser();

    };
})();