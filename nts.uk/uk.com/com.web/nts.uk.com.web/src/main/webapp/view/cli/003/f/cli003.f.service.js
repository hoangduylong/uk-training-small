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
                    var f;
                    (function (f) {
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                getLogOutputItemsByRecordTypeItemNos: "ctx/sys/log/app/get-log-output-item-by-record-type-item-no-list",
                                getLogOutputItemsByRecordType: "ctx/sys/log/app/get-log-output-item-by-record-type",
                                getLogBasicInfoByModifyDate: "ctx/sys/log/record-reference/get-log-basic-info-by-modify-date",
                                getLogBasicInfoAllByModifyDate: "ctx/sys/log/record-reference/get-log-basic-info-data-by-date",
                                logSettingExportCsv: "ctx/sys/log/record-reference/export-csv-screen",
                                getLogSettingsBySystem: "sys/portal/logsettings/findBySystem",
                                getLogDataResults: "ctx/sys/assist/app/getLogDataResults",
                                exportCsvForDataResult: "ctx/sys/assist/app/export-csv",
                            };
                            function getLogOutputItemsByRecordTypeItemNos(paramOutputItem) {
                                return ajax('com', paths.getLogOutputItemsByRecordTypeItemNos, paramOutputItem);
                            }
                            service.getLogOutputItemsByRecordTypeItemNos = getLogOutputItemsByRecordTypeItemNos;
                            function getLogBasicInfoAllByModifyDate(paramOutputItem) {
                                return ajax('com', paths.getLogBasicInfoAllByModifyDate, paramOutputItem);
                            }
                            service.getLogBasicInfoAllByModifyDate = getLogBasicInfoAllByModifyDate;
                            function getLogOutputItemsByRecordType(recordType) {
                                return ajax('com', paths.getLogOutputItemsByRecordType, recordType);
                            }
                            service.getLogOutputItemsByRecordType = getLogOutputItemsByRecordType;
                            function getLogBasicInfoByModifyDate(paramLog) {
                                return ajax('com', paths.getLogBasicInfoByModifyDate, paramLog);
                            }
                            service.getLogBasicInfoByModifyDate = getLogBasicInfoByModifyDate;
                            function logSettingExportCsv(params) {
                                return nts.uk.request.exportFile(paths.logSettingExportCsv, params);
                            }
                            service.logSettingExportCsv = logSettingExportCsv;
                            function getLogSettingsBySystem(systemType) {
                                return ajax("".concat(paths.getLogSettingsBySystem, "/").concat(systemType));
                            }
                            service.getLogSettingsBySystem = getLogSettingsBySystem;
                            function getLogDataResults(logDataParams) {
                                return ajax('com', paths.getLogDataResults, logDataParams);
                            }
                            service.getLogDataResults = getLogDataResults;
                            function exportCsvForDataResult(params) {
                                return nts.uk.request.exportFile(paths.exportCsvForDataResult, params);
                            }
                            service.exportCsvForDataResult = exportCsvForDataResult;
                        })(service = f.service || (f.service = {}));
                    })(f = cli003.f || (cli003.f = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli003.f.service.js.map