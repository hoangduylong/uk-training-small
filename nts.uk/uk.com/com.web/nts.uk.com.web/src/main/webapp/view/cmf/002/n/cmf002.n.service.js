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
                    var n;
                    (function (n) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAWDataFormatSetting: "exio/exo/aw/getdatatype",
                                setAWDataFormatSetting: "exio/exo/aw/add"
                            };
                            function getAWDataFormatSetting() {
                                return ajax("com", format(paths.getAWDataFormatSetting));
                            }
                            service.getAWDataFormatSetting = getAWDataFormatSetting;
                            function setAWDataFormatSetting(data) {
                                return ajax("com", paths.setAWDataFormatSetting, data);
                            }
                            service.setAWDataFormatSetting = setAWDataFormatSetting;
                        })(service = n.service || (n.service = {}));
                    })(n = cmf002.n || (cmf002.n = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.n.service.js.map