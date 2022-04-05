module nts.uk.at.view.cps013.e {
    import format = nts.uk.text.format;
    import ajax = nts.uk.request.ajax;
    export module service {

        var paths: any = {
            executeCheck: "ctx/pereg/check/category/process",
            getErrorMessageInfo: "ctx/at/record/optionalaggr/getErrorMessageInfo/{0}",
            getErrorInfos: "ctx/at/record/optionalaggr/finderrorinfo/{0}",
            stopExecute: "ctx/at/record/optionalaggr/stopExecute/{0}"
        }

        export function executeCheck(dataShare: any) {
            return ajax(paths.executeCheck, dataShare);
        }
        
        export function getErrorMessageInfo(excuteId: any): JQueryPromise<any> {
            let _path = format(paths.getErrorMessageInfo, excuteId);
            return ajax("at", _path);
        }
        export function getErrorInfos(aggrId: string): JQueryPromise<any> {
            let _path = format(paths.getErrorInfos, aggrId);
            return ajax("at", _path);
        }
        export function stopExecute(dataFromA: any) {
            let _path = format(paths.stopExecute, dataFromD);
            return ajax("at", _path);
        }



    }
}
