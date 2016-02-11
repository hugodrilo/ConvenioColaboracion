/** app.js**/
/**  Created by victor.martinez 02/04/2016 **/

/**Notes:
 *  - Define each controller as a separate .js file
 *  - Name the controller in Pascal case
 *  - Suffix the controller with "Controller" or "Ctrl"
 *  - Wrap the controlle in an IIFE --> (function () {"use strict";})();
 */


(function () {
    "use strict";

    var app = angular.module("convenioColaboracion", ["common.services",
                                                        "ui.router"]);
    app.config(["$stateProvider",
                "$urlRouterProvider",

                function ($stateProvider, $urlRouterProvider) {
                    // Default view
                    $urlRouterProvider.otherwise("/");

                    // Define the states
                    $stateProvider
                        // Home view (main view)
                        .state("home", {
                            url: "/",
                            templateUrl: "app/welcomeView.html"
                        })

                        // Convenio view
                        .state("convenio", {
                            url: "/convenios",
                            templateUrl: "app/convenios/views/convenio.html",
                            controller: "ConvenioCtrl as vm"
                        })
                    ////// TODO: Pendiente pensar la edicion de un convenio
                    ////// Convenio Edit view
                    ////.state("convenio", {
                    ////    url: "/convenios/edit/:convenioId",
                    ////    templateUrl: "app/convenios/views/convenioEditView.html",
                    ////    controller: "ConvenioCtrl as vm"
                    ////})
                    ;
                }]);
}
)();