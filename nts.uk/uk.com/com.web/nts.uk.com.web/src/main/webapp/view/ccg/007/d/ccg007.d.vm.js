var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var character = nts.uk.characteristics;
                            var ScreenModel = /** @class */ (function (_super) {
                                __extends(ScreenModel, _super);
                                function ScreenModel() {
                                    var _this = _super.call(this) || this;
                                    _this.isSignOn = ko.observable(false);
                                    _this.displayLogin = ko.observable(false);
                                    var vm = _this;
                                    vm.employeeCode = ko.observable('');
                                    vm.password = ko.observable('');
                                    vm.companyList = ko.observableArray([]);
                                    vm.selectedCompanyCode = ko.observable('');
                                    vm.companyName = ko.observable('');
                                    vm.isSaveLoginInfo = ko.observable(true);
                                    vm.contractCode = ko.observable('');
                                    vm.contractPassword = ko.observable('');
                                    vm.selectedCompanyCode.subscribe(function (code) {
                                        _.each(vm.companyList(), function (item, index) {
                                            if ((item.companyCode == code)) {
                                                vm.companyName(item.companyName);
                                            }
                                        });
                                    });
                                    vm.$window.header(false);
                                    return _this;
                                }
                                ScreenModel.prototype.created = function () {
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
                                    var defaultContractCode = __viewContext.env.isOnPremise
                                        ? __viewContext.user.contractCode
                                        : "000000000000";
                                    //get system config
                                    blockUI.invisible();
                                    nts.uk.characteristics.restore("contractInfo").done(function (data) {
                                        self.contractCode(data ? data.contractCode : "");
                                        self.contractPassword(data ? data.contractPassword : "");
                                        d.service.checkContract({ contractCode: data ? data.contractCode : "", contractPassword: data ? data.contractPassword : "" })
                                            .done(function (showContractData) {
                                            //check ShowContract
                                            if (__viewContext.env.isOnPremise) {
                                                nts.uk.characteristics.remove("contractInfo");
                                                nts.uk.characteristics.save("contractInfo", { contractCode: defaultContractCode, contractPassword: self.contractPassword() });
                                                self.contractCode(defaultContractCode);
                                                self.contractPassword(null);
                                                self.getEmployeeLoginSetting(defaultContractCode);
                                            }
                                            else {
                                                if (showContractData.showContract && !showContractData.onpre) {
                                                    self.openContractAuthDialog();
                                                }
                                                else {
                                                    self.getEmployeeLoginSetting(data ? data.contractCode : null);
                                                }
                                            }
                                            dfd.resolve();
                                            blockUI.clear();
                                        }).fail(function () {
                                            dfd.resolve();
                                            blockUI.clear();
                                        });
                                    });
                                    d.service.ver().done(function (data) {
                                        $("#ver").html(data.ver);
                                    });
                                };
                                ScreenModel.prototype.mounted = function () {
                                    var vm = this;
                                    if ($('#contents-area').data('loaded')) {
                                        $('[id=contents-area]:eq(1)').remove();
                                        return;
                                    }
                                    $('#contents-area').data('loaded', true);
                                    nts.uk.characteristics.restore("form3LoginInfo").done(function (loginInfo) {
                                        if (!loginInfo || !loginInfo.companyCode) {
                                            $('#company-code-select').focus();
                                        }
                                        else {
                                            if (!loginInfo.employeeCode) {
                                                $('#employee-code-inp').focus();
                                            }
                                            else {
                                                $('#password-input').focus();
                                            }
                                        }
                                    });
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
                                            d.service.getAllCompany(self.contractCode()).done(function (data) {
                                                //get list company from server
                                                self.companyList(data);
                                                if (data.length > 0) {
                                                    self.selectedCompanyCode(self.companyList()[0].companyCode);
                                                }
                                            });
                                        }
                                    });
                                };
                                ScreenModel.prototype.getEmployeeLoginSetting = function (contractCode) {
                                    var self = this;
                                    //get check signon
                                    var url = _.toLower(_.trim(_.trim($(location).attr('href')), '%20'));
                                    var isSignOn = url.indexOf('signon=on') >= 0;
                                    d.service.getEmployeeLoginSetting(contractCode).done(function (data) {
                                        if (data.gotoForm1) {
                                            nts.uk.request.jump("/view/ccg/007/b/index.xhtml");
                                        }
                                        else {
                                            //シングルサインオン（Active DirectorySSO）かをチェックする
                                            if (isSignOn) {
                                                self.submitLogin(isSignOn);
                                            }
                                            else {
                                                d.service.getAllCompany(contractCode).done(function (data) {
                                                    //get list company from server 
                                                    self.companyList(data);
                                                    if (data.length > 0) {
                                                        self.selectedCompanyCode(self.companyList()[0].companyCode);
                                                        self.companyName(self.companyList()[0].companyName);
                                                    }
                                                    //get local storage info and set here
                                                    nts.uk.characteristics.restore("form3LoginInfo").done(function (loginInfo) {
                                                        if (loginInfo) {
                                                            self.selectedCompanyCode(loginInfo.companyCode);
                                                            self.employeeCode(loginInfo.employeeCode);
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.submitLogin = function (isSignOn) {
                                    var self = this;
                                    var submitData = {};
                                    submitData.companyCode = self.selectedCompanyCode();
                                    submitData.employeeCode = self.employeeCode();
                                    submitData.password = self.password();
                                    submitData.contractCode = self.contractCode();
                                    submitData.contractPassword = self.contractPassword();
                                    blockUI.invisible();
                                    d.service.submitLogin(submitData).done(function (messError) {
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
                                            else {
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
                                ScreenModel.prototype.SamlLogin = function () {
                                    var self = this;
                                    var samlData = {};
                                    samlData.tenantCode = self.contractCode();
                                    samlData.tenantPassword = self.contractPassword();
                                    samlData.issueUrl = location.href;
                                    samlData.requestUrl = "";
                                    blockUI.invisible();
                                    d.service.samlLogin(samlData).done(function (authenticateInfo) {
                                        if (!nts.uk.util.isNullOrUndefined(authenticateInfo.errorMessage) && !nts.uk.util.isNullOrEmpty(authenticateInfo.errorMessage)) {
                                            nts.uk.ui.dialog.info({ messageId: authenticateInfo.errorMessage });
                                        }
                                        blockUI.clear();
                                        if (authenticateInfo.useSamlSso) {
                                            // SSO運用している場合
                                            location.href = authenticateInfo.authenUrl;
                                        }
                                        else {
                                            // SSO運用していない場合
                                        }
                                    });
                                };
                                ScreenModel.prototype.doSuccessLogin = function (messError) {
                                    var self = this;
                                    self.$window.storage('notification', '');
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
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/d/index.xhtml");
                                                //Save LoginInfo
                                                nts.uk.characteristics.save("form3LoginInfo", { companyCode: self.selectedCompanyCode(), employeeCode: self.employeeCode() }).done(function () {
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
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/d/index.xhtml?signon=on");
                                            }
                                            else {
                                                nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/d/index.xhtml");
                                            }
                                            //set mode login
                                            character.remove("loginMode").done(function () {
                                                //                                loginMode: true - sign on
                                                //                                loginMode: false - normal
                                                character.save("loginMode", self.isSignOn());
                                            });
                                            //Remove LoginInfo
                                            nts.uk.characteristics.remove("form3LoginInfo").done(function () {
                                                //check SaveLoginInfo
                                                if (self.isSaveLoginInfo()) {
                                                    //Save LoginInfo
                                                    nts.uk.characteristics.save("form3LoginInfo", { companyCode: self.selectedCompanyCode(), employeeCode: self.employeeCode() })
                                                        .done(function () {
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
                                        contractCode: self.contractCode(),
                                        employeeCode: self.employeeCode(),
                                        companyCode: self.selectedCompanyCode()
                                    }, true);
                                    nts.uk.ui.windows.setShared("changePw", {
                                        reasonUpdatePw: messError.changePassReason,
                                        spanDays: messError.spanDays
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/ccg/007/e/index.xhtml', {
                                        width: 520,
                                        height: 360
                                    }).onClosed(function () {
                                        var changePwDone = nts.uk.ui.windows.getShared('changePwDone');
                                        if (changePwDone) {
                                            nts.uk.request.login.keepUsedLoginPage("/nts.uk.com.web/view/ccg/007/d/index.xhtml");
                                            //Save LoginInfo
                                            nts.uk.characteristics.save("form3LoginInfo", { companyCode: self.selectedCompanyCode(), employeeCode: self.employeeCode() }).done(function () {
                                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml", { screen: 'login' });
                                            });
                                        }
                                    });
                                };
                                //open dialog G
                                ScreenModel.prototype.OpenDialogG = function () {
                                    var vm = this;
                                    //set LoginId to dialog
                                    nts.uk.ui.windows.setShared('parentCodes', {
                                        form1: false,
                                        companyCode: vm.selectedCompanyCode(),
                                        companyName: vm.companyName(),
                                        contractCode: vm.contractCode(),
                                        employeeCode: vm.employeeCode(),
                                        isFromD: true
                                    }, true);
                                    vm.$window
                                        .modal('/view/ccg/007/g/index.xhtml', {
                                        form1: false,
                                        companyCode: vm.selectedCompanyCode(),
                                        companyName: vm.companyName(),
                                        contractCode: vm.contractCode(),
                                        employeeCode: vm.employeeCode(),
                                        isFromD: true
                                    }, {
                                        width: 500,
                                        height: 400
                                    })
                                        .then(function () { });
                                };
                                ScreenModel.prototype.account = function () {
                                    d.service.account().done(function (data) {
                                        alert('domain: ' + data.domain + '\n' + 'user name: ' + data.userName);
                                    });
                                };
                                ScreenModel = __decorate([
                                    bean()
                                ], ScreenModel);
                                return ScreenModel;
                            }(ko.ViewModel));
                            viewmodel.ScreenModel = ScreenModel;
                            var CompanyItemModel = /** @class */ (function () {
                                function CompanyItemModel() {
                                }
                                return CompanyItemModel;
                            }());
                            viewmodel.CompanyItemModel = CompanyItemModel;
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = ccg007.d || (ccg007.d = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.d.vm.js.map