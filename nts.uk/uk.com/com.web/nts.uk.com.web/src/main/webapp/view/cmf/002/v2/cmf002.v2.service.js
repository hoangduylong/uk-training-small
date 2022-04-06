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
                    var v2;
                    (function (v2) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getOutputCodeConvertByCompanyId: "exio/exo/codeconvert/getOutputCodeConvertByCompanyId"
                            };
                            //Get output code convert by company id
                            function getOutputCodeConvertByCompanyId() {
                                return ajax(paths.getOutputCodeConvertByCompanyId);
                            }
                            service.getOutputCodeConvertByCompanyId = getOutputCodeConvertByCompanyId;
                        })(service = v2.service || (v2.service = {}));
                    })(v2 = cmf002.v2 || (cmf002.v2 = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.v2.service.js.map