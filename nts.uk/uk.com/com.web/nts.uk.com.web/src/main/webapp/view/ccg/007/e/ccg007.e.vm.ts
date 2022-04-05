module nts.uk.pr.view.ccg007.e {
    export module viewmodel {
        import blockUI = nts.uk.ui.block;
        import CallerParameter = service.CallerParameter;
        import ChangePasswordCommand = service.ChangePasswordCommand;
        import EmployeeInforDto = service.EmployeeInforDto;
        import getMessage = nts.uk.resource.getMessage;

        export class ScreenModel {
            
            userName: KnockoutObservable<string>;
            passwordCurrent: KnockoutObservable<string>;
            passwordNew: KnockoutObservable<string>;
            passwordNewConfirm: KnockoutObservable<string>;
            
            // Parameter from caller screen.
            callerParameter: CallerParameter;
            reasonUpdatePw: KnockoutObservable<string> = ko.observable("");
            constructor(parentData: CallerParameter) {
                var self = this;
                
                self.userName = ko.observable(null);
                self.passwordCurrent = ko.observable(null);
                self.passwordNew = ko.observable(null);
                self.passwordNewConfirm = ko.observable(null);
                
                //parent data
                self.callerParameter = parentData;
            }
            
            /**
             * Start page.
             */
            public startPage(): JQueryPromise<void> {
                let self = this;
                let dfd = $.Deferred<void>();
                let changePw = nts.uk.ui.windows.getShared('changePw');
                if(changePw === undefined){
                    self.reasonUpdatePw('');
                }else{
                    if(changePw.reasonUpdatePw == 'Msg_1523'){
                        self.reasonUpdatePw(getMessage(changePw.reasonUpdatePw, [changePw.spanDays]));
                    }else{
                        self.reasonUpdatePw(getMessage(changePw.reasonUpdatePw));
                    }
                }
                // block ui
                nts.uk.ui.block.invisible();
                if (self.callerParameter.form1){
                    //get userName
                    service.getUserNameByLoginId(self.callerParameter.contractCode, self.callerParameter.loginId).done(function(data) {
                        self.userName(data.userName);
                    });
                } else {
                    //add command
                    let dto: EmployeeInforDto = new EmployeeInforDto(self.callerParameter.contractCode, self.callerParameter.employeeCode, self.callerParameter.companyCode);
                    
                    //get userName
                    service.getUserNameByEmployeeCode(dto).done(function(data) {
                        self.userName(data.userName);
                    });
                }
                
                dfd.resolve();
                
                //clear block
                nts.uk.ui.block.clear();

                return dfd.promise();
            }
            
            /**
             * Submit
             */
            public submit(): void{
                let self = this;
                
                if (nts.uk.ui.errors.hasError()) {
                    return;                   
                }
                
                blockUI.invisible();
                
                //add command
                let command: ChangePasswordCommand = new ChangePasswordCommand(self.passwordCurrent(), self.passwordNew(), self.passwordNewConfirm());
                
                //submitChangePass
                service.submitChangePass(command).done(function () {
                    blockUI.clear();
                    nts.uk.ui.windows.setShared("changePwDone", true);
                    nts.uk.ui.windows.close();
                }).fail(function(res) {
                    //Return Dialog Error
                    self.showMessageError(res);
                    blockUI.clear();
                });
                
            }
            
            /**
             * showMessageError
             */
            public showMessageError(res: any) {
                let dfd = $.Deferred<any>();

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
            
            //open dialog I 
            OpenDialogI() {
                let self = this;

                nts.uk.ui.windows.sub.modal('/view/ccg/007/i/index.xhtml',{
                    width : 520,
                    height : 300
                }).onClosed(function(): any {})
            }
            
            /**
             * close dialog
             */
            public closeDialog(): void {
                nts.uk.ui.windows.setShared("changePwDone", false);
                nts.uk.ui.windows.close();
            }
        }
    }
}