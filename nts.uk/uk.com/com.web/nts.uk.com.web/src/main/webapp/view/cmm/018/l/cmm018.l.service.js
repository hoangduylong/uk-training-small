var request = nts.uk.request;
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var l;
                    (function (l) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                saveExcel: "approval/report/employeeUnregister"
                            };
                            function saveExcel(param) {
                                return uk.request.exportFile(servicePath.saveExcel, param);
                            }
                            service.saveExcel = saveExcel;
                        })(service = l.service || (l.service = {}));
                    })(l = cmm018.l || (cmm018.l = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.l.service.js.map