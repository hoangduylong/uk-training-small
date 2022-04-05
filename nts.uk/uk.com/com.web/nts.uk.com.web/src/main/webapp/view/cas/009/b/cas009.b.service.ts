module cas009.b.service {
    var paths: any = {
        getPerMissingMenu: "ctx/sys/auth/role/per/setting/menu",
        
    }
    
    /** Get PermissionSettingMenu */
    export function getPerMissingMenu(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.getPerMissingMenu +'/8');
    }

}