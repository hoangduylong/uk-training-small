module nts.uk.com.view.cmm022.a.service {

    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    var paths: any = {
        getListMaster: "bs/employee/group_common_master/get_master",
        update: "mandatoryRetirementRegulation/update",
        startPage: "bs/employee/group_common_master/start-page-a",
        saveItems: "bs/employee/group_common_master/save-items",
        getItems: "bs/employee/group_common_master/get-items/{0}",
        exportExcel:"file/com/report/groupcommonmaster/export"
    }
    
    export function update(param: any): JQueryPromise<any> {
        return ajax(paths.update, param);
    }
    
    export function startPage(param) {
        return ajax(paths.startPage, param);
    }

    export function getItems(param) {
        return ajax(format(paths.getItems, param));
    }
    
    export function saveItems(param) {
        return ajax(paths.saveItems, param);
    }
    
    export function outPutFileExcel(): JQueryPromise<any> {
        return nts.uk.request.exportFile(paths.exportExcel);
    }

}