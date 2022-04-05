module nts.uk.pr.view.ccg007.h {
    export module viewmodel {
        import blockUI = nts.uk.ui.block;
        import ForgotPasswordCommand = service.ForgotPasswordCommand;
        import SubmitData = service.SubmitData;

        export class ScreenModel {

            userName: KnockoutObservable<string>;
            userId: KnockoutObservable<string>;
            passwordNew: KnockoutObservable<string>;
            passwordNewConfirm: KnockoutObservable<string>;
            embeddedId: KnockoutObservable<string>;
            loginId: KnockoutObservable<string>;
            contractCode: KnockoutObservable<string>;
            contractPassword: KnockoutObservable<string>;

            constructor() {
                var self = this;

                self.userName = ko.observable(null);
                self.userId = ko.observable(null);
                self.passwordNew = ko.observable(null);
                self.passwordNewConfirm = ko.observable(null);
                self.embeddedId = ko.observable(null);
                self.loginId = ko.observable(null);
                self.contractCode = ko.observable(null);
                self.contractPassword = ko.observable(null);
            }

            /**
             * Start page.
             */
            public startPage(): JQueryPromise<void> {
                let self = this;
                let dfd = $.Deferred<void>();
                
                let url = _.toLower($(location).attr('href'));
                self.embeddedId(url.substring(url.indexOf("=") + 1, url.length));

                // block ui
                nts.uk.ui.block.invisible();

                //get userName
                service.getUserNameByURL(self.embeddedId()).done(function(data: any) {
                    self.userName(data.userName);
                    self.userId(data.userId);
                    self.loginId(data.loginId);
                    self.contractCode(data.contractCode);
                });

                dfd.resolve();

                //clear block
                nts.uk.ui.block.clear();

                return dfd.promise();
            }

            /**
             * Submit
             */
            public submit(): void {
                let self = this;

                //check hasError
                if (nts.uk.ui.errors.hasError()) {
                    return;
                }
                
                //check userId null
                if (_.isEmpty(self.userId())) {
                    return;
                }

                blockUI.invisible();

                //add command
                let command: ForgotPasswordCommand = new ForgotPasswordCommand(self.embeddedId(), self.userId(), _.escape(self.passwordNew()), _.escape(self.passwordNewConfirm()));

                service.submitForgotPass(command).done(function() {
                    
                    var submitData = <SubmitData>{};
                    
                    nts.uk.characteristics.restore("contractInfo").done(function(loginInfo:any) {
                        //Set SubmitData
                        if (loginInfo) {
                            submitData.contractPassword = _.escape(loginInfo.contractPassword);
                        }
                        
                        submitData.loginId = nts.uk.text.padRight(_.escape(self.loginId()), " ", 12);
                        submitData.password = _.escape(self.passwordNew());
                        submitData.contractCode = _.escape(self.contractCode());
                        
                        //login
                        service.submitLogin(submitData).done(function(messError: any) {
                            //Remove LoginInfo
                            nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                            blockUI.clear();
                        }).fail(function(res:any) {
                            //Return Dialog Error
                            if (!nts.uk.util.isNullOrEmpty(res.parameterIds)){
                                nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                            } else {
                               nts.uk.ui.dialog.alertError(res.messageId);
                            }
                            blockUI.clear();
                        });
                    });
                }).fail(function(res: any) {
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

                nts.uk.ui.windows.sub.modal('/view/ccg/007/i/index.xhtml', {
                    width: 520,
                    height: 300
                }).onClosed(function(): any { })
            }
        }
    }
}