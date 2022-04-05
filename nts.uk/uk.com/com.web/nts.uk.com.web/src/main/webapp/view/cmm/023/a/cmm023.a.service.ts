module nts.uk.com.view.cmm023.a.service {
    import ajax = nts.uk.request.ajax;
    var paths = {
        getMaster: "bs/employee/group_common_master/get_master",
        getItems: "bs/employee/group_common_master/get_items",
        saveMaster: "bs/employee/group_common_master/save_master"

    }

    export function getMaster() {

        return ajax(paths.getMaster);
    }

    export function getItems(param) {

        return ajax(paths.getItems, param);
    }

    export function saveMaster(param) {

        return ajax(paths.saveMaster, param);
    }

}
