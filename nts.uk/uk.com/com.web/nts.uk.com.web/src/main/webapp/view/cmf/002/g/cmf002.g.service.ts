module nts.uk.com.view.cmf002.g.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        getOutputCodeConvertByCompanyId:     "exio/exo/codeconvert/getOutputCodeConvertByCompanyId",
        getOutputCodeConvertByConvertCode:   "exio/exo/codeconvert/getOutputCodeConvertByConvertCode/{0}",
        addOutputCodeConvert:          "exio/exo/codeconvert/addOutputCodeConvert",
        updateOutputCodeConvert:       "exio/exo/codeconvert/updateOutputCodeConvert",
        removeOutputCodeConvert:       "exio/exo/codeconvert/removeOutputCodeConvert",
        checkBeforeRemove:             "exio/exo/codeconvert/checkBeforeRemove/{0}"
    }

    export function getOutputCodeConvertByCompanyId(): JQueryPromise<any> {
        return ajax(paths.getOutputCodeConvertByCompanyId);
    }

    export function getOutputCodeConvertByConvertCode(convertCode: string): JQueryPromise<any> {
        return ajax(format(paths.getOutputCodeConvertByConvertCode, convertCode));
    }

    export function addOutputCodeConvert(command): JQueryPromise<any> {
        return ajax(paths.addOutputCodeConvert, command);
    }

    export function updateOutputCodeConvert(command): JQueryPromise<any> {
        return ajax(paths.updateOutputCodeConvert, command);
    }

    export function removeOutputCodeConvert(command): JQueryPromise<any> {
        return ajax(paths.removeOutputCodeConvert, command);
    }

    export function checkBeforeRemove(convertCode: string): JQueryPromise<any> {
        return ajax(format(paths.checkBeforeRemove, convertCode));
    }

}