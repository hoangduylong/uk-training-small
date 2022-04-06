var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var i;
                    (function (i) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                findSaveSetHistory: "ctx/sys/assist/deletedata/findSaveSet",
                                findData: "ctx/sys/assist/deletedata/findData",
                                deleteData: "ctx/sys/assist/deletedata/deleteData"
                            };
                            function findSaveSetHistory(fromDate, toDate) {
                                return ajax('com', paths.findSaveSetHistory, { from: fromDate, to: toDate });
                            }
                            service.findSaveSetHistory = findSaveSetHistory;
                            function findData(param) {
                                return ajax('com', paths.findData, param);
                            }
                            service.findData = findData;
                            function deleteData(param) {
                                return ajax('com', paths.deleteData, param);
                            }
                            service.deleteData = deleteData;
                        })(service = i.service || (i.service = {}));
                    })(i = cmf005.i || (cmf005.i = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.i.service.js.map