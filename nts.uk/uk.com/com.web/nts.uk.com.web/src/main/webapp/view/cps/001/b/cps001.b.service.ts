module cps001.b.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths: any = {
        'getEmployeeInfo': 'ctx/pereg/deleteemployee/getemployeetodelete/{0}',
        'getPersonInfo': 'bs/employee/person/findBypId/{0}',
        'deleteEmp': 'ctx/pereg/deleteemployee/deleteemployee',
    };



    export function getEmployeeInfo(employeeId: string) {
        return ajax(format(paths.getEmployeeInfo, employeeId));
    }
    
     export function getPersonInfo(personId: string) {
        return ajax(format(paths.getPersonInfo, personId));
    }

    export function deleteEmp(modelDelete: any) {
        return ajax(paths.deleteEmp, modelDelete);
    }
}