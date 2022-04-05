module nts.uk.com.view.cmm013.h.service {
    
    var servicePath: any = {
        findAll: "bs/employee/approver/group/findAll",
        register: "bs/employee/approver/group/register",
        update: "bs/employee/approver/group/update",
        remove: "bs/employee/approver/group/delete",
        findAllJobTitle: "bs/employee/jobtitle/findAll",
        multiInsert: "bs/employee/approver/group/multiInsert"
    };
    
    export function findAll(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", servicePath.findAll);
    }
    
    export function register(command: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", servicePath.register, command);
    }
    
    export function update(command: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", servicePath.update, command);
    }
    
    export function remove(command: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", servicePath.remove, command);
    }
    
    export function findAllJobTitle(param: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", servicePath.findAllJobTitle, param);
    }
    
    export function multiInsert(command: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", servicePath.multiInsert, command);
    }
}
