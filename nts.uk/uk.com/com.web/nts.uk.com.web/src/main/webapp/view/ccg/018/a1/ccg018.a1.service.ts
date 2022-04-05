module ccg018.a1.service {
    const paths: any = {
        update: "sys/portal/toppagesetting/roleset/save",
        findDataOfJobTitle: "bs/employee/jobtitle/findAll",
        findAllRoleSet: "ctx/sys/auth/roleset/findallroleset",
        findAllTopPageRoleSet: "sys/portal/toppagesetting/roleset/findAll",
        findByCId: "sys/portal/toppagesetting/findByCId",
    }

    export function update(command: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.update, command);
    }

    export function findDataOfJobTitle(baseDate: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findDataOfJobTitle, { baseDate: baseDate });
    }

    export function findAllRoleSet(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findAllRoleSet);
    }

    export function findAllTopPageRoleSet(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findAllTopPageRoleSet);
    }

    export function findByCId(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findByCId);
    }
}