var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli003;
                (function (cli003) {
                    var g;
                    (function (g) {
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                getAllLogDisplaySet: "ctx/sys/log/app/get-all-log-display-set",
                                addLogDisplaySet: "ctx/sys/log/app/add-log-display-set",
                                updateLogDisplaySet: "ctx/sys/log/app/update-log-display-set",
                                deleteLogDisplaySet: "ctx/sys/log/app/delete-log-display-set",
                                getLogOutputItemByRecordType: "ctx/sys/log/app/get-log-output-item-by-record-type",
                            };
                            function getAllLogDisplaySet() {
                                return ajax('com', paths.getAllLogDisplaySet);
                            }
                            service.getAllLogDisplaySet = getAllLogDisplaySet;
                            function addLogDisplaySet(logDisplaySet) {
                                return ajax('com', paths.addLogDisplaySet, logDisplaySet);
                            }
                            service.addLogDisplaySet = addLogDisplaySet;
                            function updateLogDisplaySet(logDisplaySet) {
                                return ajax('com', paths.updateLogDisplaySet, logDisplaySet);
                            }
                            service.updateLogDisplaySet = updateLogDisplaySet;
                            function deleteLogDisplaySet(logSetId) {
                                return ajax('com', paths.deleteLogDisplaySet, logSetId);
                            }
                            service.deleteLogDisplaySet = deleteLogDisplaySet;
                            function getLogOutputItemByRecordType(recordType) {
                                return ajax('com', paths.getLogOutputItemByRecordType, recordType);
                            }
                            service.getLogOutputItemByRecordType = getLogOutputItemByRecordType;
                        })(service = g.service || (g.service = {}));
                    })(g = cli003.g || (cli003.g = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli003.g.service.js.map