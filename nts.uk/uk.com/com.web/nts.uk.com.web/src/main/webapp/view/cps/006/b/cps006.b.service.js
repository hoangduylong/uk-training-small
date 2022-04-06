var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps006;
                (function (cps006) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getItemInfoDefList: "ctx/pereg/person/info/ctgItem/findby/categoryId/{0}/{1}",
                                getPerInfoItemDefById: "ctx/pereg/person/info/ctgItem/findby/itemIdOfOtherCompany/{0}/{1}",
                                updateItemChange: "ctx/pereg/person/info/ctgItem/updateItemChange",
                                setOrder: "ctx/pereg/person/info/ctgItem/SetOrder",
                                filterHisSel: "ctx/pereg/person/info/setting/selection/findSelectionInit"
                            };
                            function getItemInfoDefList(categoryId, isAbolition) {
                                return ajax(format(paths.getItemInfoDefList, categoryId, isAbolition));
                            }
                            service.getItemInfoDefList = getItemInfoDefList;
                            function getPerInfoItemDefById(itemId, personEmployeeType) {
                                return ajax(format(paths.getPerInfoItemDefById, itemId, personEmployeeType));
                            }
                            service.getPerInfoItemDefById = getPerInfoItemDefById;
                            function updateItemChange(command) {
                                return ajax(paths.updateItemChange, command);
                            }
                            service.updateItemChange = updateItemChange;
                            function SetOrder(command) {
                                return ajax(paths.setOrder, command);
                            }
                            service.SetOrder = SetOrder;
                            function getAllSelByHistory(selectionItemId, selectionItemClsAtr) {
                                var query = {
                                    selectionItemId: selectionItemId,
                                    selectionItemClsAtr: selectionItemClsAtr,
                                    cps006: true
                                };
                                return ajax(paths.filterHisSel, query);
                            }
                            service.getAllSelByHistory = getAllSelByHistory;
                            ;
                        })(service = b.service || (b.service = {}));
                    })(b = cps006.b || (cps006.b = {}));
                })(cps006 = view.cps006 || (view.cps006 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps006.b.service.js.map