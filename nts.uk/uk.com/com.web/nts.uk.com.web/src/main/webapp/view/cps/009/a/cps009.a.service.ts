module nts.uk.com.view.cps009.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let paths = {
        getAll: "ctx/pereg/person/info/setting/init/findAll",
        getAllCtg: "ctx/pereg/person/info/setting/init/ctg/find/{0}",
        getAllItemByCtgId: "ctx/pereg/person/info/setting/init/item/find/{0}/{1}/{2}",
        deleteInitVal: "ctx/pereg/person/info/setting/init/delete",
        update: "ctx/pereg/person/info/setting/init/ctg/update",
        filterHisSel: "ctx/pereg/person/info/setting/selection/findAllCombox",
        checkItemWorkType: "ctx/pereg/person/common/checkStartEnd",
        checkItemWorkTime: "ctx/pereg/person/common/checkAllMutilTime",
        checkFunctionNo: "ctx/pereg/functions/auth/find-with-role-person-info"
    }
    /**
     * Get all init value setting
     */
    export function getAll() {
        return ajax(paths.getAll);
    }

    /**
     * Get all init value setting
     */
    export function getAllCtg(settingId: string) {
        return ajax(format(paths.getAllCtg, settingId));
    }

    /**
   * Get all init value setting
   */
    export function getAllItemByCtgId(settingId: string, perInfoCtgId: string, baseDate: any) {
        return ajax(format(paths.getAllItemByCtgId, settingId, perInfoCtgId, baseDate));
    }

    /**
     * delete init value setting
     */
    export function deleteInitVal(obj: any) {
        return ajax(paths.deleteInitVal, obj);
    }

    /**
     *update init value setting
     */
    export function update(obj: any) {
        return ajax(paths.update, obj);
    }

    /**
    * Get all init value setting
    */
    export function getAllSelByHistory(selectionItemId: string, baseDate: any) {
        return ajax(format(paths.filterHisSel, selectionItemId, baseDate));
    }

    export function getAllComboxByHistory(query: any) {
        return ajax(paths.filterHisSel, query);
    }


    export function checkStartEnd(params: any) {
        return ajax(paths.checkItemWorkType, params);
    }


    export function checkMutiTime(params: any) {
        return ajax(paths.checkItemWorkTime, params);
    }
    
/** 「今まで25.10,対応していません 」 */
    export function checkFunctionNo() {
        return ajax(paths.checkFunctionNo);
    }
    
    export function saveAsExcel(): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CPS009";
        if (program.length > 1){
            program.shift();
            domainType = domainType + program.join(" ");
        }
        let _params = {domainId: "PerInfoInit", 
                        domainType: domainType,
                        languageId: "ja", reportType: 0};
        return nts.uk.request.exportFile('/masterlist/report/print', _params);
    }

}
