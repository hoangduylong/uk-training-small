module nts.uk.com.view.ccg013.e.service {
    import model = nts.uk.com.view.ccg.model;

    // Service paths.
    var servicePath = {
        copy: "sys/portal/webmenu/copy",
    }
    
    export function copy(webMenu: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", servicePath.copy, webMenu);
    }  
}
