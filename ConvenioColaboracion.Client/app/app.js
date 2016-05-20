/** app.js**/
/**  Created by victor.martinez 02/04/2016 **/

/**Notes:
 *  - Define each controller as a separate .js file
 *  - Name the controller in Pascal case
 *  - Suffix the controller with "Controller" or "Ctrl"
 *  - Wrap the controller in an IIFE --> (function () {"use strict";})();
 */

(function () {
    "use strict";

    var app = angular.module("convenioColaboracion", ["common.services",
                                                        "ui.router",
                                                        "ui.bootstrap",
                                                        "isteven-multi-select"]);

    // The application configuration section
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
                        // Convenio Edit view
                        .state("convenioEdit", {
                            url: "/convenios/:id",
                            templateUrl: "app/convenios/views/convenio.html",
                            controller: "ConvenioCtrl as vm"
                        })
                        // Busqueda view
                        .state("busqueda", {
                            url: "/busqueda",
                            templateUrl: "app/convenios/views/busquedaView.html",
                            controller: "BusquedaCtrl as vm"
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
                        });
                }]);

    // The application run seccion. Allows to dismiss all modal window.
    app.run([
       "$rootScope", "$uibModalStack",
       function ($rootScope, $uibModalStack) {
           $rootScope.$on("$stateChangeStart", function () {
               var top = $uibModalStack.getTop();
               if (top) {
                   $uibModalStack.dismiss(top.key);
               }
           });
       }
    ]);

    // Input file directive to upload a single file using FileReader.
    app.directive("fileread", [function () {
        return {
            scope: {
                fileread: "=",
                filename: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                            scope.filename = changeEvent.target.files[0].name;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
})();