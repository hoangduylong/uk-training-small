module cps001.c.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths: any = {
        'getListEmployeeDataMngInfo': 'ctx/pereg/deleteemployee/getallemployeetodelete',
        'getDetail': 'ctx/pereg/deleteemployee/getdetailemployeetodelete/{0}',
        'restoreData': 'ctx/pereg/deleteemployee/restoredata',
        'deleteEmp': 'ctx/pereg/deleteemployee/deleteemp/{0}'
    };

    export function getData() {
        return ajax(paths.getListEmployeeDataMngInfo);
    }

    export function getDetail(employeeId: any) {
        return ajax(format(paths.getDetail, employeeId));
    }

    export function restoreData(command : any) {
        return ajax(paths.restoreData, command);
    }
    
    export function removedata(employeeId: any) {
        return ajax(format(paths.deleteEmp, employeeId));
    }
}