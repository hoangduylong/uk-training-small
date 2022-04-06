var cps001;
(function (cps001) {
    var b;
    (function (b) {
        var vm;
        (function (vm) {
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var showDialog = nts.uk.ui.dialog;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.empDelete = ko.observable(new ModelDelete({ code: '', name: '', reason: '' }));
                    var self = this, empDelete = self.empDelete(), dataShare = getShared('CPS001B_PARAMS') || null;
                    if (dataShare) {
                        // Gọi service tải dữ liệu employee
                        b.service.getEmployeeInfo(dataShare.sid).done(function (data) {
                            if (data) {
                                empDelete.code(data.code); // scd
                                empDelete.reason(data.reason); // reason delete
                            }
                        });
                        // Gọi service tải dữ liệu name of person
                        b.service.getPersonInfo(dataShare.pid).done(function (data) {
                            if (data) {
                                empDelete.name(data.name);
                            }
                        });
                    }
                }
                ViewModel.prototype.pushData = function () {
                    var _this = this;
                    var self = this, empDelete = ko.toJS(self.empDelete);
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                        var self = _this, dataShare = getShared('CPS001B_PARAMS') || null;
                        if (dataShare) {
                            var command = { sId: dataShare.sid, reason: empDelete.reason };
                            block();
                            b.service.deleteEmp(command).done(function () {
                                showDialog.info({ messageId: "Msg_16" }).then(function () {
                                    setShared('CPS001B_VALUES', {
                                        status: 'deleled'
                                    });
                                    unblock();
                                    close();
                                });
                            }).fail(function (mes) {
                                unblock();
                            });
                        }
                    }).ifNo(function () {
                        unblock();
                    });
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var ModelDelete = /** @class */ (function () {
                function ModelDelete(param) {
                    this.code = ko.observable('');
                    this.name = ko.observable('');
                    this.reason = ko.observable('');
                    var self = this;
                    if (param) {
                        self.code(param.code || '');
                        self.name(param.name || '');
                        self.reason(param.reason || '');
                    }
                }
                return ModelDelete;
            }());
        })(vm = b.vm || (b.vm = {}));
    })(b = cps001.b || (cps001.b = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.b.vm.js.map