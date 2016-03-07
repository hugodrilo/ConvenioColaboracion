(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("convenioResource",
            ["$resource", "appSettings", convenioResource]);

    function convenioResource($resource, appSettings) {        
        return $resource(appSettings.serverPath + "/api/convenio/");
    }
}());