var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf003;
                (function (cmf003) {
                    var i;
                    (function (i) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                findSaveSetHistory: "ctx/sys/assist/datastorage/findSaveSet",
                                findData: "ctx/sys/assist/datastorage/findData",
                                deleteData: "ctx/sys/assist/datastorage/deleteData",
                                getFreeSpace: "ctx/sys/assist/datastorage/getFreeSpace"
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
                            function getFreeSpace() {
                                return ajax('com', paths.getFreeSpace);
                            }
                            service.getFreeSpace = getFreeSpace;
                        })(service = i.service || (i.service = {}));
                    })(i = cmf003.i || (cmf003.i = {}));
                })(cmf003 = view.cmf003 || (view.cmf003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf003.i.service.js.map