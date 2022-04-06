var cps002;
(function (cps002) {
    var f;
    (function (f) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var basePathPerInfoCtg = "ctx/pereg/copysetting/setting";
            var basePathPerInfoItem = "ctx/pereg/copysetting/item";
            var paths = {
                perInfoCtgHasItems: "/find/perInfoCtgHasItems",
                getPerInfoItemDef: "/findby/getPerInfoItemByCtgId",
                updatePerInfoCtgCopy: "/update/updatePerInfoCtgCopy",
                updatePerInfoItemCopy: "/update/updatePerInfoItemDefCopy"
            };
            function getPerInfoCtgHasItems(ctgName) {
                return ajax("com", basePathPerInfoCtg + paths.perInfoCtgHasItems, ctgName);
            }
            service.getPerInfoCtgHasItems = getPerInfoCtgHasItems;
            function getPerInfoItemDef(categoryId) {
                return ajax("com", basePathPerInfoItem + paths.getPerInfoItemDef, categoryId);
            }
            service.getPerInfoItemDef = getPerInfoItemDef;
            function updatePerInfoCtgCopy(categoryId) {
                var command = { perInfoCtgId: categoryId };
                return ajax("com", basePathPerInfoCtg + paths.updatePerInfoCtgCopy, command);
            }
            service.updatePerInfoCtgCopy = updatePerInfoCtgCopy;
            function updatePerInfoItemCopy(perInfoCtgId, perInfoItemDefLst) {
                var command = {
                    perInfoCtgId: perInfoCtgId,
                    perInfoItemDefLst: perInfoItemDefLst
                };
                return ajax("com", basePathPerInfoItem + paths.updatePerInfoItemCopy, command);
            }
            service.updatePerInfoItemCopy = updatePerInfoItemCopy;
        })(service = f.service || (f.service = {}));
    })(f = cps002.f || (cps002.f = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.f.service.js.map