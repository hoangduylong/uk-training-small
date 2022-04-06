var cps002;
(function (cps002) {
    var j;
    (function (j) {
        var vm;
        (function (vm) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var alertError = nts.uk.ui.dialog.alertError;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.cardNoMode = true;
                    this.txtEmployeeCode = ko.observable("");
                    this.txtCardNo = ko.observable("");
                    this.generateEmCode = ko.observable("");
                    this.displayGenerateEmCode = ko.observable("");
                    this.stampCardEditing = ko.observable({
                        method: EDIT_METHOD.PreviousZero,
                        digitsNumber: 20
                    });
                    var self = this, textValue = "";
                    self.cardNoMode = getShared("cardNoMode");
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
                    self.start();
                }
                ViewModel.prototype.start = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    j.service.getStamCardEdit().done(function (data) {
                        self.stampCardEditing(data);
                        $("#cardNumber").focus();
                        dfd.resolve(data);
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.getCardNo = function () {
                    var self = this;
                    j.service.getCardNo(self.txtCardNo()).done(function (cardNo) {
                        self.generateEmCode(cardNo);
                        var ce = ko.toJS(self.stampCardEditing);
                        var s = "";
                        if (cardNo && cardNo.length == ce.digitsNumber) {
                            switch (ce.method) {
                                case EDIT_METHOD.PreviousZero: {
                                    s = _.padStart(cardNo, ce.digitsNumber, '0');
                                    break;
                                }
                                case EDIT_METHOD.AfterZero: {
                                    s = _.padEnd(cardNo, ce.digitsNumber, '0');
                                    break;
                                }
                                case EDIT_METHOD.PreviousSpace: {
                                    s = _.padStart(cardNo, ce.digitsNumber, ' ');
                                    break;
                                }
                                case EDIT_METHOD.AfterSpace: {
                                    s = _.padEnd(cardNo, ce.digitsNumber, ' ');
                                    break;
                                }
                            }
                        }
                        var displayCardNo = _.map(s).map(function (i) {
                            return i == ' ' ? "&nbsp" : i;
                        });
                        self.displayGenerateEmCode(displayCardNo.join("").toString());
                    }).fail(function () {
                        alertError({ messageId: "Msg_505" });
                    });
                };
                ViewModel.prototype.returnEmCode = function () {
                    var self = this;
                    setShared("CPS002_PARAM_MODE_CARDNO", self.generateEmCode());
                    close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var EDIT_METHOD;
            (function (EDIT_METHOD) {
                EDIT_METHOD[EDIT_METHOD["PreviousZero"] = 1] = "PreviousZero";
                EDIT_METHOD[EDIT_METHOD["AfterZero"] = 2] = "AfterZero";
                EDIT_METHOD[EDIT_METHOD["PreviousSpace"] = 3] = "PreviousSpace";
                EDIT_METHOD[EDIT_METHOD["AfterSpace"] = 4] = "AfterSpace";
            })(EDIT_METHOD || (EDIT_METHOD = {}));
        })(vm = j.vm || (j.vm = {}));
    })(j = cps002.j || (cps002.j = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.j.vm.js.map