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
                // Asignar perfiles de usuario
                if (results.profiles !== undefined && results.profiles !== null) {
                    // Check if the element already exist in the collection
                    angular.forEach(results.profiles,
                        function (perfil) {
                            /** 1	ADMINISTRACION
                                2	SEGUIMIENTO - AREA VINCULANTE
                                3	CONSULTA*/
                            if (perfil.profileId === 1) {
                                results.isAdmin = true;
                            } else if (perfil.profileId === 2) {
                                results.isSeguimiento = true;
                            } else {
                                results.isConsulta = true;
                            }
                        });
                } else {
                    $scope.user.isConsulta = true;
                }

                var result = results;

                $scope.user = {
                    id: result.userId,
                    displayName: result.nombre,
                    usuario: result.usuario,
                    isAdmin: result.isAdmin !== undefined ? result.isAdmin : false,
                    isSeguimiento: result.isSeguimiento !== undefined ? result.isSeguimiento : false,
                    isConsulta: result.isConsulta !== undefined ? result.isConsulta : false
                };

                addUserToStorage();
            }
        }).catch(function (error) {
            $scope.user = {
                id: 0,
                displayName: "",
                usuario: "",
                isAdmin: false,
                isSeguimiento: false,
                isConsulta: true
            };
        });

        return $q.when($scope.user);
    }

    //// TODO: check the logut and clean resources 
    //// http://stackoverflow.com/questions/34263661/how-to-clear-local-storage-after-logout-using-angularjs

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