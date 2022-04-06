var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps005;
                (function (cps005) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAllPerInfoItemDefByCtgId: "ctx/pereg/person/info/ctgItem/findby/categoryId1/{0}/{1}",
                                getPerInfoItemDefById: "ctx/pereg/person/info/ctgItem/findby/itemId/{0}/{1}",
                                addItemDef: "ctx/pereg/person/info/ctgItem/add",
                                updateItemDef: "ctx/pereg/person/info/ctgItem/update",
                                removeItemDef: "ctx/pereg/person/info/ctgItem/remove",
                                getAllSelectionItem: "ctx/pereg/person/info/setting/selection/findAllSelectionItem",
                                filterHisSel: "ctx/pereg/person/info/setting/selection/findSelectionInit",
                                checkItemData: "ctx/pereg/person/info/ctgItem/check/itemData/{0}"
                            };
                            function getAllPerInfoItemDefByCtgId(categoryId, personEmployeeType) {
                                var _path = format(paths.getAllPerInfoItemDefByCtgId, categoryId, personEmployeeType);
                                return ajax("com", _path);
                            }
                            service.getAllPerInfoItemDefByCtgId = getAllPerInfoItemDefByCtgId;
                            ;
                            function getPerInfoItemDefById(itemId, personEmployeeType) {
                                var _path = format(paths.getPerInfoItemDefById, itemId, personEmployeeType);
                                return ajax("com", _path);
                            }
                            service.getPerInfoItemDefById = getPerInfoItemDefById;
                            ;
                            function getAllSelectionItem() {
                                return ajax("com", paths.getAllSelectionItem);
                            }
                            service.getAllSelectionItem = getAllSelectionItem;
                            ;
                            function addItemDef(newItemDef) {
                                return ajax("com", paths.addItemDef, newItemDef);
                            }
                            service.addItemDef = addItemDef;
                            ;
                            function updateItemDef(newItemDef) {
                                return ajax("com", paths.updateItemDef, newItemDef);
                            }
                            service.updateItemDef = updateItemDef;
                            ;
                            function removeItemDef(removeCommand) {
                                return ajax("com", paths.removeItemDef, removeCommand);
                            }
                            service.removeItemDef = removeItemDef;
                            ;
                            function getAllSelByHistory(selectionItemId, selectionItemClsAtr) {
                                var query = {
                                    selectionItemId: selectionItemId,
                                    selectionItemClsAtr: selectionItemClsAtr,
                                    cps006: false
                                };
                                return ajax(paths.filterHisSel, query);
                            }
                            service.getAllSelByHistory = getAllSelByHistory;
                            ;
                            function checkItemData(itemId) {
                                return ajax(nts.uk.text.format(paths.checkItemData, itemId));
                            }
                            service.checkItemData = checkItemData;
                            ;
                        })(service = b.service || (b.service = {}));
                    })(b = cps005.b || (cps005.b = {}));
                })(cps005 = view.cps005 || (view.cps005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps005.b.service.js.map