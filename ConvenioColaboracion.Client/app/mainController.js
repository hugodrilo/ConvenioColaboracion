/** mainController.js
 * Created by arquitectonet2
  **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("MainController",
        [
            "OidcManager",
            MainController
        ]);

    function MainController(OidcManager) {
        var vm = this;

        vm.logOut = function () {
            vm.mgr.removeToken();
            window.location = "index.html";
        }

        vm.logOutOfIdSrv = function () {
            //// debugger;
            vm.mgr.redirectForLogout();
        }

        vm.mgr = OidcManager.OidcTokenManager();

        //// debugger;

        // no id token or expired => redirect to get one
        if (vm.mgr.expired) {
            vm.mgr.redirectForToken();
        }
    }
}());
