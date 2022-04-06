var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl025;
                (function (cdl025) {
                    var a;
                    (function (a) {
                        var ccg = nts.uk.com.view.ccg025.a;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    var param = nts.uk.ui.windows.getShared("paramCdl025");
                                    if (!nts.uk.util.isNullOrUndefined(param)) {
                                        self.roleType = param.roleType;
                                        self.multiple = param.multiple;
                                        self.currentCode = param.currentCode;
                                        self.roleAtr = param.roleAtr;
                                    }
                                    self.component = new ccg.component.viewmodel.ComponentModel({
                                        roleType: self.roleType,
                                        multiple: self.multiple,
                                        selectedId: self.currentCode,
                                        showEmptyItem: true,
                                        roleAtr: self.roleAtr,
                                        onDialog: true
                                    });
                                }
                                /** Start page */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.component.startPage().done(function () {
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                }; //end start page
                                /** btn decision*/
                                ScreenModel.prototype.decision = function () {
                                    var self = this;
                                    nts.uk.ui.windows.setShared("dataCdl025", self.component.currentRoleId());
                                    nts.uk.ui.windows.close();
                                };
                                /** btn cancel*/
                                ScreenModel.prototype.cancel = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }()); //end screenModel
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {})); //end viewmodel
                    })(a = cdl025.a || (cdl025.a = {}));
                })(cdl025 = view.cdl025 || (view.cdl025 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {})); //end module
//# sourceMappingURL=cdl025.a.vm.js.map