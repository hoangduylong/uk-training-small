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
                    var f;
                    (function (f) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                findDataStorageMng: "ctx/sys/assist/app/findDataStorageMng/{0}",
                                findResultOfSaving: "ctx/sys/assist/app/findResultOfSaving/{0}",
                                setInterruptSaving: "ctx/sys/assist/app/setInterruptSaving",
                                deleteDataStorageMng: "ctx/sys/assist/app/deleteDataStorageMng",
                                updateResultOfSaving: "ctx/sys/assist/app/updateFileSize/{0}/{1}"
                            };
                            /**
                             * get DataStorageMng
                             */
                            function findDataStorageMng(storeProcessingId) {
                                var _path = format(paths.findDataStorageMng, storeProcessingId);
                                return ajax('com', _path);
                            }
                            service.findDataStorageMng = findDataStorageMng;
                            /**
                             * delete DataStorageMng when interupt/error/done
                             */
                            function deleteDataStorageMng(command) {
                                return ajax("com", paths.deleteDataStorageMng, command);
                            }
                            service.deleteDataStorageMng = deleteDataStorageMng;
                            /**
                             * find ResultOfSaving to get fileID
                             */
                            function findResultOfSaving(storeProcessingId) {
                                var _path = format(paths.findResultOfSaving, storeProcessingId);
                                return ajax('com', _path);
                            }
                            service.findResultOfSaving = findResultOfSaving;
                            /**
                             * update interrupt process
                             */
                            function setInterruptSaving(command) {
                                return ajax("com", paths.setInterruptSaving, command);
                            }
                            service.setInterruptSaving = setInterruptSaving;
                            /**
                             * update filesize process
                             */
                            function updateFileSize(storeProcessingId, fileId) {
                                var _path = format(paths.updateResultOfSaving, storeProcessingId, fileId);
                                return ajax('com', _path);
                            }
                            service.updateFileSize = updateFileSize;
                        })(service = f.service || (f.service = {}));
                    })(f = cmf003.f || (cmf003.f = {}));
                })(cmf003 = view.cmf003 || (view.cmf003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf003.f.service.js.map