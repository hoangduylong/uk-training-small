var cps003;
(function (cps003) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                data: function (command) { return ajax("ctx/pereg/grid-layout/save-data", command); },
                setting: function (command) { return ajax("ctx/pereg/grid-layout/save-setting", command); },
                register: function (command) { return ajax("facade/pereg/grid/register", command); }
            };
            service.fetch = {
                data: function (command) { return ajax("ctx/pereg/grid-layout/get-data", command); },
                setting: function (cid) { return ajax("ctx/pereg/grid-layout/get-setting/".concat(cid)); },
                category: function (uid) { return ajax("ctx/pereg/employee/category/get-all-cps003/".concat(uid)); },
                permission: function (roleId, catId) { return ajax("ctx/pereg/roles/auth/category/find/".concat(roleId, "/").concat(catId)); },
                basicHolidayEmpInfo: function (empIdList) { return ajax("at", "at/record/remainnumber/yearholidaymanagement/get-data", empIdList); },
                affiliatedCompanyHist: function (param) { return ajax("bs/employee/affiliatedcompanyhistory/getdata", param); },
                contractTime: function (param) { return ajax("ctx/pereg/grid-layout/get-data/contracttime", param); },
                workplaceInfo: function (param) { return ajax("bs/employee/workplace/info/display", param); }
            };
        })(service = a.service || (a.service = {}));
    })(a = cps003.a || (cps003.a = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.a.service.js.map