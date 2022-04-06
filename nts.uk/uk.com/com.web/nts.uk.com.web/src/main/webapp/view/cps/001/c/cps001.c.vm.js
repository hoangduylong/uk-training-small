var cps001;
(function (cps001) {
    var c;
    (function (c) {
        var vm;
        (function (vm) {
            var showDialog = nts.uk.ui.dialog;
            var confirm = nts.uk.ui.dialog.confirm;
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var alertError = nts.uk.ui.dialog.alertError;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.listEmployee = ko.observableArray([]);
                    this.currentEmployee = ko.observable(new Employee());
                    this.enaBtnRes = ko.observable(true);
                    this.enaBtnDel = ko.observable(true);
                    this.listEmpRestored = ko.observableArray([]);
                    var self = this, emps = self.listEmployee(), emp = self.currentEmployee();
                    emp.id.subscribe(function (x) {
                        var listEmp = $("#list_employees").igGrid("option", 'dataSource');
                        console.log("LIST DATASOURCE " + listEmp.length);
                        if (listEmp.length == 0) {
                            self.newMode();
                            nts.uk.ui.errors.clearAll();
                            return;
                        }
                        var obj = _.filter(listEmp, function (o) { return o.id == x; });
                        if (obj.length > 0) {
                            self.enableControl();
                            nts.uk.ui.errors.clearAll();
                            nts.uk.ui.errors.clearAll();
                            var iem_1 = _.find(self.listEmployee(), function (e) { return e.id == x; });
                            block();
                            c.service.getDetail(x).done(function (data) {
                                if (data) {
                                    if (iem_1) {
                                        emp.id(iem_1.id);
                                    }
                                    emp.code(data.code);
                                    emp.name(data.name);
                                    if (data.reason) {
                                        emp.reason(data.reason || '');
                                    }
                                    if (data.dateDelete) {
                                        emp.dateDelete(data.dateDelete || undefined);
                                    }
                                    $('#code').focus();
                                    unblock();
                                    nts.uk.ui.errors.clearAll();
                                }
                                else {
                                    unblock();
                                    nts.uk.ui.errors.clearAll();
                                }
                            });
                        }
                        else {
                            self.newMode();
                            nts.uk.ui.errors.clearAll();
                        }
                    });
                    self.start();
                }
                ViewModel.prototype.start = function (sid) {
                    var self = this, dfd = $.Deferred(), emps = self.listEmployee, emp = self.currentEmployee();
                    block();
                    c.service.getData().done(function (data) {
                        unblock();
                        if (data && data.length) {
                            emps(data);
                            $('#code').focus();
                            if (!sid) {
                                emp.id(data[0].id);
                            }
                            else {
                                var _item = _.find(ko.toJS(self.listEmployee), function (item) { return item.id == sid; });
                                if (_item) {
                                    emp.id(_item.id);
                                }
                                else {
                                    emp.id(data[0].id);
                                }
                            }
                        }
                        else {
                            // list null
                            self.newMode();
                        }
                        dfd.resolve();
                    }).fail(function () {
                        //emps.removeAll();
                        unblock();
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.reStoreData = function () {
                    var self = this, emp = ko.toJS(self.currentEmployee), listItem = ko.toJS(self.listEmployee);
                    $("#A_INP_CODE").trigger("validate");
                    $("#A_INP_NAME").trigger("validate");
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    confirm({ messageId: "Msg_528" }, { buttonStyles: { yes: "proceed" } }).ifYes(function () {
                        var itemListLength = self.listEmployee().length, indexItemDelete = _.findIndex(ko.toJS(self.listEmployee), function (item) { return item.id == emp.id; }), objToRestore = {
                            id: emp.id,
                            code: emp.code,
                            name: emp.name
                        };
                        block();
                        c.service.restoreData(objToRestore).done(function () {
                            setShared('CPS001A_PARAMS', {
                                showAll: false,
                                employeeId: emp.id
                            });
                            if (itemListLength === 1) {
                                self.start();
                            }
                            else if (itemListLength - 1 === indexItemDelete) {
                                self.start(listItem[indexItemDelete - 1].id);
                            }
                            else if (itemListLength - 1 > indexItemDelete) {
                                self.start(listItem[indexItemDelete + 1].id);
                            }
                            self.listEmpRestored.push(emp.id);
                            unblock();
                        }).fail(function (error) {
                            if (error.messageId == 'Msg_345') {
                                alertError({ messageId: "Msg_345" })
                                    .then(function () {
                                    $('#code').focus();
                                });
                            }
                            else {
                                alertError({ messageId: error.messageId }).then(function () {
                                });
                            }
                            unblock();
                        });
                    }).ifNo(function () {
                        unblock();
                    });
                };
                ViewModel.prototype.deleteData = function () {
                    var self = this, emp = ko.toJS(self.currentEmployee()), listItem = ko.toJS(self.listEmployee());
                    $("#A_INP_CODE").trigger("validate");
                    $("#A_INP_NAME").trigger("validate");
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    confirm({ messageId: "Msg_1449" }).ifYes(function () {
                        var sid = emp.id;
                        block();
                        c.service.removedata(sid).done(function () {
                            showDialog.info({ messageId: "Msg_464" }).then(function () {
                                var itemListLength = self.listEmployee().length, indexItemDelete = _.findIndex(ko.toJS(self.listEmployee), function (item) { return item.id == emp.id; });
                                if (itemListLength === 1) {
                                    self.start();
                                }
                                else if (itemListLength - 1 === indexItemDelete) {
                                    self.start(listItem[indexItemDelete - 1].id);
                                }
                                else if (itemListLength - 1 > indexItemDelete) {
                                    self.start(listItem[indexItemDelete + 1].id);
                                }
                                nts.uk.ui.block.clear();
                                unblock();
                            });
                        }).fail(function (mes) {
                            unblock();
                        });
                    }).ifNo(function () {
                        unblock();
                    });
                };
                ViewModel.prototype.closeUp = function () {
                    var self = this;
                    setShared('CPS001C_RESTORE', self.listEmpRestored());
                    close();
                };
                ViewModel.prototype.newMode = function () {
                    var self = this, emps = self.listEmployee(), emp = self.currentEmployee();
                    emp.enableCode(false);
                    emp.enableName(false);
                    emp.code('');
                    emp.name('');
                    emp.reason('');
                    emp.dateDelete('');
                    self.enaBtnRes(false);
                    self.enaBtnDel(false);
                };
                ViewModel.prototype.enableControl = function () {
                    var self = this, emps = self.listEmployee(), emp = self.currentEmployee();
                    emp.enableCode(true);
                    emp.enableName(true);
                    self.enaBtnRes(true);
                    self.enaBtnDel(true);
                    nts.uk.ui.errors.clearAll();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var Employee = /** @class */ (function () {
                function Employee(param) {
                    this.id = ko.observable('');
                    this.code = ko.observable('');
                    this.name = ko.observable('');
                    this.enableCode = ko.observable(true);
                    this.enableName = ko.observable(true);
                    this.reason = ko.observable('');
                    this.dateDelete = ko.observable('');
                    var self = this;
                    if (param) {
                        self.id(param.id || '');
                        self.code(param.code || '');
                        self.name(param.name || '');
                    }
                }
                return Employee;
            }());
        })(vm = c.vm || (c.vm = {}));
    })(c = cps001.c || (cps001.c = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.c.vm.js.map