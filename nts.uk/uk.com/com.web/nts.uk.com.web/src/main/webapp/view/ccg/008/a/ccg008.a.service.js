var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg008;
                (function (ccg008) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var paths = {
                                getCache: "screen/com/ccg008/get-cache",
                                getClosure: "screen/com/ccg008/get-closure",
                                getSetting: "screen/com/ccg008/get-setting",
                                getDisplayTopPage: "toppage/getTopPage",
                                extract: "sys/portal/createflowmenu/extractListFileId",
                                getLoginUser: "screen/com/ccg008/get-user"
                            };
                            function getCache() {
                                return nts.uk.request.ajax("com", paths.getCache);
                            }
                            service.getCache = getCache;
                            function getClosure() {
                                return nts.uk.request.ajax("com", paths.getClosure);
                            }
                            service.getClosure = getClosure;
                            function getSetting() {
                                return nts.uk.request.ajax("com", paths.getSetting);
                            }
                            service.getSetting = getSetting;
                            function getLoginUser() {
                                return nts.uk.request.ajax("com", paths.getLoginUser);
                            }
                            service.getLoginUser = getLoginUser;
                            function getTopPage(param) {
                                return nts.uk.request.ajax("com", paths.getDisplayTopPage, param);
                            }
                            service.getTopPage = getTopPage;
                            function extractFile(param) {
                                return nts.uk.request.ajax("com", paths.extract, param);
                            }
                            service.extractFile = extractFile;
                        })(service = a.service || (a.service = {}));
                    })(a = ccg008.a || (ccg008.a = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.a.service.js.map