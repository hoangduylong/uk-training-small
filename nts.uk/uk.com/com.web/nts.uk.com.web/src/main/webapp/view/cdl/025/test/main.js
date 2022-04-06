var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cdl025;
                (function (cdl025) {
                    var test;
                    (function (test) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.currentCode = ko.observable("");
                                    self.currentCodes = ko.observableArray([]);
                                    self.listRoleType = __viewContext.enums.RoleType;
                                    self.selectRoleTypeMulti = ko.observable(0);
                                    self.selectRoleTypeSingle = ko.observable(0);
                                }
                                ScreenModel.prototype.openCDL025 = function () {
                                    var self = this;
                                    var param = {
                                        roleType: self.selectRoleTypeMulti(),
                                        multiple: true,
                                        currentCode: self.currentCodes()
                                    };
                                    nts.uk.ui.windows.setShared("paramCdl025", param);
                                    nts.uk.ui.windows.sub.modal("/view/cdl/025/index.xhtml").onClosed(function () {
                                        var data = nts.uk.ui.windows.getShared("dataCdl025");
                                        if (!nts.uk.util.isNullOrUndefined(data))
                                            self.currentCodes(data);
                                    });
                                };
                                ScreenModel.prototype.openCDL025Single = function () {
                                    var self = this;
                                    var param = {
                                        roleType: self.selectRoleTypeSingle(),
                                        multiple: false,
                                        currentCode: self.currentCode()
                                    };
                                    nts.uk.ui.windows.setShared("paramCdl025", param);
                                    nts.uk.ui.windows.sub.modal("/view/cdl/025/index.xhtml").onClosed(function () {
                                        var data = nts.uk.ui.windows.getShared("dataCdl025");
                                        if (!nts.uk.util.isNullOrUndefined(data))
                                            self.currentCode(data);
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = test.viewmodel || (test.viewmodel = {}));
                    })(test = cdl025.test || (cdl025.test = {}));
                })(cdl025 = view.cdl025 || (view.cdl025 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=main.js.map