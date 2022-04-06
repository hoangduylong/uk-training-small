var cps003;
(function (cps003) {
    var c;
    (function (c_1) {
        var vm;
        (function (vm) {
            var confirm = nts.uk.ui.dialog.confirm;
            var alertError = nts.uk.ui.dialog.alertError;
            var info = nts.uk.ui.dialog.info;
            var modeless = nts.uk.ui.windows.sub.modeless;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var block = nts.uk.ui.block.grayout;
            var unblock = nts.uk.ui.block.clear;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.baseDate = ko.observable();
                    this.updateMode = ko.observable();
                    this.perInfoCatePermission = ko.observable();
                    this.category = {
                        catId: ko.observable(""),
                        catCode: ko.observable(""),
                        cate: ko.observable()
                    };
                    this.gridOptions = { dataSource: [], columns: [], features: [], ntsControls: [] };
                    this.dataTypes = {};
                    this.updatedDatas = {};
                    var self = this;
                    cps003.control.selectButton();
                    cps003.control.relateButton();
                    cps003.control.validateDateRange();
                    cps003.control.extendTimeRange();
                }
                ScreenModel.prototype.start = function () {
                    var self = this;
                    var param = getShared("CPS003G_PARAM"), paramB = getShared("CPS003B_PARAM");
                    block();
                    self.baseDate(param.baseDate);
                    self.updateMode(paramB.updateMode);
                    self.category.catId(param.catId);
                    self.category.cate(param.cate);
                    self.category.catCode(param.cate.categoryCode);
                    self.perInfoCatePermission(param.perInfoCatePermission);
                    if (paramB && paramB.headDatas) {
                        self.convertData(paramB).done(function (errs) {
                            setTimeout(function () {
                                self.loadGrid();
                                self.initDs = _.cloneDeep(self.gridOptions.dataSource);
                                var $grid = $("#grid");
                                //                    $grid.mGrid("validate", null, () => true);
                                //                    self.validateSpecial(null, self.gridOptions.dataSource);
                                forEach(errs, function (e) {
                                    if (_.isNil(e.id)) {
                                        var rec = self.initDs[e.index];
                                        if (rec) {
                                            e.id = rec.id;
                                        }
                                    }
                                });
                                if (errs && errs.length > 0) {
                                    $grid.mGrid("setErrors", errs);
                                }
                                //                    let errors = $grid.mGrid("errors");
                                //                    if (errors.length > 0) {
                                //                        let errGroup = _.groupBy(errors, "rowId");
                                //                        _.forEach(_.keys(errGroup), id => {
                                //                            $grid.mGrid("updateCell", id, "status", "エラー(" + errGroup[id].length + "件)", true);
                                //                        });
                                //                    }
                            }, 100);
                            unblock();
                        });
                    }
                };
                ScreenModel.prototype.convertData = function (data) {
                    var self = this, dfd = $.Deferred();
                    if (data.headDatas) {
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
                        var item_1, control_1, parent_1 = {}, hideRowAdd = void 0;
                        self.dataTypes = {};
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
                            { headerText: nts.uk.resource.getText("CPS003_50"), key: "register", dataType: "boolean", width: "30px", ntsControl: "RegCheckBox", bound: true },
                            { headerText: nts.uk.resource.getText("CPS003_51"), key: "status", dataType: "string", width: "100px", ntsControl: "Label" },
                            { headerText: nts.uk.resource.getText("CPS003_52"), key: "employeeCode", dataType: "string", width: "100px", ntsControl: "Label" },
                            { headerText: nts.uk.resource.getText("CPS003_53"), key: "employeeName", dataType: "string", width: "140px", ntsControl: "Label" },
                            { headerText: nts.uk.resource.getText("CPS003_130"), key: "rowAdd", dataType: "string", width: "40px", ntsControl: "RowAdd", hidden: hideRowAdd }
                        ];
                        self.gridOptions.ntsControls = [
                            { name: 'RegCheckBox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true },
                            { name: "RowAdd", source: "plus-button", cssClass: "blue-color", controlType: "Image", copy: 2 }
                        ];
                        var headerStyles_1 = { name: "HeaderStyles", columns: [] };
                        _.forEach(data.headDatas, function (d) {
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
                                item_1 = { headerText: name_1, itemId: d.itemId, itemName: d.itemName, key: d.itemCode, required: d.required, parentCode: d.itemParentCode, dataType: "string", width: "100px", perInfoTypeState: controlType };
                                controlType.required = d.required;
                                control_1 = self.getControlType(controlType, item_1);
                                self.gridOptions.columns.push(item_1);
                                if (control_1) {
                                    self.gridOptions.ntsControls.push(control_1);
                                    var combo = cps003.control.COMBOBOX[self.category.catCode() + "_" + d.itemCode];
                                    if (combo) {
                                        control_1.inputProcess = combo;
                                    }
                                    if (control_1.controlType === "DatePicker") {
                                        var dp_1 = cps003.control.DATE_RANGE[self.category.catCode() + "_" + d.itemCode];
                                        if (dp_1) {
                                            if (control_1.inputProcess) {
                                                var existedProcess_1 = control_1.inputProcess;
                                                var format_1 = control_1.format;
                                                control_1.inputProcess = function () {
                                                    existedProcess_1.apply(null, arguments);
                                                    dp_1.apply(null, _.concat(d.required, format_1, arguments));
                                                };
                                            }
                                            else {
                                                control_1.inputProcess = dp_1.bind(null, d.required, control_1.format);
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
                        self.gridOptions.features = [{ name: "Resizing" }, { name: "Copy" }, { name: "Tooltip", error: true }, { name: "WidthSaving", reset: true }];
                        // TODO: Get fixed columns
                        var columnFixing_1 = { name: "ColumnFixing", columnSettings: [] };
                        _.forEach(["register", "status", "employeeCode", "employeeName", "rowAdd"], function (f) {
                            columnFixing_1.columnSettings.push({ columnKey: f, isFixed: true });
                        });
                        self.gridOptions.features.push(columnFixing_1);
                        self.gridOptions.features.push(headerStyles_1);
                    }
                    if (data.employees) {
                        self.gridOptions.dataSource = [];
                        var states_1 = [], workTimeCodes_1 = [], nullWorkTimeCodes_1 = [], workTimeItems_1 = [], nullWorkTimeItems_1 = [], codes_1 = {}, displayItems_1 = [];
                        _.forEach(self.gridOptions.columns, function (column, i) {
                            if (i < 5)
                                return;
                            displayItems_1.push(column.key);
                        });
                        //                data.employees.sort((emp1, emp2) => {
                        //                    if (_.isNil(emp1.employeeCode) && _.isNil(emp2.employeeCode)) return 0;
                        //                    if (_.isNil(emp1.employeeCode)) return -1;
                        //                    if (_.isNil(emp2.employeeCode)) return 1;
                        //                    return emp1.employeeCode.compareTo(emp2.employeeCode);
                        //                });
                        _.forEach(data.employees, function (d) {
                            var record = new Record(d), disItems = _.cloneDeep(displayItems_1);
                            _.forEach(d.items, function (item) {
                                var dt = self.dataTypes[item.itemCode], disabled;
                                if (_.isNil(item.recordId))
                                    item.recordId = record.id;
                                if (item.update) {
                                    if (_.has(self.updatedDatas, record.id)) {
                                        self.updatedDatas[record.id].push(item);
                                    }
                                    else {
                                        self.updatedDatas[record.id] = [item];
                                    }
                                }
                                if (!dt)
                                    return;
                                if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.DATE) {
                                    var momentObj = moment.utc(item.value, "YYYY/MM/DD");
                                    record[item.itemCode] = _.isNil(item.value) || item.value === "" || !momentObj.isValid() ? item.value : momentObj.toDate();
                                    if (self.category.catCode() === "CS00070" && (item.itemCode === "IS00781" || item.itemCode === "IS00782")) {
                                        states_1.push(new State(record.id, item.itemCode, ["mgrid-disable"]));
                                        disabled = true;
                                    }
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIMEPOINT && !_.isNil(item.value)) {
                                    var toNumber = Number(item.value);
                                    record[item.itemCode] = isNaN(toNumber) ? item.value : nts.uk.time.minutesBased.clock.dayattr.create(toNumber).shortText;
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.TIME && !_.isNil(item.value)) {
                                    var parsed = nts.uk.time.parseTime(item.value, true);
                                    record[item.itemCode] = parsed.success ? parsed.format() : item.value;
                                }
                                else if (dt.cls.dataTypeValue === ITEM_SINGLE_TYPE.READONLY) {
                                    if (self.category.catCode() === "CS00024" && item.itemCode === "IS00289") {
                                        record[item.itemCode] = !_.isNil(item.value) && item.value !== "" ? nts.uk.time.parseTime(item.value).format() : "";
                                    }
                                    else {
                                        record[item.itemCode] = item.value;
                                    }
                                }
                                else {
                                    record[item.itemCode] = item.value;
                                }
                                if (item.actionRole === ACTION_ROLE.VIEW_ONLY && !disabled) {
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
                                            workTimeCodes_1.push(item.value);
                                            workTimeItems_1.push(item.itemCode);
                                        }
                                        else {
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
                            });
                            _.forEach(disItems, function (itm) { return states_1.push(new State(record.id, itm, ["mgrid-lock"])); });
                            self.gridOptions.dataSource.push(record);
                        });
                        var errors_1 = _.map(data.errorItems, function (e) {
                            var column = find(self.gridOptions.columns, function (col) { return col.key === e.columnKey; });
                            var itemName = column ? column.headerText : "";
                            return { id: e.recordId, index: e.index, columnKey: e.columnKey, message: nts.uk.resource.getMessage(e.message, [itemName]) };
                        });
                        if (workTimeCodes_1.length > 0) {
                            cps003.control.fetch.check_mt_se({ workTimeCodes: workTimeCodes_1 }).done(function (mt) {
                                _.forEach(workTimeCodes_1, function (c, i) {
                                    var head = _.find(mt, function (f) { return f.workTimeCode === c; }), itemCode = workTimeItems_1[i], workTime = cps003.control.WORK_TIME[itemCode];
                                    if (head) {
                                        if (workTime.firstTimes && !head.startEnd) {
                                            _.forEach(codes_1[c], function (r) {
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.start, ["mgrid-disable"]));
                                                }
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.end, ["mgrid-disable"]));
                                                }
                                            });
                                        }
                                        if (workTime.secondTimes && (!head.startEnd || !head.multiTime)) {
                                            _.forEach(codes_1[c], function (r) {
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
                                            _.forEach(codes_1[c], function (r) {
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.start, ["mgrid-disable"]));
                                                }
                                                if (r.column === itemCode) {
                                                    states_1.push(new State(r.id, workTime.firstTimes.end, ["mgrid-disable"]));
                                                }
                                            });
                                        }
                                        if (workTime.secondTimes) {
                                            _.forEach(codes_1[c], function (r) {
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
                                dfd.resolve(errors_1);
                            });
                        }
                        else
                            dfd.resolve(errors_1);
                        _.forEach(nullWorkTimeCodes_1, function (c, i) {
                            var itemCode = nullWorkTimeItems_1[i], workTime = cps003.control.WORK_TIME[itemCode];
                            if (workTime.firstTimes) {
                                _.forEach(codes_1[c], function (r) {
                                    if (r.column === itemCode) {
                                        states_1.push(new State(r.id, workTime.firstTimes.start, ["mgrid-disable"]));
                                    }
                                    if (r.column === itemCode) {
                                        states_1.push(new State(r.id, workTime.firstTimes.end, ["mgrid-disable"]));
                                    }
                                });
                            }
                            if (workTime.secondTimes) {
                                _.forEach(codes_1[c], function (r) {
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
                ScreenModel.prototype.combobox = function (id, item, states, record) {
                    switch (this.category.cate().categoryCode) {
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
                                    }
                                    else if (item.value === "2") {
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00124"; })) {
                                            states.push(new State(id, "IS00124", ["mgrid-disable"]));
                                        }
                                        if (!_.find(states, function (s) { return s.rowId === id && s.columnKey === "IS00125"; })) {
                                            states.push(new State(id, "IS00125", ["mgrid-disable"]));
                                        }
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
                                        states.push(new State(id, "IS00300", ["mgrid-disable"]));
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
                                        states.push(new State(id, "IS00307", ["mgrid-disable"]));
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
                                        states.push(new State(id, "IS00314", ["mgrid-disable"]));
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
                                        states.push(new State(id, "IS00321", ["mgrid-disable"]));
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
                                        states.push(new State(id, "IS00328", ["mgrid-disable"]));
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
                                        states.push(new State(id, "IS00335", ["mgrid-disable"]));
                                        states.push(new State(id, "IS00336", ["mgrid-disable"]));
                                    }
                                    break;
                            }
                            break;
                        case "CS00031":
                            switch (item.itemCode) {
                                case "IS00338":
                                    if (item.value === "0") {
                                        _.forEach(['IS00339', 'IS00340', 'IS00341', 'IS00342', 'IS00343'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00032":
                            switch (item.itemCode) {
                                case "IS00345":
                                    if (item.value === "0") {
                                        _.forEach(['IS00346', 'IS00347', 'IS00348', 'IS00349', 'IS00350'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00033":
                            switch (item.itemCode) {
                                case "IS00352":
                                    if (item.value === "0") {
                                        _.forEach(['IS00353', 'IS00354', 'IS00355', 'IS00356', 'IS00357'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00034":
                            switch (item.itemCode) {
                                case "IS00359":
                                    if (item.value === "0") {
                                        _.forEach(['IS00360', 'IS00361', 'IS00362', 'IS00363', 'IS00364'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
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
                                        _.forEach(['IS00561', 'IS00562', 'IS00563', 'IS00564', 'IS00565'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00050":
                            switch (item.itemCode) {
                                case "IS00567":
                                    if (item.value === "0") {
                                        _.forEach(['IS00568', 'IS00569', 'IS00570', 'IS00571', 'IS00572'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00051":
                            switch (item.itemCode) {
                                case "IS00574":
                                    if (item.value === "0") {
                                        _.forEach(['IS00575', 'IS00576', 'IS00577', 'IS00578', 'IS00579'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00052":
                            switch (item.itemCode) {
                                case "IS00581":
                                    if (item.value === "0") {
                                        _.forEach(['IS00582', 'IS00583', 'IS00584', 'IS00585', 'IS00586'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00053":
                            switch (item.itemCode) {
                                case "IS00588":
                                    if (item.value === "0") {
                                        _.forEach(['IS00589', 'IS00590', 'IS00591', 'IS00592', 'IS00593'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00054":
                            switch (item.itemCode) {
                                case "IS00595":
                                    if (item.value === "0") {
                                        _.forEach(['IS00596', 'IS00597', 'IS00598', 'IS00599', 'IS00600'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00055":
                            switch (item.itemCode) {
                                case "IS00602":
                                    if (item.value === "0") {
                                        _.forEach(['IS00603', 'IS00604', 'IS00605', 'IS00606', 'IS00607'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00056":
                            switch (item.itemCode) {
                                case "IS00609":
                                    if (item.value === "0") {
                                        _.forEach(['IS00610', 'IS00611', 'IS00612', 'IS00613', 'IS00614'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00057":
                            switch (item.itemCode) {
                                case "IS00616":
                                    if (item.value === "0") {
                                        _.forEach(['IS00617', 'IS00618', 'IS00619', 'IS00620', 'IS00621'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                        case "CS00058":
                            switch (item.itemCode) {
                                case "IS00623":
                                    if (item.value === "0") {
                                        _.forEach(['IS00624', 'IS00625', 'IS00626', 'IS00627', 'IS00628'], function (code) {
                                            states.push(new State(id, code, ["mgrid-disable"]));
                                        });
                                    }
                                    break;
                            }
                            break;
                    }
                };
                ScreenModel.prototype.getControlType = function (controlType, item, sort) {
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
                            break;
                        case ITEM_SINGLE_TYPE.NUMERIC:
                            item.dataType = "number";
                            var timeNumber = cps003.control.NUMBER[self.category.catCode() + "_" + item.key];
                            if (timeNumber)
                                item.inputProcess = timeNumber;
                            break;
                        case ITEM_SINGLE_TYPE.DATE:
                            item.columnCssClass = "halign-right";
                            if (controlType.dateItemType === DateType.YEARMONTHDAY) {
                                name = "DatePickerYMD" + item.key;
                                item.constraint.type = "ymd";
                                control = { name: name, format: "ymd", controlType: "DatePicker" };
                                var dp = cps003.control.DATE_TIME[self.category.catCode() + "_" + item.key];
                                if (dp)
                                    control.inputProcess = dp;
                            }
                            else if (controlType.dateItemType === DateType.YEARMONTH) {
                                name = "DatePickerYM" + item.key;
                                item.constraint.type = "ym";
                                control = { name: name, format: "ym", controlType: "DatePicker" };
                            }
                            else {
                                name = "DatePickerY" + item.key;
                                item.constraint.type = "y";
                                control = { name: name, format: "y", controlType: "DatePicker" };
                            }
                            item.ntsControl = name;
                            break;
                        case ITEM_SINGLE_TYPE.TIME:
                            item.columnCssClass = "halign-right";
                            timeNumber = cps003.control.NUMBER[self.category.catCode() + "_" + item.key];
                            if (timeNumber)
                                item.inputProcess = timeNumber;
                            break;
                        case ITEM_SINGLE_TYPE.TIMEPOINT:
                            item.columnCssClass = "halign-right";
                            timeNumber = cps003.control.NUMBER[self.category.catCode() + "_" + item.key];
                            if (timeNumber)
                                item.inputProcess = timeNumber;
                            var timeRange_1 = cps003.control.TIME_RANGE[self.category.catCode() + "_" + item.key];
                            var timeRangeGroup_1 = cps003.control.TIME_RANGE_GROUP[self.category.catCode() + "_" + item.key];
                            if (timeRange_1 && timeRangeGroup_1) {
                                item.inputProcess = function () {
                                    var _a;
                                    var dfd = $.Deferred(), args = arguments;
                                    timeRange_1.apply(void 0, (_a = [item.required, item.constraint.primitiveValue, item.headerText]).concat.apply(_a, arguments)).fail(function (hasError) {
                                        if (hasError)
                                            return;
                                        timeRangeGroup_1.apply(void 0, args);
                                    });
                                    dfd.reject();
                                    return dfd.promise();
                                };
                            }
                            else if (timeRange_1)
                                item.inputProcess = timeRange_1.bind(null, item.required, item.constraint.primitiveValue, item.headerText);
                            else if (timeRangeGroup_1)
                                item.inputProcess = timeRangeGroup_1;
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
                            break;
                        case ITEM_SINGLE_TYPE.SEL_BUTTON:
                            name = "ReferButton" + item.key;
                            var notFoundMes = nts.uk.resource.getText("CPS001_107");
                            control = { name: name, enable: true, optionsValue: "optionValue", optionsText: "optionText", text: "参照", notFound: notFoundMes, pattern: [], list: {}, controlType: "ReferButton" };
                            var selectBtn = cps003.control.SELECT_BUTTON[self.category.catCode() + "_" + item.key];
                            control.click = selectBtn && selectBtn.bind(null, item.required);
                            self.dataTypes[item.key].specs = control;
                            item.ntsControl = name;
                            break;
                        case ITEM_SINGLE_TYPE.READONLY:
                            item.ntsControl = "Label";
                            break;
                        case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                            name = "RelateButton" + item.key;
                            control = { name: name, enable: true, text: "詳細情報", labelPosition: "before", controlType: "ReferButton" };
                            var selectBtn = cps003.control.RELATE_BUTTON[self.category.catCode() + "_" + item.key];
                            control.click = selectBtn && selectBtn.bind(null);
                            item.ntsControl = name;
                            break;
                        case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                            item.dataType = "number";
                            break;
                        case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                            break;
                    }
                    return control;
                };
                ScreenModel.prototype.loadGrid = function () {
                    var self = this;
                    if ($("#grid").data("mGrid"))
                        $("#grid").mGrid("destroy");
                    new nts.uk.ui.mgrid.MGrid($("#grid")[0], {
                        width: "1000px",
                        height: "800px",
                        headerHeight: "40px",
                        subHeight: "140px",
                        subWidth: "100px",
                        dataSource: self.gridOptions.dataSource,
                        primaryKey: "id",
                        virtualization: true,
                        virtualizationMode: "continuous",
                        enter: "right",
                        autoFitWindow: false,
                        errorColumns: ["employeeId", "employeeCode", "employeeName", "rowNumber"],
                        idGen: function (id) { return id + "_" + nts.uk.util.randomId(); },
                        notice: function () {
                            var $grid = $("#grid");
                            if (arguments[0] === true) {
                                var matches = /(\d+)/.exec(arguments[3].status);
                                if (matches) {
                                    $grid.mGrid("updateCell", arguments[1], "status", Number(matches[1]) - 1 == 0 ? "正常" : "エラー(" + (Number(matches[1]) - 1) + "件)", true);
                                }
                                return;
                            }
                            if (!arguments[3]) {
                                var matches = /(\d+)/.exec(arguments[2].status), status_1;
                                $grid.mGrid("updateCell", arguments[0], "status", "エラー(" + (matches ? (Number(matches[1]) + 1) : 1) + "件)", true);
                            }
                        },
                        columns: self.gridOptions.columns,
                        features: self.gridOptions.features,
                        ntsControls: self.gridOptions.ntsControls
                    }).create();
                };
                ScreenModel.prototype.register = function () {
                    var self = this, command, employees = [], recId = {}, $grid = $("#grid");
                    confirm({ messageId: self.updateMode() === 1 ? "Msg_749" : "Msg_748" }).ifYes(function () {
                        $grid.mGrid("validate", false, function (data) { return data.register; });
                        var itemErrors = $grid.mGrid("errors"), errObj = {}, dataToG;
                        if (itemErrors && itemErrors.length > 0) {
                            dataToG = _.map(itemErrors, function (err) {
                                if (_.has(errObj, err.rowId)) {
                                    errObj[err.rowId].push(err.columnKey);
                                }
                                else {
                                    errObj[err.rowId] = [err.columnKey];
                                }
                                return { rowId: err.rowId, employeeId: err.employeeId, empCd: err.employeeCode, empName: err.employeeName, no: err.index + 1,
                                    isDisplayRegister: true, errorType: 0, itemName: err.columnName, message: err.message };
                            });
                        }
                        var updates = $("#grid").mGrid("updatedCells");
                        if (updates.length === 0)
                            return;
                        block();
                        var dataSource = $("#grid").mGrid("dataSource"), regCount = 0;
                        _.forEach(dataSource, function (d) {
                            recId[d.id] = d;
                            if (d.register)
                                regCount++;
                        });
                        var cateName, cateType, regId = {}, updateDone = [];
                        if (self.category.cate()) {
                            cateName = self.category.cate().categoryName;
                            cateType = self.category.cate().categoryType;
                        }
                        var regChecked = [];
                        _.forEach(updates, function (item) {
                            if (item.columnKey === "register") {
                                if (item.value) {
                                    regChecked.push(item.rowId);
                                    if (errObj[item.rowId])
                                        return;
                                    var recData_1 = recId[item.rowId];
                                    var regEmp_1 = regId[recData_1.id];
                                    if (!regEmp_1) {
                                        regEmp_1 = { rowId: item.rowId, personId: recData_1.personId, employeeId: recData_1.employeeId, employeeCd: recData_1.employeeCode, employeeName: recData_1.employeeName, order: recData_1.rowNumber };
                                        regEmp_1.input = { categoryId: self.category.catId(), categoryCd: self.category.catCode(), categoryName: cateName, categoryType: cateType, recordId: recData_1.id, delete: false, items: [] };
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
                                regEmp.input = { categoryId: self.category.catId(), categoryCd: self.category.catCode(), categoryName: cateName, categoryType: cateType, recordId: recData.id, delete: false, items: [] };
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
                        _.forEach(regChecked, function (r) {
                            var items = self.updatedDatas[r];
                            _.forEach(items, function (item) {
                                if (errObj[item.recordId])
                                    return;
                                var recData = recId[item.recordId];
                                var regEmp = regId[recData.id];
                                updateDone.push({ rowId: item.recordId, columnKey: item.itemCode, value: recData[item.itemCode] });
                                if (!regEmp) {
                                    regEmp = { rowId: item.recordId, personId: recData.personId, employeeId: recData.employeeId, employeeCd: recData.employeeCode, employeeName: recData.employeeName, order: recData.rowNumber };
                                    regEmp.input = { categoryId: self.category.catId(), categoryCd: self.category.catCode(), categoryName: cateName, categoryType: cateType, recordId: recData.id, delete: false, items: [] };
                                    regId[recData.id] = regEmp;
                                    employees.push(regEmp);
                                }
                                var col = _.find(self.gridOptions.columns, function (column) { return column.key === item.itemCode; });
                                if (col && col.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.READONLY && col.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.READONLY_BUTTON && col.perInfoTypeState.dataTypeValue !== ITEM_SINGLE_TYPE.RELATE_CATEGORY
                                    && !_.find(regEmp.input.items, function (it) { return it.itemCode === item.itemCode; })) {
                                    if (col.perInfoTypeState.dataTypeValue == ITEM_SINGLE_TYPE.DATE) {
                                        if (_.isNil(item.value) || (item.value instanceof moment && !item.value.isValid())) {
                                            regEmp.input.items.push({ definitionId: col.itemId, itemCode: col.key, itemName: col.itemName, value: item.value, text: item.textValue, defValue: item.defValue, defText: item.defText, type: self.convertType(col.perInfoTypeState, item.value), logType: col.perInfoTypeState.dataTypeValue });
                                        }
                                        else {
                                            var date = moment(item.value).format("YYYY/MM/DD");
                                            regEmp.input.items.push({ definitionId: col.itemId, itemCode: col.key, itemName: col.itemName, value: date, text: date, defValue: item.defValue, defText: item.defText, type: self.convertType(col.perInfoTypeState, item.value), logType: col.perInfoTypeState.dataTypeValue });
                                        }
                                    }
                                    else {
                                        regEmp.input.items.push({ definitionId: col.itemId, itemCode: col.key, itemName: col.itemName, value: item.value, text: item.textValue, defValue: item.defValue, defText: item.defText, type: self.convertType(col.perInfoTypeState, item.value), logType: col.perInfoTypeState.dataTypeValue });
                                    }
                                }
                            });
                        });
                        self.validateSpecial(regChecked, dataSource);
                        $grid.mGrid("validate", false, function (data) { return data.register; });
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
                                return { rowId: err.rowId, employeeId: err.employeeId, empCd: err.employeeCode, empName: err.employeeName, no: err.index + 1,
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
                        command = { baseDate: moment.utc(self.baseDate(), "YYYY/MM/DD").toISOString(), editMode: self.updateMode(), employees: employees };
                        if (command.employees && command.employees.length === 0) {
                            if (dataToG && dataToG.length > 0) {
                                var regEmployeeIds_1 = [];
                                setShared("CPS003G_ERROR_LIST", dataToG);
                                var msgId = _.keys(errObj).length === regCount ? "Msg_1462" : "Msg_1461";
                                alertError({ messageId: msgId }).then(function () {
                                    forEach(updateDone, function (d) {
                                        if (!_.has(errObj, d.rowId)) {
                                            $grid.mGrid("updateCell", d.rowId, d.columnKey, d.value, true);
                                            $grid.mGrid("updateCell", d.rowId, "register", false, true);
                                            var recData = recId[d.rowId];
                                            regEmployeeIds_1.push(recData.employeeId);
                                        }
                                    });
                                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                                        setTimeout(function () {
                                            if (regEmployeeIds_1.length > 0) {
                                                setShared("CPS003C_REG_DONE", true);
                                                setShared("CPS003C_REG_EMPID", regEmployeeIds_1);
                                            }
                                        }, 1);
                                    });
                                });
                            }
                            unblock();
                            return;
                        }
                        c_1.service.push.register(command).done(function (errorList) {
                            var regEmployeeIds = [];
                            if (dataToG && dataToG.length > 0) {
                                setShared("CPS003G_ERROR_LIST", dataToG);
                                var msgId = _.keys(errObj).length === regCount ? "Msg_1462" : "Msg_1461";
                                alertError({ messageId: msgId }).then(function () {
                                    forEach(updateDone, function (d) {
                                        if (!_.has(errObj, d.rowId)) {
                                            $grid.mGrid("updateCell", d.rowId, d.columnKey, d.value, true);
                                            $grid.mGrid("updateCell", d.rowId, "register", false, true);
                                            var recData = recId[d.rowId];
                                            regEmployeeIds.push(recData.employeeId);
                                        }
                                    });
                                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                                        setTimeout(function () {
                                            if (regEmployeeIds.length > 0) {
                                                setShared("CPS003C_REG_DONE", true);
                                                setShared("CPS003C_REG_EMPID", regEmployeeIds);
                                            }
                                        }, 1);
                                    });
                                });
                            }
                            else {
                                if (!errorList || errorList.length === 0) {
                                    info({ messageId: "Msg_15" }).then(function () {
                                        unblock();
                                        setShared("CPS003C_REG_DONE", true);
                                        forEach(updateDone, function (d) {
                                            var recData = recId[d.rowId];
                                            regEmployeeIds.push(recData.employeeId);
                                        });
                                        setShared("CPS003C_REG_EMPID", regEmployeeIds);
                                        self.close();
                                    });
                                }
                                else {
                                    var errLst = _.map(errorList, function (e) { return e; });
                                    setShared("CPS003G_ERROR_LIST", errLst);
                                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                                    });
                                }
                            }
                        }).fail(function (res) {
                            unblock();
                            alert(res.message);
                        });
                    }).ifNo(function () { });
                };
                ScreenModel.prototype.convertType = function (perInfoTypeState, value) {
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
                ScreenModel.prototype.validateSpecial = function (regChecked, dataSource) {
                    var self = this, dateRanges, timeRanges, selectButtons, $grid = $("#grid");
                    forEach(dataSource, function (data, i) {
                        if (i == 0) {
                            dateRanges = findAll(cps003.control.dateRange, function (range) { return self.category.catCode() === range.ctgCode; });
                            timeRanges = findAll(cps003.control.timeRange, function (range) { return self.category.catCode() === range.ctgCode; });
                            selectButtons = findAll(cps003.control.selectGroups, function (select) { return self.category.catCode() === select.ctgCode; });
                        }
                        if (regChecked && _.isNil(find(regChecked, function (r) { return r === data.id; })))
                            return;
                        forEach(dateRanges, function (range) {
                            var column = find(self.gridOptions.columns, function (c) { return c.key === range.start; });
                            if (column) {
                                var control_2 = find(self.gridOptions.ntsControls, function (c) { return c.name === column.ntsControl; });
                                if (control_2) {
                                    var vd = cps003.control.DATE_RANGE[range.ctgCode + "_" + range.start];
                                    if (_.isFunction(vd))
                                        vd(column.required, control_2.format, data[range.start], data);
                                }
                            }
                        });
                        forEach(timeRanges, function (range) {
                            var column = find(self.gridOptions.columns, function (c) { return c.key === range.start; });
                            if (column) {
                                var vd = cps003.control.TIME_RANGE[range.ctgCode + "_" + range.start];
                                if (_.isFunction(vd)) {
                                    var timeRangeGroup_2 = cps003.control.TIME_RANGE_GROUP[range.ctgCode + "_" + range.start];
                                    vd(column.required, column.constraint.primitiveValue, column.headerText, data.id, range.start, data[range.start], data).fail(function (hasError) {
                                        if (hasError)
                                            return;
                                        if (timeRangeGroup_2) {
                                            timeRangeGroup_2(data.id, range.start, data[range.start], data);
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
                ScreenModel.prototype.getText = function (perInfoTypeState, value, id, itemCode, $grid) {
                    if (!perInfoTypeState)
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
                                var ret = { value: nts.uk.time.parseTime(value).toValue() };
                                ret.text = nts.uk.time.minutesBased.clock.dayattr.create(ret.value).fullText;
                                return ret;
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
                ScreenModel.prototype.checkError = function () {
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
                        return { employeeId: err.employeeId, empCd: err.employeeCode, empName: err.employeeName, no: err.index + 1,
                            isDisplayRegister: false, errorType: 0, itemName: err.columnName, message: err.message };
                    }));
                    modeless("/view/cps/003/g/index.xhtml").onClosed(function () {
                    });
                };
                ScreenModel.prototype.close = function () {
                    nts.uk.ui.windows.close();
                };
                return ScreenModel;
            }());
            vm.ScreenModel = ScreenModel;
            function forEach(arr, jb) {
                if (!arr)
                    return;
                for (var i_1 = 0; i_1 < arr.length; i_1++) {
                    if (jb(arr[i_1], i_1) === false)
                        break;
                }
            }
            function find(arr, jb) {
                if (!arr)
                    return;
                for (var i_2 = 0; i_2 < arr.length; i_2++) {
                    if (jb(arr[i_2], i_2))
                        return arr[i_2];
                }
                return null;
            }
            function findAll(arr, jb) {
                if (!arr)
                    return;
                var result = [];
                for (var i_3 = 0; i_3 < arr.length; i_3++) {
                    if (jb(arr[i_3], i_3))
                        result.push(arr[i_3]);
                }
                return result;
            }
            var State = /** @class */ (function () {
                function State(rowId, columnKey, state) {
                    this.rowId = rowId;
                    this.columnKey = columnKey;
                    this.state = state;
                }
                return State;
            }());
            var Record = /** @class */ (function () {
                function Record(data) {
                    if (!data)
                        return this;
                    this.id = (data.items && data.items[0] && data.items[0].recordId) || nts.uk.util.randomId() + "_noData";
                    this.personId = data.personId;
                    this.employeeId = data.employeeId;
                    this.employeeCode = data.employeeCode;
                    this.employeeName = data.employeeName;
                    this.register = false;
                    this.status = "正常";
                    //            if (data.numberOfError === 0) {
                    //                this.status = "正常";
                    //            } else {
                    //                this.status = "エラー(" + data.numberOfError + "件)";
                    //            }
                }
                return Record;
            }());
            var ACTION_ROLE;
            (function (ACTION_ROLE) {
                ACTION_ROLE[ACTION_ROLE["HIDDEN"] = "HIDDEN"] = "HIDDEN";
                ACTION_ROLE[ACTION_ROLE["VIEW_ONLY"] = "VIEW_ONLY"] = "VIEW_ONLY";
                ACTION_ROLE[ACTION_ROLE["EDIT"] = "EDIT"] = "EDIT";
            })(ACTION_ROLE = vm.ACTION_ROLE || (vm.ACTION_ROLE = {}));
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
            var ITEM_SELECT_TYPE;
            (function (ITEM_SELECT_TYPE) {
                // 1:専用マスタ(DesignatedMaster)
                ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["DESIGNATED_MASTER"] = "DESIGNATED_MASTER"] = "DESIGNATED_MASTER";
                // 2:コード名称(CodeName)
                ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["CODE_NAME"] = "CODE_NAME"] = "CODE_NAME";
                // 3:列挙型(Enum)
                ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["ENUM"] = "ENUM"] = "ENUM";
            })(ITEM_SELECT_TYPE = vm.ITEM_SELECT_TYPE || (vm.ITEM_SELECT_TYPE = {}));
            var EDIT_METHOD;
            (function (EDIT_METHOD) {
                EDIT_METHOD[EDIT_METHOD["PreviousZero"] = 1] = "PreviousZero";
                EDIT_METHOD[EDIT_METHOD["AfterZero"] = 2] = "AfterZero";
                EDIT_METHOD[EDIT_METHOD["PreviousSpace"] = 3] = "PreviousSpace";
                EDIT_METHOD[EDIT_METHOD["AfterSpace"] = 4] = "AfterSpace";
            })(EDIT_METHOD || (EDIT_METHOD = {}));
            var DateType;
            (function (DateType) {
                DateType[DateType["YEARMONTHDAY"] = 1] = "YEARMONTHDAY";
                DateType[DateType["YEARMONTH"] = 2] = "YEARMONTH";
                DateType[DateType["YEAR"] = 3] = "YEAR";
            })(DateType || (DateType = {}));
            var IT_CAT_TYPE;
            (function (IT_CAT_TYPE) {
                IT_CAT_TYPE[IT_CAT_TYPE["SINGLE"] = 1] = "SINGLE";
                IT_CAT_TYPE[IT_CAT_TYPE["MULTI"] = 2] = "MULTI";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINU"] = 3] = "CONTINU";
                IT_CAT_TYPE[IT_CAT_TYPE["NODUPLICATE"] = 4] = "NODUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["DUPLICATE"] = 5] = "DUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINUWED"] = 6] = "CONTINUWED"; // Continuos history with end date
            })(IT_CAT_TYPE = vm.IT_CAT_TYPE || (vm.IT_CAT_TYPE = {}));
        })(vm = c_1.vm || (c_1.vm = {}));
    })(c = cps003.c || (cps003.c = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.c.vm.js.map