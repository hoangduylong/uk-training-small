module nts.uk.com.view.cdl027.a.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    var paths = {
        getLogInfor: "ctx/sys/log/datacorrectionlog/findAll", 
        exportCsv: "ctx/sys/log/datacorrectionlog/exportCsv"
    }

    export function getLogInfor(params): JQueryPromise<any> {
        return ajax("com", paths.getLogInfor, params);
    }
    
    export function exportCsv(params): JQueryPromise<any> {
        return nts.uk.request.exportFile(paths.exportCsv, params);
    }
    
}