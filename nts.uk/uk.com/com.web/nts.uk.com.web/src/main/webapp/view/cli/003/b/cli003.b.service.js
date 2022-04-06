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
                    var b;
                    (function (b) {
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                getAllLogDisplaySet: "ctx/sys/log/app/get-all-log-display-set",
                                getLogOutputItemByRecordType: "ctx/sys/log/app/get-log-output-item-by-record-type",
                            };
                            function getAllLogDisplaySet() {
                                return ajax('com', paths.getAllLogDisplaySet);
                            }
                            service.getAllLogDisplaySet = getAllLogDisplaySet;
                            ;
                            function getLogOutputItemByRecordType(recordType) {
                                return ajax('com', paths.getLogOutputItemByRecordType, recordType);
                            }
                            service.getLogOutputItemByRecordType = getLogOutputItemByRecordType;
                            ;
                        })(service = b.service || (b.service = {}));
                    })(b = cli003.b || (cli003.b = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli003.b.service.js.map