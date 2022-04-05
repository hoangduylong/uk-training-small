module nts.uk.com.view.cli003.g {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    export module service {

        const paths = {
            getAllLogDisplaySet: "ctx/sys/log/app/get-all-log-display-set",
            addLogDisplaySet: "ctx/sys/log/app/add-log-display-set",
            updateLogDisplaySet: "ctx/sys/log/app/update-log-display-set",
            deleteLogDisplaySet: "ctx/sys/log/app/delete-log-display-set",
            getLogOutputItemByRecordType: "ctx/sys/log/app/get-log-output-item-by-record-type",
        };

        export function getAllLogDisplaySet(): JQueryPromise<any> {
            return ajax('com',paths.getAllLogDisplaySet);
        }
        
        export function addLogDisplaySet(logDisplaySet: any): JQueryPromise<any> {
            return ajax('com', paths.addLogDisplaySet, logDisplaySet);
        }
        
        export function updateLogDisplaySet(logDisplaySet: any): JQueryPromise<any> {
            return ajax('com', paths.updateLogDisplaySet, logDisplaySet);
        }
        
        export function deleteLogDisplaySet(logSetId: string): JQueryPromise<any> {
            return ajax('com', paths.deleteLogDisplaySet, logSetId);
        }
        
        export function getLogOutputItemByRecordType(recordType: string): JQueryPromise<any> {
            return ajax('com', paths.getLogOutputItemByRecordType, recordType);
        }
    }
}
