module nts.uk.pr.view.ccg007.b {
    export module viewmodel {
        import SystemConfigDto = service.SystemConfigDto;
        import ContractDto = service.ContractDto;
        import blockUI = nts.uk.ui.block;
        import SubmitData = service.SubmitData;
        import CheckChangePassDto = service.CheckChangePassDto;
        import character = nts.uk.characteristics;
        export class ScreenModel {
            loginId: KnockoutObservable<string>;
            password: KnockoutObservable<string>;
            contractCode: KnockoutObservable<string>;
            contractPassword: KnockoutObservable<string>;
            isSaveLoginInfo: KnockoutObservable<boolean>;
            isSignOn: KnockoutObservable<boolean> = ko.observable(false);
            displayLogin: KnockoutObservable<boolean> = ko.observable(false);
            constructor() {
                var self = this;
                self.loginId = ko.observable('');
                self.password = ko.observable('');
                self.contractCode = ko.observable('');
                self.contractPassword = ko.observable('');
                self.isSaveLoginInfo = ko.observable(true);
            }
            start(): JQueryPromise<void> {
                var self = this;
                //get url
                let url = _.toLower(_.trim(_.trim($(location).attr('href')), '%20'));
                let isSignOn = url.indexOf('signon=on') >= 0 || url.indexOf('signon=oN') >= 0 || url.indexOf('signon=On') >= 0
                || url.indexOf('signon=ON') >= 0;
                self.isSignOn(isSignOn);
                if(!isSignOn){
                    self.displayLogin(true);
                }
                var dfd = $.Deferred<void>();
                let defaultContractCode: string = "000000000000";
                blockUI.invisible();
                //get system config
                //get local contract info
                nts.uk.characteristics.restore("contractInfo").done(function(data:any) {
                    //Set ContractInfo
                    self.contractCode(data ? data.contractCode : "");
                    self.contractPassword(data ? data.contractPassword : "");

                    //check Contract
                    service.checkContract({ contractCode: data ? data.contractCode : "", contractPassword: data ? data.contractPassword : "" })
                        .done(function(data: any) {
                            if (data.onpre) {
                                nts.uk.characteristics.remove("contractInfo");
                                nts.uk.characteristics.save("contractInfo", { contractCode: defaultContractCode, contractPassword: self.contractPassword() });
                                self.contractCode(defaultContractCode);
                                self.contractPassword(null);
                                //シングルサインオン（Active DirectorySSO）かをチェックする
                                if (isSignOn) {
                                    self.submitLogin(isSignOn);
                                }
                                else {
                                    //Get login ID and set here
                                    nts.uk.characteristics.restore("form1LoginInfo").done(function(loginInfo:any) {
                                        if (loginInfo) {
                                            self.loginId(loginInfo.loginId);
                                        }
                                    });
                                }
                            }
                            else {
                                //check ShowContract
                                if (data.showContract && !data.onpre) {
                                    self.openContractAuthDialog();
                                }
                                else {
                                    //シングルサインオン（Active DirectorySSO）かをチェックする
                                    if (isSignOn) {
                                        self.submitLogin(isSignOn);
                                    }
                                    else {
                                        //Get login ID and set here
                                        nts.uk.characteristics.restore("form1LoginInfo").done(function(loginInfo:any) {
                                            if (loginInfo) {
                                                self.loginId(loginInfo.loginId);
                                            }
                                        });
                                    }
                                }
                            }
                            //clear block
                            blockUI.clear();
                            dfd.resolve();
                        }).fail(function() {
                            //clear block
                            dfd.resolve();
                            blockUI.clear();
                        });
                }).fail(function() {
                    //clear block
                    dfd.resolve();
                    blockUI.clear();
                });
                
                service.ver().done(data => {
                    $("#ver").html(data.ver);
                });
                
                return dfd.promise();
            }

            //when invalid contract 
            private openContractAuthDialog() {
                var self = this;
                nts.uk.ui.windows.sub.modal("/view/ccg/007/a/index.xhtml", {
                    height: 300,
                    width: 400,
                    title: nts.uk.resource.getText("CCG007_9"),
                    dialogClass: 'no-close'
                }).onClosed(() => {
                    var contractCode = nts.uk.ui.windows.getShared('contractCode');
                    var contractPassword = nts.uk.ui.windows.getShared('contractPassword');
                    var isSubmit = nts.uk.ui.windows.getShared('isSubmit');
                    self.contractCode(contractCode);
                    self.contractPassword(contractPassword);
                    
                    //get url
                    let url = _.toLower(_.trim(_.trim($(location).attr('href')), '%20'));
                    let isSignOn = url.indexOf('signon=on') >= 0;
                    
                    //Check signon
                    if (isSubmit && isSignOn){
                        self.submitLogin(isSignOn);
                    }
                });
            }
            
