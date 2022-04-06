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
                    var o;
                    (function (o) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                getConditionList: "exio/condset/getAllCondition",
                                getExOutSummarySetting: "exio/exo/condset/getExOutSummarySetting/{0}",
                                createExOutText: "exio/exo/condset/createExOutText",
                                getConditionSetting: "exio/exo/condset/getCondSet",
                                getAllCategoryItem: "exio/exo/condset/getAllCategoryItem/{0}",
                                getExOutCtgDto: "exio/exo/condset/getExOutCtgDto/{0}"
                            };
                            function getConditionList() {
                                return ajax('com', paths.getConditionList);
                            }
                            service.getConditionList = getConditionList;
                            ;
                            function getExOutSummarySetting(conditionSetCd) {
                                var _path = format(paths.getExOutSummarySetting, conditionSetCd);
                                return ajax('com', _path);
                            }
                            service.getExOutSummarySetting = getExOutSummarySetting;
                            ;
                            function createExOutText(command) {
                                return ajax('com', paths.createExOutText, command);
                            }
                            service.createExOutText = createExOutText;
                            ;
                            function getConditionSetting(command) {
                                return ajax('com', paths.getConditionSetting, command);
                            }
                            service.getConditionSetting = getConditionSetting;
                            ;
                            function getExOutCtgDto(categoryId) {
                                var _path = format(paths.getExOutCtgDto, categoryId);
                                return ajax('com', _path);
                            }
                            service.getExOutCtgDto = getExOutCtgDto;
                            ;
                        })(service = o.service || (o.service = {}));
                    })(o = cmf002.o || (cmf002.o = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.o.service.js.map