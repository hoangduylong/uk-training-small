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
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var model = cmf002.share.model;
                            var paths = {
                                getAllCategoryItem: "exio/exo/condset/getAllCategoryItem/{0}/{1}",
                                findByCode: "exio/exo/condset/findByCode/{0}/{1}",
                                getOutItems: "exio/exo/outputitem/getOutItems",
                                registerOutputItem: "exio/exo/outputitem/register",
                                removeOutputItem: "exio/exo/outputitem/remove",
                                getAtWorkClsDfs: "exio/exo/dataformatsetting/getAtWorkClsDfs/{0}/{1}",
                                getCharacterDfs: "exio/exo/dataformatsetting/getCharacterDfs/{0}/{1}",
                                getDateDfs: "exio/exo/dataformatsetting/getDateDfs/{0}/{1}",
                                getInstantTimeDfs: "exio/exo/dataformatsetting/getInstantTimeDfs/{0}/{1}",
                                getNumberDfs: "exio/exo/dataformatsetting/getNumberDfs/{0}/{1}",
                                getTimeDfs: "exio/exo/dataformatsetting/getTimeDfs/{0}/{1}",
                            };
                            function getAllCategoryItem(categoryId, itemType) {
                                return ajax(format(paths.getAllCategoryItem, categoryId, itemType));
                            }
                            service.getAllCategoryItem = getAllCategoryItem;
                            function findByCode(conditionSettingCode, outputItemCode) {
                                return ajax(format(paths.findByCode, conditionSettingCode, outputItemCode));
                            }
                            service.findByCode = findByCode;
                            function getOutItems(condSetCd) {
                                return ajax("com", paths.getOutItems, condSetCd);
                            }
                            service.getOutItems = getOutItems;
                            // register
                            function registerOutputItem(command) {
                                return ajax(paths.registerOutputItem, command);
                            }
                            service.registerOutputItem = registerOutputItem;
                            // delete
                            function removeOutputItem(command) {
                                return ajax(paths.removeOutputItem, command);
                            }
                            service.removeOutputItem = removeOutputItem;
                            function getDataFormatSetting(itemType, conditionSettingCode, outputItemCode) {
                                switch (itemType) {
                                    case model.ITEM_TYPE.NUMERIC:
                                        return ajax(format(paths.getNumberDfs, conditionSettingCode, outputItemCode));
                                    case model.ITEM_TYPE.CHARACTER:
                                        return ajax(format(paths.getCharacterDfs, conditionSettingCode, outputItemCode));
                                    case model.ITEM_TYPE.DATE:
                                        return ajax(format(paths.getDateDfs, conditionSettingCode, outputItemCode));
                                    case model.ITEM_TYPE.TIME:
                                        return ajax(format(paths.getTimeDfs, conditionSettingCode, outputItemCode));
                                    case model.ITEM_TYPE.INS_TIME:
                                        return ajax(format(paths.getInstantTimeDfs, conditionSettingCode, outputItemCode));
                                    case model.ITEM_TYPE.AT_WORK_CLS:
                                        return ajax(format(paths.getAtWorkClsDfs, conditionSettingCode, outputItemCode));
                                }
                                return null;
                            }
                            service.getDataFormatSetting = getDataFormatSetting;
                        })(service = c.service || (c.service = {}));
                    })(c = cmf002.c || (cmf002.c = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.c.service.js.map