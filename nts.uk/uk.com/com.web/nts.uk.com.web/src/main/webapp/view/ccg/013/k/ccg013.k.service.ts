module nts.uk.com.view.ccg013.k.service {
    let paths: any = {
        getAllStandardMenu: "sys/portal/standardmenu/findAll",
        updateStandardMenu: "sys/portal/standardmenu/update",
        getEditMenuBar: "sys/portal/webmenu/edit",
    }
    
    export function getAllStandardMenu(): JQueryPromise<Array<viewmodel.StandardMenu>>{
        return nts.uk.request.ajax("com", paths.getAllStandardMenu); 
    }
    
    export function updateStandardMenu(standardMenu: Array<viewmodel.StandardMenu>): JQueryPromise<void> {
        return nts.uk.request.ajax("com", paths.updateStandardMenu, standardMenu);
    }
    
    export function getEditMenuBar(): JQueryPromise<EditMenuBarDto> {
        return nts.uk.request.ajax("com", paths.getEditMenuBar);
    }
}