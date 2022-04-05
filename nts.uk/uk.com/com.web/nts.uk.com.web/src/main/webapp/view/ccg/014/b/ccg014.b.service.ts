module ccg014.b.service {
    var paths: any = {
         copyTitleMenu: "sys/portal/titlemenu/copy",
    }
    
    /** Function is used to copy Title Menu */
    export function copyTitleMenu(sourceTitleMenuCD: string, targetTitleMenuCD: string, targetTitleMenuName: string, overwrite: boolean): JQueryPromise<void> {
        var data = {
            sourceTitleMenuCD: sourceTitleMenuCD,
            targetTitleMenuCD: targetTitleMenuCD,
            targetTitleMenuName: targetTitleMenuName,
            overwrite: overwrite
        }
        return nts.uk.request.ajax("com", paths.copyTitleMenu, data);
    }
}