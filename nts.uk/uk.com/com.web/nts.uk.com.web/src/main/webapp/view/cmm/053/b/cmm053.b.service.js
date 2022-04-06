var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm053;
                (function (cmm053) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getPastHistory: "workflow/approvermanagement/workroot/find/settingOfManager/getPastHistory/{0}"
                            };
                            function getPastHistory(employeeId) {
                                return ajax(format(paths.getPastHistory, employeeId));
                            }
                            service.getPastHistory = getPastHistory;
                        })(service = b.service || (b.service = {}));
                    })(b = cmm053.b || (cmm053.b = {}));
                })(cmm053 = view.cmm053 || (view.cmm053 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm053.b.service.js.map