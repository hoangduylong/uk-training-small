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
                    var w;
                    (function (w) {
                        var service;
                        (function (service) {
                            var paths = {
                                findAllClosureHistory: "ctx/at/shared/workrule/closure/history/findAll",
                                findOutputPeriodSetting: "exio/exo/condset/findOutputPeriodSetting",
                                saveOutputPeriodSetting: "exio/exo/condset/saveOutputPeriodSetting",
                            };
                            function findAllClosureHistory() {
                                return nts.uk.request.ajax("at", paths.findAllClosureHistory);
                            }
                            service.findAllClosureHistory = findAllClosureHistory;
                            function findOutputPeriodSetting(conditionSetCode) {
                                return nts.uk.request.ajax("com", "".concat(paths.findOutputPeriodSetting, "/").concat(conditionSetCode));
                            }
                            service.findOutputPeriodSetting = findOutputPeriodSetting;
                            function saveOutputPeriodSetting(command) {
                                return nts.uk.request.ajax("com", paths.saveOutputPeriodSetting, command);
                            }
                            service.saveOutputPeriodSetting = saveOutputPeriodSetting;
                        })(service = w.service || (w.service = {}));
                    })(w = cmf002.w || (cmf002.w = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.w.service.js.map