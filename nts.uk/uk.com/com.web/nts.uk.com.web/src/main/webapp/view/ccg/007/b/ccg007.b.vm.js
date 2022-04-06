var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg007;
                (function (ccg007) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var character = nts.uk.characteristics;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.isSignOn = ko.observable(false);
                                    this.displayLogin = ko.observable(false);
                                    var self = this;
                                    self.loginId = ko.observable('');
                                    self.password = ko.observable('');
                                    self.contractCode = ko.observable('');
                                    self.contractPassword = ko.observable('');
                                    self.isSaveLoginInfo = ko.observable(true);
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    //get url
                                    var url = _.toLower(_.trim(_.trim($(location).attr('href')), '%20'));
                                    var isSignOn = url.indexOf('signon=on') >= 0 || url.indexOf('signon=oN') >= 0 || url.indexOf('signon=On') >= 0
                                        || url.indexOf('signon=ON') >= 0;
                                    self.isSignOn(isSignOn);
                                    if (!isSignOn) {
                                        self.displayLogin(true);
                                    }
                                    var dfd = $.Deferred();
                                    var defaultContractCode = "000000000000";
                                    blockUI.invisible();
                                    //get system config
                                    //get local contract info
                                    nts.uk.characteristics.restore("contractInfo").done(function (data) {
                                        //Set ContractInfo
                                        self.contractCode(data ? data.contractCode : "");
                                        self.contractPassword(data ? data.contractPassword : "");
                                        //check Contract
                                        b.service.checkContract({ contractCode: data ? data.contractCode : "", contractPassword: data ? data.contractPassword : "" })
                                            .done(function (data) {
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
                                                    nts.uk.characteristics.restore("form1LoginInfo").done(function (loginInfo) {
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
                                                        nts.uk.characteristics.restore("form1LoginInfo").done(function (loginInfo) {
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
                                        }).fail(function () {
                                            //clear block
                                            dfd.resolve();
                                            blockUI.clear();
                                        });
                                    }).fail(function () {
                                        //clear block
                                        dfd.resolve();
                                        blockUI.clear();
                                    });
                                    b.service.ver().done(function (data) {
                                        $("#ver").html(data.ver);
                                    });
                                    return dfd.promise();
                                };
                                //when invalid contract 
                                ScreenModel.prototype.openContractAuthDialog = function () {
                                    var self = this;
                                    nts.uk.ui.windows.sub.modal("/view/ccg/007/a/index.xhtml", {
                                        height: 300,
                                        width: 400,
                                        title: nts.uk.resource.getText("CCG007_9"),
                                        dialogClass: 'no-close'
                                    }).onClosed(function () {
                                        var contractCode = nts.uk.ui.windows.getShared('contractCode');
                                        var contractPassword = nts.uk.ui.windows.getShared('contractPassword');
                                        var isSubmit = nts.uk.ui.windows.getShared('isSubmit');
                                        self.contractCode(contractCode);
                                        self.contractPassword(contractPassword);
                                        //get url
                                        var url = _.toLower(_.trim(_.trim($(location).attr('href')), '%20'));
                                        var isSignOn = url.indexOf('signon=on') >= 0;
                                        //Check signon
                                        if (isSubmit && isSignOn) {
                                            self.submitLogin(isSignOn);
                                        }
                                    });
                                };
                                /**
                                 * SubmitLogin
                                 */
                                ScreenModel.prototype.submitLogin = function (isSignOn) {
                                    var self = this;
                                    var submitData = {};
                                    //Set SubmitData
                                    submitData.loginId = nts.uk.text.padRight(_.escape(self.loginId()), " ", 12);
                                    submitData.password = _.escape(self.password());
                                    submitData.contractCode = _.escape(self.contractCode());
                                    submitData.contractPassword = _.escape(self.contractPassword());
                                    blockUI.invisible();
                                    b.service.submitLogin(submitData).done(function (messError) {
                                        if (!nts.uk.util.isNullOrUndefined(messError.successMsg) && !nts.uk.util.isNullOrEmpty(messError.successMsg)) {
                                            nts.uk.ui.dialog.info({ messageId: messError.successMsg }).then(function () {
                                                self.doSuccessLogin(messError);
                                            });
                                        }
                                        else {
                                            self.doSuccessLogin(messError);
                                        }
                                        blockUI.clear();
                                    }).fail(function (res) {
                                        blockUI.clear();
                                        if (self.isSignOn()) { //SIGNON
                                            if (!nts.uk.util.isNullOrEmpty(res.messageId)) {
                                                if (res.messageId == 'Msg_876') { //ActiveDirectory変換マスタが見つかりません
                                                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds }).then(function () {
                                                        nts.uk.request.jump("/view/ccg/007/sso/adsso.xhtml", { 'errAcc': true, 'errMsg': res.message });
                                                    });
                                                }
                                                else {
                                                    nts.uk.request.jump("/view/ccg/007/sso/adsso.xhtml", { 'errAcc': false, 'errMsg': res.message });
                                                }
                                            }
                                            else { //TH k co msgID
                                                nts.uk.request.jump("/view/ccg/007/sso/adsso.xhtml", { 'errAcc': false, 'errMsg': res.message });
                                            }
                                        }
                                        else { //NORMAL
                                            if (nts.uk.util.isNullOrEmpty(res.messageId)) {
                                                nts.uk.ui.dialog.alertError(res.message);
                                            }
                                            else {
                                                nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.doSuccessLogin = function (messError) {
                                    var self = this;
                                    if (messError.showContract) {
                                        self.openContractAuthDialog();
                                    }
                                    else {
                                        if (!nts.uk.util.isNullOrEmpty(messError.msgErrorId) && messError.msgErrorId == 'Msg_1517') {
                                            //確認メッセージ（Msg_1517）を表示する{0}【残り何日】
                                            nts.uk.ui.dialog.confirm({ messageId: messError.msgErrorId, messageParams: [messError.spanDays] })
                                                .ifYes(function () {
                                                messError.changePassReason = 'Msg_1523';
                                                self.OpenDialogE(messError);
                                            })
                                                .ifNo(function () {
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml");
                                                nts.uk.characteristics.save("form1LoginInfo", { loginId: _.escape(self.loginId()) }).done(function () {
                                                    nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                                });
                                            });
                                        }
                                        else 
                                        //check MsgError
                                        if (!nts.uk.util.isNullOrEmpty(messError.msgErrorId) || messError.showChangePass) {
                                            if (messError.showChangePass) {
                                                self.OpenDialogE(messError);
                                            }
                                            else {
                                                nts.uk.ui.dialog.alertError({ messageId: messError.msgErrorId });
                                                self.password("");
                                            }
                                        }
                                        else {
                                            if (self.isSignOn()) {
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml?signon=on");
                                            }
                                            else {
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml");
                                            }
                                            //set mode login
                                            character.remove("loginMode").done(function () {
                                                //                                loginMode: true - sign on
                                                //                                loginMode: false - normal
                                                character.save("loginMode", self.isSignOn());
                                            });
                                            //Remove LoginInfo
                                            nts.uk.characteristics.remove("form1LoginInfo").done(function () {
                                                //check SaveLoginInfo
                                                if (self.isSaveLoginInfo()) {
                                                    //Save LoginInfo
                                                    nts.uk.characteristics.save("form1LoginInfo", { loginId: _.escape(self.loginId()) }).done(function () {
                                                        nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                                    });
                                                }
                                                else {
                                                    nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                                }
                                            });
                                        }
                                    }
                                };
                                //open dialog E 
                                ScreenModel.prototype.OpenDialogE = function (messError) {
                                    var self = this;
                                    //set LoginId to dialog
                                    nts.uk.ui.windows.setShared('parentCodes', {
                                        form1: true,
                                        loginId: self.loginId(),
                                        contractCode: self.contractCode(),
                                        contractPassword: self.contractPassword()
                                    }, true);
                                    nts.uk.ui.windows.setShared("changePw", {
                                        reasonUpdatePw: messError.changePassReason,
                                        spanDays: messError.spanDays
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/ccg/007/e/index.xhtml', {
                                        width: 520,
                                        height: 450
                                    }).onClosed(function () {
                                        var changePwDone = nts.uk.ui.windows.getShared('changePwDone');
                                        if (changePwDone) {
                                            nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/b/index.xhtml");
                                            nts.uk.characteristics.save("form1LoginInfo", { loginId: _.escape(self.loginId()) }).done(function () {
                                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                            });
                                        }
                                    });
                                };
                                //open dialog F 
                                ScreenModel.prototype.OpenDialogF = function () {
                                    var self = this;
                                    //set LoginId to dialog
                                    nts.uk.ui.windows.setShared('parentCodes', {
                                        loginId: self.loginId(),
                                        contractCode: self.contractCode()
                                    }, true);
                                    nts.uk.ui.windows.sub.modal('/view/ccg/007/f/index.xhtml', {
                                        width: 520,
                                        height: 350
                                    }).onClosed(function () { });
                                };
                                ScreenModel.prototype.account = function () {
                                    b.service.account().done(function (data) {
                                        alert('domain: ' + data.domain + '\n' + 'user name: ' + data.userName);
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = ccg007.b || (ccg007.b = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.b.vm.js.map