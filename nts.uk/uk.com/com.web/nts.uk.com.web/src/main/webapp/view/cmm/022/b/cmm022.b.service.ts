module nts.uk.com.view.cmm022.b.service {

    var paths: any = {
        getListMasterItem: "bs/employee/group_common_master/get-items-B-screen-start",
        update: "bs/employee/group_common_master/update-items-B-screen",
        
    }

    export function getListMasterItem(param: any): JQueryPromise<any> {
        return nts.uk.request.ajax(paths.getListMasterItem, param);
    }
    
    export function update(param: any): JQueryPromise<any> {
        return nts.uk.request.ajax(paths.update, param);
    }


}