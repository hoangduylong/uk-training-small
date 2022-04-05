module nts.uk.com.view.cmf002.y {
        import ajax = nts.uk.request.ajax;
        import format = nts.uk.text.format;
    export module service {
        var paths = {
            getExterOutExecLog: "exio/exo/execlog/getExterOutExecLog/{0}",
            getExternalOutLog: "exio/exo/execlog/getExternalOutLog/{0}",
            exportDatatoCsv: "exio/exo/execlog/export",
        }
    
        export function getExterOutExecLog(storeProcessingId: string): JQueryPromise<any> {
            let _path = format(paths.getExterOutExecLog, storeProcessingId);
            return ajax('com', _path);
        }
    
        export function getExternalOutLog(storeProcessingId: string): JQueryPromise<any> {
            let _path = format(paths.getExternalOutLog, storeProcessingId);
            return ajax('com', _path);
        }
        
        export function exportDatatoCsv(data): JQueryPromise<any> {
            return nts.uk.request.exportFile(paths.exportDatatoCsv, data);
        }
    }
}