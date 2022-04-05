module nts.uk.com.view.cps006.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    import exportFile = nts.uk.request.exportFile;
    let paths = {
        getAllCategory: "ctx/pereg/person/info/ctg/findAll",
        getAllPerInfoItemDefByCtgId: "ctx/pereg/person/info/item/findby/categoryId/{0}",
        updateCtgInfo: "ctx/pereg/person/info/ctg/updateCtgInfo",
        updateCategoryOrder: "ctx/pereg/person/info/ctg/updateCtgOrder",
        getDetailCtgInfo: "ctx/pereg/person/info/ctg/find/root/{0}"
    }

    export function exportExcel(languageId: string, domainId, domainType: string): JQueryPromise<any> {
        return exportFile('/masterlist/report/print', { domainId: domainId, domainType: domainType, languageId: languageId, reportType: 0 });
    }

    export function getAllCategory() {
        return ajax(paths.getAllCategory);
    }

    export function getAllPerInfoItemDefByCtgId(categoryId: string) {
        return ajax(format(paths.getAllPerInfoItemDefByCtgId, categoryId));
    }

    export function getDetailCtgInfo(categoryId: string) {
        return ajax(format(paths.getDetailCtgInfo, categoryId));
    }

    export function updateCtgInfo(category: any) {
        return ajax(paths.updateCtgInfo, category);
    }

    export function updateCtgOrder(categoryLst: any) {
        return ajax(paths.updateCategoryOrder, categoryLst);
    }
}
