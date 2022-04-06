var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var y;
                    (function (y) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                getExterOutExecLog: "exio/exo/execlog/getExterOutExecLog/{0}",
                                getExternalOutLog: "exio/exo/execlog/getExternalOutLog/{0}",
                                exportDatatoCsv: "exio/exo/execlog/export",
                            };
                            function getExterOutExecLog(storeProcessingId) {
                                var _path = format(paths.getExterOutExecLog, storeProcessingId);
                                return ajax('com', _path);
                            }
                            service.getExterOutExecLog = getExterOutExecLog;
                            function getExternalOutLog(storeProcessingId) {
                                var _path = format(paths.getExternalOutLog, storeProcessingId);
                                return ajax('com', _path);
                            }
                            service.getExternalOutLog = getExternalOutLog;
                            function exportDatatoCsv(data) {
                                return nts.uk.request.exportFile(paths.exportDatatoCsv, data);
                            }
                            service.exportDatatoCsv = exportDatatoCsv;
                        })(service = y.service || (y.service = {}));
                    })(y = cmf002.y || (cmf002.y = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.y.service.js.map