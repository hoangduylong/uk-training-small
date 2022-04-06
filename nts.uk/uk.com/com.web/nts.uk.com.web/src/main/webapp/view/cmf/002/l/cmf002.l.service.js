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
                    var l;
                    (function (l) {
                        var service;
                        (function (service) {
                            var path = {
                                sendPerformSettingByTime: "exio/exo/dataformat/sendPerformSettingByTime",
                                findPerformSettingByTime: "exio/exo/dataformat/findPerformSettingByTime"
                            };
                            function sendPerformSettingByTime(data) {
                                return nts.uk.request.ajax(path.sendPerformSettingByTime, data);
                            }
                            service.sendPerformSettingByTime = sendPerformSettingByTime;
                            function findPerformSettingByTime() {
                                return nts.uk.request.ajax(path.findPerformSettingByTime);
                            }
                            service.findPerformSettingByTime = findPerformSettingByTime;
                        })(service = l.service || (l.service = {}));
                    })(l = cmf002.l || (cmf002.l = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.l.service.js.map