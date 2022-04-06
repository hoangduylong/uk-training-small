var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var d;
                    (function (d) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                extractData: "ctx/sys/assist/datarestoration/extractData",
                                checkProcess: "ctx/sys/assist/datarestoration/getServerPrepare"
                            };
                            function extractData(fileInfo) {
                                return ajax(paths.extractData, fileInfo);
                            }
                            service.extractData = extractData;
                            function checkProcess(processId) {
                                return ajax("com", paths.checkProcess, processId);
                            }
                            service.checkProcess = checkProcess;
                        })(service = d.service || (d.service = {}));
                    })(d = cmf004.d || (cmf004.d = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.d.service.js.map