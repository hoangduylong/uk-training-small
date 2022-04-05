module ccg014.a.service {
    var paths: any = {
        getAllTitleMenu: "sys/portal/titlemenu/findall",
        createTitleMenu: "sys/portal/titlemenu/create",
        deleteTitleMenu: "sys/portal/titlemenu/delete",
        updateTitleMenu: "sys/portal/titlemenu/update",
    }
    
    /** Get TitleMenu */
    export function getAllTitleMenu(): JQueryPromise<Array<viewmodel.model.TitleMenu>> {
        return nts.uk.request.ajax("com", paths.getAllTitleMenu);
    }

    /** Function is used to delete Title Menu */
    export function deleteTitleMenu(titleMenuCD: string): JQueryPromise<void> {
        return nts.uk.request.ajax("com", paths.deleteTitleMenu, titleMenuCD);
    }
    
    /** Create Title Menu */
    export function createTitleMenu(titleMenu: viewmodel.model.TitleMenu): JQueryPromise<void> {
        return nts.uk.request.ajax("com", paths.createTitleMenu, titleMenu);
    }
    
    /** Update Title Menu */
    export function updateTitleMenu(titleMenu: viewmodel.model.TitleMenu): JQueryPromise<void> {
        return nts.uk.request.ajax("com", paths.updateTitleMenu, titleMenu);
    }

}