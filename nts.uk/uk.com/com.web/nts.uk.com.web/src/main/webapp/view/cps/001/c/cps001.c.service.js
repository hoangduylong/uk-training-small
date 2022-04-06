var cps001;
(function (cps001) {
    var c;
    (function (c) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                'getListEmployeeDataMngInfo': 'ctx/pereg/deleteemployee/getallemployeetodelete',
                'getDetail': 'ctx/pereg/deleteemployee/getdetailemployeetodelete/{0}',
                'restoreData': 'ctx/pereg/deleteemployee/restoredata',
                'deleteEmp': 'ctx/pereg/deleteemployee/deleteemp/{0}'
            };
            function getData() {
                return ajax(paths.getListEmployeeDataMngInfo);
            }
            service.getData = getData;
            function getDetail(employeeId) {
                return ajax(format(paths.getDetail, employeeId));
            }
            service.getDetail = getDetail;
            function restoreData(command) {
                return ajax(paths.restoreData, command);
            }
            service.restoreData = restoreData;
            function removedata(employeeId) {
                return ajax(format(paths.deleteEmp, employeeId));
            }
            service.removedata = removedata;
        })(service = c.service || (c.service = {}));
    })(c = cps001.c || (cps001.c = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.c.service.js.map