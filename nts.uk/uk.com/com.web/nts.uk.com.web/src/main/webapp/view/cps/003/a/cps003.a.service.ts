module cps003.a.service {
    import ajax = nts.uk.request.ajax;

    export const push = {
        data: (command: any) => ajax(`ctx/pereg/grid-layout/save-data`, command),
        setting: (command: any) => ajax(`ctx/pereg/grid-layout/save-setting`, command),
        register: (command: any) => ajax(`facade/pereg/grid/register`, command)
    }

    export const fetch = {
        data: (command: any) => ajax(`ctx/pereg/grid-layout/get-data`, command),
        setting: (cid: string) => ajax(`ctx/pereg/grid-layout/get-setting/${cid}`), // cid: categoryId
        category: (uid: string) => ajax(`ctx/pereg/employee/category/get-all-cps003/${uid}`),
        permission: (roleId: string, catId: string) => ajax(`ctx/pereg/roles/auth/category/find/${roleId}/${catId}`),
        basicHolidayEmpInfo: (empIdList) => ajax("at", `at/record/remainnumber/yearholidaymanagement/get-data`, empIdList),
        affiliatedCompanyHist: (param) => ajax(`bs/employee/affiliatedcompanyhistory/getdata`, param),
        contractTime: (param) => ajax(`ctx/pereg/grid-layout/get-data/contracttime`, param),
        workplaceInfo: (param) => ajax(`bs/employee/workplace/info/display`, param)
    }
}