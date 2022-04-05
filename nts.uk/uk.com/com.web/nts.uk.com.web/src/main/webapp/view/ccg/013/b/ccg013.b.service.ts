module nts.uk.sys.view.ccg013.b.service {
    var paths: any = {
        getEditMenuBar: "sys/portal/webmenu/edit",
    }

    export function getEditMenuBar(): JQueryPromise<EditMenuBarDto> {
        return nts.uk.request.ajax("com", paths.getEditMenuBar);
    }

    export interface EditMenuBarDto {
        listMenuClassification: Array<any>,
        listSelectedAtr: Array<any>,
        listStandardMenu: Array<MenuBarDto>,
        listSystem: Array<any>
    }
}