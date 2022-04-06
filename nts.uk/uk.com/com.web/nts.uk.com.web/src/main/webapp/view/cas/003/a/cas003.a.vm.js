var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas003;
                (function (cas003) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var infor = nts.uk.ui.dialog.info;
                            var alert = nts.uk.ui.dialog.alert;
                            var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                            var blockUI = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.simpleValue = ko.observable("");
                                    self.lowestDigits = ko.observable(null);
                                    self.alphabetDigit = ko.observable(null);
                                    self.numberOfDigits = ko.observable(null);
                                    self.symbolCharacters = ko.observable(null);
                                    self.historyCount = ko.observable(null);
                                    self.validityPeriod = ko.observable(null);
                                    self.notificationPasswordChange = ko.observable(null);
                                    self.lockInterval = ko.observable(null);
                                    self.errorCount = ko.observable(null);
                                    self.lockOutMessage = ko.observable("");
                                    self.passPolicyCheck = ko.observable(true);
                                    self.violationPassCheck = ko.observable(false);
                                    self.firstTimeCheck = ko.observable(false);
                                    self.accLockCheck = ko.observable(true);
                                    self.passPolicyCheck.subscribe(function (x) {
                                        if (!x) {
                                            if ($("#txtlowestDigit").ntsError("hasError")) {
                                                $("#txtlowestDigit").ntsError("clear");
                                            }
                                            if ($("#txtAlphabetDigit").ntsError("hasError")) {
                                                $("#txtAlphabetDigit").ntsError("clear");
                                            }
                                            if ($("#txtNumberOfDigit").ntsError("hasError")) {
                                                $("#txtNumberOfDigit").ntsError("clear");
                                            }
                                            if ($("#txtSymbolCharacters").ntsError("hasError")) {
                                                $("#txtSymbolCharacters").ntsError("clear");
                                            }
                                            if ($("#txtHistoryCount").ntsError("hasError")) {
                                                $("#txtHistoryCount").ntsError("clear");
                                            }
                                            if ($("#txtValidityPeriod").ntsError("hasError")) {
                                                $("#txtValidityPeriod").ntsError("clear");
                                            }
                                            if ($("#txtPasswordChange").ntsError("hasError")) {
                                                $("#txtPasswordChange").ntsError("clear");
                                            }
                                        }
                                    });
                                    self.accLockCheck.subscribe(function (x) {
                                        if (!x) {
                                            if ($("#txtLockInterval").ntsError("hasError")) {
                                                $("#txtLockInterval").ntsError("clear");
                                            }
                                            if ($("#txtErrorCount").ntsError("hasError")) {
                                                $("#txtErrorCount").ntsError("clear");
                                            }
                                            if ($("#txtLockOutMessage").ntsError("hasError")) {
                                                $("#txtLockOutMessage").ntsError("clear");
                                            }
                                        }
                                    });
                                }
                                ScreenModel.prototype.exportExcel = function () {
                                    a.service.saveAsExcel().done(function (data) {
                                    }).fail(function (res) {
                                        nts.uk.ui.dialog.alertError(res).then(function () { nts.uk.ui.block.clear(); });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var dfdPasswordPolicy = a.service.getPasswordPolicy();
                                    var dfdAccountLock = a.service.getAccountLockPolicy();
                                    $.when(dfdPasswordPolicy, dfdAccountLock)
                                        .done(function (dfdPasswordPolicyData, dfdAccountLockData) {
                                        if (!isNullOrUndefined(dfdPasswordPolicyData)) {
                                            if (dfdPasswordPolicyData.isUse) {
                                                self.passPolicyCheck(dfdPasswordPolicyData.isUse);
                                                self.notificationPasswordChange(dfdPasswordPolicyData.notificationPasswordChange);
                                                self.firstTimeCheck(dfdPasswordPolicyData.initialPasswordChange);
                                                self.violationPassCheck(dfdPasswordPolicyData.loginCheck);
                                                self.historyCount(dfdPasswordPolicyData.historyCount);
                                                self.lowestDigits(dfdPasswordPolicyData.lowestDigits);
                                                self.validityPeriod(dfdPasswordPolicyData.validityPeriod);
                                                self.numberOfDigits(dfdPasswordPolicyData.numberOfDigits);
                                                self.symbolCharacters(dfdPasswordPolicyData.symbolCharacters);
                                                self.alphabetDigit(dfdPasswordPolicyData.alphabetDigit);
                                            }
                                            else {
                                                self.passPolicyCheck(dfdPasswordPolicyData.isUse);
                                            }
                                        }
                                        if (!isNullOrUndefined(dfdAccountLockData)) {
                                            if (dfdAccountLockData.isUse) {
                                                self.accLockCheck(dfdAccountLockData.isUse);
                                                self.errorCount(dfdAccountLockData.errorCount);
                                                self.lockInterval(dfdAccountLockData.lockInterval);
                                                self.lockOutMessage(dfdAccountLockData.lockOutMessage);
                                            }
                                            else {
                                                self.accLockCheck(dfdAccountLockData.isUse);
                                            }
                                        }
                                        dfd.resolve();
                                    }).fail(function (x1, x2) {
                                        alert(x1.message + '\n' + x2.message);
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.submitData = function () {
                                    var self = this;
                                    if (self.passPolicyCheck()) {
                                        $("#txtlowestDigit").trigger("validate");
                                        $("#txtAlphabetDigit").trigger("validate");
                                        $("#txtNumberOfDigit").trigger("validate");
                                        $("#txtSymbolCharacters").trigger("validate");
                                        $("#txtHistoryCount").trigger("validate");
                                        $("#txtValidityPeriod").trigger("validate");
                                        $("#txtPasswordChange").trigger("validate");
                                    }
                                    if (self.accLockCheck()) {
                                        $("#txtLockInterval").trigger("validate");
                                        $("#txtErrorCount").trigger("validate");
                                        $("#txtLockOutMessage").trigger("validate");
                                    }
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var accountPolicy = null;
                                    if (!self.passPolicyCheck() && self.accLockCheck()) {
                                        accountPolicy = new AccountPolicy({ errorCount: self.errorCount(), lockInterval: self.lockInterval(), lockOutMessage: self.lockOutMessage(), isAccLockUse: self.accLockCheck(), notificationPasswordChange: 0, loginCheck: false, initialPasswordChange: false, isPasswordUse: self.passPolicyCheck(), historyCount: 0, lowestDigits: 1, validityPeriod: 0, numberOfDigits: 0, symbolCharacters: 0, alphabetDigit: 0 });
                                    }
                                    else if (self.passPolicyCheck() && !self.accLockCheck()) {
                                        accountPolicy = new AccountPolicy({ errorCount: 1, lockInterval: 0, lockOutMessage: self.lockOutMessage(), isAccLockUse: self.accLockCheck(), notificationPasswordChange: self.notificationPasswordChange(), loginCheck: self.violationPassCheck(), initialPasswordChange: self.firstTimeCheck(), isPasswordUse: self.passPolicyCheck(), historyCount: self.historyCount(), lowestDigits: self.lowestDigits(), validityPeriod: self.validityPeriod(), numberOfDigits: self.numberOfDigits(), symbolCharacters: self.symbolCharacters(), alphabetDigit: self.alphabetDigit() });
                                    }
                                    else if (!self.passPolicyCheck() && !self.accLockCheck()) {
                                        accountPolicy = new AccountPolicy({ errorCount: 1, lockInterval: 0, lockOutMessage: self.lockOutMessage(), isAccLockUse: self.accLockCheck(), notificationPasswordChange: 0, loginCheck: false, initialPasswordChange: false, isPasswordUse: self.passPolicyCheck(), historyCount: 0, lowestDigits: 1, validityPeriod: 0, numberOfDigits: 0, symbolCharacters: 0, alphabetDigit: 0 });
                                    }
                                    else {
                                        accountPolicy = new AccountPolicy({ errorCount: self.errorCount(), lockInterval: self.lockInterval(), lockOutMessage: self.lockOutMessage(), isAccLockUse: self.accLockCheck(), notificationPasswordChange: self.notificationPasswordChange(), loginCheck: self.violationPassCheck(), initialPasswordChange: self.firstTimeCheck(), isPasswordUse: self.passPolicyCheck(), historyCount: self.historyCount(), lowestDigits: self.lowestDigits(), validityPeriod: self.validityPeriod(), numberOfDigits: self.numberOfDigits(), symbolCharacters: self.symbolCharacters(), alphabetDigit: self.alphabetDigit() });
                                    }
                                    blockUI.grayout();
                                    a.service.updateAccountPolicy(accountPolicy).done(function () {
                                        infor(nts.uk.resource.getMessage("Msg_15", []));
                                    }).always(function () { return blockUI.clear(); });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var AccountPolicy = /** @class */ (function () {
                                function AccountPolicy(param) {
                                    this.errorCount = param.errorCount;
                                    this.lockInterval = param.lockInterval;
                                    this.lockOutMessage = param.lockOutMessage;
                                    this.isAccLockUse = param.isAccLockUse;
                                    this.notificationPasswordChange = param.notificationPasswordChange;
                                    this.loginCheck = param.loginCheck;
                                    this.initialPasswordChange = param.initialPasswordChange;
                                    this.isPasswordUse = param.isPasswordUse;
                                    this.historyCount = param.historyCount;
                                    this.lowestDigits = param.lowestDigits;
                                    this.validityPeriod = param.validityPeriod;
                                    this.numberOfDigits = param.numberOfDigits;
                                    this.symbolCharacters = param.symbolCharacters;
                                    this.alphabetDigit = param.alphabetDigit;
                                }
                                return AccountPolicy;
                            }());
                            viewmodel.AccountPolicy = AccountPolicy;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cas003.a || (cas003.a = {}));
                })(cas003 = view.cas003 || (view.cas003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas003.a.vm.js.map