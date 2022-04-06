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
                    var i;
                    (function (i) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getNumberFormatSettingByCid: "exio/exo/numberformat/getNumberFormatSettingByCid",
                                addNumberFormatSetting: "exio/exo/numberformat/addNumberFormatSetting"
                            };
                            //save date format setting
                            function addNumberFormatSetting(data) {
                                return ajax(paths.addNumberFormatSetting, data);
                            }
                            service.addNumberFormatSetting = addNumberFormatSetting;
                            //Get date format setting by company id
                            function getNumberFormatSetting() {
                                return ajax(paths.getNumberFormatSettingByCid);
                            }
                            service.getNumberFormatSetting = getNumberFormatSetting;
                        })(service = i.service || (i.service = {}));
                    })(i = cmf002.i || (cmf002.i = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.i.service.js.map