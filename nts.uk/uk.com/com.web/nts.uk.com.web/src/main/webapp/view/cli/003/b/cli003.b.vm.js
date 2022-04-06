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
/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli003;
                (function (cli003) {
                    var b;
                    (function (b) {
                        var service = nts.uk.com.view.cli003.b.service;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                //Log info
                                _this.logSets = ko.observableArray([]);
                                _this.logSetId = ko.observable("");
                                _this.recordType = ko.observable("");
                                _this.dataType = ko.observable("");
                                _this.systemType = ko.observable("");
                                //Display on screen
                                _this.currentLogDisplaySet = ko.observable();
                                _this.currentRecordTypeName = ko.observable("");
                                _this.currentDataTypeName = ko.observable("");
                                _this.currentLogSetCode = ko.observable("");
                                _this.currentLogSetName = ko.observable("");
                                _this.currentSystemTypeName = ko.observable("");
                                _this.currentCode = ko.observable(null);
                                _this.showOperator = ko.observable(false); //show Operator or not
                                _this.showDataType = ko.observable(false);
                                _this.showPersonInfo = ko.observable(false);
                                //Default list
                                _this.recordTypeList = ko.observableArray([
                                    new ItemTypeModel(0, _this.$i18n("Enum_RecordType_Login")),
                                    new ItemTypeModel(1, _this.$i18n("Enum_RecordType_StartUp")),
                                    new ItemTypeModel(2, _this.$i18n("Enum_RecordType_UpdateMaster")),
                                    new ItemTypeModel(3, _this.$i18n("Enum_RecordType_UpdatePersionInfo")),
                                    new ItemTypeModel(4, _this.$i18n("Enum_RecordType_DataReference")),
                                    new ItemTypeModel(5, _this.$i18n("Enum_RecordType_DataManipulation")),
                                    new ItemTypeModel(6, _this.$i18n("Enum_RecordType_DataCorrect")),
                                    new ItemTypeModel(7, _this.$i18n("Enum_RecordType_MyNumber")),
                                    new ItemTypeModel(8, _this.$i18n("Enum_RecordType_TerminalCommucationInfo")),
                                    new ItemTypeModel(9, _this.$i18n("Enum_RecordType_DataStorage")),
                                    new ItemTypeModel(10, _this.$i18n("Enum_RecordType_DataRecovery")),
                                    new ItemTypeModel(11, _this.$i18n("Enum_RecordType_DataDeletion")),
                                ]);
                                _this.dataTypeList = ko.observableArray([
                                    new ItemTypeModel(0, _this.$i18n("Enum_DataType_Schedule")),
                                    new ItemTypeModel(1, _this.$i18n("Enum_DataType_DailyResults")),
                                    new ItemTypeModel(2, _this.$i18n("Enum_DataType_MonthlyResults")),
                                    new ItemTypeModel(3, _this.$i18n("Enum_DataType_AnyPeriodSummary")),
                                    new ItemTypeModel(4, _this.$i18n("Enum_DataType_ApplicationApproval")),
                                    new ItemTypeModel(5, _this.$i18n("Enum_DataType_Notification")),
                                    new ItemTypeModel(6, _this.$i18n("Enum_DataType_SalaryDetail")),
                                    new ItemTypeModel(7, _this.$i18n("Enum_DataType_BonusDetail")),
                                    new ItemTypeModel(8, _this.$i18n("Enum_DataType_YearEndAdjustment")),
                                    new ItemTypeModel(9, _this.$i18n("Enum_DataType_MonthlyCalculation")),
                                    new ItemTypeModel(10, _this.$i18n("Enum_DataType_RisingSalaryBack")),
                                ]);
                                _this.systemTypeList = ko.observableArray([
                                    new ItemTypeModel(0, _this.$i18n('Enum_SystemType_PERSON_SYSTEM')),
                                    new ItemTypeModel(1, _this.$i18n('Enum_SystemType_ATTENDANCE_SYSTEM')),
                                    new ItemTypeModel(2, _this.$i18n('Enum_SystemType_PAYROLL_SYSTEM')),
                                    new ItemTypeModel(3, _this.$i18n('Enum_SystemType_OFFICE_HELPER')),
                                ]);
                                _this.symbolList = ko.observableArray([
                                    new ItemTypeModel(0, _this.$i18n("Enum_Symbol_Include")),
                                    new ItemTypeModel(1, _this.$i18n("Enum_Symbol_Equal")),
                                    new ItemTypeModel(2, _this.$i18n("Enum_Symbol_Different")),
                                ]);
                                //B1
                                _this.b1Columns = ko.observableArray([
                                    {
                                        headerText: _this.$i18n("CLI003_88"),
                                        key: "code",
                                        width: "50px",
                                    },
                                    {
                                        headerText: _this.$i18n("CLI003_89"),
                                        key: "name",
                                        width: "100px",
                                    },
                                ]);
                                //B2
                                _this.conditionDatasource = ko.observableArray([]);
                                _this.listItemNo = ko.observableArray([]);
                                _this.conditionColumns = ko.observableArray([
                                    {
                                        headerText: _this.$i18n("CLI003_90"),
                                        prop: "displayItem",
                                        width: 125,
                                    },
                                    {
                                        headerText: _this.$i18n("CLI003_81"),
                                        prop: "cond1",
                                        width: 125,
                                    },
                                    {
                                        headerText: _this.$i18n("CLI003_82"),
                                        prop: "cond2",
                                        width: 125,
                                    },
                                    {
                                        headerText: _this.$i18n("CLI003_83"),
                                        prop: "cond3",
                                        width: 125,
                                    },
                                    {
                                        headerText: _this.$i18n("CLI003_84"),
                                        prop: "cond4",
                                        width: 125,
                                    },
                                    {
                                        headerText: _this.$i18n("CLI003_85"),
                                        prop: "cond5",
                                        width: 125,
                                    },
                                ]);
                                _this.conditionCurrentCode = ko.observable();
                                _this.logSetOutputs = ko.observableArray([]); //5 condition for Log
                                //B3
                                _this.startDateNameOperator = ko.observable(_this.$i18n("CLI003_52"));
                                _this.endDateNameOperator = ko.observable(_this.$i18n("CLI003_53"));
                                _this.startDateOperator = ko.observable(moment.utc().format("YYYY/MM/DD 0:00:00"));
                                _this.endDateOperator = ko.observable(moment.utc().format("YYYY/MM/DD 23:59:59"));
                                //B4
                                _this.operatorEmpSelectedRuleCode = ko.observable(2);
                                _this.roundingRules = ko.observableArray([
                                    { code: EMPLOYEE_SPECIFIC.SPECIFY, name: _this.$i18n("CLI003_17") },
                                    { code: EMPLOYEE_SPECIFIC.ALL, name: _this.$i18n("CLI003_18") },
                                ]);
                                _this.operatorEmployeeCount = ko.observable(nts.uk.text.format(_this.$i18n("CLI003_57"), 0));
                                _this.selectedEmployeeCodeOperator = ko.observableArray([]);
                                //B5
                                _this.startDateString = ko.observable("");
                                _this.endDateString = ko.observable("");
                                _this.checkFormatDate = ko.observable('1'); //1: Display YYYY/MM/DD , 2: Display YYYY/MM
                                _this.selectedEmpDateValue = ko.observable({});
                                //B6
                                _this.selectedEmpSelectedRuleCode = ko.observable(2);
                                _this.targetEmployeeCount = ko.observable(nts.uk.text.format(_this.$i18n("CLI003_57"), 0));
                                _this.selectedEmployeeCodeTarget = ko.observableArray([]);
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                vm.$window.storage('VIEW_B_DATA')
                                    .then(function (data) {
                                    if (data !== undefined) {
                                        vm.currentCode(data.currentCode);
                                        vm.checkFormatDate(data.checkFormatDate);
                                        vm.selectedEmployeeCodeOperator(data.operatorEmployeeIdList);
                                        vm.selectedEmpDateValue(data.dateValue);
                                        vm.startDateOperator(data.startDateOperator);
                                        vm.endDateOperator(data.endDateOperator);
                                        vm.operatorEmpSelectedRuleCode(data.selectedRuleCodeOperator);
                                        vm.selectedEmpSelectedRuleCode(data.selectedRuleCodeTarget);
                                        vm.selectedEmployeeCodeTarget(data.targetEmployeeIdList);
                                        vm.targetEmployeeCount(data.targetEmployeeCount);
                                        vm.operatorEmployeeCount(data.operatorEmployeeCount);
                                    }
                                })
                                    .then(function () { return vm.$window.storage('VIEW_B_DATA', undefined); })
                                    .then(function () {
                                    vm.getAllLogDisplaySet();
                                    vm.obsSelectedLogSet();
                                });
                            };
                            //get logDisplaySet from service and convert to UI Dto
                            ScreenModel.prototype.getAllLogDisplaySet = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.logSets.removeAll();
                                service
                                    .getAllLogDisplaySet()
                                    .then(function (logDisplaySets) {
                                    if (logDisplaySets && logDisplaySets.length > 0) {
                                        for (var _i = 0, logDisplaySets_1 = logDisplaySets; _i < logDisplaySets_1.length; _i++) {
                                            var logDisplaySet = logDisplaySets_1[_i];
                                            vm.logSets.push(new ItemLogSetModel(logDisplaySet.logSetId, logDisplaySet.code, logDisplaySet.name, logDisplaySet.recordType, logDisplaySet.dataType, logDisplaySet.systemType, logDisplaySet.logSetOutputItems));
                                        }
                                        //pick first when current code null
                                        if (vm.currentCode() === null) {
                                            var logDisplaySetFirst = logDisplaySets[0];
                                            $("#B1").ntsGridList("setSelected", logDisplaySetFirst.code);
                                            vm.currentCode(logDisplaySetFirst.code);
                                            //pick current display log
                                        }
                                        else {
                                            $("#B1").ntsGridList("setSelected", vm.currentCode());
                                            var logSet = _.find(vm.logSets(), function (log) { return (log.code === vm.currentCode()); });
                                            vm.getLogItems(logSet);
                                            vm.getTargetDate(logSet);
                                        }
                                    }
                                })
                                    .fail(function (error) {
                                    vm.$dialog.alert(error);
                                })
                                    .always(function () {
                                    vm.$blockui("clear");
                                    vm.$errors("clear");
                                });
                            };
                            //get current display log code on click
                            ScreenModel.prototype.obsSelectedLogSet = function () {
                                var vm = this;
                                vm.currentCode.subscribe(function (newValue) {
                                    vm.$errors("clear");
                                    var logSet = _.find(vm.logSets(), function (log) { return (log.code === newValue); });
                                    vm.getLogItems(logSet);
                                    vm.getTargetDate(logSet);
                                });
                            };
                            //get data for table B2_10
                            ScreenModel.prototype.getLogItems = function (logSet) {
                                var vm = this;
                                service
                                    .getLogOutputItemByRecordType(String(logSet.recordType))
                                    .then(function (logOutputItems) {
                                    vm.setLogSetInfo(logSet);
                                    var logSetItemDetailsList = _.map(logSet.logSetOutputs, function (item) {
                                        var listCond = ["", "", "", "", "", ""];
                                        item.logSetItemDetails.map(function (itemDetail, i) {
                                            var condSymbol = _.find(vm.symbolList(), function (symbol) { return symbol.code === itemDetail.sybol; }).name;
                                            if (itemDetail.condition !== "" && itemDetail.condition !== null) {
                                                listCond[i] = condSymbol.concat(" ", itemDetail.condition);
                                            }
                                        });
                                        var itemName = _.filter(logOutputItems, (function (logOutputItem) { return logOutputItem.itemNo === item.itemNo; }))[0].itemName;
                                        return new LogSetItemDetailModalDisplay(itemName, listCond[0], listCond[1], listCond[2], listCond[3], listCond[4]);
                                    });
                                    vm.conditionDatasource(logSetItemDetailsList);
                                    //get itemNo display
                                    var listItemNo = _.map(logSet.logSetOutputs, function (item) { return String(item.itemNo); });
                                    vm.listItemNo(listItemNo);
                                })
                                    .fail(function () {
                                    vm.$dialog.alert({ messageId: "Msg_1221" });
                                    return null;
                                })
                                    .always(function () {
                                    vm.$blockui("clear");
                                });
                            };
                            //set current logSet to UI
                            ScreenModel.prototype.setLogSetInfo = function (logSet) {
                                var vm = this;
                                vm.logSetOutputs(logSet.logSetOutputs);
                                vm.currentLogDisplaySet(logSet);
                                vm.logSetId(logSet.logSetId);
                                vm.currentLogSetCode(vm.currentCode());
                                vm.currentLogSetName(logSet.name);
                                var recordTypeName = vm.getRecordTypeName(logSet.recordType);
                                var dataTypeName = vm.getDataTypeName(logSet.dataType);
                                var systemTypeName = vm.getSystemTypeName(logSet.systemType);
                                vm.recordType(logSet.recordType);
                                vm.currentRecordTypeName(recordTypeName);
                                vm.systemType(logSet.systemType);
                                vm.currentSystemTypeName(systemTypeName);
                                if (logSet.recordType === 3) {
                                    vm.showPersonInfo(false);
                                }
                                else {
                                    vm.showPersonInfo(true);
                                }
                                if (logSet.recordType === 6) {
                                    vm.dataType(logSet.dataType);
                                    vm.currentDataTypeName(dataTypeName);
                                    vm.showDataType(true);
                                }
                                else {
                                    vm.showDataType(false);
                                    vm.dataType("");
                                    vm.currentDataTypeName("");
                                }
                                switch (logSet.recordType) {
                                    case 0:
                                    case 1:
                                    case 9:
                                    case 10:
                                    case 11:
                                        vm.showOperator(false);
                                        vm.selectedEmpSelectedRuleCode(2);
                                        break;
                                    default:
                                        vm.showOperator(true);
                                        break;
                                }
                            };
                            //get recordType Name
                            ScreenModel.prototype.getRecordTypeName = function (currentRecordType) {
                                var vm = this;
                                return vm.recordTypeList().filter(function (recordType) { return recordType.code === currentRecordType; })[0].name;
                            };
                            //get dataType Name
                            ScreenModel.prototype.getDataTypeName = function (currentDataType) {
                                var vm = this;
                                return currentDataType === null ? '' : vm.dataTypeList().filter(function (dataType) { return dataType.code === currentDataType; })[0].name;
                            };
                            //get systemType Name
                            ScreenModel.prototype.getSystemTypeName = function (currentSystemType) {
                                var vm = this;
                                return vm.systemTypeList().filter(function (systemType) { return systemType.code === currentSystemType; })[0].name;
                            };
                            //Change display type for B5_2 (1 -> YYYY/MM/dd :: 2 -> YYYY/MM)
                            ScreenModel.prototype.getTargetDate = function (logSet) {
                                var vm = this;
                                vm.checkFormatDate('1');
                                vm.selectedEmpDateValue.valueHasMutated();
                                if (logSet.recordType === RECORD_TYPE.DATA_CORRECT) {
                                    switch (logSet.dataType) {
                                        case 2:
                                        case 3:
                                        case 6:
                                        case 7:
                                            vm.checkFormatDate('2');
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            };
                            //Open B4_3
                            ScreenModel.prototype.openDialogOperatorEmpl = function () {
                                var vm = this;
                                vm.$window
                                    .storage("CLI003_C_FormLabel", vm.$i18n("CLI003_23"))
                                    .then(function () {
                                    vm.$window.modal("/view/cli/003/c/index.xhtml").then(function () {
                                        vm.$window.storage("operatorEmployeeCount").then(function (data) {
                                            if (data) {
                                                vm.operatorEmployeeCount(data);
                                            }
                                        });
                                        vm.$window.storage("selectedEmployeeCodeOperator").then(function (data) {
                                            if (data) {
                                                vm.selectedEmployeeCodeOperator(data);
                                            }
                                        });
                                    });
                                });
                            };
                            //Open B6_3
                            ScreenModel.prototype.openDialogTargetEmpl = function () {
                                var vm = this;
                                vm.$window
                                    .storage("CLI003_C_FormLabel", vm.$i18n("CLI003_16"))
                                    .then(function () {
                                    vm.$window.modal("/view/cli/003/c/index.xhtml").then(function () {
                                        vm.$window.storage("targetEmployeeCount").then(function (data) {
                                            if (data) {
                                                vm.targetEmployeeCount(data);
                                            }
                                        });
                                        vm.$window.storage("selectedEmployeeCodeTarget").then(function (data) {
                                            if (data) {
                                                vm.selectedEmployeeCodeTarget(data);
                                            }
                                        });
                                    });
                                });
                            };
                            //check before jump to screen F
                            ScreenModel.prototype.validateBeforeJumpToF = function () {
                                var vm = this;
                                var noOne = nts.uk.text.format(vm.$i18n("CLI003_57"), 0);
                                if (vm.operatorEmpSelectedRuleCode() === 1 && vm.operatorEmployeeCount() === noOne &&
                                    vm.selectedEmpSelectedRuleCode() === 1 && vm.targetEmployeeCount() === noOne) {
                                    var bundledErrors = [{
                                            message: uk.resource.getMessage('Msg_1718'),
                                            messageId: "Msg_1718",
                                            supplements: {}
                                        }, {
                                            message: uk.resource.getMessage('Msg_1719'),
                                            messageId: "Msg_1719",
                                            supplements: {}
                                        }];
                                    nts.uk.ui.dialog.bundledErrors({ errors: bundledErrors });
                                    return false;
                                }
                                else if (vm.operatorEmpSelectedRuleCode() === 1 && vm.operatorEmployeeCount() === noOne) {
                                    vm.$dialog.error({ messageId: "Msg_1718" });
                                    return false;
                                }
                                else if (vm.selectedEmpSelectedRuleCode() === 1 && vm.targetEmployeeCount() === noOne) {
                                    vm.$dialog.error({ messageId: "Msg_1719" });
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            };
                            //jump to screen F
                            ScreenModel.prototype.jumpToScreenF = function () {
                                var vm = this;
                                if (vm.validateBeforeJumpToF()) {
                                    var data_1 = {
                                        currentCode: vm.currentCode(),
                                        logSetOutputs: vm.logSetOutputs(),
                                        targetEmployeeCount: vm.targetEmployeeCount(),
                                        operatorEmployeeCount: vm.operatorEmployeeCount(),
                                        logTypeSelectedCode: vm.recordType(),
                                        dataTypeSelectedCode: vm.dataType(),
                                        systemTypeSelectedCode: vm.systemType(),
                                        checkFormatDate: vm.checkFormatDate(),
                                        operatorEmployeeIdList: vm.selectedEmployeeCodeOperator(),
                                        dateValue: vm.selectedEmpDateValue(),
                                        startDateOperator: vm.startDateOperator(),
                                        endDateOperator: vm.endDateOperator(),
                                        selectedRuleCodeOperator: vm.operatorEmpSelectedRuleCode(),
                                        selectedRuleCodeTarget: vm.selectedEmpSelectedRuleCode(),
                                        targetEmployeeIdList: vm.selectedEmployeeCodeTarget(),
                                        displayItemNo: vm.listItemNo()
                                    };
                                    vm.$window
                                        .storage('VIEW_B_DATA', data_1)
                                        .then(function () { return vm.$jump.self("/view/cli/003/f/index.xhtml", data_1); });
                                }
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        b.ScreenModel = ScreenModel;
                        var EMPLOYEE_SPECIFIC;
                        (function (EMPLOYEE_SPECIFIC) {
                            EMPLOYEE_SPECIFIC[EMPLOYEE_SPECIFIC["SPECIFY"] = 1] = "SPECIFY";
                            EMPLOYEE_SPECIFIC[EMPLOYEE_SPECIFIC["ALL"] = 2] = "ALL";
                        })(EMPLOYEE_SPECIFIC = b.EMPLOYEE_SPECIFIC || (b.EMPLOYEE_SPECIFIC = {}));
                        var RECORD_TYPE;
                        (function (RECORD_TYPE) {
                            RECORD_TYPE[RECORD_TYPE["LOGIN"] = 0] = "LOGIN";
                            RECORD_TYPE[RECORD_TYPE["START_UP"] = 1] = "START_UP";
                            RECORD_TYPE[RECORD_TYPE["UPDATE_MASTER"] = 2] = "UPDATE_MASTER";
                            RECORD_TYPE[RECORD_TYPE["UPDATE_PERSION_INFO"] = 3] = "UPDATE_PERSION_INFO";
                            RECORD_TYPE[RECORD_TYPE["DATA_REFERENCE"] = 4] = "DATA_REFERENCE";
                            RECORD_TYPE[RECORD_TYPE["DATA_MANIPULATION"] = 5] = "DATA_MANIPULATION";
                            RECORD_TYPE[RECORD_TYPE["DATA_CORRECT"] = 6] = "DATA_CORRECT";
                            RECORD_TYPE[RECORD_TYPE["MY_NUMBER"] = 7] = "MY_NUMBER";
                            RECORD_TYPE[RECORD_TYPE["TERMINAL_COMMUNICATION_INFO"] = 8] = "TERMINAL_COMMUNICATION_INFO";
                            RECORD_TYPE[RECORD_TYPE["DATA_STORAGE"] = 9] = "DATA_STORAGE";
                            RECORD_TYPE[RECORD_TYPE["DATA_RECOVERY"] = 10] = "DATA_RECOVERY";
                            RECORD_TYPE[RECORD_TYPE["DATA_DELETION"] = 11] = "DATA_DELETION";
                        })(RECORD_TYPE = b.RECORD_TYPE || (b.RECORD_TYPE = {}));
                        var DATA_TYPE;
                        (function (DATA_TYPE) {
                            DATA_TYPE[DATA_TYPE["SCHEDULE"] = 0] = "SCHEDULE";
                            DATA_TYPE[DATA_TYPE["DAILY_RESULTS"] = 1] = "DAILY_RESULTS";
                            DATA_TYPE[DATA_TYPE["MONTHLY_RESULTS"] = 2] = "MONTHLY_RESULTS";
                            DATA_TYPE[DATA_TYPE["ANY_PERIOD_SUMMARY"] = 3] = "ANY_PERIOD_SUMMARY";
                            DATA_TYPE[DATA_TYPE["APPLICATION_APPROVAL"] = 4] = "APPLICATION_APPROVAL";
                            DATA_TYPE[DATA_TYPE["NOTIFICATION"] = 5] = "NOTIFICATION";
                            DATA_TYPE[DATA_TYPE["SALARY_DETAIL"] = 6] = "SALARY_DETAIL";
                            DATA_TYPE[DATA_TYPE["BONUS_DETAIL"] = 7] = "BONUS_DETAIL";
                            DATA_TYPE[DATA_TYPE["YEAR_END_ADJUSTMENT"] = 8] = "YEAR_END_ADJUSTMENT";
                            DATA_TYPE[DATA_TYPE["MONTHLY_CALCULATION"] = 9] = "MONTHLY_CALCULATION";
                            DATA_TYPE[DATA_TYPE["RISING_SALARY_BACK"] = 10] = "RISING_SALARY_BACK";
                        })(DATA_TYPE = b.DATA_TYPE || (b.DATA_TYPE = {}));
                        var SYMBOL;
                        (function (SYMBOL) {
                            SYMBOL[SYMBOL["INCLUDE"] = 0] = "INCLUDE";
                            SYMBOL[SYMBOL["EQUAL"] = 1] = "EQUAL";
                            SYMBOL[SYMBOL["DIFFERENT"] = 2] = "DIFFERENT";
                        })(SYMBOL = b.SYMBOL || (b.SYMBOL = {}));
                        var ItemTypeModel = /** @class */ (function () {
                            function ItemTypeModel(code, name) {
                                this.code = code;
                                this.name = name;
                            }
                            return ItemTypeModel;
                        }());
                        b.ItemTypeModel = ItemTypeModel;
                        var ItemLogSetModel = /** @class */ (function () {
                            function ItemLogSetModel(id, code, name, recordType, dataType, systemType, logSetOutputs) {
                                this.id = id;
                                this.code = code;
                                this.name = name;
                                this.recordType = recordType;
                                this.dataType = dataType;
                                this.systemType = systemType;
                                this.logSetOutputs = logSetOutputs;
                            }
                            return ItemLogSetModel;
                        }());
                        b.ItemLogSetModel = ItemLogSetModel;
                        var LogSetOutputItemModal = /** @class */ (function () {
                            function LogSetOutputItemModal(logSetId, itemNo, itemName, displayOrder, isUseFlag, logSetItemDetails) {
                                this.logSetId = logSetId;
                                this.itemNo = itemNo;
                                this.itemName = itemName;
                                this.displayOrder = displayOrder;
                                this.isUseFlag = isUseFlag;
                                this.logSetItemDetails = logSetItemDetails;
                            }
                            return LogSetOutputItemModal;
                        }());
                        b.LogSetOutputItemModal = LogSetOutputItemModal;
                        var LogSetItemDetailModal = /** @class */ (function () {
                            function LogSetItemDetailModal(logSetId, itemNo, frame, isUseCondFlg, condition, symbol) {
                                this.logSetId = logSetId;
                                this.itemNo = itemNo;
                                this.frame = frame;
                                this.isUseCondFlg = isUseCondFlg;
                                this.condition = condition;
                                this.sybol = symbol;
                            }
                            return LogSetItemDetailModal;
                        }());
                        b.LogSetItemDetailModal = LogSetItemDetailModal;
                        var LogSetItemDetailModalDisplay = /** @class */ (function () {
                            function LogSetItemDetailModalDisplay(displayItem, cond1, cond2, cond3, cond4, cond5) {
                                this.displayItem = displayItem;
                                this.cond1 = cond1;
                                this.cond2 = cond2;
                                this.cond3 = cond3;
                                this.cond4 = cond4;
                                this.cond5 = cond5;
                            }
                            return LogSetItemDetailModalDisplay;
                        }());
                        b.LogSetItemDetailModalDisplay = LogSetItemDetailModalDisplay;
                    })(b = cli003.b || (cli003.b = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli003.b.vm.js.map