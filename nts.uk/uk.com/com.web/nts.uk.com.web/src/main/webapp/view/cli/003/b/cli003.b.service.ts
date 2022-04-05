module nts.uk.com.view.cli003.b {
    import ajax = nts.uk.request.ajax;

    export module service {

        const paths = {
            getAllLogDisplaySet: "ctx/sys/log/app/get-all-log-display-set",
            getLogOutputItemByRecordType: "ctx/sys/log/app/get-log-output-item-by-record-type",
        };

        export function getAllLogDisplaySet(): JQueryPromise<any> {
            return ajax('com',paths.getAllLogDisplaySet);
        };
        
        export function getLogOutputItemByRecordType(recordType: string): JQueryPromise<any> {
            return ajax('com', paths.getLogOutputItemByRecordType, recordType);
        };
    }
}
