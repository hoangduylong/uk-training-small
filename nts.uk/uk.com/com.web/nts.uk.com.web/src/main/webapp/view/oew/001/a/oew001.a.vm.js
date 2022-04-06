/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var oew001;
                (function (oew001) {
                    var a;
                    (function (a) {
                        var model = oew001.share.model;
                        var API = {
                            initEquipmentInfo: "com/screen/oew001/initEquipmentInfo",
                            initEquipmentSetting: "com/screen/oew001/initEquipmentSetting",
                            getResultHistory: "com/screen/oew001/getResultHistory",
                            getEquipmentInfoList: "com/screen/oew001/getEquipmentInfoList",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.selectedEquipmentClsCode = ko.observable("");
                                _this.equipmentClsName = ko.observable("");
                                _this.selectedEquipmentInfoCode = ko.observable("");
                                _this.yearMonth = ko.observable("");
                                _this.hasExtractData = ko.observable(false);
                                _this.isInitComplete = false;
                                _this.isErr3251 = ko.observable(false);
                                // dto
                                _this.equipmentClassification = ko.observable(null);
                                _this.equipmentInformationList = ko.observableArray([]);
                                _this.itemSettings = ko.observableArray([]);
                                _this.formatSetting = ko.observable(null);
                                // grid
                                _this.columns = ko.observableArray([]);
                                _this.dataSource = ko.observableArray([]);
                                _this.optionalItems = ko.observableArray([]);
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                vm.staticColumns = [
                                    { headerText: "", key: "id", dataType: "string", ntsControl: "Label" },
                                    { headerText: "", key: "editRecord", width: "85px", dataType: "boolean", ntsControl: "EditButton" },
                                    { headerText: vm.$i18n("OEW001_19"), key: "useDate", width: "100px", dataType: "string" },
                                    { headerText: vm.$i18n("OEW001_20"), key: "employeeName", width: "150px", dataType: "string" }
                                ];
                                vm.columns.push(_.clone(vm.staticColumns));
                                // subscribe
                                vm.equipmentClassification.subscribe(function (value) {
                                    vm.selectedEquipmentClsCode(value.code);
                                    vm.equipmentClsName(value.name);
                                    vm.performSearchData();
                                });
                                vm.selectedEquipmentInfoCode.subscribe(function () { return vm.focusOnItemAfterInit("#A4_3"); });
                                vm.yearMonth.subscribe(function () { return vm.focusOnItemAfterInit("#A4_3"); });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.yearMonth(moment.utc().format("YYYYMM"));
                                vm.initScreen();
                            };
                            // Ａ：設備利用実績の一覧の初期表示
                            ScreenModel.prototype.initScreen = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.restoreCharacteristic().then(function (result) { return vm.initEquipmentInfo(result); }).then(function () { return vm.initEquipmentSetting(); })
                                    .then(function () { return vm.performSearchData(); })
                                    .always(function () {
                                    vm.isInitComplete = true;
                                    $("#A5_1").focus();
                                    vm.$blockui("clear");
                                });
                            };
                            // Ａ1：設備分類と設備情報を取得する
                            ScreenModel.prototype.initEquipmentInfo = function (param) {
                                var vm = this;
                                return vm.$ajax(API.initEquipmentInfo, param).then(function (result) {
                                    if (result) {
                                        vm.equipmentClassification(result.equipmentClassification);
                                        vm.equipmentInformationList(result.equipmentInformationList);
                                        vm.selectedEquipmentInfoCode(param.equipmentCode);
                                    }
                                }, function (err) { return vm.$dialog.error({ messageId: err.messageId }); });
                            };
                            // Ａ2：「設備利用実績の項目設定」を取得する
                            ScreenModel.prototype.initEquipmentSetting = function () {
                                var vm = this;
                                vm.columns(_.clone(vm.staticColumns));
                                return vm.$ajax(API.initEquipmentSetting).then(function (result) {
                                    if (result) {
                                        vm.itemSettings(result.itemSettings);
                                        vm.formatSetting(result.formatSetting);
                                    }
                                }, function (err) {
                                    vm.$dialog.error({ messageId: err.messageId });
                                    vm.isErr3251(err.messageId === "Msg_3251");
                                });
                            };
                            // Ａ3：「実績の抽出処理」を実行する
                            ScreenModel.prototype.searchData = function (param) {
                                var vm = this;
                                var currentSid = __viewContext.user.employeeId;
                                return vm.$ajax(API.getResultHistory, param).then(function (result) {
                                    if (_.isEmpty(result.equipmentDatas)) {
                                        vm.dataSource([]);
                                        var temp = new DisplayData();
                                        temp.createOptionalItems(null, vm.itemSettings(), vm.formatSetting());
                                        vm.createColumns(temp.optionalItems);
                                        return;
                                    }
                                    vm.hasExtractData(true);
                                    // Create data source
                                    var dataSource = _.map(result.equipmentDatas, function (data) {
                                        var displayData = new DisplayData(data, result.employeeInfos, currentSid);
                                        displayData.createOptionalItems(data, vm.itemSettings(), vm.formatSetting());
                                        return displayData;
                                    });
                                    // Sort by 日付、社員CD、入力日
                                    dataSource = _.orderBy(dataSource, ['useDate', 'scd', 'inputDate'], ['asc', 'asc', 'asc']);
                                    vm.dataSource(dataSource);
                                    if (vm.dataSource().length > 0) {
                                        // Get first data for column format reference
                                        var optionalItems = dataSource[0].optionalItems;
                                        vm.createColumns(optionalItems);
                                    }
                                });
                            };
                            ScreenModel.prototype.initGrid = function () {
                                var vm = this;
                                // Reset grid
                                if ($("#A6").data("igGrid")) {
                                    $("#A6").ntsGrid("destroy");
                                }
                                // Reset cache
                                localStorage.removeItem(model.constants.NTS_GRID_CACHE_KEY);
                                var cellStates = _.chain(vm.dataSource()).map(function (data) {
                                    if (!data.editRecord) {
                                        return new CellState(data.id, "editRecord", ['disabled']);
                                    }
                                }).filter(function (data) { return !!data; }).value();
                                var maxWidth = _.chain(vm.columns()).map(function (data) { var _a; return Number(((_a = data.width) === null || _a === void 0 ? void 0 : _a.substring(0, data.width.length - 2)) | 0); }).sum().value();
                                var param = {
                                    height: '316px',
                                    rows: 10,
                                    dataSource: vm.dataSource(),
                                    primaryKey: 'id',
                                    rowVirtualization: true,
                                    virtualization: true,
                                    virtualizationMode: 'continuous',
                                    hidePrimaryKey: true,
                                    columns: vm.columns(),
                                    ntsControls: [
                                        { name: 'EditButton', text: vm.$i18n("OEW001_21"), click: function (item) { return vm.openDialogB(item); }, controlType: 'Button', enable: true }
                                    ],
                                    features: [
                                        {
                                            name: 'Selection',
                                            mode: 'row',
                                            multipleSelection: false
                                        },
                                    ],
                                    ntsFeatures: [
                                        {
                                            name: 'CellState',
                                            rowId: 'rowId',
                                            columnKey: 'columnKey',
                                            state: 'state',
                                            states: cellStates
                                        },
                                    ]
                                };
                                // Set grid maxWidth
                                if (maxWidth > model.constants.MAXIMUM_GRID_WIDTH) {
                                    param.width = "".concat(model.constants.MAXIMUM_GRID_WIDTH, "px");
                                }
                                $("#A6").ntsGrid(param);
                                // Set disable A8_1
                                $("#A6_container").ready(function () { return $("#A6 .disabled button").attr("disabled", "disabled"); });
                            };
                            ScreenModel.prototype.openDialogB = function (input) {
                                var vm = this;
                                var selectedEquipmentInfo = _.find(vm.equipmentInformationList(), { code: vm.selectedEquipmentInfoCode() });
                                var param = new model.Oew001BData({
                                    isNewMode: !input,
                                    equipmentClsCode: vm.selectedEquipmentClsCode(),
                                    equipmentClsName: vm.equipmentClsName(),
                                    equipmentInfoCode: vm.selectedEquipmentInfoCode(),
                                    equipmentInfoName: selectedEquipmentInfo.name,
                                    employeeName: ko.observable(null),
                                    validStartDate: moment.utc(selectedEquipmentInfo.effectiveStartDate, model.constants.YYYY_MM_DD),
                                    validEndDate: moment.utc(selectedEquipmentInfo.effectiveEndDate, model.constants.YYYY_MM_DD),
                                });
                                if (param.isNewMode) {
                                    param.inputDate = moment.utc().format(model.constants.YYYY_MM_DD);
                                    param.useDate = ko.observable(moment.utc().format(model.constants.YYYY_MM_DD));
                                    param.optionalItems = ko.observableArray(vm.optionalItems());
                                    param.sid = __viewContext.user.employeeId;
                                }
                                else {
                                    var item = _.find(vm.dataSource(), { id: input.id });
                                    param.inputDate = item.inputDate;
                                    param.useDate = ko.observable(item.useDate);
                                    param.optionalItems = ko.observableArray(item.optionalItems);
                                    param.sid = item.sid;
                                }
                                vm.$window.modal("/view/oew/001/b/index.xhtml", ko.toJS(param))
                                    .then(function (result) {
                                    if (!!result) {
                                        var topPos = void 0;
                                        if (!param.isNewMode) {
                                            topPos = $("#A6_scrollContainer").scrollTop();
                                        }
                                        vm.performSearchData(param.isNewMode && result.isSaveSuccess, topPos);
                                        if (result.isSaveSuccess) {
                                            vm.saveCharacteristic();
                                        }
                                    }
                                    vm.$nextTick(function () { return $("#A5_1").focus(); });
                                });
                            };
                            ScreenModel.prototype.openDialogC = function () {
                                var vm = this;
                                var param = {
                                    equipmentClsCode: vm.selectedEquipmentClsCode(),
                                    equipmentClsName: vm.equipmentClsName(),
                                    equipmentCode: vm.selectedEquipmentInfoCode(),
                                    formatSetting: vm.formatSetting(),
                                    itemSettings: vm.itemSettings(),
                                    yearMonth: vm.yearMonth()
                                };
                                vm.$window.modal("/view/oew/001/c/index.xhtml", param);
                            };
                            ScreenModel.prototype.openDialogD = function () {
                                var vm = this;
                                var paramDialogD = {
                                    equipmentClsCode: vm.selectedEquipmentClsCode(),
                                    isOpenFromA: true
                                };
                                vm.$window.modal("/view/oew/001/d/index.xhtml", paramDialogD)
                                    .then(function (result) {
                                    if (!!result) {
                                        vm.$blockui("grayout");
                                        vm.selectedEquipmentClsCode(result.code);
                                        vm.equipmentClsName(result.name);
                                        var param = {
                                            equipmentClsCode: vm.selectedEquipmentClsCode(),
                                            baseDate: moment.utc().toISOString(),
                                            isInput: true
                                        };
                                        vm.$ajax(API.getEquipmentInfoList, param).then(function (result) { return vm.equipmentInformationList(result); }).always(function () { return vm.$blockui("clear"); });
                                        vm.$nextTick(function () { return $("#A4_3").focus(); });
                                    }
                                });
                            };
                            ScreenModel.prototype.performSearchData = function (isScrollBottom, topPos) {
                                if (isScrollBottom === void 0) { isScrollBottom = true; }
                                if (topPos === void 0) { topPos = 0; }
                                var vm = this;
                                vm.$blockui("grayout");
                                var param = new SearchDataParam(vm.selectedEquipmentClsCode(), vm.selectedEquipmentInfoCode(), vm.yearMonth());
                                vm.searchData(param).then(function () { return vm.initGrid(); }).then(function () {
                                    if (isScrollBottom) {
                                        // #120568
                                        $("#A6").igGrid("virtualScrollTo", vm.dataSource().length - 1);
                                    }
                                    else {
                                        vm.$nextTick(function () { return $("#A6").igGrid("virtualScrollTo", topPos + "px"); });
                                    }
                                }).always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.createColumns = function (optionalItems) {
                                var vm = this;
                                // Init default optionalItems
                                vm.optionalItems(_.clone(optionalItems));
                                // Create column info
                                vm.columns(_.clone(vm.staticColumns));
                                _.each(optionalItems, function (data) { return vm.columns().push(vm.getColumnHeader(data)); });
                            };
                            ScreenModel.prototype.saveCharacteristic = function () {
                                var vm = this;
                                nts.uk.characteristics.save("OEW001_設備利用実績の入力"
                                    + "_companyId_" + __viewContext.user.companyId
                                    + "_userId_" + __viewContext.user.employeeId, {
                                    equipmentCode: vm.selectedEquipmentInfoCode(),
                                    equipmentClsCode: vm.selectedEquipmentClsCode()
                                });
                            };
                            ScreenModel.prototype.restoreCharacteristic = function () {
                                var vm = this;
                                return nts.uk.characteristics.restore("OEW001_設備利用実績の入力"
                                    + "_companyId_" + __viewContext.user.companyId
                                    + "_userId_" + __viewContext.user.employeeId).then(function (result) {
                                    vm.selectedEquipmentClsCode((result === null || result === void 0 ? void 0 : result.equipmentClsCode) || null);
                                    vm.selectedEquipmentInfoCode((result === null || result === void 0 ? void 0 : result.equipmentCode) || null);
                                    if (!result) {
                                        return {
                                            equipmentCode: '',
                                            equipmentClsCode: ''
                                        };
                                    }
                                    else {
                                        return result;
                                    }
                                });
                            };
                            ScreenModel.prototype.getColumnHeader = function (data) {
                                var key = "value".concat(data.displayOrder);
                                var headerText = nts.uk.text.isNullOrEmpty(data.unit) ? data.itemName : "".concat(data.itemName, "(").concat(data.unit, ")");
                                var cssClass = "limited-label " + (data.itemCls === model.enums.ItemClassification.TEXT ? "halign-left" : "halign-right");
                                var columnHeader = {
                                    headerText: headerText,
                                    template: "<div class=\"".concat(cssClass, "\">") + '${' + key + '}</div>',
                                    dataType: "String", key: "".concat(key), width: data.width
                                };
                                if (data.itemCls !== model.enums.ItemClassification.TEXT) {
                                }
                                return columnHeader;
                            };
                            ScreenModel.prototype.focusOnItemAfterInit = function (itemId) {
                                var vm = this;
                                if (vm.isInitComplete) {
                                    $(itemId).focus();
                                    vm.performSearchData();
                                }
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                        var DisplayData = /** @class */ (function () {
                            function DisplayData(data, employees, currentSid) {
                                this.id = nts.uk.util.randomId();
                                if (!!data && !!currentSid) {
                                    var employeeInfo = _.find(employees, { employeeId: data.sid });
                                    this.editRecord = data.sid === currentSid || __viewContext.user.role.isInCharge.attendance;
                                    this.inputDate = data.inputDate;
                                    this.useDate = data.useDate;
                                    this.sid = data.sid;
                                    this.scd = employeeInfo.employeeCode;
                                    this.employeeName = employeeInfo.businessName;
                                }
                            }
                            // Create grid optional datas from acquired datas
                            DisplayData.prototype.createOptionalItems = function (data, itemSettings, formatSetting) {
                                var _this = this;
                                if (itemSettings.length === 0 || !formatSetting.itemDisplaySettings) {
                                    this.optionalItems = [];
                                    return;
                                }
                                // Map datas to grid
                                this.optionalItems = _.chain(itemSettings).map(function (itemSetting) {
                                    var itemData = !!data ? _.find(data.itemDatas, function (itemData) { return itemData.itemNo === itemSetting.itemNo
                                        && !nts.uk.text.isNullOrEmpty(itemData.actualValue) && itemData.actualValue !== "null"; }) : null;
                                    var itemDisplay = _.find(formatSetting.itemDisplaySettings, { itemNo: itemSetting.itemNo });
                                    var itemCls = itemSetting.inputControl.itemCls;
                                    var actualValue = !!itemData ? itemData.actualValue : null;
                                    var constraint = {
                                        valueType: itemCls === model.enums.ItemClassification.TEXT ? "String" : (itemCls === model.enums.ItemClassification.NUMBER ? "Integer" : "Clock"),
                                        charType: itemCls === model.enums.ItemClassification.NUMBER ? "Numeric" : "Any",
                                        min: itemCls === model.enums.ItemClassification.TIME ? nts.uk.time.format.byId("Time_Short_HM", itemSetting.inputControl.minimum) : itemSetting.inputControl.minimum,
                                        max: itemCls === model.enums.ItemClassification.TIME ? nts.uk.time.format.byId("Time_Short_HM", itemSetting.inputControl.maximum) : itemSetting.inputControl.maximum,
                                        maxLength: itemSetting.inputControl.digitsNo
                                    };
                                    var width = itemDisplay.displayWidth * model.constants.FIXED_VALUE_A;
                                    var optionalItem = new model.OptionalItem({
                                        itemName: itemSetting.items.itemName,
                                        itemCls: itemCls,
                                        value: ko.observable(actualValue),
                                        width: "".concat(Math.min(model.constants.MAXIMUM_COL_WIDTH, width), "px"),
                                        displayOrder: itemDisplay.displayOrder,
                                        constraint: constraint,
                                        constraintName: "CustomContraint".concat(itemDisplay.displayOrder),
                                        itemNo: itemSetting.itemNo,
                                        memo: itemSetting.items.memo,
                                        required: itemSetting.inputControl.require,
                                        unit: itemSetting.items.unit
                                    });
                                    // Format value to display in grid
                                    if (actualValue !== null) {
                                        if (itemCls === model.enums.ItemClassification.NUMBER) {
                                            actualValue = nts.uk.ntsNumber.formatNumber(Number(actualValue), { formatId: 'Number_Separated' });
                                        }
                                        else if (itemCls === model.enums.ItemClassification.TIME) {
                                            actualValue = nts.uk.time.format.byId("Time_Short_HM", actualValue);
                                        }
                                    }
                                    _this["value" + itemDisplay.displayOrder] = actualValue;
                                    return optionalItem;
                                    // Sort optionalItems by 表示順番
                                }).orderBy("displayOrder").value();
                            };
                            return DisplayData;
                        }());
                        a.DisplayData = DisplayData;
                        var SearchDataParam = /** @class */ (function () {
                            function SearchDataParam(equipmentClsCode, equipmentCode, ym) {
                                this.equipmentClsCode = equipmentClsCode;
                                this.equipmentCode = equipmentCode;
                                this.ym = ym;
                            }
                            return SearchDataParam;
                        }());
                        a.SearchDataParam = SearchDataParam;
                        var CellState = /** @class */ (function () {
                            function CellState(rowId, columnKey, state) {
                                this.rowId = rowId;
                                this.columnKey = columnKey;
                                this.state = state;
                            }
                            return CellState;
                        }());
                        a.CellState = CellState;
                    })(a = oew001.a || (oew001.a = {}));
                })(oew001 = view.oew001 || (view.oew001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=oew001.a.vm.js.map