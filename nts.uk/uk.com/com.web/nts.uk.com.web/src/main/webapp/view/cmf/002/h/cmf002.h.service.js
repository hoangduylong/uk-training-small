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
                    var h;
                    (function (h) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getIdtSetting: "exio/exo/initial/idsetting"
                            };
                            function getIdtSetting() {
                                return ajax("com", format(paths.getIdtSetting));
                            }
                            service.getIdtSetting = getIdtSetting;
                        })(service = h.service || (h.service = {}));
                    })(h = cmf002.h || (cmf002.h = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.h.service.js.map