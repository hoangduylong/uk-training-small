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
                    var m;
                    (function (m) {
                        var service;
                        (function (service) {
                            var path = {
                                sendPerformSettingByInTime: "exio/exo/dataformat/sendPerformSettingByInTime",
                                findPerformSettingByInTime: "exio/exo/dataformat/findPerformSettingByInTime"
                            };
                            function sendPerformSettingByInTime(data) {
                                return nts.uk.request.ajax(path.sendPerformSettingByInTime, data);
                            }
                            service.sendPerformSettingByInTime = sendPerformSettingByInTime;
                            function findPerformSettingByInTime() {
                                return nts.uk.request.ajax(path.findPerformSettingByInTime);
                            }
                            service.findPerformSettingByInTime = findPerformSettingByInTime;
                        })(service = m.service || (m.service = {}));
                    })(m = cmf002.m || (cmf002.m = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.m.service.js.map