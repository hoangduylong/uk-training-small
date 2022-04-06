var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm001;
                (function (cmm001) {
                    var f;
                    (function (f) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                executionMasterCopyData: "sys/assist/mastercopy/data/execute",
                                exportFileError: "sys/assist/mastercopy/data/log/export"
                            };
                            /**
                             * execution process copy
                             */
                            function executionMasterCopyData(data) {
                                return nts.uk.request.ajax(path.executionMasterCopyData, data);
                            }
                            service.executionMasterCopyData = executionMasterCopyData;
                            /**
                             *  export error to csv service
                             */
                            function exportFileError(data) {
                                return nts.uk.request.exportFile(path.exportFileError, data);
                            }
                            service.exportFileError = exportFileError;
                        })(service = f.service || (f.service = {}));
                    })(f = cmm001.f || (cmm001.f = {}));
                })(cmm001 = view.cmm001 || (view.cmm001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm001.f.service.js.map