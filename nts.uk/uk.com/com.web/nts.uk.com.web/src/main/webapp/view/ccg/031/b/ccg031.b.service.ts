module nts.uk.com.view.ccg031.b.service {
    var paths = {
        findAll: "sys/portal/topagepart/findAll"
    }
    
    export function findAll(pgType: number): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findAll, pgType.toString());
    }
    
}