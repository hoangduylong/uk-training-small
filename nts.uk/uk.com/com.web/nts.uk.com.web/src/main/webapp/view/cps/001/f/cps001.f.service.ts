module cps001.f.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths: any = {
        'getData': 'basic/organization/empfilemanagement/getlistdocfile/{0}',
        'savedata': 'basic/organization/empfilemanagement/savedocfile',
        'updateCtgdata': 'basic/organization/empfilemanagement/updatectgdocfile',
        'updatedata': 'basic/organization/empfilemanagement/updatedata',
        'deletedata': 'basic/organization/empfilemanagement/deletedata',
        'permision': 'ctx/pereg/functions/auth/find-all'
    };

    export function getData(employeeId: any) {
        return ajax(format(paths.getData, employeeId));
    }

    export function savedata(command: any) {
        return ajax(paths.savedata, command);
    }

    export function updatedata(command: any) {
        return ajax(paths.savedata, command);
    }

    export function deletedata(command: any) {
        return ajax(paths.deletedata, command);
    }

    export function updateCtgdata(command: any) {
        return ajax(paths.updateCtgdata, command);
    }

    export function getCurrentEmpPermision() {
        return ajax(paths.permision);
    }
}