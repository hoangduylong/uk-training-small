module nts.uk.com.view.cas001.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        getCategoryRoleList: "/ctx/pereg/roles/auth/category/findAllCategory/{0}",
        getCategoryAuth: "/ctx/pereg/roles/auth/category/find/{0}/{1}",
        getPersonRoleItemList: "/ctx/pereg/roles/auth/item/findAllItem/{0}/{1}",
        savePersonRole: "/ctx/pereg/roles/auth/save",
        getAllItemIdRequired: "ctx/pereg/person/info/ctgItem/layout/findAll/required",
        saveAsExcel: "file/at/personrole/saveAsExcel"
    }
    
    export function getCategoryRoleList(roleID) {
        return ajax(format(paths.getCategoryRoleList, roleID));

    }

    export function getCategoryAuth(roleId, personInfoCategoryAuthId){
      return ajax(format(paths.getCategoryAuth, roleId, personInfoCategoryAuthId));
    }

    export function getPersonRoleItemList(roleId, personInfoCategoryAuthId){
       return ajax(format(paths.getPersonRoleItemList, roleId, personInfoCategoryAuthId));
    }

    export function savePersonRole(command){;
        return ajax(paths.savePersonRole, command);
    }

    export function getAllItemIdRequired(){
       return ajax(paths.getAllItemIdRequired);
    }
    export function saveAsExcel(languageId: string): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CAS001";
        if (program.length > 1){
            program.shift();
            domainType = domainType + program.join(" ");
        }
        let _params = {domainId: "PersonRole", 
                        domainType:domainType,
                        languageId: languageId, reportType: 0};
        return nts.uk.request.exportFile('/masterlist/report/print', _params);
    }

}
