/** AngularJS-Windows-Authentication.authentication.js 
 * Created by victor
 * based on: https://gist.github.com/danbergman/e67e5cbe3e9943ecbb03#file-angularjs-windows-authentication-authentication-js
 **/

angular.module("convenioColaboracion")
    .factory("authentication", [
        "$http",
        "$q",
        "$window",
        "appSettings",
        authentication
    ]);

function authentication(
    $http,
    $q,
    $window,
    appSettings) {

    var user;

    function login() {

        // check if the user already exists for this session
        if (user) {
            return $q.when(user); // resolve with given value, necessary because calling function expects a promise.
        }

        var url = appSettings.serverPath + "/api/users";
        return $http.get(url).then(function (results) {
            var result = results.data;

            user = {
                id: result.userId,
                displayName: result.nombre,
                usuario: result.usuario,
                isAdmin: result.IsAdmin
            };

            addUserToStorage();

            console.log("user created.");
            return $q.when(user);
        });
    }

    function addUserToStorage() {
        $window.sessionStorage["user"] = JSON.stringify(user);
    }

    function getUser() {
        return user;
    }

    function init() {
        if ($window.sessionStorage["user"]) {
            user = JSON.parse($window.sessionStorage["user"]);
        }
    }

    init();

    return {
        user: user,
        init: init,
        addUserToStorage: addUserToStorage,
        login: login,
        getUser: getUser
    };
};