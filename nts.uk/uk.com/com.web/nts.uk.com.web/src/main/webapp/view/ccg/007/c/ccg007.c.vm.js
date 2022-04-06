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
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var character = nts.uk.characteristics;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.isSignOn = ko.observable(false);
                                    this.displayLogin = ko.observable(false);
                                    var self = this;
                                    self.companyCode = ko.observable('');
                                    self.companyName = ko.observable('');
                                    self.employeeCode = ko.observable('');
                                    self.password = ko.observable('');
                                    self.isSaveLoginInfo = ko.observable(true);
                                    self.contractCode = ko.observable('');
                                    self.contractPassword = ko.observable('');
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    //get url
                                    var url = _.toLower(_.trim(_.trim($(location).attr('href')), '%20'));
                                    var isSignOn = url.indexOf('signon=on') >= 0 || url.indexOf('signon=oN') >= 0 || url.indexOf('signon=On') >= 0
                                        || url.indexOf('signon=ON') >= 0;
                                    self.isSignOn(isSignOn);
                                    if (!isSignOn) {
                                        self.displayLogin(true);
                                    }
                                    var defaultContractCode = "000000000000";
                                    blockUI.invisible();
                                    //get system config
                                    //get local contract info
                                    nts.uk.characteristics.restore("contractInfo").done(function (data) {
                                        //Set ContractInfo
                                        self.contractCode(data ? data.contractCode : "");
                                        self.contractPassword(data ? data.contractPassword : "");
                                        //Check Contract
                                        c.service.checkContract({ contractCode: data ? data.contractCode : "", contractPassword: data ? data.contractPassword : "" })
                                            .done(function (showContractData) {
                                            if (showContractData.onpre) {
                                                nts.uk.characteristics.remove("contractInfo");
                                                nts.uk.characteristics.save("contractInfo", { contractCode: defaultContractCode, contractPassword: self.contractPassword() });
                                                self.contractCode(defaultContractCode);
                                                self.contractPassword(null);
                                                self.getEmployeeLoginSetting(defaultContractCode);
                                            }
                                            else {
                                                //if show contract
                                                if (showContractData.showContract && !showContractData.onpre) {
                                                    self.openContractAuthDialog();
                                                }
                                                else {
                                                    //get employ login setting and check permit view form
                                                    self.getEmployeeLoginSetting(data ? data.contractCode : null);
                                                }
                                            }
                                            //clear blockUI
                                            blockUI.clear();
                                            dfd.resolve();
                                        }).fail(function () {
                                            //clear blockUI
                                            dfd.resolve();
                                            blockUI.clear();
                                        });
                                    }).fail(function () {
                                        //clear blockUI
                                        dfd.resolve();
                                        blockUI.clear();
                                    });
                                    c.service.ver().done(function (data) {
                                        $("#ver").html(data.ver);
                                    });
                                    return dfd.promise();
                                };
                                //get employ login setting and check permit view form 
                                ScreenModel.prototype.getEmployeeLoginSetting = function (contractCode) {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var url = _.toLower(_.trim(_.trim($(location).attr('href')), '%20'));
                                    var isSignOn = url.indexOf('signon=on') >= 0;
                                    c.service.getEmployeeLoginSetting(contractCode).done(function (data) {
                                        if (data.gotoForm1) {
                                            nts.uk.request.jump("/view/ccg/007/b/index.xhtml");
                                        }
                                        else {
                                            //シングルサインオン（Active DirectorySSO）かをチェックする
                                            if (isSignOn) {
                                                self.submitLogin(isSignOn);
                                            }
                                            else {
                                                //get login infor from local storeage 
                                                nts.uk.characteristics.restore("form2LoginInfo").done(function (loginInfo) {
                                                    if (loginInfo) {
                                                        self.companyCode(loginInfo.companyCode);
                                                        self.employeeCode(loginInfo.employeeCode);
                                                    }
                                                    dfd.resolve();
                                                });
                                            }
                                        }
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
                                        else {
                                            if (isSubmit) {
                                                self.getEmployeeLoginSetting(self.contractCode());
                                            }
                                        }
                                    });
                                };
                                //submit login
                                ScreenModel.prototype.submitLogin = function (isSignOn) {
                                    var self = this;
                                    var submitData = {};
                                    submitData.companyCode = _.escape(self.companyCode());
                                    submitData.employeeCode = _.escape(self.employeeCode());
                                    submitData.password = _.escape(self.password());
                                    submitData.contractCode = _.escape(self.contractCode());
                                    submitData.contractPassword = _.escape(self.contractPassword());
                                    blockUI.invisible();
                                    c.service.submitLogin(submitData).done(function (messError) {
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
                                        if (self.isSignOn()) { //SIGNON
                                            blockUI.clear();
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
                                            else {
                                                nts.uk.request.jump("/view/ccg/007/sso/adsso.xhtml", { 'errAcc': false, 'errMsg': res.message });
                                            }
                                        }
                                        else { //NORMAL
                                            //Return Dialog Error
                                            if (nts.uk.util.isNullOrEmpty(res.messageId)) {
                                                nts.uk.ui.dialog.alertError(res.message);
                                            }
                                            else {
                                                nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                            }
                                        }
                                        blockUI.clear();
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
                                                if (self.isSignOn()) {
                                                    nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/c/index.xhtml?signon=on");
                                                }
                                                else {
                                                    nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/c/index.xhtml");
                                                }
                                                nts.uk.characteristics.save("form2LoginInfo", { companyCode: _.escape(self.companyCode()), employeeCode: _.escape(self.employeeCode()) }).done(function () {
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
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/c/index.xhtml?signon=on");
                                            }
                                            else {
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/c/index.xhtml");
                                            }
                                            //set mode login
                                            character.remove("loginMode").done(function () {
                                                //                                loginMode: true - sign on
                                                //                                loginMode: false - normal
                                                character.save("loginMode", self.isSignOn());
                                            });
                                            //Remove LoginInfo
                                            nts.uk.characteristics.remove("form2LoginInfo").done(function () {
                                                //check SaveLoginInfo
                                                if (self.isSaveLoginInfo()) {
                                                    //Save LoginInfo
                                                    nts.uk.characteristics.save("form2LoginInfo", { companyCode: _.escape(self.companyCode()), employeeCode: _.escape(self.employeeCode()) }).done(function () {
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
                                        form1: false,
                                        employeeCode: self.employeeCode(),
                                        contractCode: self.contractCode(),
                                        companyCode: self.companyCode()
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
                                            nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/c/index.xhtml");
                                            //Save LoginInfo
                                            nts.uk.characteristics.save("form2LoginInfo", { companyCode: _.escape(self.companyCode()), employeeCode: _.escape(self.employeeCode()) }).done(function () {
                                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                            });
                                        }
                                    });
                                };
                                //open dialog G
                                ScreenModel.prototype.OpenDialogG = function () {
                                    var self = this;
                                    if (!nts.uk.util.isNullOrEmpty(self.companyCode())) {
                                        var companyId = self.contractCode() + "-" + self.companyCode();
                                        c.service.getCompanyInfo(companyId).done(function (data) {
                                            //get list company from server 
                                            self.companyName(data.companyName);
                                            //set LoginId to dialog
                                            nts.uk.ui.windows.setShared('parentCodes', {
                                                companyCode: self.companyCode(),
                                                companyName: self.companyName(),
                                                contractCode: self.contractCode(),
                                                employeeCode: self.employeeCode(),
                                                contractPassword: self.contractPassword()
                                            }, true);
                                            nts.uk.ui.windows.sub.modal('/view/ccg/007/g/index.xhtml', {
                                                width: 520,
                                                height: 350
                                            }).onClosed(function () { });
                                        });
                                    }
                                };
                                ScreenModel.prototype.account = function () {
                                    c.service.account().done(function (data) {
                                        alert('domain: ' + data.domain + '\n' + 'user name: ' + data.userName);
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var CompanyItemModel = /** @class */ (function () {
                                function CompanyItemModel() {
                                }
                                return CompanyItemModel;
                            }());
                            viewmodel.CompanyItemModel = CompanyItemModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = ccg007.c || (ccg007.c = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.c.vm.js.map