var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var hr;
        (function (hr) {
            var view;
            (function (view) {
                var ccg029;
                (function (ccg029) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    //param
                                    self.input = { systemType: 3,
                                        includePreEmployee: true,
                                        includeRetirement: true,
                                        includeAbsence: true,
                                        includeClosed: true,
                                        includeTransferEmployee: true,
                                        includeAcceptanceTransferEmployee: true,
                                        getPosition: true,
                                        getEmployment: true,
                                        getPersonalFileManagement: true //個人ファイル管理を取得する
                                    };
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.seletedEmployee = function (data) {
                                    console.log(data);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = ccg029.a || (ccg029.a = {}));
                })(ccg029 = view.ccg029 || (view.ccg029 = {}));
            })(view = hr.view || (hr.view = {}));
        })(hr = uk.hr || (uk.hr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=test.ccg029.a.vm.js.map