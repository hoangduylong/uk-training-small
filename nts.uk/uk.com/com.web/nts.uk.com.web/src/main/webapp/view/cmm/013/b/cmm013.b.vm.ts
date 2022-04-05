module nts.uk.com.view.cmm013.b {

    export module viewmodel {
       
        import Constants = base.Constants;            
        
        export class ScreenModel {
            
            jobTitleId: KnockoutObservable<string>;
            jobTitleCode: KnockoutObservable<string>;
            jobTitleName: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
            
            constructor() {
                let _self = this;

                _self.jobTitleId = ko.observable("");
                _self.jobTitleCode = ko.observable("");
                _self.jobTitleName = ko.observable("");              
                _self.endDate = ko.observable("");
            }
            
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let _self = this;
                let dfd = $.Deferred<any>();
                
                let jobTitle: any = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_REMOVE_JOB);
                _self.jobTitleId(jobTitle.jobTitleId);
                _self.jobTitleCode(jobTitle.jobTitleCode);
                _self.jobTitleName(jobTitle.jobTitleName);
                
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
                
                nts.uk.ui.dialog.confirm({ messageId: "Msg_482", messageParams: [moment(_self.endDate()).format("YYYY/MM/DD"), _self.jobTitleCode(), _self.jobTitleName()]})
                    .ifYes(() => { 
                        nts.uk.ui.block.grayout();
                        service.removeJobTitle(_self.toJSON())
                            .done(() => {                                                            
                                nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_REMOVE_JOB, true);
                                nts.uk.ui.dialog.info({ messageId: "Msg_483" }).then(() => {
                                    _self.close();
                                });                               
                            })
                            .fail((res: any) => {                                
                                _self.showMessageError(res);
                            })
                            .always(() => {
                                nts.uk.ui.block.clear();
                            });
                    })
                    .ifNo(() => { 
                        // Nothing happen
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
            private toJSON(): any {
                let _self = this;
                if (!_self.jobTitleId() || !_self.endDate()) {
                    return {};
                }                                              
                return {
                    jobTitleId: _self.jobTitleId(),
                    endDate: _self.endDate()
                }
            }
            
            /**
             * Validate
             */
            private validate(): boolean {
                let _self = this;     
                          
                // Clear error
                nts.uk.ui.errors.clearAll();          
                  
                $('#end-date').ntsEditor('validate');               
                return !$('.nts-input').ntsError('hasError');
            }
            
            /**
             * Show Error Message
             */
            private showMessageError(res: any): void {
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