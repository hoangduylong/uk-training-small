module nts.uk.com.view.cps005.b.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths = {
        getAllPerInfoItemDefByCtgId: "ctx/pereg/person/info/ctgItem/findby/categoryId1/{0}/{1}",
        getPerInfoItemDefById: "ctx/pereg/person/info/ctgItem/findby/itemId/{0}/{1}",
        addItemDef: "ctx/pereg/person/info/ctgItem/add",
        updateItemDef: "ctx/pereg/person/info/ctgItem/update",
        removeItemDef: "ctx/pereg/person/info/ctgItem/remove",
        getAllSelectionItem: "ctx/pereg/person/info/setting/selection/findAllSelectionItem",
        filterHisSel: "ctx/pereg/person/info/setting/selection/findSelectionInit",
        checkItemData: "ctx/pereg/person/info/ctgItem/check/itemData/{0}"

    };

    export function getAllPerInfoItemDefByCtgId(categoryId: string, personEmployeeType: number) {
        let _path = format(paths.getAllPerInfoItemDefByCtgId, categoryId, personEmployeeType);
        return ajax("com", _path);
    };

    export function getPerInfoItemDefById(itemId: string, personEmployeeType: number) {
        let _path = format(paths.getPerInfoItemDefById, itemId, personEmployeeType);
        return ajax("com", _path);
    };

    export function getAllSelectionItem() {
        return ajax("com", paths.getAllSelectionItem);
    };

    export function addItemDef(newItemDef: any) {
        return ajax("com", paths.addItemDef, newItemDef);
    };

    export function updateItemDef(newItemDef: any) {
        return ajax("com", paths.updateItemDef, newItemDef);
    };

    export function removeItemDef(removeCommand: any) {
        return ajax("com", paths.removeItemDef, removeCommand);
    };

    export function getAllSelByHistory(selectionItemId: string, selectionItemClsAtr: number) {
        let query = {
            selectionItemId: selectionItemId,
            selectionItemClsAtr: selectionItemClsAtr,
            cps006: false
        }
        return ajax(paths.filterHisSel, query);
    };

    export function checkItemData(itemId: string) {
        return ajax(nts.uk.text.format(paths.checkItemData, itemId));
    };
}