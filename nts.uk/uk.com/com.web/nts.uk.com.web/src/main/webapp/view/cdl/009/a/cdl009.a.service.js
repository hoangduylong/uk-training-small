var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl009;
                (function (cdl009) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var paths = {
                                searchEmpByWorkplaceList: 'screen/com/cdl009/searchByWorkplaceList',
                            };
                            function findEmployees(query) {
                                return nts.uk.request.ajax("com", paths.searchEmpByWorkplaceList, query);
                            }
                            service.findEmployees = findEmployees;
                            /**
                            * Model namespace.
                            */
                            var model;
                            (function (model) {
                                /**
                                 * class EmployeeResult
                                 */
                                var EmployeeResult = /** @class */ (function () {
                                    function EmployeeResult() {
                                    }
                                    return EmployeeResult;
                                }());
                                model.EmployeeResult = EmployeeResult;
                            })(model = service.model || (service.model = {}));
                        })(service = a.service || (a.service = {}));
                    })(a = cdl009.a || (cdl009.a = {}));
                })(cdl009 = view.cdl009 || (view.cdl009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl009.a.service.js.map