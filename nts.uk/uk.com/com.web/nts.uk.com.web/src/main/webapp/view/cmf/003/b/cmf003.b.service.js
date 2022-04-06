var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf003;
                (function (cmf003) {
                    var b;
                    (function (b) {
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                getConditionList: "exio/condset/getAllCondition",
                                addMalSet: "ctx/sys/assist/app/addMalSet",
                                screenDisplayProcess: "ctx/sys/assist/autosetting/screenDisplayProcessing",
                                patternSettingSelect: "ctx/sys/assist/autosetting/patternSettingSelect",
                                getClosurePeriod: "com/screen/closurePeriod/get",
                            };
                            function getConditionList() {
                                return ajax('com', paths.getConditionList);
                            }
                            service.getConditionList = getConditionList;
                            ;
                            function addMalSet(manualSet) {
                                return nts.uk.request.ajax('com', paths.addMalSet, manualSet);
                            }
                            service.addMalSet = addMalSet;
                            ;
                            function screenDisplayProcess() {
                                return ajax('com', paths.screenDisplayProcess);
                            }
                            service.screenDisplayProcess = screenDisplayProcess;
                            function patternSettingSelect(param) {
                                return ajax('com', paths.patternSettingSelect, param);
                            }
                            service.patternSettingSelect = patternSettingSelect;
                            function getClosurePeriod() {
                                return ajax('com', paths.getClosurePeriod);
                            }
                            service.getClosurePeriod = getClosurePeriod;
                        })(service = b.service || (b.service = {}));
                    })(b = cmf003.b || (cmf003.b = {}));
                })(cmf003 = view.cmf003 || (view.cmf003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf003.b.service.js.map