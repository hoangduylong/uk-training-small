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
                var cli002;
                (function (cli002) {
                    var a;
                    (function (a) {
                        var API = {
                            findBySystem: "sys/portal/pginfomation/findBySystem",
                            updateLogSetting: "sys/portal/logsettings/update",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.systemList = ko.observableArray([
                                    new SystemTypeModel({
                                        index: 0,
                                        localizedName: _this.$i18n("Enum_SystemType_PERSON_SYSTEM"),
                                    }),
                                    new SystemTypeModel({
                                        index: 1,
                                        localizedName: _this.$i18n("Enum_SystemType_ATTENDANCE_SYSTEM"),
                                    }),
                                    new SystemTypeModel({
                                        index: 2,
                                        localizedName: _this.$i18n("Enum_SystemType_PAYROLL_SYSTEM"),
                                    }),
                                    new SystemTypeModel({
                                        index: 3,
                                        localizedName: _this.$i18n("Enum_SystemType_OFFICE_HELPER"),
                                    }),
                                ]);
                                _this.dataSourceItem = ko.observableArray([]);
                                _this.selectedSystemCode = ko.observable(0);
                                _this.systemColumns = [
                                    {
                                        headerText: "",
                                        prop: "index",
                                        width: 160,
                                        hidden: true,
                                    },
                                    {
                                        headerText: _this.$i18n("CLI002_3"),
                                        prop: "localizedName",
                                        width: 160,
                                    },
                                ];
                                return _this;
                            }
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$grid = $("#item-list");
                                vm.selectedSystemCode.subscribe(function (newValue) {
                                    if (vm.$grid.data("igGrid")) {
                                        vm.$grid.ntsGrid("destroy");
                                    }
                                    // アルゴリズム「ログ設定画面表示」を実行する
                                    vm.$nextTick(function () { return vm.getData(newValue); });
                                });
                                vm.selectedSystemCode.valueHasMutated();
                            };
                            /**
                             *
                             */
                            ScreenModel.prototype.register = function () {
                                var vm = this;
                                var logSettings = _.map(vm.dataSourceItem(), function (item) {
                                    return new LogSettingSaveDto({
                                        system: vm.selectedSystemCode(),
                                        programId: item.programId,
                                        menuClassification: item.menuClassification,
                                        loginHistoryRecord: item.logLoginDisplay ? 1 : 0,
                                        startHistoryRecord: item.logStartDisplay ? 1 : 0,
                                        updateHistoryRecord: item.logUpdateDisplay ? 1 : 0,
                                        programCd: item.programCd,
                                    });
                                });
                                var command = new LogSettingSaveCommand({
                                    logSettings: logSettings,
                                });
                                // ログ設定更新
                                vm.$blockui("grayout");
                                vm.$ajax(API.updateLogSetting, command)
                                    .then(function () {
                                    vm.$blockui("clear");
                                    // 情報メッセージ（Msg_15）を表示する
                                    vm.$dialog.info({ messageId: "Msg_15" });
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            /**
                             * ログ設定画面を表示する
                             * @param systemType
                             */
                            ScreenModel.prototype.getData = function (systemType) {
                                var vm = this;
                                vm.$blockui("grayout")
                                    .then(function () { return vm.$ajax("".concat(API.findBySystem, "/").concat(systemType)); })
                                    .then(function (response) {
                                    var listPG = _.map(response, function (item, index) { return new PGInfomationModel({
                                        rowNumber: index + 1,
                                        functionName: item.functionName,
                                        logLoginDisplay: item.loginHistoryRecord.usageCategory === 1,
                                        logStartDisplay: item.bootHistoryRecord.usageCategory === 1,
                                        logUpdateDisplay: item.editHistoryRecord.usageCategory === 1,
                                        programId: item.programId,
                                        menuClassification: item.menuClassification,
                                        programCd: item.programCd,
                                    }); });
                                    vm.dataSourceItem(listPG);
                                    vm.initGrid(response);
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.initGrid = function (response) {
                                var vm = this;
                                var statesTable = [];
                                var color = nts.uk.ui.jqueryExtentions.ntsGrid.color;
                                var stateDisabled = [color.Disable];
                                response.forEach(function (item, index) {
                                    // ※１ PG一覧．PG情報．ログイン履歴の記録．活性区分　＝　True
                                    if (item.loginHistoryRecord.activeCategory === 0) {
                                        statesTable.push(new CellStateModel({
                                            rowId: index + 1,
                                            columnKey: "logLoginDisplay",
                                            state: stateDisabled,
                                        }));
                                    }
                                    // ※2 PG一覧．PG情報．起動履歴記録．活性区分　＝　True
                                    if (item.bootHistoryRecord.activeCategory === 0) {
                                        statesTable.push(new CellStateModel({
                                            rowId: index + 1,
                                            columnKey: "logStartDisplay",
                                            state: stateDisabled,
                                        }));
                                    }
                                    // ※3 PG一覧．PG情報．起動履歴記録．活性区分　＝　True
                                    if (item.editHistoryRecord.activeCategory === 0) {
                                        statesTable.push(new CellStateModel({
                                            rowId: index + 1,
                                            columnKey: "logUpdateDisplay",
                                            state: stateDisabled,
                                        }));
                                    }
                                });
                                vm.$grid.ntsGrid({
                                    primaryKey: "rowNumber",
                                    height: "445px",
                                    dataSource: vm.dataSourceItem(),
                                    rowVirtualization: true,
                                    virtualization: true,
                                    virtualizationMode: "continuous",
                                    columns: [
                                        {
                                            headerText: "",
                                            key: "rowNumber",
                                            dataType: "number",
                                            width: "30px",
                                        },
                                        {
                                            headerText: this.$i18n("CLI002_7"),
                                            key: "functionName",
                                            dataType: "string",
                                            width: "350x",
                                        },
                                        {
                                            headerText: this.$i18n("CLI002_4"),
                                            key: "logLoginDisplay",
                                            dataType: "boolean",
                                            width: "200px",
                                            ntsControl: "Checkbox",
                                            showHeaderCheckbox: true,
                                        },
                                        {
                                            headerText: this.$i18n("CLI002_5"),
                                            key: "logStartDisplay",
                                            dataType: "boolean",
                                            width: "200px",
                                            ntsControl: "Checkbox",
                                            showHeaderCheckbox: true,
                                        },
                                        {
                                            headerText: this.$i18n("CLI002_6"),
                                            key: "logUpdateDisplay",
                                            dataType: "boolean",
                                            width: "200px",
                                            ntsControl: "Checkbox",
                                            showHeaderCheckbox: true,
                                        },
                                    ],
                                    features: [
                                        {
                                            name: "Selection",
                                            mode: "row",
                                            multipleSelection: false,
                                            activation: false
                                        },
                                    ],
                                    ntsFeatures: [
                                        // { name: 'CopyPaste' },
                                        {
                                            name: "CellState",
                                            rowId: "rowId",
                                            columnKey: "columnKey",
                                            state: "state",
                                            states: statesTable,
                                        },
                                    ],
                                    ntsControls: [
                                        {
                                            name: "Checkbox",
                                            options: { value: 1, text: "" },
                                            optionsValue: "value",
                                            optionsText: "text",
                                            controlType: "CheckBox",
                                            enable: true,
                                        },
                                    ],
                                });
                                $("#item-list").setupSearchScroll("igGrid", true);
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                        var PGInfomationModel = /** @class */ (function () {
                            function PGInfomationModel(init) {
                                $.extend(this, init);
                            }
                            return PGInfomationModel;
                        }());
                        a.PGInfomationModel = PGInfomationModel;
                        var LogSettingSaveDto = /** @class */ (function () {
                            function LogSettingSaveDto(init) {
                                $.extend(this, init);
                            }
                            return LogSettingSaveDto;
                        }());
                        a.LogSettingSaveDto = LogSettingSaveDto;
                        var LogSettingSaveCommand = /** @class */ (function () {
                            function LogSettingSaveCommand(init) {
                                $.extend(this, init);
                            }
                            return LogSettingSaveCommand;
                        }());
                        a.LogSettingSaveCommand = LogSettingSaveCommand;
                        var SystemTypeModel = /** @class */ (function () {
                            function SystemTypeModel(init) {
                                $.extend(this, init);
                            }
                            return SystemTypeModel;
                        }());
                        a.SystemTypeModel = SystemTypeModel;
                        var CellStateModel = /** @class */ (function () {
                            function CellStateModel(init) {
                                $.extend(this, init);
                            }
                            return CellStateModel;
                        }());
                        a.CellStateModel = CellStateModel;
                    })(a = cli002.a || (cli002.a = {}));
                })(cli002 = view.cli002 || (view.cli002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli002.a.vm.js.map