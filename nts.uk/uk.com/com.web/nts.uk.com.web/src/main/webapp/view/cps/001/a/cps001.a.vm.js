var cps001;
(function (cps001) {
    var a;
    (function (a) {
        var vm;
        (function (vm) {
            var info = nts.uk.ui.dialog.info;
            var alert = nts.uk.ui.dialog.alert;
            var text = nts.uk.resource.getText;
            var modal = nts.uk.ui.windows.sub.modal;
            var alertWarning = nts.uk.ui.dialog.caution;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var hasError = nts.uk.ui.errors.hasError;
            var lv = nts.layout.validate;
            var vc = nts.layout.validation;
            var permision = a.service.getCurrentEmpPermision;
            var DEF_AVATAR = 'images/avatar.svg', __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    var _this = this;
                    this.ccgcomponent = {
                        /** Common properties */
                        systemType: 1,
                        showEmployeeSelection: true,
                        showQuickSearchTab: true,
                        showAdvancedSearchTab: true,
                        showBaseDate: false,
                        showClosure: false,
                        showAllClosure: true,
                        showPeriod: false,
                        periodFormatYM: true,
                        /** Required parame*/
                        baseDate: moment.utc().toISOString(),
                        periodStartDate: moment.utc("1900/01/01", "YYYY/MM/DD").toISOString(),
                        periodEndDate: moment.utc("9999/12/31", "YYYY/MM/DD").toISOString(),
                        inService: true,
                        leaveOfAbsence: true,
                        closed: true,
                        retirement: false,
                        /** Quick search tab options */
                        showAllReferableEmployee: true,
                        showOnlyMe: true,
                        showSameWorkplace: true,
                        showSameWorkplaceAndChild: true,
                        /** Advanced search properties */
                        showEmployment: true,
                        showWorkplace: true,
                        showClassification: true,
                        showJobTitle: true,
                        showWorktype: false,
                        isMutipleCheck: true,
                        /** Return data */
                        returnDataFromCcg001: function (data) {
                            var self = _this, id = ko.toJS(self.employee.employeeId), emps = data.listEmployee, exits = !!_.find(emps, function (m) { return m.employeeId == id; });
                            self.employee.employees(emps);
                            if (emps.length > 0) {
                                if (!exits) {
                                    self.employee.employeeId(emps[0].employeeId);
                                }
                            }
                            else {
                                self.employee.employeeId(undefined);
                            }
                        }
                    };
                    this.employee = {
                        personId: ko.observable(''),
                        employeeId: ko.observable(''),
                        employeeIds: ko.observableArray([]),
                        employees: ko.observableArray([]),
                        hireDate: ko.observable('')
                    };
                    this.saveAble = ko.observable(false);
                    // resource id for title in category mode
                    this.titleResource = ko.observable(text("CPS001_39"));
                    this.layout = new Layout();
                    // check quyen có thể delete employee ở đăng ký thông tin cá nhân 
                    this.enaBtnManagerEmp = ko.observable(true);
                    this.enaBtnDelEmp = ko.observable(true);
                    this.licenseCheck = ko.observable("");
                    this.licenseCheckDipslay = ko.observable(true);
                    this.classWarning = ko.observable("");
                    this.isFromCPS018 = ko.observable(false);
                    this.change = function (evt) {
                        var self = _this;
                        self.layout.mode(evt.tab);
                        if (evt.tab == TABS.LAYOUT) {
                            if (evt.id != self.layout.id()) {
                                self.layout.id(evt.id);
                            }
                            else {
                                self.layout.id.valueHasMutated();
                            }
                        }
                        else {
                            self.layout.id(undefined);
                            var query = {
                                infoId: evt.iid,
                                categoryId: evt.id,
                                categoryCode: evt.ccode,
                                standardDate: undefined,
                                personId: ko.toJS(self.employee.personId),
                                employeeId: ko.toJS(self.employee.employeeId)
                            };
                            if (!query.employeeId) {
                                self.layout.listItemCls.removeAll();
                                return;
                            }
                            if (evt.ctype) {
                                switch (evt.ctype) {
                                    case IT_CAT_TYPE.SINGLE:
                                        self.titleResource(text('CPS001_38'));
                                        break;
                                    case IT_CAT_TYPE.MULTI:
                                        if (evt.act == 'add') {
                                            self.titleResource(text('CPS001_39'));
                                        }
                                        else {
                                            self.titleResource(text('CPS001_40'));
                                        }
                                        break;
                                    case IT_CAT_TYPE.CONTINU:
                                    case IT_CAT_TYPE.NODUPLICATE:
                                    case IT_CAT_TYPE.DUPLICATE:
                                    case IT_CAT_TYPE.CONTINUWED:
                                        if (['add', 'copy'].indexOf(evt.act) > -1) {
                                            self.titleResource(text('CPS001_41'));
                                        }
                                        else {
                                            self.titleResource(text('CPS001_42'));
                                        }
                                        break;
                                }
                            }
                            else {
                                self.titleResource('');
                            }
                            a.service.getCatData(query).done(function (data) {
                                if (data) {
                                    if (evt.act == 'copy') {
                                        var removed_1 = [], clearRecord_1 = function (m) {
                                            if (!_.isArray(m)) {
                                                m.recordId = undefined;
                                            }
                                            else {
                                                _.each(m, function (k) {
                                                    k.recordId = undefined;
                                                });
                                            }
                                        };
                                        _.each(data.classificationItems, function (c, i) {
                                            if (_.has(c, "items") && _.isArray(c.items)) {
                                                _.each(c.items, function (m) { return clearRecord_1(m); });
                                                // clear value of first set item
                                                if (!removed_1.length) {
                                                    removed_1 = _.filter(c.items, function (x) { return x.item && x.item.dataTypeValue == ITEM_SINGLE_TYPE.DATE; });
                                                    if (removed_1.length) {
                                                        _.each(c.items, function (m) { return m.value = undefined; });
                                                    }
                                                }
                                            }
                                        });
                                    }
                                    lv.removeDoubleLine(data.classificationItems);
                                    self.layout.listItemCls(data.classificationItems || []);
                                    _.defer(function () {
                                        new vc(self.layout.listItemCls());
                                        _.defer(function () {
                                            self.unblock();
                                        });
                                    });
                                }
                                else {
                                    self.layout.listItemCls.removeAll();
                                }
                            }).fail(function (mgs) {
                                self.layout.listItemCls.removeAll();
                                self.unblock();
                            });
                        }
                    };
                    var self = this, employee = self.employee, params = getShared("CPS001A_PARAMS") || { employeeId: undefined, isFromCPS018: false };
                    self.isFromCPS018(params.isFromCPS018);
                    nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);
                    employee.employeeId.subscribe(function (id) {
                        self.layout.listItemCls.removeAll();
                        self.block();
                    });
                    $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent).done(function () {
                        if (params && params.employeeId) {
                            employee.employeeIds([params.employeeId]);
                        }
                        else {
                            employee.employeeIds([__viewContext.user.employeeId]);
                        }
                    });
                    setInterval(function () {
                        var id = ko.toJS(self.employee.employeeId), aut = _(self.layout.listItemCls())
                            .map(function (m) { return m.items || undefined; })
                            .filter(function (x) { return !!x; })
                            .flatten() // flat set item
                            .flatten() // flat list item
                            .map(function (m) { return !ko.toJS(m.readonly); })
                            .filter(function (x) { return !!x; })
                            .value();
                        self.saveAble(!!aut.length && !hasError() && !!id);
                    }, 0);
                    // check quyen có thể delete employee ở đăng ký thông tin cá nhân
                    permision().done(function (data) {
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].functionNo == FunctionNo.No1_Allow_DelEmp) {
                                    if (data[i].available == false) {
                                        self.enaBtnManagerEmp(false);
                                        self.enaBtnDelEmp(false);
                                    }
                                }
                            }
                        }
                    });
                    self.checkLicenseStart();
                }
                ViewModel.prototype.reload = function (ids) {
                    var self = this, employee = self.employee, employees = ko.toJS(employee.employees), oids = ko.toJS(employee.employeeIds), nids = _.map(employees, function (m) { return m.employeeId; }), vids = _.clone(nids);
                    if (ids) {
                        employee.employeeIds(_.concat(vids, ids));
                        // select last id
                        employee.employeeId(_.last(ids));
                    }
                    else {
                        if (!_.isEqual(oids.sort(), nids.sort())) {
                            employee.employeeIds(vids);
                        }
                        else {
                            employee.employeeIds.valueHasMutated();
                        }
                    }
                    self.checkLicense();
                };
                ViewModel.prototype.block = function () {
                    var self = this;
                    if (!$('.blockUI').length) {
                        block();
                        setTimeout(function () {
                            unblock();
                        }, 30000);
                    }
                };
                ViewModel.prototype.unblock = function () {
                    setTimeout(function () {
                        unblock();
                    }, 50);
                };
                ViewModel.prototype.deleteEmployee = function () {
                    var self = this, emp = self.employee, logInId = __viewContext.user.employeeId;
                    if (emp.employeeId() == logInId) {
                        // show message if delete self
                        alert({ messageId: 'Msg_1109' });
                        return;
                    }
                    setShared('CPS001B_PARAMS', {
                        sid: emp.employeeId(),
                        pid: emp.personId()
                    });
                    modal('../b/index.xhtml').onClosed(function () {
                        if (getShared('CPS001B_VALUES')) {
                            self.reload();
                        }
                    });
                };
                ViewModel.prototype.unManagerEmployee = function () {
                    var self = this;
                    modal('../c/index.xhtml').onClosed(function () {
                        var ids = getShared('CPS001C_RESTORE');
                        if (_.size(ids)) {
                            // add list restore id
                            self.reload(ids);
                        }
                    });
                };
                ViewModel.prototype.saveData = function () {
                    var self = this, emp = self.employee, controls = self.layout.listItemCls();
                    // refresh data from layout
                    self.layout.outData.refresh();
                    var inputs = self.layout.outData(), command = {
                        personId: emp.personId(),
                        employeeId: emp.employeeId(),
                        inputs: inputs
                    };
                    // trigger change of all control in layout
                    lv.checkError(controls);
                    setTimeout(function () {
                        if (hasError()) {
                            $('#func-notifier-errors').trigger('click');
                            return;
                        }
                        // push data layout to webservice
                        self.block();
                        a.service.saveCurrentLayout(command).done(function (selecteds) {
                            info({ messageId: "Msg_15" }).then(function () {
                                self.reload();
                            });
                        }).fail(function (mes) {
                            self.unblock();
                            if (mes.messageId == "Msg_346") {
                                var lstCardNumber = _.map($('[data-code = IS00779]'), function (e) { return e.value; });
                                var index = _.findLastIndex(lstCardNumber, function (o) { return o == mes.parameterIds[0]; });
                                $($('[data-code = IS00779]')[index]).ntsError('set', { messageId: "Msg_346" });
                            }
                            else {
                                nts.uk.ui.dialog.bundledErrors(mes);
                            }
                        });
                    }, 50);
                };
                ViewModel.prototype.checkLicenseStart = function () {
                    var self = this;
                    a.service.licenseCheckStart().done(function (data) {
                        self.licenseCheck(text("CPS001_154", [data.registered, data.maxRegistered]));
                        self.licenseCheckDipslay(data.display);
                        if (data.message != '') {
                            self.classWarning('color-schedule-error');
                            alertWarning({ messageId: data.message, messageParams: [data.canBeRegistered] });
                        }
                        else {
                            self.classWarning('');
                        }
                    });
                };
                ViewModel.prototype.checkLicense = function () {
                    var self = this;
                    if (self.licenseCheckDipslay()) {
                        a.service.licenseCheck().done(function (data) {
                            self.licenseCheck(text("CPS001_154", [data.registered, data.maxRegistered]));
                            if (data.status === 'NORMAL') {
                                self.classWarning('');
                            }
                            else {
                                self.classWarning('color-schedule-error');
                            }
                        });
                    }
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var Layout = /** @class */ (function () {
                function Layout() {
                    this.id = ko.observable('');
                    this.mode = ko.observable(TABS.LAYOUT);
                    this.showColor = ko.observable(false);
                    this.outData = ko.observableArray([]);
                    this.listItemCls = ko.observableArray([]);
                    // standardDate of layout
                    this.standardDate = ko.observable(moment.utc().format("YYYY/MM/DD"));
                    var self = this;
                    self.id.subscribe(function (id) {
                        if (id) {
                            self.showColor(true);
                            var sdate = self.standardDate(), ddate = sdate && moment.utc(sdate, "YYYY/MM/DD").toDate() || moment.utc().toDate(), query = {
                                layoutId: id,
                                browsingEmpId: ko.toJS(__viewContext.viewModel.employee.employeeId),
                                standardDate: !_.isNaN(ddate.getTime()) ? ddate : moment.utc().toDate()
                            };
                            if (!query.browsingEmpId) {
                                self.listItemCls.removeAll();
                                return;
                            }
                            a.service.getCurrentLayout(query).done(function (data) {
                                if (data) {
                                    self.showColor(true);
                                    self.standardDate(data.standardDate || undefined);
                                    lv.removeDoubleLine(data.classificationItems);
                                    self.listItemCls(data.classificationItems || []);
                                    _.defer(function () {
                                        new vc(self.listItemCls());
                                        _.defer(function () {
                                            __viewContext.viewModel.unblock();
                                        });
                                    });
                                }
                                else {
                                    self.listItemCls.removeAll();
                                }
                            }).fail(function (mgs) {
                                self.showColor(true);
                                self.listItemCls.removeAll();
                                __viewContext.viewModel.unblock();
                            });
                        }
                        else {
                            self.showColor(false);
                            self.listItemCls.removeAll();
                            self.standardDate(moment.utc().format("YYYY/MM/DD"));
                        }
                    });
                }
                Layout.prototype.clearData = function () {
                    var self = this;
                    _.each(self.listItemCls(), function (x) {
                        _.each((x.items()), function (def, i) {
                            if (_.isArray(def)) {
                                _.each(def, function (m) {
                                    m.value(undefined);
                                });
                            }
                            else {
                                def.value(undefined);
                            }
                        });
                    });
                };
                return Layout;
            }());
            var TABS;
            (function (TABS) {
                TABS[TABS["LAYOUT"] = "layout"] = "LAYOUT";
                TABS[TABS["CATEGORY"] = "category"] = "CATEGORY";
            })(TABS = vm.TABS || (vm.TABS = {}));
            // define ITEM_CATEGORY_TYPE
            var IT_CAT_TYPE;
            (function (IT_CAT_TYPE) {
                IT_CAT_TYPE[IT_CAT_TYPE["SINGLE"] = 1] = "SINGLE";
                IT_CAT_TYPE[IT_CAT_TYPE["MULTI"] = 2] = "MULTI";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINU"] = 3] = "CONTINU";
                IT_CAT_TYPE[IT_CAT_TYPE["NODUPLICATE"] = 4] = "NODUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["DUPLICATE"] = 5] = "DUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINUWED"] = 6] = "CONTINUWED"; // Continuos history with end date
            })(IT_CAT_TYPE = vm.IT_CAT_TYPE || (vm.IT_CAT_TYPE = {}));
            var ITEM_SINGLE_TYPE;
            (function (ITEM_SINGLE_TYPE) {
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["STRING"] = 1] = "STRING";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMERIC"] = 2] = "NUMERIC";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["DATE"] = 3] = "DATE";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIME"] = 4] = "TIME";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIMEPOINT"] = 5] = "TIMEPOINT";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SELECTION"] = 6] = "SELECTION";
            })(ITEM_SINGLE_TYPE = vm.ITEM_SINGLE_TYPE || (vm.ITEM_SINGLE_TYPE = {}));
            var FunctionNo;
            (function (FunctionNo) {
                FunctionNo[FunctionNo["No1_Allow_DelEmp"] = 1] = "No1_Allow_DelEmp";
                FunctionNo[FunctionNo["No2_Allow_UploadAva"] = 2] = "No2_Allow_UploadAva";
                FunctionNo[FunctionNo["No3_Allow_RefAva"] = 3] = "No3_Allow_RefAva";
                FunctionNo[FunctionNo["No4_Allow_UploadMap"] = 4] = "No4_Allow_UploadMap";
                FunctionNo[FunctionNo["No5_Allow_RefMap"] = 5] = "No5_Allow_RefMap";
                FunctionNo[FunctionNo["No6_Allow_UploadDoc"] = 6] = "No6_Allow_UploadDoc";
                FunctionNo[FunctionNo["No7_Allow_RefDoc"] = 7] = "No7_Allow_RefDoc";
                FunctionNo[FunctionNo["No8_Allow_Print"] = 8] = "No8_Allow_Print";
                FunctionNo[FunctionNo["No9_Allow_SetCoppy"] = 9] = "No9_Allow_SetCoppy";
                FunctionNo[FunctionNo["No10_Allow_SetInit"] = 10] = "No10_Allow_SetInit";
                FunctionNo[FunctionNo["No11_Allow_SwitchWpl"] = 11] = "No11_Allow_SwitchWpl"; // Lọc chọn lựa phòng ban trực thuộc/workplace trực tiếp theo bộ phận liên kết cấp dưới tại đăng ký thông tin cá nhân
            })(FunctionNo || (FunctionNo = {}));
        })(vm = a.vm || (a.vm = {}));
    })(a = cps001.a || (cps001.a = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.a.vm.js.map