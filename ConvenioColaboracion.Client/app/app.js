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
                                                        "ui.router",
                                                        "ui.bootstrap"]);
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
                        // Menú de convenio view
                        .state("menuConvenio", {
                            url: "/menuConvenio",
                            templateUrl: "app/convenios/views/menuConvenioView.html",
                            controller: "MenuConvenioCtrl as vm"
                        })
                        // Convenio view
                        .state("convenio", {
                            url: "/convenios",
                            templateUrl: "app/convenios/views/convenio.html",
                            controller: "ConvenioCtrl as vm"
                        })
                        // Seguimiento view
                        .state("seguimiento", {
                            url: "/seguimiento",
                            templateUrl: "app/convenios/views/seguimientoView.html",
                            controller: "SeguimientoCtrl as vm"
                        })
                        // Alertas view
                        .state("alertas", {
                            url: "/alertas",
                            templateUrl: "app/convenios/views/alertasView.html",
                            controller: "AlertasCtrl as vm"
                        })
                        // Consulta view
                        .state("consulta", {
                            url: "/consulta",
                            templateUrl: "app/consultas/views/consultaView.html",
                            controller: "ConsultaCtrl as vm"
                        })
                        // Menú catalogo view
                        .state("menuCatalogo", {
                            url: "/menuCatalogo",
                            templateUrl: "app/catalogos/views/menuCatalogoView.html",
                            controller: "MenuCatalogoCtrl as vm"
                        })
                        // Catalogo areas view
                        .state("catalogoAreas", {
                            url: "/catalogoAreas",
                            templateUrl: "app/catalogos/views/areasView.html",
                            controller: "AreasCtrl as vm"
                        })
                        // Catalogo partes view
                        .state("catalogoPartes", {
                            url: "/catalogoPartes",
                            templateUrl: "app/catalogos/views/partesView.html",
                            controller: "PartesCtrl as vm"
                        })
                        // Estadistica view
                        .state("estadistica", {
                            url: "/estadistica",
                            templateUrl: "app/estadisticas/views/estadisticaView.html",
                            controller: "EstadisticaCtrl as vm"
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

    // Directiva para input file.
    app.directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
})();