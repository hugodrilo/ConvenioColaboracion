/** winAuthCtrl.js 
 * Created by victor
 **/

angular
    .module("convenioColaboracion")
    .controller("WinAuthCtrl", [
        "$scope",
        "$q",
        "$window",
        "userResource",
        WinAuthCtrl
    ]);

function WinAuthCtrl(
    $scope,
    $q,
    $window,
    userResource) {
    var vm = this;
    $scope.user = {};

    vm.login = function () {

        // check if the user already exists for this session
        if ($scope.user !== undefined && $scope.user !== null && $scope.user.id > 0) {
            return $q.when($scope.user); // resolve with given value, necessary because calling function expects a promise.
        }

        var getUser = userResource.get();

        getUser.$promise.then(function (results) {
            if (results !== undefined && results !== null) {
                var result = results;

                $scope.user = {
                    id: result.userId,
                    displayName: result.nombre,
                    usuario: result.usuario,
                    isAdmin: result.IsAdmin
                };

                addUserToStorage();
            }
        });

        return $q.when($scope.user);
    }

    function addUserToStorage() {
        $window.sessionStorage["user"] = JSON.stringify($scope.user);
    }

    function getUser() {
        return $scope.user;
    }

    function init() {
        if ($window.sessionStorage["user"]) {
            $scope.user = JSON.parse($window.sessionStorage["user"]);
        }
    }

    init();

    return {
        user: $scope.user,
        init: init,
        addUserToStorage: addUserToStorage,
        login: vm.login(),
        getUser: getUser
    };
};