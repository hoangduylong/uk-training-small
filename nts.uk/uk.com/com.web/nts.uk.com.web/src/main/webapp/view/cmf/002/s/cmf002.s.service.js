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
                    var s;
                    (function (s) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                findExOutOpMng: "exio/exo/execlog/findExOutOpMng/{0}",
                                deleteexOutOpMng: "exio/exo/execlog/deleteexOutOpMng",
                                updateexOutOpMng: "exio/exo/execlog/updateexOutOpMng",
                                getExterOutExecLog: "exio/exo/execlog/getExterOutExecLog/{0}",
                                updateFileSize: "exio/exo/execlog/updateFileSize/{0}/{1}"
                            };
                            function findExOutOpMng(storeProcessingId) {
                                var _path = format(paths.findExOutOpMng, storeProcessingId);
                                return ajax('com', _path);
                            }
                            service.findExOutOpMng = findExOutOpMng;
                            function deleteexOutOpMng(command) {
                                return ajax("com", paths.deleteexOutOpMng, command);
                            }
                            service.deleteexOutOpMng = deleteexOutOpMng;
                            function updateexOutOpMng(command) {
                                return ajax("com", paths.updateexOutOpMng, command);
                            }
                            service.updateexOutOpMng = updateexOutOpMng;
                            function getExterOutExecLog(storeProcessingId) {
                                var _path = format(paths.getExterOutExecLog, storeProcessingId);
                                return ajax('com', _path);
                            }
                            service.getExterOutExecLog = getExterOutExecLog;
                            function updateFileSize(storeProcessingId, fileId) {
                                var _path = format(paths.updateFileSize, storeProcessingId, fileId);
                                return ajax('com', _path);
                            }
                            service.updateFileSize = updateFileSize;
                        })(service = s.service || (s.service = {}));
                    })(s = cmf002.s || (cmf002.s = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.s.service.js.map