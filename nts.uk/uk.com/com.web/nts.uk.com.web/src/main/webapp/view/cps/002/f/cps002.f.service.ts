module cps002.f.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let basePathPerInfoCtg = "ctx/pereg/copysetting/setting";
    let basePathPerInfoItem = "ctx/pereg/copysetting/item";
    let paths = {
        perInfoCtgHasItems: "/find/perInfoCtgHasItems",
        getPerInfoItemDef: "/findby/getPerInfoItemByCtgId",
        updatePerInfoCtgCopy: "/update/updatePerInfoCtgCopy",
        updatePerInfoItemCopy: "/update/updatePerInfoItemDefCopy"
    };

    export function getPerInfoCtgHasItems(ctgName) {
        return ajax("com", basePathPerInfoCtg + paths.perInfoCtgHasItems, ctgName);
    }

    export function getPerInfoItemDef(categoryId) {
        return ajax("com", basePathPerInfoItem + paths.getPerInfoItemDef, categoryId);
    }

    export function updatePerInfoCtgCopy(categoryId) {
        let command = { perInfoCtgId: categoryId };
        return ajax("com", basePathPerInfoCtg + paths.updatePerInfoCtgCopy, command);
    }

    export function updatePerInfoItemCopy(perInfoCtgId, perInfoItemDefLst) {
        let command = {
            perInfoCtgId: perInfoCtgId,
            perInfoItemDefLst: perInfoItemDefLst
        };
        return ajax("com", basePathPerInfoItem + paths.updatePerInfoItemCopy, command);
    }

}