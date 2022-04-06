var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas004;
                (function (cas004) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var paths = {
                                getCompanyList: "ctx/sys/auth/ws/company/getCompanyList",
                                findEmployeesByCId: "ctx/sys/auth/ws/employeeInfo/findEmployeesByCId"
                            };
                            //Fine All Company
                            function getCompanyList() {
                                return nts.uk.request.ajax("com", paths.getCompanyList);
                            }
                            service.getCompanyList = getCompanyList;
                            // get list employee by company id
                            function findEmployeesByCId(companyId) {
                                return nts.uk.request.ajax("com", paths.findEmployeesByCId, companyId);
                            }
                            service.findEmployeesByCId = findEmployeesByCId;
                        })(service = b.service || (b.service = {}));
                    })(b = cas004.b || (cas004.b = {}));
                })(cas004 = view.cas004 || (view.cas004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas004.b.service.js.map