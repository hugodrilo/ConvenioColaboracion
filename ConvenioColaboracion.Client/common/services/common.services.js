﻿(function () {
    "use strict";

    angular
        .module("common.services", 
            ["ngResource"])
        .constant("appSettings",
        {
            serverPath: "http://172.16.249.109:84"
        });
}());