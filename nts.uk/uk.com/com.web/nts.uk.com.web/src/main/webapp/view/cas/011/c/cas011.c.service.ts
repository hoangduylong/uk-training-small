module nts.uk.com.view.cas011.c.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    var paths = {
            getAllRoleSet:             "ctx/sys/auth/roleset/findallroleset",
            getCurrentDefaultRoleSet:  "ctx/sys/auth/roleset/finddefaultroleset",
            addDefaultRoleSet:         "ctx/sys/auth/roleset/adddefaultroleset"
    }

    export function getAllRoleSet() : JQueryPromise<any> {
        return ajax(paths.getAllRoleSet);
    }

    export function getCurrentDefaultRoleSet() : JQueryPromise<any> {
        return ajax(paths.getCurrentDefaultRoleSet);
    }

    // add Default Role Set:
    export function addDefaultRoleSet(command) : JQueryPromise<any> {
        return ajax(paths.addDefaultRoleSet, command);
    }
}

