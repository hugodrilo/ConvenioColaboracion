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

    var app = angular.module("convenioColaboracion",
    [
        "common.services",
        "ui.router",
        "ui.bootstrap",
        "isteven-multi-select",
        "blockUI"
    ]);

    // The application configuration section
    app.config([
        "$stateProvider",
        "$urlRouterProvider",
        "blockUIConfig",
        function ($stateProvider, $urlRouterProvider, blockUIConfig) {
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
                // Busqueda convenio view
                .state("busquedaConvenio", {
                    url: "/busquedaConvenio",
                    templateUrl: "app/convenios/views/busquedaConvenioView.html"
                })
                // Resultados de la Busqueda Seguimiento
                .state("busquedaConvenio.tablaConvenio", {
                    url: "/tablaConvenio",
                    templateUrl: "app/convenios/templates/tablaConvenio.html",
                    controller: "BusquedaConvenioCtrl as vm"
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
                // Busqueda Seguimiento view
                .state("convenioSeguimiento", {
                    url: "/convenioSeguimiento",
                    templateUrl: "app/convenios/views/busquedaSeguimientoView.html"
                })
                // Resultados de la Busqueda Seguimiento
                .state("convenioSeguimiento.tablaConvenio", {
                    url: "/tablaConvenio",
                    templateUrl: "app/convenios/templates/tablaConvenio.html",
                    controller: "ConsultaSeguimientoCtrl as vm"
                })
                // Seguimiento view
                .state("seguimiento", {
                    url: "/seguimiento/:id",
                    templateUrl: "app/convenios/views/seguimientoView.html",
                    controller: "SeguimientoCtrl as vm"
                })
                // Seguimiento compromiso view
                .state("seguimientoCompromiso", {
                    url: "/seguimiento/compromiso/:id",
                    templateUrl: "app/convenios/views/seguimientoCompromisoView.html",
                    controller: "SeguimientoCompromisoCtrl as vm"
                })
                // Menu Alertas view
                .state("alertas", {
                    url: "/menuAlertas",
                    templateUrl: "app/convenios/views/alertasView.html",
                    controller: "AlertasCtrl as vm"
                })
                // Alerta Sin Actividad view
                .state("alertaSinActividad", {
                    url: "/alertas/sinActividad",
                    templateUrl: "app/convenios/views/alertaActividadView.html",
                    controller: "AlertaActividadCtrl as vm"
                })
                // Alertas Vencimiento view
                .state("alertaVencimiento", {
                    url: "/alertas/vencimiento",
                    templateUrl: "app/convenios/views/alertaVencimientoView.html",
                    controller: "AlertaVencimientoCtrl as vm"
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
                // Estadisticas informe periodo
                .state("informePeriodo", {
                    url: "/estadistica/informePeriodo",
                    templateUrl: "app/estadisticas/views/informePeriodoView.html",
                    controller: "InformePeriodoCtrl as vm"
                })
                // Estadisticas informe materia
                .state("informeMateria", {
                    url: "/estadistica/informeMateria/:id",
                    templateUrl: "app/estadisticas/views/informeMateriaView.html",
                    controller: "InformeMateriaCtrl as vm"
                })
                // Estadisticas informe materia con resultados de convenios
                .state("informeMateria.tablaConvenio", {
                    url: "/estadistica/informe/materia/:id/tablaConvenio",
                    templateUrl: "app/convenios/templates/tablaConvenio.html",
                    controller: "InformeMateriaCtrl as vm"
                })
                // Estadisticas informe administracion materia
                .state("admonMateria", {
                    url: "/estadistica/materia/administracion/:id",
                    templateUrl: "app/estadisticas/views/admonMateriaView.html",
                    controller: "AdmonMateriaCtrl as vm"
                })
                // Estadisticas informe administracion materia con resultados de convenios
                .state("admonMateria.tablaConvenio", {
                    url: "/estadistica/materia/administracion/:id/tablaConvenio",
                    templateUrl: "app/convenios/templates/tablaConvenio.html",
                    controller: "AdmonMateriaCtrl as vm"
                })
                // Estadisticas informe area
                .state("informeArea", {
                    url: "/estadistica/informeArea",
                    templateUrl: "app/estadisticas/views/informeAreaView.html",
                    controller: "InformeAreaCtrl as vm"
                })
                // Estadisticas informe area con resultados de convenios
                .state("informeArea.tablaConvenio", {
                    url: "/estadistica/informe/area/:id/tablaConvenio",
                    templateUrl: "app/convenios/templates/tablaConvenio.html",
                    controller: "InformeAreaCtrl as vm"
                })
                // Estadisticas ficha del convenio
                .state("fichaConvenio", {
                    url: "/estadistica/fichaConvenio/:id",
                    templateUrl: "app/convenios/views/fichaConvenioView.html",
                    controller: "FichaConvenioCtrl as vm"
                })
                // Estadisticas informe grado
                .state("informeGrado", {
                    url: "/estadistica/informeGrado",
                    templateUrl: "app/estadisticas/views/informeGradoView.html",
                    controller: "InformeGradoCtrl as vm"
                })
                // Estadisticas informe grado con resultados de convenios
                .state("informeGrado.tablaConvenio", {
                    url: "/estadistica/informe/grado/:id/tablaConvenio",
                    templateUrl: "app/convenios/templates/tablaConvenio.html",
                    controller: "InformeGradoCtrl as vm"
                })
                // Resultados
                .state("resultados", {
                    url: "/estadistica/resultados/:admonId/:matId/:areaId/:estatusId/:nombre",
                    templateUrl: "app/estadisticas/views/resultadosView.html",
                    controller: "ResultadosCtrl as vm"
                })
                // Resultados de convenios incluendo la tabla de convenios
                .state("resultados.tablaConvenio", {
                    url: "/estadistica/resultados/:admonId/:matId/:areaId/:estatusId/:nombre/tablaConvenio",
                    templateUrl: "app/convenios/templates/tablaConvenio.html",
                    controller: "ResultadosCtrl as vm"
                });

            // Change the default overlay message
            blockUIConfig.message = "Cargando información...";
        }
    ]);

    // The application run seccion. Allows to dismiss all modal window.
    app.run([
        "$rootScope", "$uibModalStack",
        function ($rootScope, $uibModalStack) {
            if ($rootScope !== undefined && $rootScope !== null) {
                $rootScope.$on("$stateChangeStart", function () {
                    var top = $uibModalStack.getTop();
                    if (top) {
                        $uibModalStack.dismiss(top.key);
                    }
                });
            }
        }
    ]);

    // Input file directive to upload a single file using FileReader.
    app.directive("fileread", [
        function () {
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
                        };

                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            };
        }
    ]);
})();