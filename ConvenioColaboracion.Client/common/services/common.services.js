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
            //// serverPath: "http://172.16.249.109:84" //// Dev server
            serverPath: "https://localhost:44326"  //// Victor Localhost SSL
            //// serverPath: "http://localhost:60197"  //// Victor Localhost
        });

    // oidc manager for dep injection
    angular.module("common.services")
        .factory("OidcManager", function () {

            // configure manager
            var config = {
                client_id: "convenioImplicit",
                redirect_uri: window.location.protocol + "//" + window.location.host + "/callback.html",
                response_type: "id_token token",
                scope: "openid profile",
                authority: "https://localhost:44391/identity" // this is the SSL port for the identity project in the web api
            };

            var mgr = new OidcTokenManager(config);

            return {
                OidcTokenManager: function () {
                    return mgr;
                }
            };
        });
}());