module nts.uk.com.view.cmf002.v2.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let paths = {
        getOutputCodeConvertByCompanyId: "exio/exo/codeconvert/getOutputCodeConvertByCompanyId"
    };
    
    //Get output code convert by company id
    export function getOutputCodeConvertByCompanyId(): JQueryPromise<any> {
        return ajax(paths.getOutputCodeConvertByCompanyId);
    }
}