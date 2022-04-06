var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl027;
                (function (cdl027) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getLogInfor: "ctx/sys/log/datacorrectionlog/findAll",
                                exportCsv: "ctx/sys/log/datacorrectionlog/exportCsv"
                            };
                            function getLogInfor(params) {
                                return ajax("com", paths.getLogInfor, params);
                            }
                            service.getLogInfor = getLogInfor;
                            function exportCsv(params) {
                                return nts.uk.request.exportFile(paths.exportCsv, params);
                            }
                            service.exportCsv = exportCsv;
                        })(service = a.service || (a.service = {}));
                    })(a = cdl027.a || (cdl027.a = {}));
                })(cdl027 = view.cdl027 || (view.cdl027 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl027.a.service.js.map