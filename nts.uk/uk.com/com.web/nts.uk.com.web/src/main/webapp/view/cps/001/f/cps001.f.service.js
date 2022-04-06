var cps001;
(function (cps001) {
    var f;
    (function (f) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                'getData': 'basic/organization/empfilemanagement/getlistdocfile/{0}',
                'savedata': 'basic/organization/empfilemanagement/savedocfile',
                'updateCtgdata': 'basic/organization/empfilemanagement/updatectgdocfile',
                'updatedata': 'basic/organization/empfilemanagement/updatedata',
                'deletedata': 'basic/organization/empfilemanagement/deletedata',
                'permision': 'ctx/pereg/functions/auth/find-all'
            };
            function getData(employeeId) {
                return ajax(format(paths.getData, employeeId));
            }
            service.getData = getData;
            function savedata(command) {
                return ajax(paths.savedata, command);
            }
            service.savedata = savedata;
            function updatedata(command) {
                return ajax(paths.savedata, command);
            }
            service.updatedata = updatedata;
            function deletedata(command) {
                return ajax(paths.deletedata, command);
            }
            service.deletedata = deletedata;
            function updateCtgdata(command) {
                return ajax(paths.updateCtgdata, command);
            }
            service.updateCtgdata = updateCtgdata;
            function getCurrentEmpPermision() {
                return ajax(paths.permision);
            }
            service.getCurrentEmpPermision = getCurrentEmpPermision;
        })(service = f.service || (f.service = {}));
    })(f = cps001.f || (cps001.f = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.f.service.js.map