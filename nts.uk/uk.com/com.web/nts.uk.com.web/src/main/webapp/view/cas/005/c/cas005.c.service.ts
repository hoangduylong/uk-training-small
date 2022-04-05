module nts.uk.com.view.csa005.c {
    export module service {
        var paths: any = {
            getPerMissingMenu: "ctx/sys/auth/role/per/setting/menu",
            
        }
        
        /** Get PermissionSettingMenu */
        export function getPerMissingMenu(): JQueryPromise<any> { 
            return nts.uk.request.ajax("com", paths.getPerMissingMenu +'/3');
        }
        
    }
}
