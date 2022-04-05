module nts.uk.com.view.cmf003.b {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    export module service {
        
        var paths = {
            getConditionList: "exio/condset/getAllCondition",
            addMalSet: "ctx/sys/assist/app/addMalSet",
            screenDisplayProcess: "ctx/sys/assist/autosetting/screenDisplayProcessing",
            patternSettingSelect: "ctx/sys/assist/autosetting/patternSettingSelect",
            getClosurePeriod: "com/screen/closurePeriod/get",
        }

        export function getConditionList(): JQueryPromise<any> {
            return ajax('com', paths.getConditionList);
        };
        
        export function addMalSet(manualSet: any): JQueryPromise<any> {
            return nts.uk.request.ajax('com', paths.addMalSet, manualSet);
        };

        export function screenDisplayProcess(): JQueryPromise<any> {
          return ajax('com', paths.screenDisplayProcess);
        }

        export function patternSettingSelect(param: any): JQueryPromise<any> {
          return ajax('com', paths.patternSettingSelect, param);
        }

        export function getClosurePeriod(): JQueryPromise<any> {
          return ajax('com', paths.getClosurePeriod);
        }
    }
}
