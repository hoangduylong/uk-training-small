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
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                getCndSet: "exio/exo/condset/getCndSet",
                                deleteCnd: "exio/exo/condset/delete",
                                register: "exio/exo/condset/register",
                                copy: "exio/exo/condset/copy",
                                getCategory: "exio/exo/exechist/getCategory",
                                outSetContent: "exio/exo/condset/outSetContent/{0}/{1}",
                                findOutputPeriodSetting: "exio/exo/condset/findOutputPeriodSetting",
                            };
                            function getCndSet(data) {
                                return nts.uk.request.ajax(path.getCndSet, data);
                            }
                            service.getCndSet = getCndSet;
                            function getOutItem(cndSetcd) {
                                return nts.uk.request.ajax("com", path.getOutItem, cndSetcd);
                            }
                            service.getOutItem = getOutItem;
                            function deleteCnd(command) {
                                return nts.uk.request.ajax(path.deleteCnd, command);
                            }
                            service.deleteCnd = deleteCnd;
                            function register(command) {
                                return nts.uk.request.ajax(path.register, command);
                            }
                            service.register = register;
                            function copy(command) {
                                return nts.uk.request.ajax(path.copy, command);
                            }
                            service.copy = copy;
                            function outSetContent(cndSetCd, standType) {
                                var _path = nts.uk.text.format(path.outSetContent, cndSetCd, standType);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.outSetContent = outSetContent;
                            function getCategory(command) {
                                return nts.uk.request.ajax(path.getCategory, command);
                            }
                            service.getCategory = getCategory;
                            function findOutputPeriodSetting(conditionSetCode) {
                                return nts.uk.request.ajax("com", "".concat(path.findOutputPeriodSetting, "/").concat(conditionSetCode));
                            }
                            service.findOutputPeriodSetting = findOutputPeriodSetting;
                        })(service = b.service || (b.service = {}));
                    })(b = cmf002.b || (cmf002.b = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.b.service.js.map