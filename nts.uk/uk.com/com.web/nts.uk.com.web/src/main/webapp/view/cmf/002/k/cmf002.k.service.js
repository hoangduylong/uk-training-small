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
                    var k;
                    (function (k) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getDateFormatSettingByCid: "exio/exo/dateformat/getDateFormatSettingByCid",
                                addDateFormatSetting: "exio/exo/dateformat/addDateFormatSetting"
                            };
                            //save date format setting
                            function addDateFormatSetting(data) {
                                return ajax(paths.addDateFormatSetting, data);
                            }
                            service.addDateFormatSetting = addDateFormatSetting;
                            //Get date format setting by company id
                            function getDateFormatSetting() {
                                return ajax(paths.getDateFormatSettingByCid);
                            }
                            service.getDateFormatSetting = getDateFormatSetting;
                        })(service = k.service || (k.service = {}));
                    })(k = cmf002.k || (cmf002.k = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.k.service.js.map