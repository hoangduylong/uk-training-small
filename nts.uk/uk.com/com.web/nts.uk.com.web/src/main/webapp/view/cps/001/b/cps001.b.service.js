var cps001;
(function (cps001) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                'getEmployeeInfo': 'ctx/pereg/deleteemployee/getemployeetodelete/{0}',
                'getPersonInfo': 'bs/employee/person/findBypId/{0}',
                'deleteEmp': 'ctx/pereg/deleteemployee/deleteemployee',
            };
            function getEmployeeInfo(employeeId) {
                return ajax(format(paths.getEmployeeInfo, employeeId));
            }
            service.getEmployeeInfo = getEmployeeInfo;
            function getPersonInfo(personId) {
                return ajax(format(paths.getPersonInfo, personId));
            }
            service.getPersonInfo = getPersonInfo;
            function deleteEmp(modelDelete) {
                return ajax(paths.deleteEmp, modelDelete);
            }
            service.deleteEmp = deleteEmp;
        })(service = b.service || (b.service = {}));
    })(b = cps001.b || (cps001.b = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.b.service.js.map