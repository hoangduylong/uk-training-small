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
                    var j;
                    (function (j) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                findSaveSetHistory: "ctx/sys/assist/datarestoration/findSaveSet",
                                findData: "ctx/sys/assist/datarestoration/findData"
                            };
                            function findSaveSetHistory(fromDate, toDate) {
                                return ajax('com', paths.findSaveSetHistory, { from: fromDate, to: toDate });
                            }
                            service.findSaveSetHistory = findSaveSetHistory;
                            function findData(param) {
                                return ajax('com', paths.findData, param);
                            }
                            service.findData = findData;
                        })(service = j.service || (j.service = {}));
                    })(j = cmf004.j || (cmf004.j = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.j.service.js.map