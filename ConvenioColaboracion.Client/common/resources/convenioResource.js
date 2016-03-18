﻿/* convenioResource.js
 * Created by arquitectonet3
 */

(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("convenioResource", ["$resource", "appSettings", convenioResource])
        .factory("materiaResource", ["$resource", "appSettings", materiaResource])
        .factory("areaResource", ["$resource", "appSettings", areaResource])
        .factory("parteResource", ["$resource", "appSettings", parteResource]);

    // convenio resource
    function convenioResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/convenio/");
    }

    // materia resource
    function materiaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/materia/");
    }

    // area resource
    function areaResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/area/");
    }

    // parte resource
    function parteResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "/api/parte/");
    }
}());