            /**
             * SubmitLogin
             */
            private submitLogin(isSignOn : boolean) {
                var self = this;
                var submitData = <SubmitData>{};

                //Set SubmitData
                submitData.loginId = nts.uk.text.padRight(_.escape(self.loginId()), " ", 12);
                submitData.password = _.escape(self.password());
                submitData.contractCode = _.escape(self.contractCode());
                submitData.contractPassword = _.escape(self.contractPassword());

                blockUI.invisible();
                service.submitLogin(submitData).done(function(messError: CheckChangePassDto) {
                    if(!nts.uk.util.isNullOrUndefined(messError.successMsg)&&!nts.uk.util.isNullOrEmpty(messError.successMsg)){
                        nts.uk.ui.dialog.info({ messageId: messError.successMsg }).then(()=>{
                            self.doSuccessLogin(messError);      
                        });
                    } else {    
                        self.doSuccessLogin(messError);    
                    }
                    blockUI.clear();
                }).fail(function(res:any) {
                    blockUI.clear();
                    if (self.isSignOn()) {//SIGNON
                        if (!nts.uk.util.isNullOrEmpty(res.messageId)) {
                            if (res.messageId == 'Msg_876') {//ActiveDirectory変換マスタが見つかりません
                                nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds }).then(() => {
                                    nts.uk.request.jump("/view/ccg/007/sso/adsso.xhtml", { 'errAcc': true, 'errMsg': res.message });
                                });
                            }else{
                                nts.uk.request.jump("/view/ccg/007/sso/adsso.xhtml", { 'errAcc': false, 'errMsg': res.message });
                            }
                        } else {//TH k co msgID
                            nts.uk.request.jump("/view/ccg/007/sso/adsso.xhtml", { 'errAcc': false, 'errMsg': res.message });
                        }
                    } else {//NORMAL
                        if (nts.uk.util.isNullOrEmpty(res.messageId)) {
                            nts.uk.ui.dialog.alertError(res.message);
                        } else {
                            nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                        }
                    }
                });
            }
            
            private doSuccessLogin(messError){
                var self = this;    
                if (messError.showContract) {
                    self.openContractAuthDialog();
                }
                else {
                    if(!nts.uk.util.isNullOrEmpty(messError.msgErrorId) && messError.msgErrorId == 'Msg_1517'){
                        //確認メッセージ（Msg_1517）を表示する{0}【残り何日】
                        nts.uk.ui.dialog.confirm({ messageId: messError.msgErrorId, messageParams: [messError.spanDays]})
                        .ifYes(()=>{
                            messError.changePassReason = 'Msg_1523';
                            self.OpenDialogE(messError);
                        })
                        .ifNo(()=>{
                            nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml");
                            nts.uk.characteristics.save("form1LoginInfo", { loginId: _.escape(self.loginId()) }).done(function() {
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                            });
                        });
                    }else
                    //check MsgError
                    if (!nts.uk.util.isNullOrEmpty(messError.msgErrorId) || messError.showChangePass) {
                        if (messError.showChangePass) {
                            self.OpenDialogE(messError);
                        } else {
                            nts.uk.ui.dialog.alertError({ messageId: messError.msgErrorId });
                            self.password("");
                        }
                    } else {
                        if (self.isSignOn()) {
                            nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml?signon=on");
                        } else {
                            nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml");
                        }
                        //set mode login
                        character.remove("loginMode").done(function() {
//                                loginMode: true - sign on
//                                loginMode: false - normal
                            character.save("loginMode", self.isSignOn());
                        })
                        //Remove LoginInfo
                        nts.uk.characteristics.remove("form1LoginInfo").done(function() {
                            //check SaveLoginInfo
                            if (self.isSaveLoginInfo()) {
                                //Save LoginInfo
                                nts.uk.characteristics.save("form1LoginInfo", { loginId: _.escape(self.loginId()) }).done(function() {
                                    nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                });
                            } else {
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                            }
                        });
                    }
                }
            }
            
            //open dialog E 
            private OpenDialogE(messError) {
                let self = this;
                
                //set LoginId to dialog
                nts.uk.ui.windows.setShared('parentCodes', {
                    form1: true,
                    loginId: self.loginId(),
                    contractCode : self.contractCode(),
                    contractPassword: self.contractPassword()
                }, true);
                nts.uk.ui.windows.setShared("changePw", {
                    reasonUpdatePw: messError.changePassReason,
                    spanDays: messError.spanDays});
                nts.uk.ui.windows.sub.modal('/view/ccg/007/e/index.xhtml',{
                    width : 520,
                    height : 450
                }).onClosed(function(): any {
                    var changePwDone = nts.uk.ui.windows.getShared('changePwDone');
                    if (changePwDone) {
                        nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml");
                        nts.uk.characteristics.save("form1LoginInfo", { loginId: _.escape(self.loginId()) }).done(function() {
                            nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                        });
                    }    
                })
            }
            
            //open dialog F 
            OpenDialogF() {
                let self = this;
                
                //set LoginId to dialog
                nts.uk.ui.windows.setShared('parentCodes', {
                    loginId: self.loginId(),
                    contractCode : self.contractCode()
                }, true);

                nts.uk.ui.windows.sub.modal('/view/ccg/007/f/index.xhtml',{
                    width : 520,
                    height : 350
                }).onClosed(function(): any {})
            }
            
            private account(){
                service.account().done(data => {
                    alert('domain: ' + data.domain + '\n' + 'user name: ' + data.userName)
                });
            }
        }
    }
}