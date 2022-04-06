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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var exportFile = nts.uk.request.exportFile;
                            var paths = {
                                getAllCategory: "ctx/pereg/person/info/ctg/findAll",
                                getAllPerInfoItemDefByCtgId: "ctx/pereg/person/info/item/findby/categoryId/{0}",
                                updateCtgInfo: "ctx/pereg/person/info/ctg/updateCtgInfo",
                                updateCategoryOrder: "ctx/pereg/person/info/ctg/updateCtgOrder",
                                getDetailCtgInfo: "ctx/pereg/person/info/ctg/find/root/{0}"
                            };
                            function exportExcel(languageId, domainId, domainType) {
                                return exportFile('/masterlist/report/print', { domainId: domainId, domainType: domainType, languageId: languageId, reportType: 0 });
                            }
                            service.exportExcel = exportExcel;
                            function getAllCategory() {
                                return ajax(paths.getAllCategory);
                            }
                            service.getAllCategory = getAllCategory;
                            function getAllPerInfoItemDefByCtgId(categoryId) {
                                return ajax(format(paths.getAllPerInfoItemDefByCtgId, categoryId));
                            }
                            service.getAllPerInfoItemDefByCtgId = getAllPerInfoItemDefByCtgId;
                            function getDetailCtgInfo(categoryId) {
                                return ajax(format(paths.getDetailCtgInfo, categoryId));
                            }
                            service.getDetailCtgInfo = getDetailCtgInfo;
                            function updateCtgInfo(category) {
                                return ajax(paths.updateCtgInfo, category);
                            }
                            service.updateCtgInfo = updateCtgInfo;
                            function updateCtgOrder(categoryLst) {
                                return ajax(paths.updateCategoryOrder, categoryLst);
                            }
                            service.updateCtgOrder = updateCtgOrder;
                        })(service = a.service || (a.service = {}));
                    })(a = cps006.a || (cps006.a = {}));
                })(cps006 = view.cps006 || (view.cps006 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps006.a.service.js.map