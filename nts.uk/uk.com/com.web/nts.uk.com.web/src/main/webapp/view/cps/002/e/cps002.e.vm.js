var cps002;
(function (cps002) {
    var e;
    (function (e) {
        var vm;
        (function (vm) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var alertError = nts.uk.ui.dialog.alertError;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.cardNoMode = false;
                    this.txtEmployeeCode = ko.observable("");
                    this.txtCardNo = ko.observable("");
                    this.generateEmCode = ko.observable("");
                    this.displayGenerateEmCode = ko.observable("");
                    var self = this, textValue = "";
                    self.cardNoMode = getShared("empCodeMode");
                    if (self.cardNoMode) {
                        $("#cardNumber").focus();
                    }
                    else {
                        $("#employeeCode").focus();
                    }
                    if (textValue) {
                        self.generateEmCode(textValue);
                        var displayEmCode = _.map(textValue).map(function (i) {
                            return i == ' ' ? "&nbsp" : i;
                        });
                        self.displayGenerateEmCode(displayEmCode.join("").toString());
                    }
                }
                ViewModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred();
                    delete __viewContext.primitiveValueConstraints.EmployeeCode.formatOption;
                    setTimeout(dfd.resolve(), 100);
                    setTimeout(function (c) {
                        $("#employeeCode").focus();
                    }, 100);
                    return dfd.promise();
                };
                ViewModel.prototype.getCode = function () {
                    var self = this;
                    self.cardNoMode ? self.getCardNo() : self.getEmlCode();
                };
                ViewModel.prototype.getEmlCode = function () {
                    var self = this;
                    e.service.getEmlCode(self.txtEmployeeCode()).done(function (emCode) {
                        self.generateEmCode(emCode);
                        var displayEmCode = _.map(emCode).map(function (i) {
                            return i == ' ' ? "&nbsp" : i;
                        });
                        self.displayGenerateEmCode(displayEmCode.join("").toString());
                    }).fail(function () {
                        alertError({ messageId: "Msg_505" });
                    });
                };
                ViewModel.prototype.getCardNo = function () {
                    var self = this;
                    e.service.getCardNo(self.txtCardNo()).done(function (emCode) {
                        self.generateEmCode(emCode);
                    }).fail(function () {
                        alertError({ messageId: "Msg_505" });
                    });
                };
                ViewModel.prototype.returnEmCode = function () {
                    var self = this;
                    setShared("CPS002_PARAM_MODE_EMP_CODE", self.generateEmCode());
                    close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = e.vm || (e.vm = {}));
    })(e = cps002.e || (cps002.e = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.e.vm.js.map