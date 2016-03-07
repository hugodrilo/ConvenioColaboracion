/* convenioCtrl.js
 * Created by arquitectonet2
 */

(function () {
    "use strict";

    angular
        .module("convenioColaboracion")
        .controller("ConvenioCtrl",
        ConvenioCtrl);

    function ConvenioCtrl(convenioResource) {
        var vm = this;
        vm.convenio = {};
        vm.message = '';
                
        $(".calendarioGobMx").datepicker();

        vm.submit = function () {
            console.log('Submit working...');
            //console.log(vm.convenio);
            //var convenios = convenioResource.query();
            
            new convenioResource(vm.convenio).$save().then(function (nuevoConvenio) {
                console.log("Save is working..");
                console.log(nuevoConvenio);
            });

            //vm.convenio.$save(
            //    function (data) {
            //        vm.message = 'Guardado completado...';
            //    },
            //    function (response) {
            //        vm.message = response.statusText + "\r\n";
            //    }
            //);
        }
    };

})();
