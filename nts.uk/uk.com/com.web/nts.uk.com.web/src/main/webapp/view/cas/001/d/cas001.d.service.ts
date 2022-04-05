module nts.uk.com.view.cas001.d.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    var paths = {
        getAllCategory: "ctx/pereg/roles/auth/category/findAllCategory/{0}",
        getAllCategoryAuth:"ctx/pereg/roles/auth/category/find/categoryAuth/{0}",
        update: "ctx/pereg/roles/auth/category/update"
    }
    /**
     * Get all category 
     */
    export function getAllCategory(roleId: string) {
        return ajax(format(paths.getAllCategory, roleId));
    }
    
    /**
     * Get all category auth
     */
    export function getAllCategoryAuth(roleId: string) {
        return ajax(format(paths.getAllCategoryAuth, roleId));
    }

    /**
     * update category
     */
    export function updateCategory(command: any) {
        return ajax(paths.update, command);
    }
}
