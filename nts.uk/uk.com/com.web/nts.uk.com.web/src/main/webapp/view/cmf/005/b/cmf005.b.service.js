var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var b;
                    (function (b) {
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                getSystemDate: "ctx/sys/assist/app/getSystemDate",
                                screenDisplayProcess: "ctx/sys/assist/autosetting/screenDelDisplayProcessing",
                                patternSettingSelect: "ctx/sys/assist/autosetting/delPatternSettingSelect",
                                addMalSet: "ctx/sys/assist/app/addMalSet",
                                getClosurePeriod: "com/screen/closurePeriod/get",
                            };
                            function getSystemDate() {
                                return ajax('com', paths.getSystemDate);
                            }
                            service.getSystemDate = getSystemDate;
                            ;
                            function screenDisplayProcess() {
                                return ajax('com', paths.screenDisplayProcess);
                            }
                            service.screenDisplayProcess = screenDisplayProcess;
                            function patternSettingSelect(param) {
                                return ajax('com', paths.patternSettingSelect, param);
                            }
                            service.patternSettingSelect = patternSettingSelect;
                            function addMalSet(param) {
                                return nts.uk.request.ajax('com', paths.addMalSet, param);
                            }
                            service.addMalSet = addMalSet;
                            function getClosurePeriod() {
                                return ajax('com', paths.getClosurePeriod);
                            }
                            service.getClosurePeriod = getClosurePeriod;
                        })(service = b.service || (b.service = {}));
                    })(b = cmf005.b || (cmf005.b = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.b.service.js.map