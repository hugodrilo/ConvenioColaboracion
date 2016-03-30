/* common.services.js 
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    angular
        .module("common.services",
            ["ngResource"])
        .constant("appSettings",
        {
            ////serverPath: "http://172.16.249.109:84" //// Dev server
            serverPath: "http://localhost:60197"  /// Victor Localhost
        });
}());