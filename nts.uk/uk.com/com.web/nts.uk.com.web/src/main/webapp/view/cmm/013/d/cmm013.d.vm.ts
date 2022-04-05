module nts.uk.com.view.cmm013.d {

    export module viewmodel {
        
        import Constants = base.Constants;  
        import SavePeriod = base.SavePeriod;   
        import SaveHistory = base.SaveHistory;          
        import SaveJobTitleHistoryCommand = service.model.SaveJobTitleHistoryCommand;
        
        export class ScreenModel {
            
            startDate: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
            
            constructor() {
                let _self = this;
                                
                _self.startDate = ko.observable("");
                _self.endDate = ko.observable(nts.uk.resource.getText("CMM013_31"));
            }
            
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let _self = this;
                let dfd = $.Deferred<any>();
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
                        nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_ADD_HISTORY, true);
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
                let jobTitleId: string = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_ADD_HISTORY);
                if (!jobTitleId) {
                    return null;
                }
                
                let jobTitleHistory: SaveHistory = new SaveHistory("", new SavePeriod(new Date(_self.startDate()), new Date("9999-12-31")));
                let command: SaveJobTitleHistoryCommand = new SaveJobTitleHistoryCommand(true, jobTitleId, jobTitleHistory);
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