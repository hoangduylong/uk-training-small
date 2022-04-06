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
                    var g;
                    (function (g) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getOutputCodeConvertByCompanyId: "exio/exo/codeconvert/getOutputCodeConvertByCompanyId",
                                getOutputCodeConvertByConvertCode: "exio/exo/codeconvert/getOutputCodeConvertByConvertCode/{0}",
                                addOutputCodeConvert: "exio/exo/codeconvert/addOutputCodeConvert",
                                updateOutputCodeConvert: "exio/exo/codeconvert/updateOutputCodeConvert",
                                removeOutputCodeConvert: "exio/exo/codeconvert/removeOutputCodeConvert",
                                checkBeforeRemove: "exio/exo/codeconvert/checkBeforeRemove/{0}"
                            };
                            function getOutputCodeConvertByCompanyId() {
                                return ajax(paths.getOutputCodeConvertByCompanyId);
                            }
                            service.getOutputCodeConvertByCompanyId = getOutputCodeConvertByCompanyId;
                            function getOutputCodeConvertByConvertCode(convertCode) {
                                return ajax(format(paths.getOutputCodeConvertByConvertCode, convertCode));
                            }
                            service.getOutputCodeConvertByConvertCode = getOutputCodeConvertByConvertCode;
                            function addOutputCodeConvert(command) {
                                return ajax(paths.addOutputCodeConvert, command);
                            }
                            service.addOutputCodeConvert = addOutputCodeConvert;
                            function updateOutputCodeConvert(command) {
                                return ajax(paths.updateOutputCodeConvert, command);
                            }
                            service.updateOutputCodeConvert = updateOutputCodeConvert;
                            function removeOutputCodeConvert(command) {
                                return ajax(paths.removeOutputCodeConvert, command);
                            }
                            service.removeOutputCodeConvert = removeOutputCodeConvert;
                            function checkBeforeRemove(convertCode) {
                                return ajax(format(paths.checkBeforeRemove, convertCode));
                            }
                            service.checkBeforeRemove = checkBeforeRemove;
                        })(service = g.service || (g.service = {}));
                    })(g = cmf002.g || (cmf002.g = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.g.service.js.map