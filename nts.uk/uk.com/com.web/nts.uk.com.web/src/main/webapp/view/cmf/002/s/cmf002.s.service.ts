module nts.uk.com.view.cmf002.s {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    export module service {
        var paths = {
            findExOutOpMng: "exio/exo/execlog/findExOutOpMng/{0}",
            deleteexOutOpMng: "exio/exo/execlog/deleteexOutOpMng",
            updateexOutOpMng: "exio/exo/execlog/updateexOutOpMng",
            getExterOutExecLog: "exio/exo/execlog/getExterOutExecLog/{0}",
            updateFileSize: "exio/exo/execlog/updateFileSize/{0}/{1}"
        }  
        
        export function findExOutOpMng(storeProcessingId: string): JQueryPromise<any> {
            let _path = format(paths.findExOutOpMng, storeProcessingId);
            return ajax('com', _path);
        }
        
        export function deleteexOutOpMng(command: any): JQueryPromise<any> {
            return ajax("com", paths.deleteexOutOpMng, command);
        }
        
        export function updateexOutOpMng(command: any): JQueryPromise<any> {
            return ajax("com", paths.updateexOutOpMng, command);
        }
        
        export function getExterOutExecLog(storeProcessingId: string): JQueryPromise<any> {
            let _path = format(paths.getExterOutExecLog, storeProcessingId);
            return ajax('com', _path);
        }
        
        export function updateFileSize(storeProcessingId: string, fileId: string): JQueryPromise<any> {
            let _path = format(paths.updateFileSize, storeProcessingId, fileId);
            return ajax('com', _path);
        }
    }
}