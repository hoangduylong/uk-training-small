module nts.uk.com.view.cmf002.o {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    export module service {
        var paths = {
            getConditionList: "exio/condset/getAllCondition",
            getExOutSummarySetting: "exio/exo/condset/getExOutSummarySetting/{0}",
            createExOutText: "exio/exo/condset/createExOutText",
            getConditionSetting: "exio/exo/condset/getCondSet",
            getAllCategoryItem: "exio/exo/condset/getAllCategoryItem/{0}",
            getExOutCtgDto: "exio/exo/condset/getExOutCtgDto/{0}"
        }

        export function getConditionList(): JQueryPromise<any> {
            return ajax('com', paths.getConditionList);
        };        
       
        export function getExOutSummarySetting(conditionSetCd: string): JQueryPromise<any> {
            let _path = format(paths.getExOutSummarySetting, conditionSetCd);
            return ajax('com', _path);
        };
        
        export function createExOutText(command: any): JQueryPromise<any> {
            return ajax('com', paths.createExOutText, command);
        }; 
        export function getConditionSetting(command: any): JQueryPromise<any> {
            return ajax('com',paths.getConditionSetting, command);
        };
        export function getExOutCtgDto(categoryId:number): JQueryPromise<any> {
            let _path = format(paths.getExOutCtgDto,categoryId);
            return ajax('com', _path);
        };  

    }
}
