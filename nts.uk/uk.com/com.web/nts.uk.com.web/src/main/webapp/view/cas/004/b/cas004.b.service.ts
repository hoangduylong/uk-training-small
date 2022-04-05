module nts.uk.com.view.cas004.b {
    export module service {
        var paths = {
            getCompanyList: "ctx/sys/auth/ws/company/getCompanyList",
            findEmployeesByCId: "ctx/sys/auth/ws/employeeInfo/findEmployeesByCId"
        }

        //Fine All Company
        export function getCompanyList(): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.getCompanyList);
        }

        // get list employee by company id
        export function findEmployeesByCId(companyId: string): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.findEmployeesByCId, companyId);
        }
    }
}
