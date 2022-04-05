module nts.uk.com.view.cmm013.e {

    export module viewmodel {
        
        import Constants = base.Constants;
        import SavePeriod = base.SavePeriod;   
        import SaveHistory = base.SaveHistory;          
        import SaveJobTitleHistoryCommand = service.model.SaveJobTitleHistoryCommand;
        
        export class ScreenModel {
            
            jobTitleId: string;
            historyId: string;
            startDate: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
            
            constructor() {
                let _self = this;
                
                _self.jobTitleId = null;
                _self.historyId = null;                
                _self.startDate = ko.observable("");
                _self.endDate = ko.observable(nts.uk.resource.getText("CMM013_38"));
            }
            
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let _self = this;
                let dfd = $.Deferred<any>();
                
                // Load data from parent screen
                let transferObj: any = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_EDIT_HISTORY);
                _self.jobTitleId = transferObj.jobTitleId;
                _self.historyId = transferObj.historyId;
                _self.startDate(transferObj.startDate);
                
                dfd.resolve();
                return dfd.promise();
            }
            
            /**
             * Execution
             */
            public execution(): void {
                let _self = this;
                if (!_self.validate()) {
                    return;
                }               
                nts.uk.ui.block.grayout();
                service.saveJobTitleHistory(_self.toJSON())
                    .done(() => {                       
                        nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_EDIT_HISTORY, true);
                        _self.close();
                    })
                    .fail((res: any) => {
                        _self.showMessageError(res);
                    })
                    .always(() => {
                        nts.uk.ui.block.clear();    
                    });
            }
            
            /**
             * Close
             */
            public close(): void {
                nts.uk.ui.windows.close();
            }
            
            /**
             * toJSON
             */
            private toJSON(): SaveJobTitleHistoryCommand {
                let _self = this;
                
                let jobTitleHistory: SaveHistory = new SaveHistory(_self.historyId, new SavePeriod(new Date(_self.startDate()), new Date("9999-12-31")));
                let command: SaveJobTitleHistoryCommand = new SaveJobTitleHistoryCommand(false, _self.jobTitleId, jobTitleHistory);
                return command;              
            }
            
            /**
             * Validate
             */
            private validate(): boolean {
                let _self = this;             
                  
                // Clear error
                nts.uk.ui.errors.clearAll();    
                              
                $('#start-date').ntsEditor('validate');               
                return !$('.nts-input').ntsError('hasError');
            }
            
            /**
             * Show Error Message
             */        
            public showMessageError(res: any): void {
                // check error business exception
                if (!res.businessException) {
                    return;
                }
                
                // show error message
                if (Array.isArray(res.errors)) {
                    nts.uk.ui.dialog.bundledErrors(res);
                } else {
                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                }
            }
        }
    }    
}