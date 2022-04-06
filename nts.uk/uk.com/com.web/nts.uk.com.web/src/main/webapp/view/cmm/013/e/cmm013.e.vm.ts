module nts.uk.com.view.cmm013.e {

    export module viewmodel {
        
        import Constants = base.Constants;
        
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
                let transferObj: any = {};
				transferObj.startDate =  _self.startDate;
				transferObj.endDate =  _self.endDate;
                nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_EDIT_HISTORY, transferObj);
                _self.close();
            }
            
            /**
             * Close
             */
            public close(): void {
                nts.uk.ui.windows.close();
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
        }
    }    
}