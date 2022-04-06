var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cps013;
                (function (cps013) {
                    var e;
                    (function (e) {
                        var format = nts.uk.text.format;
                        var ajax = nts.uk.request.ajax;
                        var service;
                        (function (service) {
                            var paths = {
                                executeCheck: "ctx/pereg/check/category/process",
                                getErrorMessageInfo: "ctx/at/record/optionalaggr/getErrorMessageInfo/{0}",
                                getErrorInfos: "ctx/at/record/optionalaggr/finderrorinfo/{0}",
                                stopExecute: "ctx/at/record/optionalaggr/stopExecute/{0}"
                            };
                            function executeCheck(dataShare) {
                                return ajax(paths.executeCheck, dataShare);
                            }
                            service.executeCheck = executeCheck;
                            function getErrorMessageInfo(excuteId) {
                                var _path = format(paths.getErrorMessageInfo, excuteId);
                                return ajax("at", _path);
                            }
                            service.getErrorMessageInfo = getErrorMessageInfo;
                            function getErrorInfos(aggrId) {
                                var _path = format(paths.getErrorInfos, aggrId);
                                return ajax("at", _path);
                            }
                            service.getErrorInfos = getErrorInfos;
                            function stopExecute(dataFromA) {
                                var _path = format(paths.stopExecute, dataFromD);
                                return ajax("at", _path);
                            }
                            service.stopExecute = stopExecute;
                        })(service = e.service || (e.service = {}));
                    })(e = cps013.e || (cps013.e = {}));
                })(cps013 = view.cps013 || (view.cps013 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps013.e.service.js.map