module ccg018.a.service {
    const paths: any = {
        findBySystemMenuCls: "sys/portal/standardmenu/findBySystemMenuCls",
        findDataForAfterLoginDis: "sys/portal/standardmenu/findDataForAfterLoginDis",
        findByCId: "sys/portal/toppagesetting/findByCId",
        findAllTopPagePersonSet: "sys/portal/toppagesetting/personset/findBySids",
        findTopPagePersonSet: "sys/portal/toppagesetting/personset/findBySid",
        findAllRoleSet: "ctx/sys/auth/roleset/findallroleset",
        findAllTopPageRoleSet: "sys/portal/toppagesetting/roleset/findAll"
    }

    export function findTopPagePersonSet(listSid: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findTopPagePersonSet, listSid);
    }

    export function findByCId(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findByCId);
    }

    export function findBySystemMenuCls(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findBySystemMenuCls);
    }

    export function findDataForAfterLoginDis(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findDataForAfterLoginDis);
    }

}