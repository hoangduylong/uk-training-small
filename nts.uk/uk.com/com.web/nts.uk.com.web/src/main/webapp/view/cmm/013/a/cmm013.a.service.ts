module nts.uk.com.view.cmm013.a {
    
    export module service {
            
        /**
         *  Service paths
         */
        var servicePath: any = {
            findJobHistoryList: "bs/employee/jobtitle/history/findByJobId",
            findJobInfoByJobIdAndHistoryId: "bs/employee/jobtitle/info/findByJobIdAndHistoryId",
            findJobInfoByJobCode: "bs/employee/jobtitle/info/findByJobCode",
            saveJobTitle: "bs/employee/jobtitle/save",
            removeJobTitleHistory: "bs/employee/jobtitle/history/remove",
            findAllSequenceMaster: "bs/employee/jobtitle/sequence/findAll",
        }
    
        /**
         * findJobHistoryList
         */
        export function findJobHistoryList(jobTitleId: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findJobHistoryList, { jobTitleId: jobTitleId });
        }
        
        /**
         * findJobInfoByJobIdAndHistoryId
         */
        export function findJobInfoByJobIdAndHistoryId(jobTitleId: string, jobTitleHistoryId: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findJobInfoByJobIdAndHistoryId, { jobTitleId: jobTitleId, jobTitleHistoryId: jobTitleHistoryId });
        }
        
        /**
         * findJobInfoByJobCode
         */
        export function findJobInfoByJobCode(jobTitleCode: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findJobInfoByJobCode, { jobTitleCode: jobTitleCode });
        }
        
        /**
         * saveJobTitle
         */
        export function saveJobTitle(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.saveJobTitle, command);
        }
        
        /**
         * removeWorkplaceHistory
         */
        export function removeJobTitleHistory(command: any): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.removeJobTitleHistory, command);
        }
        
        /**
         * findAllSequenceMaster
         */   
        export function findAllSequenceMaster(): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findAllSequenceMaster);
        }
        

        export function saveAsExcel(mode: string, baseDate: string): JQueryPromise<any> {
            let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
            let domainType = "CMM013";
            if (program.length > 1) {
                program.shift();
                domainType = domainType + program.join(" ");
            }
            return nts.uk.request.exportFile('/masterlist/report/print',
                {
                    domainId: 'Sequence',
                    domainType: domainType,
                    languageId: 'ja', reportType: 0,
                    baseDate: moment.utc(baseDate).format()

                });
        }
        
 

        /**
         * Model namespace.
         */
        export module model {
                      
        }
    }
}