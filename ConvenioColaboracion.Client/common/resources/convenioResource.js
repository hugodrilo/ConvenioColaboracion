/* convenioResource.js
 * Created by arquitectonet3
 */

(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("convenioResource", ["$resource", "appSettings", convenioResource])
        .factory("convenioEditResource", ["$resource", "appSettings", convenioEditResource])
        .factory("convenioUpdateResource", ["$resource", "appSettings", convenioUpdateResource])
        .factory("materiaResource", ["$resource", "appSettings", materiaResource])
        .factory("subMateriaResource", ["$resource", "appSettings", subMateriaResource])
        .factory("areaResource", ["$resource", "appSettings", areaResource])
        .factory("tipoAreaResource", ["$resource", "appSettings", tipoAreaResource])
        .factory("estatusResource", ["$resource", "appSettings", estatusResource])
        .factory("parteResource", ["$resource", "appSettings", parteResource])
        .factory("busquedaResource", ["$resource", "appSettings", busquedaResource])
        .factory("compromisoResource", ["$resource", "appSettings", compromisoResource])
        .factory("actividadResource", ["$resource", "appSettings", actividadResource])
        .factory("informePeriodoResource", ["$resource", "appSettings", informePeriodoResource])
        .factory("alertaResource", ["$resource", "appSettings", alertaResource]);

    // convenio resource
    function convenioResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/convenio/");
    }

    // convenio Edit resource
    function convenioEditResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/convenio/:id", { id: "@id" });
    }

    // convenio Update resource
    function convenioUpdateResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/convenio/:id",
        { id: "@id" },
        {
            "update": { method: "PUT" }
        });
    }

    // materia resource
    function materiaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/materia/");
    }

    // subMateria resource
    function subMateriaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/submateria/:id", { id: "@id" });
    }

    // area resource
    function areaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/area/");
    }

    // tipoArea resource
    function tipoAreaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/tipoarea/");
    }

    // estatus resource
    function estatusResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/estatus/");
    }

    // parte resource
    function parteResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/parte/");
    }

    // busqueda resource
    function busquedaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/busqueda/:searchText", { searchText: "@searchText" });
    }

    // compromiso resource
    function compromisoResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/compromiso/");
    }

    // actividad resource
    function actividadResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/actividad/", {}, {
            query: {
                method: "GET",
                isArray: true
            },
            getAllById: {
                url: appSettings.serverPath + "/api/actividad/GetAllById/", //full URL + custom action
                method: "GET",
                isArray: true
            },
            save: {
                url: appSettings.serverPath + "/api/actividad/post/",
                method: "POST"
            },
            put: {
                url: appSettings.serverPath + "/api/actividad/put/",
                method: "PUT"
            },
            delete: {
                url: appSettings.serverPath + "/api/actividad/delete/",
                method: "DELETE"
            }
        });
    }

    // informe periodo resource   api/estadistica/{action}/{id}
    function informePeriodoResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/estadistica/", {}, {
            query: {
                method: "GET",
                isArray: true
            },
            getInformePeriodo: {
                url: appSettings.serverPath + "/api/estadistica/GetInformePeriodo/",
                method: "GET",
                isArray: true
            },
            getInformeMateria: {
                url: appSettings.serverPath + "/api/estadistica/GetInformeMateria/:id",
                params: { id: "@id" },
                method: "GET",
                isArray: true
            },
            getInformeArea: {
                url: appSettings.serverPath + "/api/estadistica/GetInformeArea/",
                method: "GET",
                isArray: true
            },
            getInformeGrado: {
                url: appSettings.serverPath + "/api/estadistica/GetInformeGrado/",
                method: "GET",
                isArray: true
            },
            getSexenio: {
                url: appSettings.serverPath + "/api/estadistica/GetSexenio/:id",
                params: { id: "@id" },
                method: "GET",
                isArray: false
            },
            getConvenioAdmon: {
                url: appSettings.serverPath + "/api/estadistica/GetConvenios/:admonId/:matId/:areaId/:estatusId",
                params: {
                    admonId: "@admonId",
                    matId: "@matId",
                    areaId: "@areaId",
                    estatusId: "@estatusId"
                },
                method: "GET",
                isArray: true
            }
        });
    }

    // alerta resource
    function alertaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/alerta/", {}, {
            query: {
                method: "GET",
                isArray: true
            },
            getInactividad: {
                url: appSettings.serverPath + "/api/alerta/GetInactividad/:id",
                params: {
                    id: "@id"
                },
                method: "GET",
                isArray: true
            },
            getVencimiento: {
                url: appSettings.serverPath + "/api/alerta/GetVencimiento/:id",
                params: {
                    id: "@id"
                },
                method: "GET",
                isArray: true
            }
        });
    }
}());
