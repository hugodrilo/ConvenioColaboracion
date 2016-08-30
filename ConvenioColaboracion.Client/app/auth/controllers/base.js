/** base.js 
 * Created by victor
 * based on: https://gist.github.com/danbergman/e67e5cbe3e9943ecbb03#file-angularjs-windows-authentication-authentication-js
 **/

(function () {
    "use strict";
    var controllerId = "base";

    angular.module("convenioColaboracion")
        .controller(controllerId, [
            ////"common",
            "authentication",
            base
        ]);

    function base(
        ////common,
        authentication) {

        var vm = this;

        // local vm.user object for use with topnav.html to display logged in user name
        vm.user = { nombre: "..." };

        ////activate();

        ////function activate() {
        ////    common.activateController([login()], controllerId);
        ////}

        function login() {

            return authentication.login().then(function (data) {
                vm.user = data;
            });
        }
        
    }
})();