var cps003;
(function (cps003) {
    var a;
    (function (a_1) {
        var vm;
        (function (vm) {
            var info = nts.uk.ui.dialog.info;
            var alert = nts.uk.ui.dialog.alert;
            var alertError = nts.uk.ui.dialog.alertError;
            var confirm = nts.uk.ui.dialog.confirm;
            var modal = nts.uk.ui.windows.sub.modal;
            var modeless = nts.uk.ui.windows.sub.modeless;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var hasError = nts.uk.ui.errors.hasError;
            var REPL_KEY = '__REPLACE', __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
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
                            var self = _this;
                            self.employees(data.listEmployee);
                            $.blockUI({
                                message: '<div class="block-ui-message">' + nts.uk.ui.toBeResource.plzWait + '</div>',
                                fadeIn: 200,
                                onUnblock: function () { return block(); }
                            });
                            setTimeout(function () { return self.requestData(null, true); }, 700);
                        }
                    };
                    this.gridList = {
                        inData: {
                            employees: ko.observableArray([]),
                            itemDefitions: ko.observableArray([])
                        },
                        outData: ko.observableArray([])
                    };
                    this.gridOptions = { columns: [], ntsControls: [], dataSource: [] };
                    this.dataTypes = {};
                    this.batchSettingItems = [];
                    this.lockColumns = [];
                    this.baseDate = ko.observable();
                    this.baseDateEnable = ko.observable(true);
                    this.baseDateChangeHist = [];
                    this.histType = ko.observable();
                    this.updateMode = ko.observable(1);
                    this.updateModeEnable = ko.observable(true);
                    this.perInfoCatePermission = ko.observable();
                    this.category = {
                        cate: ko.observable(),
                        catId: ko.observable(''),
                        catCode: ko.observable(''),
                        items: ko.observableArray([])
                    };
                    this.settings = {
                        matrixDisplay: ko.observable({}),
                        perInfoData: ko.observableArray([])
                    };
                    this.hiddenRows = [];
                    this.hiddenEmpIds = [];
                    // for employee info.
                    this.employees = ko.observableArray([]);
                    this.hasError = ko.observable(false);
                    this.fixedColumns = ["rowNumber", "register", "print", "showControl", "employeeCode", "employeeName",
                        "rowAdd", "deptName", "workplaceName", "positionName", "employmentName", "className"];
                    this.isCS00100 = ko.observable(false);
                    this.isFromCPS018 = ko.observable(false);
                    this.specialItems = {
                        standardDate: ["IS00279", "IS00295", "IS00302", "IS00309", "IS00316", "IS00323", "IS00330", "IS00337", "IS00344", "IS00351",
                            "IS00358", "IS00559", "IS00566", "IS00573", "IS00580", "IS00587", "IS00594", "IS00601", "IS00608", "IS00615", "IS00622"],
                        workTime: ["IS00131", "IS00140", "IS00158", "IS00167", "IS00176", "IS00149", "IS00194", "IS00203", "IS00212", "IS00221", "IS00230", "IS00239", "IS00185"],
                        holidayLimit: ["IS00287"],
                        workplace: ["IS00084", "IS00085"],
                        department: ["IS00073"]
                    };
                    var self = this;
                    var params = getShared("CPS003A_PARAMS") || { isFromCPS018: false };
                    self.isFromCPS018(params.isFromCPS018);
                    nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);
                    cps003.control.selectButton();
                    cps003.control.relateButton();
                    cps003.control.validateDateRange();
                    cps003.control.extendTimeRange();
                    //            self.baseDate(nts.uk.time.today().format("YYYY/MM/DD"));
                    //fetch all category by login 
                    a_1.service.fetch.category(__viewContext.user.employeeId)
                        .done(function (data) {
                        if (!data || data.length === 0) {
                            alertError({ messageId: "Msg_1460" }).then(function () {
                                nts.uk.request.jumpToTopPage();
                            });
                            return;
                        }
                        self.category.items(data);
                        nts.uk.request.syncAjax("com", "server/time/today/").done(function (res) {
                            self.baseDate(res);
                        });
                    });
                    self.baseDate.subscribe(function (date) {
                        if (!$("#base-date").ntsError("hasError") && self.category.catId() !== "" && !_.isNil(self.category.catId())) {
                            self.requestData();
                        }
                        if (!_.isNil(date)
                            && (date !== self.baseDateChangeHist[self.baseDateChangeHist.length - 1] || self.baseDateChangeHist.length == 0)) {
                            self.baseDateChangeHist.push(date);
                        }
                    });
                    self.category.catId.subscribe(function (cid) {
                        if (cid) {
                            var cate_1 = _.find(self.category.items(), function (c) { return c.id === self.category.catId(); });
                            if (cate_1) {
                                if (cate_1.categoryCode == 'CS00100') {
                                    self.isCS00100(true);
                                }
                                else {
                                    self.isCS00100(false);
                                }
                                self.category.cate(cate_1);
                                self.category.catCode(cate_1.categoryCode);
                                var roleId = __viewContext.user.role.personalInfo;
                                a_1.service.fetch.permission(roleId, cid).done(function (permission) {
                                    if (permission)
                                        self.perInfoCatePermission(permission);
                                });
                                // fetch all setting
                                a_1.service.fetch.setting(cid).done(function (data) {
                                    self.requestData(data).done(function () {
                                        if (cate_1.categoryType === IT_CAT_TYPE.SINGLE) {
                                            self.histType(nts.uk.resource.getText("CPS003_108"));
                                            self.updateMode(1);
                                            self.updateModeEnable(false);
                                            self.baseDateEnable(true);
                                        }
                                        else {
                                            var permission = self.perInfoCatePermission();
                                            switch (cate_1.categoryType) {
                                                case IT_CAT_TYPE.SINGLE:
                                                    break;
                                                case IT_CAT_TYPE.MULTI:
                                                    self.histType(nts.uk.resource.getText("CPS003_109"));
                                                    self.updateMode(1);
                                                    self.updateModeEnable(false);
                                                    self.baseDateEnable(true);
                                                    break;
                                                case IT_CAT_TYPE.CONTINU:
                                                case IT_CAT_TYPE.CONTINUWED:
                                                    self.histType(nts.uk.resource.getText("CPS003_110"));
                                                    if (permission && permission.otherFutureHisAuth === 1 && permission.otherPastHisAuth === 1
                                                        && permission.selfFutureHisAuth === 1 && permission.selfPastHisAuth === 1) {
                                                        self.baseDateEnable(false);
                                                    }
                                                    else {
                                                        self.baseDateEnable(true);
                                                    }
                                                    if (permission && permission.otherAllowAddHis === 0 && permission.selfAllowAddHis === 0) {
                                                        self.updateMode(1);
                                                        self.updateModeEnable(false);
                                                    }
                                                    else {
                                                        self.updateModeEnable(true);
                                                    }
                                                    break;
                                                case IT_CAT_TYPE.NODUPLICATE:
                                                    self.histType(nts.uk.resource.getText("CPS003_111"));
                                                    if (permission && permission.otherFutureHisAuth === 1 && permission.otherPastHisAuth === 1
                                                        && permission.selfFutureHisAuth === 1 && permission.selfPastHisAuth === 1) {
                                                        self.baseDateEnable(false);
                                                    }
                                                    else {
                                                        self.baseDateEnable(true);
                                                    }
                                                    if (permission && permission.otherAllowAddHis === 0 && permission.selfAllowAddHis === 0) {
                                                        self.updateMode(1);
                                                        self.updateModeEnable(false);
                                                    }
                                                    else {
                                                        self.updateModeEnable(true);
                                                    }
                                                    break;
                                                case IT_CAT_TYPE.DUPLICATE:
                                                    self.histType(nts.uk.resource.getText("CPS003_112"));
                                                    if (permission && permission.otherFutureHisAuth === 1 && permission.otherPastHisAuth === 1
                                                        && permission.selfFutureHisAuth === 1 && permission.selfPastHisAuth === 1) {
                                                        self.baseDateEnable(false);
                                                    }
                                                    else {
                                                        self.baseDateEnable(true);
                                                    }
                                                    if (permission && permission.otherAllowAddHis === 0 && permission.selfAllowAddHis === 0) {
                                                        self.updateMode(1);
                                                        self.updateModeEnable(false);
                                                    }
                                                    else {
                                                        self.updateModeEnable(true);
                                                    }
                                                    break;
                                            }
                                            if (self.category.cate().categoryCode === "CS00003"
                                                || self.category.cate().categoryCode === "CS00070") {
                                                self.updateModeEnable(false);
                                            }
                                        }
                                    });
                                    if (ko.isObservable(self.settings.matrixDisplay)) {
                                        if (_.size(self.settings.matrixDisplay()) == 0) {
                                            self.settings.matrixDisplay(data.matrixDisplay);
                                        }
                                    }
                                    if (ko.isObservable(self.settings.perInfoData)) {
                                        self.settings.perInfoData(data.perInfoData);
                                    }
                                });
                            }
                        }
                    });
                    setTimeout(function () {
                        $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent).done(function () { });
                    }, 1);
                    self.baseDateEnable.subscribe(function (enable) {
                        nts.uk.request.syncAjax("com", "server/time/today/").done(function (res) {
                            self.baseDate(res);
                        });
                    });
                    self.settings.matrixDisplay.subscribe(function (matrix) {
                        var $grid = $("#grid");
                        if (!$grid.data("mGrid"))
                            return;
                        $grid.mGrid("directEnter", matrix && matrix.cursorDirection == CURSOR_DIRC.VERTICAL ? "below" : "right");
                        $grid.mGrid(!matrix || matrix.clsATR === IUSE_SETTING.NOT_USE ? "hideColumn" : "showColumn", "className");
                        $grid.mGrid(!matrix || matrix.jobATR === IUSE_SETTING.NOT_USE ? "hideColumn" : "showColumn", "positionName");
                        $grid.mGrid(!matrix || matrix.workPlaceATR === IUSE_SETTING.NOT_USE ? "hideColumn" : "showColumn", "workplaceName");
                        $grid.mGrid(!matrix || matrix.departmentATR === IUSE_SETTING.NOT_USE ? "hideColumn" : "showColumn", "deptName");
                        $grid.mGrid(!matrix || matrix.employmentATR === IUSE_SETTING.NOT_USE ? "hideColumn" : "showColumn", "employmentName");
                    });
                    self.updateMode.subscribe(function (mode) {
                        var $grid = $("#grid");
                        if (!$grid.data("mGrid"))
                            return;
                        if (mode === 1) {
                            if (self.category.cate().categoryType === IT_CAT_TYPE.DUPLICATE
                                || self.category.cate().categoryType === IT_CAT_TYPE.SINGLE
                                || self.category.cate().categoryType === IT_CAT_TYPE.CONTINUWED
                                || self.category.cate().categoryType === IT_CAT_TYPE.CONTINU
                                || self.category.cate().categoryType === IT_CAT_TYPE.NODUPLICATE
                                || (self.category.cate().categoryType === IT_CAT_TYPE.MULTI
                                    && self.perInfoCatePermission().otherAllowAddMulti === 0
                                    && self.perInfoCatePermission().selfAllowAddMulti === 0)) {
                                $grid.mGrid("hideColumn", "rowAdd");
                            }
                            else {
                                $grid.mGrid("showColumn", "rowAdd");
                            }
                            var insertions = $grid.mGrid("insertions");
                            if (insertions.length > 0) {
                                confirm({ messageId: "Msg_1468" }).ifYes(function () {
                                    $grid.mGrid("removeInsertions");
                                }).ifCancel(function () {
                                    self.updateMode(2);
                                });
                            }
                        }
                        else {
                            if (self.category.cate().categoryType === IT_CAT_TYPE.DUPLICATE
                                || (self.category.cate().categoryType === IT_CAT_TYPE.MULTI
                                    && (self.perInfoCatePermission().otherAllowAddMulti === 1
                                        || self.perInfoCatePermission().selfAllowAddMulti === 1))) {
                                $grid.mGrid("showColumn", "rowAdd");
                            }
                            else {
                                $grid.mGrid("hideColumn", "rowAdd");
                            }
                        }
                    });
                }
                ViewModel.prototype.start = function () {
                    var self = this;
                };
                ViewModel.prototype.saveData = function () {
                    var self = this, command;
                    // trigger change of all control in layout
                    _.each(__viewContext.primitiveValueConstraints, function (x) {
                        if (_.has(x, "itemCode")) {
                            $('#' + x.itemCode).trigger('change');
                        }
                    });
                    if (hasError()) {
                        $('#func-notifier-errors').trigger('click');
                        return;
                    }
                    // push data to webservice
                    block();
                    a_1.service.push.data(command).done(function () {
                        info({ messageId: "Msg_15" }).then(function () {
                            unblock();
                            self.start();
                        });
                    }).fail(function (mes) {
                        unblock();
                        alert(mes.message);
                    });
                };
                ViewModel.prototype.register = function () {
                    var self = this, $grid = $("#grid"), command, employees = [], recId = {};
                    if (hasError()) {
                        $("#func-notifier-errors").trigger("click");
                        return;
                    }
                    if (_.chain($grid.mGrid("updatedCells")).filter(function (item) { return item.columnKey === "register"; }).value().length === 0)
                        return;
                    confirm({ messageId: self.updateMode() === 1 ? "Msg_749" : "Msg_748" }).ifYes(function () {
                        $grid.mGrid("validate", false, function (data) { return data.register; });
                        var errObj = {}, dataToG, dataSource = $grid.mGrid("dataSource"), regCount = 0, itemErrors = _.filter($grid.mGrid("errors"), function (e) {
                            var d = dataSource[e.index];
                            return d && d.register;
                        });
                        if (itemErrors && itemErrors.length > 0) {
                            dataToG = _.map(itemErrors, function (err) {
                                if (_.has(errObj, err.rowId)) {
                                    errObj[err.rowId].push(err.columnKey);
                                }
                                else {
                                    errObj[err.rowId] = [err.columnKey];
                                }
                                return { rowId: err.rowId, employeeId: err.employeeId, empCd: err.employeeCode, empName: err.employeeName, no: err.rowNumber,
                                    isDisplayRegister: true, errorType: 0, itemName: err.columnName, message: err.message };
                            });
                        }
                        block();
                        _.forEach($grid.mGrid("dataSource"), function (d) {
                            recId[d.id] = d;
                            if (d.register)
                                regCount++;
                        });
                        var cateName, cateType, regId = {};
                        if (self.category.cate()) {
                            cateName = self.category.cate().categoryName;
                            cateType = self.category.cate().categoryType;
                        }
                        var updates = $grid.mGrid("updatedCells"), updateDone = [];
                        if (self.updateMode() === 2) {
                            var dataSource_1 = $grid.mGrid("dataSource");
                            _.forEach($grid.mGrid("insertions"), function (i) {
                                _.forEach(self.settings.perInfoData(), function (pInfo) {
                                    var rec = dataSource_1[i];
                                    if (pInfo.regulationAtr && rec) {
                                        updates.push({ rowId: rec.id, columnKey: pInfo.itemCD, value: rec[pInfo.itemCD] });
                                    }
                                });
                            });
                        }
                        var regChecked = [];
                        _.forEach(updates, function (item) {
                            if (item.columnKey === "register") {
                                if (item.value && _.isNil(find(self.hiddenRows, function (id) { return id === item.rowId; }))) {
                                    regChecked.push(item.rowId);
                                    // Add employee without items
                                    if (errObj[item.rowId])
                                        return;
                                    var recData_1 = recId[item.rowId];
                                    var regEmp_1 = regId[recData_1.id];
                                    if (!regEmp_1) {
                                        regEmp_1 = { rowId: item.rowId, personId: recData_1.personId, employeeId: recData_1.employeeId, employeeCd: recData_1.employeeCode, employeeName: recData_1.employeeName, order: recData_1.rowNumber };
                                        regEmp_1.input = { categoryId: self.category.catId(), categoryCd: self.category.catCode(), categoryName: cateName, categoryType: cateType, recordId: recData_1 instanceof Record ? recData_1.id : null, delete: false, items: [] };
                                        regId[recData_1.id] = regEmp_1;
                                        employees.push(regEmp_1);
                                    }
                                }
                                return;
                            }
                            if (errObj[item.rowId])
                                return;
                            var recData = recId[item.rowId];
                            var regEmp = regId[recData.id];
                            updateDone.push(item);
                            if (!regEmp) {
                                regEmp = { rowId: item.rowId, personId: recData.personId, employeeId: recData.employeeId, employeeCd: recData.employeeCode, employeeName: recData.employeeName, order: recData.rowNumber };
                                regEmp.input = { categoryId: self.category.catId(), categoryCd: self.category.catCode(), categoryName: cateName, categoryType: cateType, recordId: recData instanceof Record ? recData.id : null, delete: false, items: [] };
                                regId[recData.id] = regEmp;
                                employees.push(regEmp);
                            }
                            var col = _.find(self.gridOptions.columns, function (column) { return column.key === item.columnKey; });
                            if (col && col.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.READONLY && col.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.READONLY_BUTTON && col.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.RELATE_CATEGORY) {
                                var val = item.value;
                                var text_1, defValue = void 0, defText = void 0, initData = _.find(self.initDs, function (initRec) { return initRec.id === item.rowId; });
                                if (initData) {
                                    text_1 = self.getText(col.perInfoTypeState, val, item.rowId, col.key, $grid);
                                    defValue = initData[col.key];
                                    defText = self.getText(col.perInfoTypeState, defValue, item.rowId, col.key, $grid);
                                }
                                regEmp.input.items.push({ definitionId: col.itemId, itemCode: col.key, itemName: col.itemName, value: _.isObject(text_1) ? text_1.value : val, text: _.isObject(text_1) ? text_1.text : text_1, defValue: _.isObject(defText) ? defText.value : defValue, defText: _.isObject(defText) ? defText.text : defText, type: self.convertType(col.perInfoTypeState, val), logType: col.perInfoTypeState.dataTypeValue });
                            }
                        });
                        //                if (employees.length === 0) {
                        //                    unblock();
                        //                    return;
                        //                }
                        self.validateSpecial(regChecked, dataSource);
                        itemErrors = _.filter($grid.mGrid("errors"), function (e) {
                            var d = dataSource[e.index];
                            return d && d.register;
                        });
                        errObj = {};
                        if (itemErrors && itemErrors.length > 0) {
                            dataToG = _.map(itemErrors, function (err) {
                                if (_.has(errObj, err.rowId)) {
                                    errObj[err.rowId].push(err.columnKey);
                                }
                                else {
                                    errObj[err.rowId] = [err.columnKey];
                                }
                                return { rowId: err.rowId, employeeId: err.employeeId, empCd: err.employeeCode, empName: err.employeeName, no: err.rowNumber,
                                    isDisplayRegister: true, errorType: 0, itemName: err.columnName, message: err.message };
                            });
                        }
                        employees = _.filter(employees, function (e) {
                            return _.find(regChecked, function (r) { return r === e.rowId; }) && !_.find(itemErrors, function (ie) { return ie.rowId === e.rowId; })
                                && ((e.input || {}).items || []).length > 0;
                        });
                        dataToG = _.filter(dataToG, function (d) {
                            return _.find(regChecked, function (r) { return r === d.rowId; });
                        });
                        if (dataToG && dataToG.length > 0) {
                            self.hasError(true);
                        }
                        command = { baseDate: moment.utc(self.baseDate(), "YYYY/MM/DD").toISOString(), editMode: self.updateMode(), employees: employees };
                        if (command.employees && command.employees.length == 0) {
                            if (dataToG && dataToG.length > 0) {
                                setShared("CPS003G_ERROR_LIST", dataToG);
                                var msgId = _.keys(errObj).length === regCount ? "Msg_1462" : "Msg_1461";
                                alertError({ messageId: msgId }).then(function () {
                                    forEach(updateDone, function (d) {
                                        if (!_.has(errObj, d.rowId)) {
                                            $grid.mGrid("updateCell", d.rowId, d.columnKey, d.value, true);
                                            $grid.mGrid("updateCell", d.rowId, "register", false, true);
                                        }
                                    });
                                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                                    });
                                });
                            }
                            unblock();
                            return;
                        }
                        a_1.service.push.register(command).done(function (errorList) {
                            if (dataToG && dataToG.length > 0) {
                                setShared("CPS003G_ERROR_LIST", dataToG);
                                var msgId = _.keys(errObj).length === regCount ? "Msg_1462" : "Msg_1461";
                                alertError({ messageId: msgId }).then(function () {
                                    forEach(updateDone, function (d) {
                                        if (!_.has(errObj, d.rowId)) {
                                            $grid.mGrid("updateCell", d.rowId, d.columnKey, d.value, true);
                                            $grid.mGrid("updateCell", d.rowId, "register", false, true);
                                        }
                                    });
                                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                                    });
                                });
                            }
                            else {
                                if (!errorList || errorList.length === 0) {
                                    info({ messageId: "Msg_15" }).then(function () {
                                        unblock();
                                        self.requestData();
                                    });
                                }
                                else {
                                    var errLst = _.map(errorList, function (e) { return e; });
                                    var ds_1 = $grid.mGrid("dataSource");
                                    var errIds_1 = _.chain(errLst).map(function (e) { return e.no - 1; }).uniq().map(function (no) { return (ds_1[no] || {}).id; }).value();
                                    forEach(updateDone, function (d) {
                                        if (!_.find(errIds_1, function (id) { return id === d.rowId; })) {
                                            $grid.mGrid("updateCell", d.rowId, d.columnKey, d.value, true);
                                            $grid.mGrid("updateCell", d.rowId, "register", false, true);
                                        }
                                    });
                                    setShared("CPS003G_ERROR_LIST", errLst);
                                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                                    });
                                }
                            }
                        }).fail(function (res) {
                            unblock();
                            alert(res.message);
                        });
                    }).ifNo(function () {
                    });
                };
                ViewModel.prototype.validateSpecial = function (regChecked, dataSource) {
                    var self = this, dateRanges, timeRanges, selectButtons, $grid = $("#grid");
                    forEach(dataSource, function (data, i) {
                        if (i == 0) {
                            dateRanges = findAll(cps003.control.dateRange, function (range) { return self.category.catCode() === range.ctgCode; });
                            timeRanges = findAll(cps003.control.timeRange, function (range) { return self.category.catCode() === range.ctgCode; });
                            selectButtons = findAll(cps003.control.selectGroups, function (select) { return self.category.catCode() === select.ctgCode; });
                        }
                        if (_.isNil(find(regChecked, function (r) { return r === data.id; })))
                            return;
                        forEach(dateRanges, function (range) {
                            var column = find(self.gridOptions.columns, function (c) { return c.key === range.start; });
                            if (column) {
                                var control_1 = find(self.gridOptions.ntsControls, function (c) { return c.name === column.ntsControl; });
                                if (control_1) {
                                    var vd = cps003.control.DATE_RANGE[range.ctgCode + "_" + range.start];
                                    if (_.isFunction(vd))
                                        vd(column.required, control_1.format, data[range.start], data);
                                }
                            }
                        });
                        forEach(timeRanges, function (range) {
                            var column = find(self.gridOptions.columns, function (c) { return c.key === range.start; });
                            if (column) {
                                var vd = cps003.control.TIME_RANGE[range.ctgCode + "_" + range.start];
                                if (_.isFunction(vd)) {
                                    var timeRangeGroup_1 = cps003.control.TIME_RANGE_GROUP[range.ctgCode + "_" + range.start];
                                    vd(column.required, column.constraint.primitiveValue, column.headerText, data.id, range.start, data[range.start], data).fail(function (hasError) {
                                        if (hasError)
                                            return;
                                        if (timeRangeGroup_1) {
                                            timeRangeGroup_1(data.id, range.start, data[range.start], data);
                                        }
                                    });
                                }
                            }
                        });
                        forEach(selectButtons, function (select) {
                            forEach(["workplace", "workType", "workTime"], function (sType) {
                                var wpColumn = find(self.gridOptions.columns, function (c) { return c.key === select[sType]; });
                                if (wpColumn) {
                                    var workplaceVal_1 = data[select[sType]];
                                    var optionsList = $grid.mGrid("optionsList", data.id, select[sType]);
                                    if (wpColumn.required && _.isNil(find(optionsList, function (itm) { return itm.optionValue === workplaceVal_1; }))) {
                                        var index = _.findIndex(dataSource, function (d) { return d.id === data.id; }), message = nts.uk.resource.getMessage("FND_E_REQ_SELECT", [wpColumn.headerText]);
                                        $grid.mGrid("setErrors", [{ id: data.id, index: index, columnKey: select[sType], message: message }], null, true);
                                    }
                                    else {
                                        $grid.mGrid("clearErrors", [{ id: data.id, columnKey: select[sType] }]);
                                    }
                                }
                            });
                        });
                        if (self.category.catCode() === "CS00002") {
                            forEach(["IS00003", "IS00004", "IS00015", "IS00016"], function (item) {
                                var column = find(self.gridOptions.columns, function (c) { return c.key === item; });
                                if (column) {
                                    var vd = cps003.control.STRING[self.category.catCode() + "_" + item];
                                    if (_.isFunction(vd))
                                        vd(column.required, data.id, item, data[item], data);
                                }
                            });
                        }
                    });
                };
                ViewModel.prototype.convertType = function (perInfoTypeState, value) {
                    if (!perInfoTypeState)
                        return 1;
                    switch (perInfoTypeState.dataTypeValue) {
                        case ITEM_SINGLE_TYPE.STRING:
                            return 1;
                        case ITEM_SINGLE_TYPE.NUMERIC:
                        case ITEM_SINGLE_TYPE.TIME:
                        case ITEM_SINGLE_TYPE.TIMEPOINT:
                            return 2;
                        case ITEM_SINGLE_TYPE.DATE:
                            return 3;
                        case ITEM_SINGLE_TYPE.SELECTION:
                        case ITEM_SINGLE_TYPE.SEL_RADIO:
                        case ITEM_SINGLE_TYPE.SEL_BUTTON:
                            switch (perInfoTypeState.referenceType) {
                                case ITEM_SELECT_TYPE.ENUM:
                                    return 2;
                                case ITEM_SELECT_TYPE.CODE_NAME:
                                    return 1;
                                case ITEM_SELECT_TYPE.DESIGNATED_MASTER:
                                    if (!_.isNil(value) && !isNaN(Number(value)) && String(Number(value)) === String(value)) {
                                        return 2;
                                    }
                                    return 1;
                            }
                        case ITEM_SINGLE_TYPE.READONLY:
                        case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                        case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                            return null;
                        case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                            return 2;
                    }
                };
                ViewModel.prototype.getText = function (perInfoTypeState, value, id, itemCode, $grid) {
                    if (!perInfoTypeState || value === "")
                        return value;
                    switch (perInfoTypeState.dataTypeValue) {
                        case ITEM_SINGLE_TYPE.STRING:
                        case ITEM_SINGLE_TYPE.NUMERIC:
                            return value;
                        case ITEM_SINGLE_TYPE.TIME:
                            if (!_.isNil(value))
                                return { value: nts.uk.time.parseTime(value).toValue(), text: value };
                        case ITEM_SINGLE_TYPE.TIMEPOINT:
                            if (!_.isNil(value)) {
                                var res = { value: nts.uk.time.parseTime(value).toValue() };
                                res.text = nts.uk.time.minutesBased.clock.dayattr.create(res.value).fullText;
                                return res;
                            }
                        case ITEM_SINGLE_TYPE.DATE:
                            if (_.isNil(value) || (value instanceof moment && !value.isValid())) {
                                return { value: null, text: null };
                            }
                            var date = moment(value).format("YYYY/MM/DD");
                            return { value: date, text: date };
                        case ITEM_SINGLE_TYPE.SELECTION:
                        case ITEM_SINGLE_TYPE.SEL_RADIO:
                        case ITEM_SINGLE_TYPE.SEL_BUTTON:
                            var optionItem = _.find($grid.mGrid("optionsList", id, itemCode), function (item) { return item.optionValue === value; });
                            if (optionItem) {
                                return optionItem.optionText;
                            }
                        case ITEM_SINGLE_TYPE.READONLY:
                        case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                        case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                        case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                            return value;
                        default:
                            return value;
                    }
                };
                ViewModel.prototype.checkError = function () {
                    var self = this, $grid = $("#grid");
                    var dataSource = $grid.mGrid("dataSource"), regChecked = [];
                    forEach($grid.mGrid("updatedCells"), function (item) {
                        if (item.columnKey === "register" && item.value) {
                            regChecked.push(item.rowId);
                        }
                    });
                    self.validateSpecial(regChecked, dataSource);
                    $grid.mGrid("validate", false, function (data) { return data.register; });
                    var errors = _.filter($grid.mGrid("errors"), function (e) {
                        var d = dataSource[e.index];
                        return d && d.register;
                    });
                    if (errors.length === 0) {
                        nts.uk.ui.dialog.info({ messageId: "Msg_1463" });
                        return;
                    }
                    setShared("CPS003G_ERROR_LIST", _.map(errors, function (err) {
                        return { employeeId: err.employeeId, empCd: err.employeeCode, empName: err.employeeName, no: err.rowNumber,
                            isDisplayRegister: false, errorType: 0, itemName: err.columnName, message: err.message };
                    }));
                    self.hasError(true);
                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                    });
                };
                ViewModel.prototype.openBDialog = function () {
                    var self = this, category = _.find(self.category.items(), function (x) { if (x.id == self.category.catId()) {
                        return x;
                    } }), params = {
                        systemDate: moment(self.baseDate()).format("YYYY/MM/DD"),
                        categoryId: self.category.catId(),
                        categoryName: self.category.cate().categoryName,
                        mode: self.updateMode(),
                        updateModeEnable: self.updateModeEnable(),
                        columnChange: _.filter(self.headDatas, function (data) { return _.find(self.settings.perInfoData(), function (info) { return info.regulationAtr && info.itemCD === data.itemCode; }); }),
                        sids: _.map(self.gridOptions.dataSource, function (data) { return data.employeeId; })
                    };
                    setShared('CPS003B_VALUE', params);
                    setShared("CPS003G_PARAM", { baseDate: self.baseDate(), updateMode: self.updateMode(),
                        catId: self.category.catId(), cate: self.category.cate(), perInfoCatePermission: self.perInfoCatePermission() });
                    modal("/view/cps/003/b/index.xhtml").onClosed(function () {
                        var sharedParam = getShared('CPS003C_VALUE');
                        if (sharedParam) {
                            setShared('CPS003B_PARAM', sharedParam);
                            modal("/view/cps/003/c/index.xhtml").onClosed(function () {
                                if (getShared("CPS003C_REG_DONE")) {
                                    self.requestData(null, null, getShared("CPS003C_REG_EMPID"));
                                }
                            });
                        }
                    });
                };
                ViewModel.prototype.exportFile = function () {
                    block();
                    var self = this, $grid = $("#grid"), matrixData = { categoryId: self.category.catId(), categoryCode: self.category.catCode(), categoryName: self.category.cate().categoryName,
                        fixedHeader: { isShowDepartment: (self.settings.matrixDisplay() || {}).departmentATR === IUSE_SETTING.USE,
                            isShowWorkplace: (self.settings.matrixDisplay() || {}).workPlaceATR === IUSE_SETTING.USE,
                            isShowPosition: (self.settings.matrixDisplay() || {}).jobATR === IUSE_SETTING.USE,
                            isShowEmployment: (self.settings.matrixDisplay() || {}).employmentATR === IUSE_SETTING.USE,
                            isShowClassification: (self.settings.matrixDisplay() || {}).clsATR === IUSE_SETTING.USE },
                        dynamicHeader: _.filter(self.headDatas, function (data) { return _.find(self.settings.perInfoData(), function (info) { return info.regulationAtr && info.itemCD === data.itemCode; }); }),
                        width: nts.uk.localStorage.getItem(nts.uk.request.location.current.rawUrl + "/grid").map(function (w) {
                            w = JSON.parse(w);
                            var items = {};
                            _.forEach(self.settings.perInfoData(), function (info) {
                                var itemWidth = w && w.default && w.default[info.itemCD];
                                if (!info.regulationAtr || _.isNil(itemWidth))
                                    return;
                                items[info.itemCD] = itemWidth;
                            });
                            _.forEach(["rowNumber", "employeeCode", "employeeName", "deptName", "workplaceName", "positionName", "employmentName", "className"], function (column) {
                                var itemWidth = w && w.reparer && w.reparer[column];
                                if (!_.isNil(itemWidth))
                                    items[column] = itemWidth;
                            });
                            return items;
                        }).orElse(null),
                        order: $grid.mGrid("columnOrder"),
                        detailData: [] };
                    _.forEach($grid.mGrid("dataSource"), function (record) {
                        if ( /*find(self.hiddenRows, id => id === record.id)*/find(self.hiddenEmpIds, function (id) { return id === record.employeeId; }))
                            return;
                        matrixData.detailData.push(new GridEmployeeInfoDataSource(record, matrixData.dynamicHeader, $grid));
                    });
                    nts.uk.request.exportFile("com", "/person/matrix/report/printMatrix", matrixData).done(function (data) {
                    }).fail(function (mes) {
                        console.log(mes);
                    }).always(function () {
                        unblock();
                    });
                };
                ViewModel.prototype.saveWidth = function () {
                    var self = this, width = nts.uk.localStorage.getItem(nts.uk.request.location.current.rawUrl + "/grid"), items = [], invalid;
                    width.ifPresent(function (w) {
                        w = JSON.parse(w);
                        _.forEach(self.settings.perInfoData(), function (info) {
                            var itemWidth = w && w.default && w.default[info.itemCD];
                            if (!info.regulationAtr || _.isNil(itemWidth))
                                return;
                            if (itemWidth < 20 || itemWidth > 9999) {
                                var column = find(self.gridOptions.columns, function (c) { return c.key === info.itemCD; });
                                if (column) {
                                    var msg = nts.uk.resource.getMessage("Msg_1467", [column.headerText]);
                                    $("#grid").ntsError("set", msg, "Msg_1467");
                                    invalid = true;
                                }
                                return;
                            }
                            items.push({
                                pInfoCategoryID: self.category.catId(),
                                pInfoItemDefiID: info.perInfoItemDefID,
                                columnWidth: itemWidth,
                                regulationATR: Number(info.regulationAtr)
                            });
                        });
                        if (items.length > 0 && !invalid) {
                            cps003.a.service.push.setting({
                                personInfoItems: items
                            });
                            a_1.service.fetch.setting(self.category.catId()).done(function (data) {
                                if (ko.isObservable(self.settings.matrixDisplay)) {
                                    self.settings.matrixDisplay(data.matrixDisplay);
                                }
                                if (ko.isObservable(self.settings.perInfoData)) {
                                    self.settings.perInfoData(data.perInfoData);
                                }
                            });
                            $("#grid").ntsError("clear");
                        }
                    });
                };
                ViewModel.prototype.loadGrid = function () {
                    var self = this;
                    if ($("#grid").data("mGrid"))
                        $("#grid").mGrid("destroy");
                    self.hasError(false);
                    new nts.uk.ui.mgrid.MGrid($("#grid")[0], {
                        width: "1000px",
                        height: "800px",
                        headerHeight: "40px",
                        subHeight: "330px",
                        subWidth: "160px",
                        dataSource: self.gridOptions.dataSource,
                        primaryKey: "id",
                        useOptions: true,
                        virtualization: true,
                        virtualizationMode: "continuous",
                        enter: "right",
                        autoFitWindow: true,
                        errorColumns: ["employeeId", "employeeCode", "employeeName", "rowNumber"],
                        errorOccurred: function () { return self.hasError(true); },
                        errorResolved: function () { return self.hasError(false); },
                        errorDismissed: function () {
                            var $grid = $("#grid");
                            var dataSource = $grid.mGrid("dataSource"), itemErrors = _.filter($grid.mGrid("errors"), function (e) {
                                var d = dataSource[e.index];
                                return d && d.register;
                            });
                            if (itemErrors.length > 0) {
                                self.hasError(true);
                            }
                            else {
                                self.hasError(false);
                            }
                        },
                        idGen: function (id) { return id + "_" + nts.uk.util.randomId(); },
                        columns: self.gridOptions.columns,
                        features: self.gridOptions.features,
                        ntsControls: self.gridOptions.ntsControls
                    }).create();
                };
                ViewModel.prototype.requestData = function (settingData, employeeSelect, regEmpIds) {
                    // { categoryId: 'COM1_00000000000000000000000_CS00020', lstEmployee: [], standardDate: '2818/01/01' };
                    var self = this, dfd = $.Deferred();
                    if ($("#base-date").ntsError("hasError"))
                        return;
                    block();
                    var employeeIds = [];
                    if (!regEmpIds || regEmpIds.length == 0) {
                        employeeIds = _.map(self.employees(), function (e) { return e.employeeId; });
                    }
                    else {
                        var tmpSet_1 = new Set();
                        forEach(self.employees(), function (e) {
                            tmpSet_1.add(e.employeeId);
                        });
                        forEach(regEmpIds, function (e) {
                            tmpSet_1.add(e);
                        });
                        self.employees.removeAll();
                        tmpSet_1.forEach(function (e) {
                            employeeIds.push(e);
                            self.employees.push({ employeeId: e });
                        });
                    }
                    var param = { categoryId: self.category.catId(), lstEmployee: employeeIds, standardDate: moment.utc(self.baseDate(), "YYYY/MM/DD").toISOString() };
                    if (self.category.catCode()) {
                        param.categoryCode = self.category.catCode();
                    }
                    nts.uk.request.ajax('com', 'ctx/pereg/grid-layout/get-data', param).done(function (data) {
                        if (data.bodyDatas && data.bodyDatas.length == 0 && !_.isNil(data.baseDate)) {
                            //                    self.baseDate(data.baseDate);
                        }
                        if (employeeSelect) {
                            self.hiddenRows = [];
                            self.hiddenEmpIds = [];
                        }
                        self.convertData(data, settingData).done(function () {
                            self.loadGrid();
                            self.initDs = _.cloneDeep(self.gridOptions.dataSource);
                            if (self.hiddenEmpIds.length > 0) {
                                var $grid_1 = $("#grid");
                                forEach(self.initDs, function (obj, i) {
                                    if (find(self.hiddenEmpIds, function (empId) { return obj.employeeId === empId; })) {
                                        $grid_1.mGrid("hideRow", i);
                                    }
                                });
                            }
                            self.settings.matrixDisplay.valueHasMutated();
                            self.disableCS00035();
                            unblock();
                            if ($(window).data("blockUI.isBlocked") === 1)
                                unblock();
                            dfd.resolve();
                        });
                    }).fail(function (res) {
                        alertError({ messageId: res.messageId }).then(function () {
                            if (self.baseDateChangeHist.length > 1) {
                                self.baseDate(self.baseDateChangeHist[self.baseDateChangeHist.length - 2]);
                            }
                        });
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.disableCS00035 = function () {
                    var self = this;
                    if (self.category.catCode() !== "CS00035")
                        return;
                    var $grid = $("#grid");
                    _.forEach(self.gridOptions.dataSource, function (s) {
                        cps003.control.fetch.check_remain_days(s.employeeId).done(function (x) {
                            $grid.mGrid(x ? "enableNtsControlAt" : "disableNtsControlAt", s.id, "IS00366", null, true);
                        });
                        cps003.control.fetch.check_remain_left(s.employeeId).done(function (x) {
                            $grid.mGrid(x ? "enableNtsControlAt" : "disableNtsControlAt", s.id, "IS00368", null, true);
                        });
                    });
                };
                ViewModel.prototype.convertData = function (data, gridSettings) {
                    var self = this, dfd = $.Deferred(), hideRowAdd;
                    if (data.headDatas) {
                        self.batchSettingItems = [];
                        data.headDatas.sort(function (a, b) {
                            if (a.itemOrder === b.itemOrder) {
                                var cmp = a.itemParentCode.compareTo(b.itemParentCode);
                                if (!cmp) {
                                    return a.itemCode.compareTo(b.itemCode);
                                }
                                return cmp;
                            }
                            return a.itemOrder - b.itemOrder;
                        });
                        var item_1, control_2, parent_1 = {}, sort_1;
                        self.dataTypes = {};
                        gridSettings = gridSettings || ko.toJS(self.settings);
                        if (self.category.cate().categoryType === IT_CAT_TYPE.SINGLE
                            || self.category.cate().categoryType === IT_CAT_TYPE.CONTINUWED
                            || self.category.cate().categoryType === IT_CAT_TYPE.CONTINU
                            || self.category.cate().categoryType === IT_CAT_TYPE.NODUPLICATE) {
                            hideRowAdd = true;
                        }
                        else if (self.category.cate().categoryType === IT_CAT_TYPE.DUPLICATE) {
                            if (self.updateMode() === 1) {
                                hideRowAdd = true;
                            }
                            else
                                hideRowAdd = false;
                        }
                        else if (self.category.cate().categoryType === IT_CAT_TYPE.MULTI) {
                            if (self.perInfoCatePermission().otherAllowAddMulti === 0 && self.perInfoCatePermission().selfAllowAddMulti === 0) {
                                hideRowAdd = true;
                            }
                            else
                                hideRowAdd = false;
                        }
                        self.gridOptions.columns = [
                            { headerText: "", key: "rowNumber", dataType: "number", width: "30px" },
                            { headerText: nts.uk.resource.getText("CPS003_50"), key: "register", dataType: "boolean", width: "30px", ntsControl: "RegCheckBox", bound: true },
                            //                    { headerText: "印刷対象", key: "print", dataType: "boolean", width: "30px", ntsControl: "PrintCheckBox", bound: true },
                            { headerText: nts.uk.resource.getText("CPS003_114"), key: "showControl", dataType: "string", width: "40px", ntsControl: "ImageShow" },
                            { headerText: nts.uk.resource.getText("CPS003_28"), key: "employeeCode", dataType: "string", width: "100px", ntsControl: "Label" },
                            { headerText: nts.uk.resource.getText("CPS003_29"), key: "employeeName", dataType: "string", width: "140px", ntsControl: "Label" },
                            { headerText: nts.uk.resource.getText("CPS003_130"), key: "rowAdd", dataType: "string", width: "40px", ntsControl: "RowAdd", hidden: hideRowAdd },
                            { headerText: nts.uk.resource.getText("CPS003_30"), key: "deptName", dataType: "string", width: "100px", ntsControl: "Label", hidden: !gridSettings || !gridSettings.matrixDisplay || gridSettings.matrixDisplay.departmentATR === IUSE_SETTING.NOT_USE },
                            { headerText: nts.uk.resource.getText("CPS003_31"), key: "workplaceName", dataType: "string", width: "100px", ntsControl: "Label", hidden: !gridSettings || !gridSettings.matrixDisplay || gridSettings.matrixDisplay.workPlaceATR === IUSE_SETTING.NOT_USE },
                            { headerText: nts.uk.resource.getText("CPS003_32"), key: "positionName", dataType: "string", width: "100px", ntsControl: "Label", hidden: !gridSettings || !gridSettings.matrixDisplay || gridSettings.matrixDisplay.jobATR === IUSE_SETTING.NOT_USE },
                            { headerText: nts.uk.resource.getText("CPS003_33"), key: "employmentName", dataType: "string", width: "100px", ntsControl: "Label", hidden: !gridSettings || !gridSettings.matrixDisplay || gridSettings.matrixDisplay.employmentATR === IUSE_SETTING.NOT_USE },
                            { headerText: nts.uk.resource.getText("CPS003_34"), key: "className", dataType: "string", width: "100px", ntsControl: "Label", hidden: !gridSettings || !gridSettings.matrixDisplay || gridSettings.matrixDisplay.clsATR === IUSE_SETTING.NOT_USE }
                        ];
                        self.gridOptions.ntsControls = [
                            { name: 'RegCheckBox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true,
                                onChange: function (i, k, v, d) {
                                    if (!v || !self.hasError()) {
                                        var $grid = $("#grid");
                                        var dataSource_2 = $grid.mGrid("dataSource"), itemErrors = _.filter($grid.mGrid("errors"), function (e) {
                                            var d = dataSource_2[e.index];
                                            return d && d.register;
                                        });
                                        if (itemErrors.length > 0) {
                                            self.hasError(true);
                                        }
                                        else {
                                            self.hasError(false);
                                        }
                                    }
                                }
                            },
                            //                    { name: 'PrintCheckBox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true },
                            { name: "ImageShow", source: "hidden-button", controlType: "Image", click: function (idx) {
                                    if (_.isNil(idx))
                                        return;
                                    var ds = $("#grid").mGrid("dataSource");
                                    if (_.isNil(ds[idx]))
                                        return;
                                    var obj = ds[idx];
                                    self.hiddenRows.push(obj.id);
                                    self.hiddenEmpIds.push(obj.employeeId);
                                } },
                            { name: "RowAdd", source: "plus-button", cssClass: "blue-color", controlType: "Image", copy: 2 }
                        ];
                        var headerStyles_1 = { name: "HeaderStyles", columns: [] }, columnSettings_1 = _.cloneDeep(self.settings.perInfoData()), sorting_1 = { name: "Sorting", columnSettings: [
                                { columnKey: "rowNumber", allowSorting: true, type: "Number" },
                                { columnKey: "employeeCode", allowSorting: true },
                                { columnKey: "employeeName", allowSorting: true },
                                { columnKey: "deptName", allowSorting: true },
                                { columnKey: "workplaceName", allowSorting: true },
                                { columnKey: "positionName", allowSorting: true },
                                { columnKey: "employmentName", allowSorting: true },
                                { columnKey: "className", allowSorting: true }
                            ] };
                        self.headDatas = data.headDatas;
                        forEach(data.headDatas, function (d) {
                            var controlType = d.itemTypeState.dataTypeState;
                            if (controlType) {
                                var name_1;
                                if (_.isNil(d.itemParentCode) || d.itemParentCode === "") {
                                    parent_1[d.itemCode] = d.itemName /*+ d.itemCode*/;
                                    name_1 = d.itemName /*+ d.itemCode*/;
                                }
                                else {
                                    name_1 = parent_1[d.itemParentCode] + "-" + d.itemName /*+ d.itemCode*/;
                                    parent_1[d.itemCode] = name_1;
                                }
                                var colSetting = _.remove(columnSettings_1, function (s) { return s.itemCD === d.itemCode; });
                                item_1 = { headerText: name_1, itemId: d.itemId, itemName: d.itemName, key: d.itemCode, required: d.required, parentCode: d.itemParentCode, dataType: "string", width: colSetting.length > 0 ? colSetting[0].width + "px" : "200px", perInfoTypeState: controlType };
                                if (gridSettings) {
                                    colSetting = [_.find(gridSettings.perInfoData, function (itemInfo) { return itemInfo.itemCD === d.itemCode; })];
                                }
                                if (colSetting.length > 0 && colSetting[0]) {
                                    item_1.hidden = !colSetting[0].regulationAtr;
                                }
                                controlType.required = d.required;
                                sort_1 = {};
                                control_2 = self.getControlType(controlType, item_1, sort_1);
                                self.gridOptions.columns.push(item_1);
                                if (sort_1.columnKey) {
                                    sorting_1.columnSettings.push(sort_1);
                                }
                                if (control_2) {
                                    self.gridOptions.ntsControls.push(control_2);
                                    var combo = cps003.control.COMBOBOX[self.category.catCode() + "_" + d.itemCode];
                                    if (combo) {
                                        control_2.inputProcess = combo;
                                    }
                                    if (control_2.controlType === "DatePicker") {
                                        var dp_1 = cps003.control.DATE_RANGE[self.category.catCode() + "_" + d.itemCode];
                                        if (dp_1) {
                                            if (control_2.inputProcess) {
                                                var existedProcess_1 = control_2.inputProcess;
                                                var format_1 = control_2.format;
                                                control_2.inputProcess = function () {
                                                    existedProcess_1.apply(null, arguments);
                                                    dp_1.apply(null, _.concat(d.required, format_1, arguments));
                                                };
                                            }
                                            else {
                                                control_2.inputProcess = dp_1.bind(null, d.required, control_2.format);
                                            }
                                        }
                                    }
                                }
                                if (d.required) {
                                    headerStyles_1.columns.push({ key: d.itemCode, colors: ["required"] });
                                }
                                cps003.control.writePrimitiveConstraint(d);
                                if (item_1.constraint.primitiveValue === "StampNumber") {
                                    cps003.control.fetch.get_stc_setting().done(function (stc) {
                                        var pv = (__viewContext.primitiveValueConstraints || {}).StampNumber;
                                        if (!pv)
                                            return;
                                        if (!_.isNil(stc.digitsNumber)) {
                                            __viewContext.primitiveValueConstraints.StampNumber.maxLength = stc.digitsNumber;
                                        }
                                        switch (stc.method) {
                                            case EDIT_METHOD.PreviousZero:
                                                pv.formatOption = { autoFill: true, fillDirection: "left", fillCharacter: "0" };
                                                break;
                                            case EDIT_METHOD.AfterZero:
                                                pv.formatOption = { autoFill: true, fillDirection: "right", fillCharacter: "0" };
                                                break;
                                            case EDIT_METHOD.PreviousSpace:
                                                pv.formatOption = { autoFill: true, fillDirection: "left", fillCharacter: " " };
                                                break;
                                            case EDIT_METHOD.AfterSpace:
                                                pv.formatOption = { autoFill: true, fillDirection: "right", fillCharacter: " " };
                                                break;
                                        }
                                    });
                                }
                            }
                            else {
                                parent_1[d.itemCode] = d.itemName /*+ d.itemCode*/;
                            }
                        });
                        self.gridOptions.features = [{ name: "Resizing" }, { name: "ColumnMoving" }, { name: "Copy" }, { name: "Tooltip", error: true }, { name: "WidthSaving", reset: true }];
                        // TODO: Get fixed columns
                        var columnFixing_1 = { name: "ColumnFixing", columnSettings: [] };
                        forEach(self.fixedColumns, function (f) {
                            columnFixing_1.columnSettings.push({ columnKey: f, isFixed: true });
                        });
                        self.gridOptions.features.push(columnFixing_1);
                        self.gridOptions.features.push(headerStyles_1);
                        self.gridOptions.features.push(sorting_1);
                    }
                    if (data.bodyDatas) {
                        self.gridOptions.dataSource = [];
                        var states_1 = [], workTimeCodes_1 = [], nullWorkTimeCodes_1 = [], workTimeItems_1 = [], nullWorkTimeItems_1 = [], codes_1 = {}, displayItems_1 = [];
                        forEach(self.gridOptions.columns, function (column, i) {
                            if (i < 11)
                                return;
                            displayItems_1.push(column.key);
                        });
                        forEach(data.bodyDatas, function (d, ri) {
                            var record = new Record(d, ri), disItems = _.cloneDeep(displayItems_1);
                            forEach(d.items, function (item, i) {
                                var dt = self.dataTypes[item.itemCode], disabled;
                                if (!dt)
                                    return;
                                if (_.isNil(item.recordId)) {
                                    states_1.push(new State(record.id, "employeeCode", ["red-color"]));
                                    states_1.push(new State(record.id, "employeeName", ["red-color"]));
                                    states_1.push(new State(record.id, "deptName", ["red-color"]));
                                    states_1.push(new State(record.id, "workplaceName", ["red-color"]));
                                    states_1.push(new State(record.id, "positionName", ["red-color"]));
                                    states_1.push(new State(record.id, "employmentName", ["red-color"]));
                                    states_1.push(new State(record.id, "className", ["red-color"]));
                                }
                                if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.DATE) {
                                    record[item.itemCode] = _.isNil(item.value) || item.value === "" ? item.value : moment.utc(item.value, "YYYY/MM/DD").toDate();
                                    if (self.category.catCode() === "CS00070" && (item.itemCode === "IS00781" || item.itemCode === "IS00782")) {
                                        states_1.push(new State(record.id, item.itemCode, ["mgrid-disable"]));
                                        disabled = true;
                                    }
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIMEPOINT && !_.isNil(item.value)) {
                                    record[item.itemCode] = nts.uk.time.minutesBased.clock.dayattr.create(item.value).shortText;
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIME && !_.isNil(item.value)) {
                                    record[item.itemCode] = nts.uk.time.parseTime(item.value, true).format();
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.READONLY) {
                                    if (self.category.catCode() === "CS00024" && item.itemCode === "IS00289") {
                                        record[item.itemCode] = !_.isNil(item.value) && item.value !== "" ? nts.uk.time.parseTime(item.value, true).format() : "";
                                    }
                                    else {
                                        record[item.itemCode] = item.value;
                                    }
                                }
                                else {
                                    record[item.itemCode] = item.value;
                                }
                                if (item.actionRole === ACTION_ROLE.VIEW_ONLY && dt.cls.dataTypeValue !== ITEM_SINGLE_TYPE.READONLY && !disabled) {
                                    states_1.push(new State(record.id, item.itemCode, ["mgrid-disable"]));
                                }
                                _.remove(disItems, function (itm) { return itm === item.itemCode; });
                                if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.SELECTION || dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.SEL_RADIO) {
                                    if (dt.cls.referenceType === ITEM_SELECT_TYPE.ENUM || dt.cls.referenceType === ITEM_SELECT_TYPE.CODE_NAME
                                        || (dt.cls.referenceType === ITEM_SELECT_TYPE.DESIGNATED_MASTER && item.itemCode !== "IS00079")) {
                                        dt.specs.options = item.lstComboBoxValue;
                                    }
                                    else if (!dt.specs.options) {
                                        dt.specs.options = item.lstComboBoxValue;
                                    }
                                    else {
                                        dt.specs.pattern.push(item.lstComboBoxValue);
                                        dt.specs.list[item.recordId] = dt.specs.pattern.length - 1;
                                    }
                                    self.combobox(record.id, item, states_1, record);
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.SEL_BUTTON) {
                                    dt.specs.pattern.push(item.lstComboBoxValue);
                                    dt.specs.list[item.recordId] = dt.specs.pattern.length - 1;
                                    if (cps003.control.WORK_TIME[item.itemCode]) {
                                        if (!_.isNil(item.value)) {
                                            //                                    if (_.isNil(find(workTimeCodes, wt => wt === item.value))) {
                                            workTimeCodes_1.push(item.value);
                                            workTimeItems_1.push(item.itemCode);
                                            //                                    }
                                        }
                                        else /*if (_.isNil(find(nullWorkTimeItems, nw => nw === item.itemCode)))*/ {
                                            nullWorkTimeCodes_1.push(item.value);
                                            nullWorkTimeItems_1.push(item.itemCode);
                                        }
                                        if (_.has(codes_1, item.value)) {
                                            var codeArr = codes_1[item.value], found = void 0;
                                            for (var k = 0; k < codeArr.length; k++) {
                                                if (codeArr[k] && codeArr[k].id === record.id && codeArr[k].column === item.itemCode) {
                                                    found = true;
                                                    break;
                                                }
                                            }
                                            if (!found) {
                                                codes_1[item.value].push({ id: record.id, column: item.itemCode });
                                            }
                                        }
                                        else {
                                            codes_1[item.value] = [{ id: record.id, column: item.itemCode }];
                                        }
                                    }
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.RELATE_CATEGORY) {
                                }
                            });
                            forEach(disItems, function (itm) { return states_1.push(new State(record.id, itm, ["mgrid-lock"])); });
                            self.gridOptions.dataSource.push(record);
                            //                    if (hideRowAdd === false) {
                            if (self.category.cate().categoryType === IT_CAT_TYPE.DUPLICATE) {
                                if (__viewContext.user.employeeId === record.employeeId) {
                                    if (self.perInfoCatePermission().selfAllowAddHis === 0
                                        || self.perInfoCatePermission().selfFutureHisAuth === 1 || self.perInfoCatePermission().selfFutureHisAuth === 2) {
                                        states_1.push(new State(record.id, "rowAdd", ["mgrid-disable"]));
                                    }
                                }
                                else {
                                    if (self.perInfoCatePermission().otherAllowAddHis === 0
                                        || self.perInfoCatePermission().otherFutureHisAuth === 1 || self.perInfoCatePermission().otherFutureHisAuth === 2) {
                                        states_1.push(new State(record.id, "rowAdd", ["mgrid-disable"]));
                                    }
                                }
                            }
                            else if (self.category.cate().categoryType === IT_CAT_TYPE.MULTI) {
                                if (__viewContext.user.employeeId === record.employeeId && self.perInfoCatePermission().selfAllowAddMulti === 0) {
                                    states_1.push(new State(record.id, "rowAdd", ["mgrid-disable"]));
                                }
                                else if (__viewContext.user.employeeId !== record.employeeId && self.perInfoCatePermission().otherAllowAddMulti === 0) {
                                    states_1.push(new State(record.id, "rowAdd", ["mgrid-disable"]));
                                }
                            }
                            //                    }
                        });
                        if (workTimeCodes_1.length > 0) {
                            cps003.control.fetch.check_mt_se({ workTimeCodes: workTimeCodes_1 }).done(function (mt) {
                                forEach(workTimeCodes_1, function (c, i) {
                                    var head = _.find(mt, function (f) { return f.workTimeCode === c; }), itemCode = workTimeItems_1[i], workTime = cps003.control.WORK_TIME[itemCode];
                                    if (head) {
                                        if (workTime.firstTimes && !head.startEnd) {
                                            forEach(codes_1[c], function (r) {
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.start, ["mgrid-disable"]));
                                                }
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.end, ["mgrid-disable"]));
                                                }
                                            });
                                        }
                                        if (workTime.secondTimes && (!head.startEnd || !head.multiTime)) {
                                            forEach(codes_1[c], function (r) {
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.secondTimes.start, ["mgrid-disable"]));
                                                }
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.secondTimes.end, ["mgrid-disable"]));
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        if (workTime.firstTimes) {
                                            forEach(codes_1[c], function (r) {
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.start, ["mgrid-disable"]));
                                                }
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.end, ["mgrid-disable"]));
                                                }
                                            });
                                        }
                                        if (workTime.secondTimes) {
                                            forEach(codes_1[c], function (r) {
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.secondTimes.start, ["mgrid-disable"]));
                                                }
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.secondTimes.end, ["mgrid-disable"]));
                                                }
                                            });
                                        }
                                    }
                                });
                                dfd.resolve();
                            });
                        }
                        else
                            dfd.resolve();
                        forEach(nullWorkTimeCodes_1, function (c, i) {
                            var itemCode = nullWorkTimeItems_1[i], workTime = cps003.control.WORK_TIME[itemCode];
                            if (workTime.firstTimes) {
                                forEach(codes_1[c], function (r) {
                                    if (r.column === itemCode) {
                                        states_1.push(new State(r.id, workTime.firstTimes.start, ["mgrid-disable"]));
                                    }
                                    if (r.column === itemCode) {
                                        states_1.push(new State(r.id, workTime.firstTimes.end, ["mgrid-disable"]));
                                    }
                                });
                            }
                            if (workTime.secondTimes) {
                                forEach(codes_1[c], function (r) {
                                    if (r.column === itemCode) {
                                        states_1.push(new State(r.id, workTime.secondTimes.start, ["mgrid-disable"]));
                                    }
                                    if (r.column === itemCode) {
                                        states_1.push(new State(r.id, workTime.secondTimes.end, ["mgrid-disable"]));
                                    }
                                });
                            }
                        });
                        self.gridOptions.features.push({ name: "CellStyles", states: states_1 });
                    }
                    return dfd.promise();
                };
                ViewModel.prototype.redisplayEmp = function () {
                    var self = this;
                    $("#grid").mGrid("showHiddenRows");
                    self.hiddenRows = [];
                    self.hiddenEmpIds = [];
                };
                ViewModel.prototype.combobox = function (id, item, states, record) {
                    switch (this.category.catCode()) {
                        case "CS00020":
                            switch (item.itemCode) {
                                case "IS00248":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00249", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00250", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00251", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00121":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00123", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00124", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00125", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00126", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00127", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00123":
                                    if (record.IS00121 === "0")
                                        break;
                                    if (item.value === "0") {
                                        _.remove(states, function (s) { return s.rowId === id && (s.columnKey === "IS00124" || s.columnKey === "IS00125" || s.columnKey === "IS00126"); });
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00127"; })) {
                                            states.push(new State(id, "IS00127", ["mgrid-disable"]));
                                        }
                                    }
                                    else if (item.value === "1") {
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00124"; })) {
                                            states.push(new State(id, "IS00124", ["mgrid-disable"]));
                                        }
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00125"; })) {
                                            states.push(new State(id, "IS00125", ["mgrid-disable"]));
                                        }
                                        _.remove(states, function (s) { return s.rowId === id && (s.columnKey === "IS00126" || s.columnKey === "IS00127"); });
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00127"; })) {
                                            states.push(new State(id, "IS00127", ["mgrid-disable"]));
                                        }
                                    }
                                    else if (item.value === "2") {
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00124"; })) {
                                            states.push(new State(id, "IS00124", ["mgrid-disable"]));
                                        }
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00125"; })) {
                                            states.push(new State(id, "IS00125", ["mgrid-disable"]));
                                        }
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00127"; })) {
                                            states.push(new State(id, "IS00127", ["mgrid-disable"]));
                                        }
                                    }
                                    else if (item.value === "4") {
                                        _.remove(states, function (s) { return s.rowId === id && (s.columnKey === "IS00126" || s.columnKey === "IS00127"); });
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00126"; })) {
                                            states.push(new State(id, "IS00126", ["mgrid-disable"]));
                                        }
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00127"; })) {
                                            states.push(new State(id, "IS00127", ["mgrid-disable"]));
                                        }
                                    }
                                    break;
                            }
                            break;
                        case "CS00025":
                            switch (item.itemCode) {
                                case "IS00296":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00297", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00298", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00299", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00300", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00301", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00297":
                                    if (item.value === "0" && record.IS00296 === "1") {
                                        states.push(new State(id, "IS00298", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00299", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00300", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00301", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00026":
                            switch (item.itemCode) {
                                case "IS00303":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00304", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00305", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00306", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00307", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00308", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00304":
                                    if (item.value === "0" && record.IS00303 === "1") {
                                        states.push(new State(id, "IS00305", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00306", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00307", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00308", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00027":
                            switch (item.itemCode) {
                                case "IS00310":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00311", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00312", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00313", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00314", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00315", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00311":
                                    if (item.value === "0" && record.IS00310 === "1") {
                                        states.push(new State(id, "IS00312", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00313", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00314", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00315", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00028":
                            switch (item.itemCode) {
                                case "IS00317":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00318", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00319", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00320", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00321", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00322", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00318":
                                    if (item.value === "0" && record.IS00317 === "1") {
                                        states.push(new State(id, "IS00319", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00320", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00321", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00322", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00029":
                            switch (item.itemCode) {
                                case "IS00324":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00325", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00326", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00327", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00328", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00329", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00325":
                                    if (item.value === "0" && record.IS00324 === "1") {
                                        states.push(new State(id, "IS00326", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00327", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00328", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00329", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00030":
                            switch (item.itemCode) {
                                case "IS00331":
                                    if (item.value === "0") {
                                        states.push(new State(id, "IS00332", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00333", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00334", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00335", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00336", ["mgrid-disable"]));
                                    }
                                    break;
                                case "IS00332":
                                    if (item.value === "0" && record.IS00331 === "1") {
                                        states.push(new State(id, "IS00333", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00334", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00335", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00336", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00031":
                            switch (item.itemCode) {
                                case "IS00338":
                                    if (item.value === "0") {
                                        _.forEach(['IS00339', 'IS00340', 'IS00341' /*, 'IS00342'*/, 'IS00343'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00339":
                                    if (item.value === "0" && record.IS00338 === "1") {
                                        states.push(new State(id, "IS00340", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00341", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00342", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00343", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00032":
                            switch (item.itemCode) {
                                case "IS00345":
                                    if (item.value === "0") {
                                        _.forEach(['IS00346', 'IS00347', 'IS00348' /*, 'IS00349'*/, 'IS00350'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00346":
                                    if (item.value === "0" && record.IS00345 === "1") {
                                        states.push(new State(id, "IS00347", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00348", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00349", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00350", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00033":
                            switch (item.itemCode) {
                                case "IS00352":
                                    if (item.value === "0") {
                                        _.forEach(['IS00353', 'IS00354', 'IS00355' /*, 'IS00356'*/, 'IS00357'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00353":
                                    if (item.value === "0" && record.IS00352 === "1") {
                                        states.push(new State(id, "IS00354", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00355", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00356", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00357", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00034":
                            switch (item.itemCode) {
                                case "IS00359":
                                    if (item.value === "0") {
                                        _.forEach(['IS00360', 'IS00361', 'IS00362' /*, 'IS00363'*/, 'IS00364'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00360":
                                    if (item.value === "0" && record.IS00359 === "1") {
                                        states.push(new State(id, "IS00361", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00362", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00363", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00364", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00035":
                            switch (item.itemCode) {
                                case "IS00370":
                                    if (item.value === "0") {
                                        _.forEach(['IS00371', 'IS00372', 'IS00374'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00036":
                            switch (item.itemCode) {
                                case "IS00375":
                                    if (item.value === "0") {
                                        _.forEach(['IS00376', 'IS00377', 'IS00378', 'IS00379', 'IS01101'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00380":
                                    if (item.value === "0") {
                                        _.forEach(['IS00381', 'IS00382', 'IS00383', 'IS00384', 'IS01102'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00049":
                            switch (item.itemCode) {
                                case "IS00560":
                                    if (item.value === "0") {
                                        _.forEach(['IS00561', 'IS00562', 'IS00563' /*, 'IS00564'*/, 'IS00565'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00561":
                                    if (item.value === "0" && record.IS00560 === "1") {
                                        states.push(new State(id, "IS00562", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00563", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00564", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00565", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00050":
                            switch (item.itemCode) {
                                case "IS00567":
                                    if (item.value === "0") {
                                        _.forEach(['IS00568', 'IS00569', 'IS00570' /*, 'IS00571'*/, 'IS00572'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00568":
                                    if (item.value === "0" && record.IS00567 === "1") {
                                        states.push(new State(id, "IS00569", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00570", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00571", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00572", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00051":
                            switch (item.itemCode) {
                                case "IS00574":
                                    if (item.value === "0") {
                                        _.forEach(['IS00575', 'IS00576', 'IS00577' /*, 'IS00578'*/, 'IS00579'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00575":
                                    if (item.value === "0" && record.IS00574 === "1") {
                                        states.push(new State(id, "IS00576", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00577", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00578", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00579", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00052":
                            switch (item.itemCode) {
                                case "IS00581":
                                    if (item.value === "0") {
                                        _.forEach(['IS00582', 'IS00583', 'IS00584' /*, 'IS00585'*/, 'IS00586'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00582":
                                    if (item.value === "0" && record.IS00581 === "1") {
                                        states.push(new State(id, "IS00583", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00584", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00585", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00586", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00053":
                            switch (item.itemCode) {
                                case "IS00588":
                                    if (item.value === "0") {
                                        _.forEach(['IS00589', 'IS00590', 'IS00591' /*, 'IS00592'*/, 'IS00593'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00589":
                                    if (item.value === "0" && record.IS00588 === "1") {
                                        states.push(new State(id, "IS00590", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00591", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00592", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00593", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00054":
                            switch (item.itemCode) {
                                case "IS00595":
                                    if (item.value === "0") {
                                        _.forEach(['IS00596', 'IS00597', 'IS00598' /*, 'IS00599'*/, 'IS00600'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00596":
                                    if (item.value === "0" && record.IS00595 === "1") {
                                        states.push(new State(id, "IS00597", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00598", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00599", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00600", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00055":
                            switch (item.itemCode) {
                                case "IS00602":
                                    if (item.value === "0") {
                                        _.forEach(['IS00603', 'IS00604', 'IS00605' /*, 'IS00606'*/, 'IS00607'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00603":
                                    if (item.value === "0" && record.IS00602 === "1") {
                                        states.push(new State(id, "IS00604", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00605", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00606", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00607", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00056":
                            switch (item.itemCode) {
                                case "IS00609":
                                    if (item.value === "0") {
                                        _.forEach(['IS00610', 'IS00611', 'IS00612' /*, 'IS00613'*/, 'IS00614'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00610":
                                    if (item.value === "0" && record.IS00609 === "1") {
                                        states.push(new State(id, "IS00611", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00612", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00613", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00614", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00057":
                            switch (item.itemCode) {
                                case "IS00616":
                                    if (item.value === "0") {
                                        _.forEach(['IS00617', 'IS00618', 'IS00619' /*, 'IS00620'*/, 'IS00621'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00617":
                                    if (item.value === "0" && record.IS00616 === "1") {
                                        states.push(new State(id, "IS00618", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00619", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00620", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00621", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00058":
                            switch (item.itemCode) {
                                case "IS00623":
                                    if (item.value === "0") {
                                        _.forEach(['IS00624', 'IS00625', 'IS00626' /*, 'IS00627'*/, 'IS00628'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                                case "IS00624":
                                    if (item.value === "0" && record.IS00623 === "1") {
                                        states.push(new State(id, "IS00625", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00626", ["mgrid-disable"]));
                                        //                                states.push(new State(id, "IS00627", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00628", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                    }
                };
                ViewModel.prototype.getControlType = function (controlType, item, sort) {
                    if (_.isNil(controlType))
                        return;
                    var self = this, control, name;
                    self.dataTypes[item.key] = { cls: controlType };
                    if (item.key === "IS00779") {
                        item.constraint = { primitiveValue: "StampNumber", isCheckExpression: true };
                    }
                    else {
                        item.constraint = { primitiveValue: item.itemId.replace(/[-_]/g, "") };
                    }
                    switch (controlType.dataTypeValue) {
                        case ITEM_SINGLE_TYPE.STRING:
                            if (controlType.stringItemType === ITEM_STRING_TYPE.EMPLOYEE_CODE) {
                                item.constraint = { primitiveValue: "EmployeeCode" };
                            }
                            var spaceCheck = cps003.control.STRING[self.category.catCode() + "_" + item.key];
                            if (spaceCheck)
                                item.inputProcess = spaceCheck.bind(null, item.required);
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            if (!item.hidden)
                                self.batchSettingItems.push(item.itemId);
                            break;
                        case ITEM_SINGLE_TYPE.NUMERIC:
                            if (controlType.numericItemAmount === 1) {
                                var constraint = (item.constraint || {});
                                constraint.decimalLength = controlType.decimalPart;
                                item.constraint = constraint;
                            }
                            item.dataType = "number";
                            var timeNumber = cps003.control.NUMBER[self.category.catCode() + "_" + item.key], numberType = cps003.control.NUMBER_Lan[self.category.catCode() + "_" + item.key];
                            if (numberType)
                                item.inputProcess = numberType;
                            if (timeNumber)
                                item.inputProcess = timeNumber;
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            sort.type = "Number";
                            if (!item.hidden)
                                self.batchSettingItems.push(item.itemId);
                            break;
                        case ITEM_SINGLE_TYPE.DATE:
                            item.columnCssClass = "halign-right";
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            if (controlType.dateItemType === DateType.YEARMONTHDAY) {
                                name = "DatePickerYMD" + item.key;
                                item.constraint.type = "ymd";
                                control = { name: name, format: "ymd", controlType: "DatePicker" };
                                sort.type = "FullDate";
                                var dp = cps003.control.DATE_TIME[self.category.catCode() + "_" + item.key];
                                if (dp)
                                    control.inputProcess = dp;
                            }
                            else if (controlType.dateItemType === DateType.YEARMONTH) {
                                name = "DatePickerYM" + item.key;
                                item.constraint.type = "ym";
                                control = { name: name, format: "ym", controlType: "DatePicker" };
                                sort.type = "YearMonth";
                            }
                            else {
                                name = "DatePickerY" + item.key;
                                item.constraint.type = "y";
                                control = { name: name, format: "y", controlType: "DatePicker" };
                            }
                            item.ntsControl = name;
                            if (!item.hidden)
                                self.batchSettingItems.push(item.itemId);
                            break;
                        case ITEM_SINGLE_TYPE.TIME:
                            item.columnCssClass = "halign-right";
                            timeNumber = cps003.control.NUMBER[self.category.catCode() + "_" + item.key];
                            if (timeNumber)
                                item.inputProcess = timeNumber;
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            sort.type = "Time";
                            if (!item.hidden)
                                self.batchSettingItems.push(item.itemId);
                            break;
                        case ITEM_SINGLE_TYPE.TIMEPOINT:
                            item.columnCssClass = "halign-right";
                            timeNumber = cps003.control.NUMBER[self.category.catCode() + "_" + item.key];
                            if (timeNumber)
                                item.inputProcess = timeNumber;
                            var timeRange_1 = cps003.control.TIME_RANGE[self.category.catCode() + "_" + item.key];
                            var timeRangeGroup_2 = cps003.control.TIME_RANGE_GROUP[self.category.catCode() + "_" + item.key];
                            if (timeRange_1 && timeRangeGroup_2) {
                                item.inputProcess = function () {
                                    var _a;
                                    var dfd = $.Deferred(), args = arguments;
                                    timeRange_1.apply(void 0, (_a = [item.required, item.constraint.primitiveValue, item.headerText]).concat.apply(_a, arguments)).fail(function (hasError) {
                                        if (hasError)
                                            return;
                                        timeRangeGroup_2.apply(void 0, args);
                                    });
                                    dfd.reject();
                                    return dfd.promise();
                                };
                            }
                            else if (timeRange_1)
                                item.inputProcess = timeRange_1.bind(null, item.required, item.constraint.primitiveValue, item.headerText);
                            else if (timeRangeGroup_2)
                                item.inputProcess = timeRangeGroup_2;
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            sort.type = "Time";
                            if (!item.hidden)
                                self.batchSettingItems.push(item.itemId);
                            break;
                        case ITEM_SINGLE_TYPE.SELECTION:
                        case ITEM_SINGLE_TYPE.SEL_RADIO:
                            name = "Combobox" + item.key;
                            control = { name: name, optionsValue: "optionValue", optionsText: "optionText", displayMode: "name", enable: true, controlType: "ComboBox" };
                            if (controlType.referenceType === ITEM_SELECT_TYPE.CODE_NAME
                                || (controlType.referenceType === ITEM_SELECT_TYPE.DESIGNATED_MASTER && item.key === "IS00079")) {
                                control.pattern = [];
                                control.list = {};
                            }
                            self.dataTypes[item.key].specs = control;
                            item.ntsControl = name;
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            if (!item.hidden)
                                self.batchSettingItems.push(item.itemId);
                            break;
                        case ITEM_SINGLE_TYPE.SEL_BUTTON:
                            name = "ReferButton" + item.key;
                            var notFoundMes = nts.uk.resource.getText("CPS001_107");
                            control = { name: name, enable: true, optionsValue: "optionValue", optionsText: "optionText", text: "参照", notFound: notFoundMes, pattern: [], list: {}, controlType: "ReferButton" };
                            var selectBtn = cps003.control.SELECT_BUTTON[self.category.catCode() + "_" + item.key];
                            control.click = selectBtn && selectBtn.bind(null, item.required);
                            self.dataTypes[item.key].specs = control;
                            item.ntsControl = name;
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            if (!item.hidden)
                                self.batchSettingItems.push(item.itemId);
                            break;
                        case ITEM_SINGLE_TYPE.READONLY:
                            item.ntsControl = "Label";
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            break;
                        case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                            name = "RelateButton" + item.key;
                            control = { name: name, enable: true, text: "詳細情報", labelPosition: "before", controlType: "ReferButton" };
                            var selectBtn = cps003.control.RELATE_BUTTON[self.category.catCode() + "_" + item.key];
                            control.click = selectBtn && selectBtn.bind(null);
                            item.ntsControl = name;
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            break;
                        case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                            item.dataType = "number";
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            sort.type = "Number";
                            break;
                        case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                            item.ntsControl = "Label";
                            sort.columnKey = item.key;
                            sort.allowSorting = true;
                            break;
                    }
                    return control;
                };
                ViewModel.prototype.selectButtonClick = function (itemCode) {
                    var selectButtonDlg = {};
                    var itemCodes = ["IS00130", "IS00131", "IS00128", "IS00139", "IS00140", "IS00157", "IS00158",
                        "IS00166", "IS00167", "IS00175", "IS00176", "IS00148", "IS00149", "IS00193", "IS00194", "IS00202",
                        "IS00203", "IS00211", "IS00212", "IS00220", "IS00221", "IS00229", "IS00230", "IS00238", "IS00239",
                        "IS00184", "IS00185", "IS00084", "IS00085"];
                    _.forEach(itemCodes, function (code) {
                        selectButtonDlg[code] = function () {
                            // Param KDL002
                            // List code to display in grid (lstComboboxValue)
                            nts.uk.ui.windows.setShared("KDL002_AllItemObj");
                            // Selected code list (value)
                            nts.uk.ui.windows.setShared("KDL002_SelectedItemId");
                            // Single/multiple (boolean)
                            nts.uk.ui.windows.setShared("KDL002_Multiple", false);
                            // Not select -> click button 決定 -> show msg10 or not (boolean)
                            nts.uk.ui.windows.setShared("KDL002_isAcceptSelectNone", false);
                            // Show item "選択なし" or not
                            nts.uk.ui.windows.setShared("KDL002_isShowNoSelectRow", false);
                            nts.uk.ui.windows.sub.modal("/view/kdl/002/a/index.xhtml", { title: "" }).onClosed(function () {
                                // Selected result
                                var ls = nts.uk.ui.windows.getShared('KDL002_SelectedNewItem');
                            });
                        };
                    });
                };
                ViewModel.prototype.settingColumns = function () {
                    var self = this, id = self.category.catId(), ctg = _.find(self.category.items(), function (m) { return m.id == id; });
                    setShared('CPS003D_PARAM', {
                        id: id,
                        name: ctg.categoryName
                    });
                    modal("/view/cps/003/d/index.xhtml").onClosed(function () {
                        var $grid = $("#grid"), columns = getShared('CPS003D_VALUE');
                        if (!columns)
                            return;
                        if (self.employees.length === 0) {
                            a_1.service.fetch.setting(self.category.catId()).done(function (data) {
                                if (ko.isObservable(self.settings.matrixDisplay)) {
                                    self.settings.matrixDisplay(data.matrixDisplay);
                                }
                                if (ko.isObservable(self.settings.perInfoData)) {
                                    self.settings.perInfoData(data.perInfoData);
                                }
                            });
                            self.requestData();
                            return;
                        }
                        _.forEach(self.settings.perInfoData(), function (itemInfo) {
                            if (_.find(columns, function (itemId) { return itemId === itemInfo.perInfoItemDefID; })) {
                                $grid.mGrid("showColumn", itemInfo.itemCD, true);
                                var item = _.find(self.gridOptions.columns, function (column) { return column.key === itemInfo.itemCD; });
                                if (!_.find(self.batchSettingItems, function (batchItem) { return batchItem === itemInfo.perInfoItemDefID; })
                                    && item && item.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.READONLY
                                    && item.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.RELATE_CATEGORY
                                    && item.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.NUMBERIC_BUTTON) {
                                    self.batchSettingItems.push(itemInfo.perInfoItemDefID);
                                }
                            }
                            else {
                                $grid.mGrid("hideColumn", itemInfo.itemCD, true);
                                _.remove(self.batchSettingItems, function (batchItem) { return batchItem === itemInfo.perInfoItemDefID; });
                            }
                        });
                        a_1.service.fetch.setting(self.category.catId()).done(function (data) {
                            if (ko.isObservable(self.settings.matrixDisplay)) {
                                self.settings.matrixDisplay(data.matrixDisplay);
                            }
                            if (ko.isObservable(self.settings.perInfoData)) {
                                self.settings.perInfoData(data.perInfoData);
                            }
                        });
                    });
                };
                ViewModel.prototype.settingBatchs = function () {
                    var self = this, $grid = $("#grid"), id = self.category.catId(), ctg = _.first(self.category.items(), function (m) { return m.id == id; });
                    setShared('CPS003F_PARAM', {
                        id: id,
                        baseDate: moment.utc(self.baseDate(), "YYYY/MM/DD").toISOString(),
                        // push list ids of item show in grid
                        itemsDefIds: self.batchSettingItems
                    });
                    modal("/view/cps/003/f/index.xhtml").onClosed(function () {
                        var replaceValue = getShared('CPS003F_VALUE');
                        if (!replaceValue)
                            return;
                        if (_.find(self.specialItems.standardDate, function (it) { return it === replaceValue.targetItem; })) {
                            if (replaceValue.replaceFormat === REPLACE_FORMAT.VALUE) {
                                $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                    if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                        return false;
                                    if (replaceValue.replaceAll)
                                        return true;
                                    if (value instanceof Date) {
                                        return replaceValue.matchValue === "".concat(value.getFullYear(), "/").concat(value.toLocaleDateString("en-US", { month: "2-digit" }).replace(/[^0-9-]/g, ""), "/").concat(value.toLocaleDateString("en-US", { day: "2-digit" }).replace(/[^0-9-]/g, ""));
                                    }
                                    if (value instanceof moment) {
                                        if (value.isValid()) {
                                            return replaceValue.matchValue === value.format("YYYY/MM/DD");
                                        }
                                        else {
                                            return ((_.isNil(value._i) || value._i === "") && (_.isNil(replaceValue.matchValue) || replaceValue.matchValue === ""))
                                                || value._i === replaceValue.matchValue;
                                        }
                                    }
                                    return replaceValue.matchValue === value;
                                }, function () { return replaceValue.replaceValue; }, true);
                            }
                            else if (replaceValue.replaceFormat === REPLACE_FORMAT.GRAND_DATE) { //　年休付与基準日
                                // Get 年休社員基本情報
                                var empIdList = _.map($grid.mGrid("dataSource"), function (ds) { return ds.employeeId; });
                                if (empIdList.length > 0) {
                                    a_1.service.fetch.basicHolidayEmpInfo({ listEmpID: empIdList }).done(function (infos) {
                                        var groupByEmpId = _.groupBy(infos, "employeeId");
                                        $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                            if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                                return false;
                                            if (replaceValue.replaceAll)
                                                return true;
                                            if (value instanceof Date) {
                                                return replaceValue.matchValue === "".concat(value.getFullYear(), "/").concat(value.toLocaleDateString("en-US", { month: "2-digit" }).replace(/[^0-9-]/g, ""), "/").concat(value.toLocaleDateString("en-US", { day: "2-digit" }).replace(/[^0-9-]/g, ""));
                                            }
                                            if (value instanceof moment) {
                                                if (value.isValid()) {
                                                    return replaceValue.matchValue === value.format("YYYY/MM/DD");
                                                }
                                                else {
                                                    return ((_.isNil(value._i) || value._i === "") && (_.isNil(replaceValue.matchValue) || replaceValue.matchValue === ""))
                                                        || value._i === replaceValue.matchValue;
                                                }
                                            }
                                            return replaceValue.matchValue === value;
                                        }, function (value, rec) {
                                            var holidayInfo = groupByEmpId[rec.employeeId];
                                            if (holidayInfo) {
                                                return holidayInfo[0].grantRule.grantStandardDate;
                                            }
                                        }, true);
                                    });
                                }
                            }
                            else if (replaceValue.replaceFormat === REPLACE_FORMAT.HIRE_DATE) {
                                // TODO: From standardDate and employeeId list, get historyItem and replace
                                var empIdList = _.map($grid.mGrid("dataSource"), function (ds) { return ds.employeeId; });
                                if (empIdList.length > 0) {
                                    a_1.service.fetch.affiliatedCompanyHist({ listEmpID: empIdList, baseDate: moment.utc(self.baseDate(), "YYYY/MM/DD").toISOString() }).done(function (histItems) {
                                        // Group histItems by employeeId
                                        var groupByEmpId = _.groupBy(histItems, "employeeID");
                                        $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                            if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                                return false;
                                            if (replaceValue.replaceAll)
                                                return true;
                                            if (value instanceof Date) {
                                                return replaceValue.matchValue === "".concat(value.getFullYear(), "/").concat(value.toLocaleDateString("en-US", { month: "2-digit" }).replace(/[^0-9-]/g, ""), "/").concat(value.toLocaleDateString("en-US", { day: "2-digit" }).replace(/[^0-9-]/g, ""));
                                            }
                                            if (value instanceof moment) {
                                                if (value.isValid()) {
                                                    return replaceValue.matchValue === value.format("YYYY/MM/DD");
                                                }
                                                else {
                                                    return ((_.isNil(value._i) || value._i === "") && (_.isNil(replaceValue.matchValue) || replaceValue.matchValue === ""))
                                                        || value._i === replaceValue.matchValue;
                                                }
                                            }
                                            return replaceValue.matchValue === value;
                                        }, function (value, rec) {
                                            var histItem = groupByEmpId[rec.employeeId];
                                            if (!_.isNil(histItem)) {
                                                return histItem[0].startDate;
                                            }
                                        }, true);
                                    });
                                }
                            }
                            else if (replaceValue.replaceFormat === REPLACE_FORMAT.DESI_YEAR_OE) {
                                // TODO: From standardDate and employeeId list, get historyItem and replace
                                var empIdList = _.map($grid.mGrid("dataSource"), function (ds) { return ds.employeeId; });
                                if (empIdList.length > 0) {
                                    a_1.service.fetch.affiliatedCompanyHist({ listEmpID: empIdList, baseDate: moment.utc(self.baseDate(), "YYYY/MM/DD").toISOString() }).done(function (histItems) {
                                        var groupByEmpId = _.groupBy(histItems, "employeeID");
                                        if (replaceValue.replaceValue[0] === YEAR_OF_JOIN.SAME) {
                                            // TODO: Replace by historyItem
                                            $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                                if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                                    return false;
                                                if (replaceValue.replaceAll)
                                                    return true;
                                                var v;
                                                if (value instanceof Date) {
                                                    v = moment(value).format("YYYY/MM/DD");
                                                }
                                                else if (value instanceof moment) {
                                                    if (value.isValid()) {
                                                        v = value.format("YYYY/MM/DD");
                                                    }
                                                    else {
                                                        return ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value._i) || value._i === ""))
                                                            || replaceValue.matchValue === value._i;
                                                    }
                                                }
                                                else
                                                    v = value;
                                                return replaceValue.matchValue === v;
                                            }, function (value, rec) {
                                                var histItem = groupByEmpId[rec.employeeId];
                                                if (!_.isNil(histItem)) {
                                                    var month = Math.floor(replaceValue.replaceValue[1] / 100), day = replaceValue.replaceValue[1] % 100, year = moment(histItem[0].startDate).year(), date = moment([year, month - 1, day]);
                                                    if (!date.isValid()) {
                                                        return moment([year, month - 1, day - 1]).format("YYYY/MM/DD");
                                                    }
                                                    return date.format("YYYY/MM/DD");
                                                }
                                            }, true);
                                        }
                                        else if (replaceValue.replaceValue[0] === YEAR_OF_JOIN.PREV) {
                                            $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                                if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                                    return false;
                                                if (replaceValue.replaceAll)
                                                    return true;
                                                var v;
                                                if (value instanceof Date) {
                                                    v = moment(value).format("YYYY/MM/DD");
                                                }
                                                else if (value instanceof moment) {
                                                    v = value.format("YYYY/MM/DD");
                                                }
                                                else
                                                    v = value;
                                                return replaceValue.matchValue === v;
                                            }, function (value, rec) {
                                                var histItem = groupByEmpId[rec.employeeId];
                                                if (!_.isNil(histItem)) {
                                                    var month = Math.floor(replaceValue.replaceValue[1] / 100), day = replaceValue.replaceValue[1] % 100, year = moment(histItem[0].startDate).year() - 1, date = moment([year, month - 1, day]);
                                                    if (!date.isValid()) {
                                                        return moment([year, month - 1, day - 1]).format("YYYY/MM/DD");
                                                    }
                                                    return date.format("YYYY/MM/DD");
                                                }
                                            }, true);
                                        }
                                        else {
                                            $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                                if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                                    return false;
                                                if (replaceValue.replaceAll)
                                                    return true;
                                                var v;
                                                if (value instanceof Date) {
                                                    v = moment(value).format("YYYY/MM/DD");
                                                }
                                                else if (value instanceof moment) {
                                                    v = value.format("YYYY/MM/DD");
                                                }
                                                else
                                                    v = value;
                                                return replaceValue.matchValue === v;
                                            }, function (value, rec) {
                                                var histItem = groupByEmpId[rec.employeeId];
                                                if (!_.isNil(histItem)) {
                                                    var month = Math.floor(replaceValue.replaceValue[1] / 100), day = replaceValue.replaceValue[1] % 100, year = moment(histItem[0].startDate).year() + 1, date = moment([year, month - 1, day]);
                                                    if (!date.isValid()) {
                                                        return moment([year, month - 1, day - 1]).format("YYYY/MM/DD");
                                                    }
                                                    return date.format("YYYY/MM/DD");
                                                }
                                            }, true);
                                        }
                                    });
                                }
                            }
                        }
                        else if (_.isArray(replaceValue.targetItem) && _.find(self.specialItems.workTime, function (it) { return it === replaceValue.targetItem[0]; })) {
                            var _loop_1 = function (i_1) {
                                var item = replaceValue.targetItem[i_1];
                                var replaced = replaceValue.replaceValue[i_1], dt = self.dataTypes[item];
                                if (dt && dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIMEPOINT && !_.isNil(replaced) && replaced !== "") {
                                    replaced = nts.uk.time.minutesBased.clock.dayattr.create(replaced).shortText;
                                }
                                else if (dt && dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIME && !_.isNil(replaced) && replaced !== "") {
                                    replaced = nts.uk.time.parseTime(replaced, true).format();
                                }
                                $grid.mGrid("replace", item, function (value, rec) {
                                    if (find(self.hiddenRows, function (id) { return id === rec.id; }))
                                        return false;
                                    if (replaceValue.replaceAll)
                                        return true;
                                    return replaceValue.matchValue === rec[replaceValue.targetItem[0]];
                                }, function () { return replaced; }, true);
                            };
                            for (var i_1 = replaceValue.targetItem.length - 1; i_1 >= 0; i_1--) {
                                _loop_1(i_1);
                            }
                        }
                        else if (self.specialItems.holidayLimit[0] === replaceValue.targetItem) {
                            if (replaceValue.replaceFormat === REPLACE_FORMAT.VALUE) { // 値指定
                                var replaced_1 = nts.uk.time.parseTime(replaceValue.replaceValue, true).format();
                                if (!_.isNil(replaceValue.matchValue) && replaceValue.matchValue !== "") {
                                    replaceValue.matchValue = nts.uk.time.parseTime(replaceValue.matchValue, true).format();
                                }
                                $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                    if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                        return false;
                                    if (replaceValue.replaceAll)
                                        return true;
                                    return replaceValue.matchValue === value
                                        || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value) || value === ""));
                                }, function (value, obj) {
                                    setTimeout(function () {
                                        var afterProc = cps003.control.NUMBER[self.category.catCode() + "_" + replaceValue.targetItem];
                                        if (afterProc) {
                                            afterProc(obj.id, replaceValue.targetItem, replaced_1, obj).done(function (res) {
                                                forEach(res, function (s) {
                                                    $grid.mGrid("updateCell", s.id, s.item, s.value);
                                                });
                                            });
                                        }
                                    }, 1);
                                    return replaced_1;
                                }, true);
                            }
                            else if (replaceValue.replaceFormat === REPLACE_FORMAT.CONTRACT_TIME) { // 契約時間
                                // TODO: Get contract time
                                var empIdList = _.map($grid.mGrid("dataSource"), function (ds) { return ds.employeeId; });
                                a_1.service.fetch.contractTime({ baseDate: moment.utc(self.baseDate(), "YYYY/MM/DD").toISOString(), listEmpID: empIdList }).done(function (contractTimes) {
                                    var groupByEmpId = _.groupBy(contractTimes, "employeeID");
                                    if (!_.isNil(replaceValue.matchValue) && replaceValue.matchValue !== "") {
                                        replaceValue.matchValue = nts.uk.time.parseTime(replaceValue.matchValue, true).format();
                                    }
                                    $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                        if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                            return false;
                                        if (replaceValue.replaceAll)
                                            return true;
                                        return replaceValue.matchValue === value
                                            || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value) || value === ""));
                                    }, function (value, rec) {
                                        var contractTime = groupByEmpId[rec.employeeId];
                                        var replaced = "";
                                        if (!_.isNil(contractTime)) {
                                            replaced = nts.uk.time.parseTime(replaceValue.replaceValue * contractTime[0].contractTime, true).format();
                                        }
                                        setTimeout(function () {
                                            var afterProc = cps003.control.NUMBER[self.category.catCode() + "_" + replaceValue.targetItem];
                                            if (afterProc) {
                                                afterProc(rec.id, replaceValue.targetItem, replaced, rec).done(function (res) {
                                                    forEach(res, function (s) {
                                                        $grid.mGrid("updateCell", s.id, s.item, s.value);
                                                    });
                                                });
                                            }
                                        }, 1);
                                        return replaced;
                                    }, true);
                                });
                            }
                        }
                        else if (replaceValue.mode === APPLY_MODE.AMOUNT) {
                            if (replaceValue.replaceFormat === REPLACE_FORMAT.ADD_OR_SUB) { // 加減算
                                $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                    if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                        return false;
                                    if (_.isNil(value) || value === "")
                                        return false;
                                    if (replaceValue.replaceAll)
                                        return true;
                                    return replaceValue.matchValue === value
                                        || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value) || value === ""));
                                }, function (value) { return String(replaceValue.replaceValue + value); }, true);
                            }
                            else if (replaceValue.replaceFormat === REPLACE_FORMAT.VALUE) { // 値指定
                                $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                    if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                        return false;
                                    if (replaceValue.replaceAll)
                                        return true;
                                    return replaceValue.matchValue === value
                                        || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value) || value === ""));
                                }, function () {
                                    return !_.isNil(replaceValue.replaceValue) ? String(replaceValue.replaceValue) : null;
                                }, true);
                            }
                        }
                        else if (_.find(self.specialItems.workplace, function (it) { return it === replaceValue.targetItem; })) {
                            var wpName_1 = {}, promises_1 = [], dates_1 = [];
                            _.forEach($grid.mGrid("dataSource"), function (ds) {
                                var dateStr = moment.utc(ds["IS00082"]).toISOString();
                                if (!_.isNil(wpName_1[dateStr]))
                                    return;
                                promises_1.push(a_1.service.fetch.workplaceInfo({ baseDate: dateStr, listWorkplaceID: [replaceValue.replaceValue] }));
                                dates_1.push(dateStr);
                            });
                            $.when.apply($, promises_1).done(function () {
                                for (var i_2 = 0; i_2 < arguments.length; i_2++) {
                                    if (arguments[i_2] && arguments[i_2].length > 0) {
                                        wpName_1[dates_1[i_2]] = arguments[i_2][0].workplaceId;
                                    }
                                }
                                $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                    if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                        return false;
                                    if (replaceValue.replaceAll)
                                        return true;
                                    return replaceValue.matchValue === value;
                                }, function (value, rec) {
                                    var dateStr = moment.utc(rec["IS00082"]).toISOString();
                                    return wpName_1[dateStr] || null;
                                }, true);
                            });
                        }
                        else if (_.find(self.specialItems.department, function (it) { return it === replaceValue.targetItem; })) {
                        }
                        else if (replaceValue.mode === APPLY_MODE.SELECTION) {
                            $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                    return false;
                                if (replaceValue.replaceAll)
                                    return true;
                                return replaceValue.matchValue === value
                                    || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value) || value === ""))
                                    || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && !find($grid.mGrid("optionsList", obj.id, replaceValue.targetItem), function (opt) { return opt.optionValue === value; }));
                            }, function (value, obj) {
                                var replaced = replaceValue.replaceValue;
                                setTimeout(function () {
                                    var afterProc = cps003.control.COMBOBOX[self.category.catCode() + "_" + replaceValue.targetItem];
                                    if (afterProc) {
                                        afterProc(replaced, obj.id, obj);
                                    }
                                }, 1);
                                return replaced;
                            }, true);
                        }
                        else {
                            var replaced_2 = replaceValue.replaceValue, dt = self.dataTypes[replaceValue.targetItem];
                            if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIMEPOINT) {
                                if (!_.isNil(replaced_2) && replaced_2 !== "") {
                                    replaced_2 = nts.uk.time.minutesBased.clock.dayattr.create(replaced_2).shortText;
                                }
                                if (!replaceValue.replaceAll && !_.isNil(replaceValue.matchValue) && replaceValue.matchValue !== "") {
                                    replaceValue.matchValue = nts.uk.time.minutesBased.clock.dayattr.create(replaceValue.matchValue).shortText;
                                }
                            }
                            else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIME) {
                                if (!_.isNil(replaced_2) && replaced_2 !== "") {
                                    replaced_2 = nts.uk.time.parseTime(replaced_2, true).format();
                                }
                                if (!replaceValue.replaceAll && !_.isNil(replaceValue.matchValue) && replaceValue.matchValue !== "") {
                                    replaceValue.matchValue = nts.uk.time.parseTime(replaceValue.matchValue, true).format();
                                }
                            }
                            else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.DATE) {
                                if (_.isNil(replaced_2))
                                    replaced_2 = "";
                            }
                            $grid.mGrid("replace", replaceValue.targetItem, function (value, obj) {
                                if (find(self.hiddenRows, function (id) { return id === obj.id; }))
                                    return false;
                                if (replaceValue.replaceAll
                                    || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value) || value === "")))
                                    return true;
                                if (value instanceof Date) {
                                    return replaceValue.matchValue === "".concat(value.getFullYear(), "/").concat(value.toLocaleDateString("en-US", { month: "2-digit" }).replace(/[^0-9-]/g, ""), "/").concat(value.toLocaleDateString("en-US", { day: "2-digit" }).replace(/[^0-9-]/g, ""));
                                }
                                else if (value instanceof moment) {
                                    if (!value.isValid()) {
                                        return replaceValue.matchValue === value._i
                                            || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value._i) || value._i === ""));
                                    }
                                    return replaceValue.matchValue === value.format("YYYY/MM/DD");
                                }
                                return (_.isString(replaceValue.matchValue) && _.trim(replaceValue.matchValue) === value)
                                    || replaceValue.matchValue === value
                                    || ((_.isNil(replaceValue.matchValue) || replaceValue.matchValue === "") && (_.isNil(value) || value === ""));
                            }, function (value, obj) {
                                setTimeout(function () {
                                    var afterProc = cps003.control.NUMBER[self.category.catCode() + "_" + replaceValue.targetItem];
                                    if (afterProc) {
                                        afterProc(obj.id, replaceValue.targetItem, replaced_2, obj).done(function (res) {
                                            forEach(res, function (s) {
                                                $grid.mGrid("updateCell", s.id, s.item, s.value);
                                            });
                                        });
                                    }
                                }, 1);
                                return replaced_2;
                            }, true);
                        }
                    });
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            function find(arr, jb) {
                if (!arr)
                    return;
                for (var i_3 = 0; i_3 < arr.length; i_3++) {
                    if (jb(arr[i_3], i_3))
                        return arr[i_3];
                }
                return null;
            }
            function findAll(arr, jb) {
                if (!arr)
                    return;
                var result = [];
                for (var i_4 = 0; i_4 < arr.length; i_4++) {
                    if (jb(arr[i_4], i_4))
                        result.push(arr[i_4]);
                }
                return result;
            }
            function forEach(arr, jb) {
                if (!arr)
                    return;
                for (var i_5 = 0; i_5 < arr.length; i_5++) {
                    if (jb(arr[i_5], i_5) === false)
                        break;
                }
            }
            var Employee = /** @class */ (function () {
                function Employee() {
                }
                return Employee;
            }());
            var ACTION_ROLE;
            (function (ACTION_ROLE) {
                ACTION_ROLE[ACTION_ROLE["HIDDEN"] = "HIDDEN"] = "HIDDEN";
                ACTION_ROLE[ACTION_ROLE["VIEW_ONLY"] = "VIEW_ONLY"] = "VIEW_ONLY";
                ACTION_ROLE[ACTION_ROLE["EDIT"] = "EDIT"] = "EDIT";
            })(ACTION_ROLE = vm.ACTION_ROLE || (vm.ACTION_ROLE = {}));
            // define ITEM_SINGLE_TYPE
            // type of item if it's single item
            var ITEM_SINGLE_TYPE;
            (function (ITEM_SINGLE_TYPE) {
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["STRING"] = 1] = "STRING";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMERIC"] = 2] = "NUMERIC";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["DATE"] = 3] = "DATE";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIME"] = 4] = "TIME";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIMEPOINT"] = 5] = "TIMEPOINT";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SELECTION"] = 6] = "SELECTION";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_RADIO"] = 7] = "SEL_RADIO";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_BUTTON"] = 8] = "SEL_BUTTON";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY"] = 9] = "READONLY";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["RELATE_CATEGORY"] = 10] = "RELATE_CATEGORY";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMBERIC_BUTTON"] = 11] = "NUMBERIC_BUTTON";
                ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY_BUTTON"] = 12] = "READONLY_BUTTON";
            })(ITEM_SINGLE_TYPE = vm.ITEM_SINGLE_TYPE || (vm.ITEM_SINGLE_TYPE = {}));
            // define ITEM_STRING_DATA_TYPE
            var ITEM_STRING_DTYPE;
            (function (ITEM_STRING_DTYPE) {
                ITEM_STRING_DTYPE[ITEM_STRING_DTYPE["FIXED_LENGTH"] = 1] = "FIXED_LENGTH";
                ITEM_STRING_DTYPE[ITEM_STRING_DTYPE["VARIABLE_LENGTH"] = 2] = "VARIABLE_LENGTH"; // variable length
            })(ITEM_STRING_DTYPE = vm.ITEM_STRING_DTYPE || (vm.ITEM_STRING_DTYPE = {}));
            var ITEM_STRING_TYPE;
            (function (ITEM_STRING_TYPE) {
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANY"] = 1] = "ANY";
                // 2:全ての半角文字(AnyHalfWidth)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANYHALFWIDTH"] = 2] = "ANYHALFWIDTH";
                // 3:半角英数字(AlphaNumeric)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["ALPHANUMERIC"] = 3] = "ALPHANUMERIC";
                // 4:半角数字(Numeric)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["NUMERIC"] = 4] = "NUMERIC";
                // 5:全角カタカナ(Kana)
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["KANA"] = 5] = "KANA";
                // 6: カードNO
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["CARDNO"] = 6] = "CARDNO";
                // 7: 社員コード
                ITEM_STRING_TYPE[ITEM_STRING_TYPE["EMPLOYEE_CODE"] = 7] = "EMPLOYEE_CODE";
            })(ITEM_STRING_TYPE = vm.ITEM_STRING_TYPE || (vm.ITEM_STRING_TYPE = {}));
            // define ITEM_SELECT_TYPE
            // type of item if it's selection item
            var ITEM_SELECT_TYPE;
            (function (ITEM_SELECT_TYPE) {
                // 1:専用マスタ(DesignatedMaster)
                ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["DESIGNATED_MASTER"] = "DESIGNATED_MASTER"] = "DESIGNATED_MASTER";
                // 2:コード名称(CodeName)
                ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["CODE_NAME"] = "CODE_NAME"] = "CODE_NAME";
                // 3:列挙型(Enum)
                ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["ENUM"] = "ENUM"] = "ENUM";
            })(ITEM_SELECT_TYPE = vm.ITEM_SELECT_TYPE || (vm.ITEM_SELECT_TYPE = {}));
            var DateType;
            (function (DateType) {
                DateType[DateType["YEARMONTHDAY"] = 1] = "YEARMONTHDAY";
                DateType[DateType["YEARMONTH"] = 2] = "YEARMONTH";
                DateType[DateType["YEAR"] = 3] = "YEAR";
            })(DateType || (DateType = {}));
            var State = /** @class */ (function () {
                function State(rowId, columnKey, state) {
                    this.rowId = rowId;
                    this.columnKey = columnKey;
                    this.state = state;
                }
                return State;
            }());
            var Record = /** @class */ (function () {
                function Record(data, rowNumber) {
                    if (!data)
                        return this;
                    this.rowNumber = rowNumber + 1;
                    this.id = (data.items && data.items[0] && data.items[0].recordId) || nts.uk.util.randomId() + "_noData";
                    this.personId = data.personId;
                    this.employeeId = data.employeeId;
                    this.employeeCode = data.employee.code;
                    this.employeeName = data.employee.name;
                    this.classCode = data.classification.code;
                    this.className = data.classification.name;
                    this.deptCode = data.department.code;
                    this.deptName = data.department.name;
                    this.employmentCode = data.employment.code;
                    this.employmentName = data.employment.name;
                    this.positionCode = data.position.code;
                    this.positionName = data.position.name;
                    this.workplaceCode = data.workplace.code;
                    this.workplaceName = data.workplace.name;
                    this.register = false;
                    this.print = false;
                }
                return Record;
            }());
            var GridEmployeeInfoDataSource = /** @class */ (function () {
                function GridEmployeeInfoDataSource(record, heads, $grid) {
                    var _this = this;
                    this.items = [];
                    this.personId = record.personId;
                    this.employeeId = record.employeeId;
                    this.employeeCode = record.employeeCode;
                    this.employeeName = record.employeeName;
                    this.departmentName = record.deptName;
                    this.workplaceName = record.workplaceName;
                    this.positionName = record.positionName;
                    this.employmentName = record.employmentName;
                    this.classificationName = record.className;
                    //            _.forEach(_.keys(record), f => {
                    //                if (_.find(heads, (h: IDataHead) => h.itemCode === f)) {
                    //                    this.items.push(new GridEmpBodyDataSource(f, record, $grid));
                    //                }
                    //            });
                    _.forEach(heads, function (h) {
                        _this.items.push(new GridEmpBodyDataSource(h.itemCode, record, $grid));
                    });
                }
                return GridEmployeeInfoDataSource;
            }());
            var GridEmpBodyDataSource = /** @class */ (function () {
                function GridEmpBodyDataSource(itemCode, record, $grid) {
                    this.recordId = record.id;
                    this.itemCode = itemCode;
                    var value = record[itemCode];
                    if (value instanceof Date) {
                        this.value = moment(value).format("YYYY/MM/DD");
                    }
                    else if (value instanceof moment) {
                        this.value = value._i;
                    }
                    else
                        this.value = value;
                    this.lstComboBoxValue = $grid.mGrid("optionsList", this.recordId, this.itemCode);
                }
                return GridEmpBodyDataSource;
            }());
            var ComboBoxObject = /** @class */ (function () {
                function ComboBoxObject() {
                }
                return ComboBoxObject;
            }());
            var EDIT_METHOD;
            (function (EDIT_METHOD) {
                EDIT_METHOD[EDIT_METHOD["PreviousZero"] = 1] = "PreviousZero";
                EDIT_METHOD[EDIT_METHOD["AfterZero"] = 2] = "AfterZero";
                EDIT_METHOD[EDIT_METHOD["PreviousSpace"] = 3] = "PreviousSpace";
                EDIT_METHOD[EDIT_METHOD["AfterSpace"] = 4] = "AfterSpace";
            })(EDIT_METHOD || (EDIT_METHOD = {}));
            var AnnualLeaveEmpBasicInfo = /** @class */ (function () {
                function AnnualLeaveEmpBasicInfo() {
                }
                return AnnualLeaveEmpBasicInfo;
            }());
            var AnnualLeaveGrantRule = /** @class */ (function () {
                function AnnualLeaveGrantRule() {
                }
                return AnnualLeaveGrantRule;
            }());
            var AffCompanyEmpHistItem = /** @class */ (function () {
                function AffCompanyEmpHistItem() {
                }
                return AffCompanyEmpHistItem;
            }());
            var DatePeriod = /** @class */ (function () {
                function DatePeriod() {
                }
                return DatePeriod;
            }());
            var IUSE_SETTING;
            (function (IUSE_SETTING) {
                IUSE_SETTING[IUSE_SETTING["USE"] = 'USE'] = "USE";
                IUSE_SETTING[IUSE_SETTING["NOT_USE"] = 'NOT_USE'] = "NOT_USE";
            })(IUSE_SETTING || (IUSE_SETTING = {}));
            var CURSOR_DIRC;
            (function (CURSOR_DIRC) {
                CURSOR_DIRC[CURSOR_DIRC["VERTICAL"] = 'VERTICAL'] = "VERTICAL";
                CURSOR_DIRC[CURSOR_DIRC["HORIZONTAL"] = 'HORIZONTAL'] = "HORIZONTAL";
            })(CURSOR_DIRC || (CURSOR_DIRC = {}));
            var IT_CAT_TYPE;
            (function (IT_CAT_TYPE) {
                IT_CAT_TYPE[IT_CAT_TYPE["SINGLE"] = 1] = "SINGLE";
                IT_CAT_TYPE[IT_CAT_TYPE["MULTI"] = 2] = "MULTI";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINU"] = 3] = "CONTINU";
                IT_CAT_TYPE[IT_CAT_TYPE["NODUPLICATE"] = 4] = "NODUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["DUPLICATE"] = 5] = "DUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINUWED"] = 6] = "CONTINUWED"; // Continuos history with end date
            })(IT_CAT_TYPE = vm.IT_CAT_TYPE || (vm.IT_CAT_TYPE = {}));
            var APPLY_MODE;
            (function (APPLY_MODE) {
                APPLY_MODE[APPLY_MODE["DATE"] = 1] = "DATE";
                APPLY_MODE[APPLY_MODE["STRING"] = 2] = "STRING";
                APPLY_MODE[APPLY_MODE["TIME"] = 3] = "TIME";
                APPLY_MODE[APPLY_MODE["CLOCK"] = 4] = "CLOCK";
                APPLY_MODE[APPLY_MODE["NUMBER"] = 5] = "NUMBER";
                APPLY_MODE[APPLY_MODE["AMOUNT"] = 6] = "AMOUNT";
                APPLY_MODE[APPLY_MODE["SELECTION"] = 7] = "SELECTION";
                APPLY_MODE[APPLY_MODE["WORKTIME"] = 8] = "WORKTIME";
                APPLY_MODE[APPLY_MODE["GRANDDATE"] = 9] = "GRANDDATE";
                APPLY_MODE[APPLY_MODE["TIMEYEAR"] = 10] = "TIMEYEAR";
            })(APPLY_MODE || (APPLY_MODE = {}));
            var REPLACE_FORMAT;
            (function (REPLACE_FORMAT) {
                REPLACE_FORMAT[REPLACE_FORMAT["VALUE"] = 0] = "VALUE";
                REPLACE_FORMAT[REPLACE_FORMAT["ADD_OR_SUB"] = 1] = "ADD_OR_SUB";
                REPLACE_FORMAT[REPLACE_FORMAT["HIRE_DATE"] = 2] = "HIRE_DATE";
                REPLACE_FORMAT[REPLACE_FORMAT["GRAND_DATE"] = 3] = "GRAND_DATE";
                REPLACE_FORMAT[REPLACE_FORMAT["DESI_YEAR_OE"] = 4] = "DESI_YEAR_OE";
                REPLACE_FORMAT[REPLACE_FORMAT["CONTRACT_TIME"] = 5] = "CONTRACT_TIME"; //契約時間
            })(REPLACE_FORMAT || (REPLACE_FORMAT = {}));
            var YEAR_OF_JOIN;
            (function (YEAR_OF_JOIN) {
                YEAR_OF_JOIN[YEAR_OF_JOIN["SAME"] = 0] = "SAME";
                YEAR_OF_JOIN[YEAR_OF_JOIN["PREV"] = 1] = "PREV";
                YEAR_OF_JOIN[YEAR_OF_JOIN["NEXT"] = 2] = "NEXT"; //翌年
            })(YEAR_OF_JOIN || (YEAR_OF_JOIN = {}));
        })(vm = a_1.vm || (a_1.vm = {}));
    })(a = cps003.a || (cps003.a = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.a.vm.js.map