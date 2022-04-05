module nts.uk.com.view.ccg013.c.service {
    // Service paths.
    var servicePath = {
        findBySystem: "sys/portal/standardmenu/findAll",
        getEditMenuBar: "sys/portal/webmenu/edit",
    }
    
    export function findBySystem(): JQueryPromise<Array<any>> {
        return nts.uk.request.ajax(servicePath.findBySystem);
    }
    
    export function getEditMenuBar(): JQueryPromise<EditMenuBarDto> {
        return nts.uk.request.ajax("com", servicePath.getEditMenuBar);
    }
}
