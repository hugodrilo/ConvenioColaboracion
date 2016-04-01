/* convenioResource.js
 * Created by arquitectonet3
 */

(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("convenioResource", ["$resource", "appSettings", convenioResource])
        .factory("materiaResource", ["$resource", "appSettings", materiaResource])
        .factory("subMateriaResource", ["$resource", "appSettings", subMateriaResource])
        .factory("areaResource", ["$resource", "appSettings", areaResource])
        .factory("tipoAreaResource", ["$resource", "appSettings", tipoAreaResource])
        .factory("parteResource", ["$resource", "appSettings", parteResource]);

    // convenio resource
    function convenioResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/convenio/");
    };

    // materia resource
    function materiaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/materia/");
    };

    // subMateria resource
    function subMateriaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/submateria/:id", { id: "@id" });
    };

    // area resource
    function areaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/area/");
    };

    // tipoArea resource
    function tipoAreaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/tipoarea/");
    };

    // parte resource
    function parteResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/parte/");
    };
}());
