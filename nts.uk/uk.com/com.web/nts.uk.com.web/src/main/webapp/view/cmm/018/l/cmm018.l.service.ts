import request = nts.uk.request;
module nts.uk.com.view.cmm018.l.service {
    // Service paths.
    var servicePath = {
        saveExcel: "approval/report/employeeUnregister"
    }

    export function saveExcel(param) {
        return request.exportFile(servicePath.saveExcel , param);
    }
}
