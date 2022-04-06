var cps002;
(function (cps002) {
    var g;
    (function (g) {
        var vm;
        (function (vm) {
            var setShared = nts.uk.ui.windows.setShared;
            var close = nts.uk.ui.windows.close;
            var getText = nts.uk.resource.getText;
            var dialog = nts.uk.ui.dialog.info;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.recentRegistrationItems = ko.observableArray([
                        { code: 1, name: getText('CPS002_89') },
                        { code: 0, name: getText('CPS002_90') }
                    ]);
                    this.employeeInitItemList = ko.observableArray([
                        { code: 1, name: getText('CPS002_78') },
                        { code: 3, name: getText('CPS002_79') },
                        { code: 2, name: getText('CPS002_80') }
                    ]);
                    this.cardNoInitItemList = ko.observableArray([
                        { code: 1, name: getText('CPS002_78') },
                        { code: 4, name: getText('CPS002_84') },
                        { code: 3, name: getText('CPS002_85') },
                        { code: 5, name: getText('CPS002_86') },
                        { code: 2, name: getText('CPS002_80') }
                    ]);
                    this.currentUserSetting = ko.observable(new UserSetting());
                    this.requiredCode = ko.observable(false);
                    this.requiredCard = ko.observable(false);
                    this.checkStart = ko.observable(false);
                    var self = this;
                    self.employeeCodeType2 = ko.observable(2);
                    self.cardNumberType2 = ko.observable(3);
                    self.employeeCodeType2.subscribe(function (data) {
                        if (data == 1) {
                            self.requiredCode(true);
                            $('#employeeCode').focus();
                        }
                        else if (self.checkStart()) {
                            self.requiredCode(false);
                            $('#employeeCode').ntsError('clear');
                        }
                    });
                    self.cardNumberType2.subscribe(function (data) {
                        if (data == 1) {
                            self.requiredCard(true);
                            $('#cardNumber').focus();
                        }
                        else if (self.checkStart()) {
                            self.requiredCard(false);
                            $('#cardNumber').ntsError('clear');
                        }
                    });
                }
                ViewModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred();
                    g.service.getUserSetting().done(function (result) {
                        if (result) {
                            self.currentUserSetting(new UserSetting(result));
                            self.employeeCodeType2(result.employeeCodeType);
                            self.cardNumberType2(result.cardNumberType);
                        }
                        self.checkStart(true);
                        dfd.resolve();
                    });
                    delete __viewContext.primitiveValueConstraints.EmployeeCode.formatOption;
                    g.service.getStamCardEdit().done(function (data) {
                        __viewContext.primitiveValueConstraints.StampNumber.maxLength = data.digitsNumber;
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.register = function () {
                    var self = this, uSet = self.currentUserSetting();
                    var command = {
                        employeeId: "-1",
                        empCodeValType: self.employeeCodeType2(),
                        cardNoValType: self.cardNumberType2(),
                        empCodeLetter: self.employeeCodeType2() != 1 ? "" : uSet.employeeCodeLetter(),
                        cardNoLetter: self.cardNumberType2() != 1 ? "" : uSet.cardNumberLetter(),
                        recentRegType: uSet.recentRegistrationType()
                    };
                    g.service.setUserSetting(command).done(function () {
                        setShared("userSettingStatus", true);
                        dialog({ messageId: "Msg_15" }).then(function () {
                            self.close();
                        });
                    })
                        .fail(function () { setShared("userSettingStatus", false); });
                };
                ViewModel.prototype.close = function () { close(); };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var UserSetting = /** @class */ (function () {
                function UserSetting(param) {
                    this.recentRegistrationType = ko.observable(1);
                    this.employeeCodeType = ko.observable(2);
                    this.employeeCodeLetter = ko.observable("");
                    this.cardNumberType = ko.observable(3);
                    this.cardNumberLetter = ko.observable("");
                    if (param) {
                        this.recentRegistrationType(param.recentRegistrationType);
                        this.employeeCodeType(param.employeeCodeType);
                        this.employeeCodeLetter(param.employeeCodeLetter);
                        this.cardNumberType(param.cardNumberType);
                        this.cardNumberLetter(param.cardNumberLetter);
                    }
                }
                return UserSetting;
            }());
        })(vm = g.vm || (g.vm = {}));
    })(g = cps002.g || (cps002.g = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.g.vm.js.map