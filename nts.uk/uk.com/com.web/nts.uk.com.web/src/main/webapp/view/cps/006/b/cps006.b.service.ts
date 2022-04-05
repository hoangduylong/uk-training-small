module nts.uk.com.view.cps006.b.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        getItemInfoDefList: "ctx/pereg/person/info/ctgItem/findby/categoryId/{0}/{1}",
        getPerInfoItemDefById: "ctx/pereg/person/info/ctgItem/findby/itemIdOfOtherCompany/{0}/{1}",
        updateItemChange: "ctx/pereg/person/info/ctgItem/updateItemChange",
        setOrder: "ctx/pereg/person/info/ctgItem/SetOrder",
        filterHisSel: "ctx/pereg/person/info/setting/selection/findSelectionInit"
    }

    export function getItemInfoDefList(categoryId, isAbolition): JQueryPromise<any> {
        return ajax(format(paths.getItemInfoDefList, categoryId, isAbolition));
    }

    export function getPerInfoItemDefById(itemId , personEmployeeType): JQueryPromise<any> {
        return ajax(format(paths.getPerInfoItemDefById, itemId, personEmployeeType))
    }

    export function updateItemChange(command): JQueryPromise<any> {
        return ajax(paths.updateItemChange, command)
    }

    export function SetOrder(command): JQueryPromise<any> {
        return ajax(paths.setOrder, command);
    }
    
    export function getAllSelByHistory(selectionItemId: string, selectionItemClsAtr : number) {
        let query = {
            selectionItemId : selectionItemId, 
            selectionItemClsAtr : selectionItemClsAtr, 
            cps006 : true
        }
        return ajax(paths.filterHisSel, query);
    };

}
