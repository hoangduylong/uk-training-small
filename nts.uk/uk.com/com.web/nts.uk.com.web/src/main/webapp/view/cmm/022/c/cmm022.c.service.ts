module nts.uk.com.view.cmm022.c.service {

    var paths: any = {
        
        update: "bs/employee/group_common_master/update-common-C-screen",
        
        getListMaster: "bs/employee/group_common_master/get_master",
    }

    export function getListMaster(): JQueryPromise<any> {
        return nts.uk.request.ajax(paths.getListMaster);
    }
    
    export function update(param: any): JQueryPromise<any> {
        return nts.uk.request.ajax(paths.update, param);
    }

}