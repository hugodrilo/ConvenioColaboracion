/** convenioCtrl.js 
 * Created by hugodrilo
 **/

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl",
        ConvenioCtrl);

    function ConvenioCtrl() {
        var vm = this;

        vm.convenios = [
            {
                "convenioId": 1,
                "convenio": "convenio 1"
            },
            {
                "convenioId": 2,
                "convenio": "convenio 2"
            },
            {
                "convenioId": 3,
                "convenio": "convenio 3"
            }];
    };
})();