module nts.uk.com.view.cmm053.b.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths: any = {
        getPastHistory: "workflow/approvermanagement/workroot/find/settingOfManager/getPastHistory/{0}"
    }
    export function getPastHistory(employeeId: string): JQueryPromise<any> {
        return ajax(format(paths.getPastHistory, employeeId));
    }
}