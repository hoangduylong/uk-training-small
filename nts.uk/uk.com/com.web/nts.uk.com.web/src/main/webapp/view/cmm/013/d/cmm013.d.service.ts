module nts.uk.com.view.cmm013.d {
    
    import SaveHistory = base.SaveHistory;
    import SaveJobTitleHistoryCommand = service.model.SaveJobTitleHistoryCommand;
    
    export module service {
        
        /**
         *  Service paths
         */
        var servicePath: any = {
            saveJobTitleHistory: "bs/employee/jobtitle/history/save",
        };
                
        /**
         * saveWorkplaceHistory
         */
        export function saveJobTitleHistory(command: SaveJobTitleHistoryCommand): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.saveJobTitleHistory, command);
        }
        
        /**
        * Model namespace.
        */
        export module model {
            
            /**
             * JobTitleHistory save command
             */
            export class SaveJobTitleHistoryCommand {
                
                isCreateMode: boolean;
                jobTitleId: string;
                jobTitleHistory: SaveHistory;
                
                constructor(isCreateMode: boolean, jobTitleId: string, jobTitleHistory: SaveHistory) {
                    this.isCreateMode = isCreateMode;
                    this.jobTitleId = jobTitleId;
                    this.jobTitleHistory = jobTitleHistory;
                }
            }
        }
    }
}
