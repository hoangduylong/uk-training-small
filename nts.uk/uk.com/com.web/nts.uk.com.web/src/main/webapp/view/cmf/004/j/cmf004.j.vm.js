/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
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
                var cmf004;
                (function (cmf004) {
                    var j;
                    (function (j) {
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.dateValue = ko.observable({
                                    startDate: null,
                                    endDate: null,
                                });
                                _this.baseDateValue = ko.observable({
                                    startDate: null,
                                    endDate: null,
                                });
                                _this.searchItems = ko.observableArray([
                                    { rowNumber: 1, patternCode: '', saveName: 'すべて' }
                                ]);
                                _this.searchValue = ko.observable();
                                _this.resultItems = ko.observableArray([]);
                                _this.resultValue = ko.observable(null);
                                _this.columnHeaders = [
                                    { headerText: '', key: 'rowNumber', width: '40px' },
                                    { headerText: nts.uk.resource.getText("CMF004_227"), key: 'patternCode', width: '100px', ntsControl: 'Label' },
                                    { headerText: nts.uk.resource.getText('CMF004_228'), key: 'saveName', width: '200px', ntsControl: 'Label' }
                                ];
                                _this.columnHeadersRes = [
                                    { headerText: '', key: 'rowNumber', width: '30px' },
                                    { headerText: nts.uk.resource.getText('CMF004_240'), key: 'startDatetime', width: '200px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: nts.uk.resource.getText('CMF004_241'), key: 'practitioner', width: '150px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: nts.uk.resource.getText('CMF004_242'), key: 'saveName', width: '150px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: nts.uk.resource.getText('CMF004_243'), key: 'restoreCount', width: '75px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: nts.uk.resource.getText('CMF004_244'), key: 'fileName', width: '150px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: nts.uk.resource.getText('CMF004_245'), key: 'saveCount', width: '75px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: nts.uk.resource.getText('CMF004_246'), key: 'saveStartDatetime', width: '200px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: nts.uk.resource.getText('CMF004_247'), key: 'executionResult', width: '100px', dataType: 'string', ntsControl: "Label" }
                                ];
                                _this.states = [];
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                vm.dateValue.subscribe(function (value) {
                                    if (value.startDate !== vm.baseDateValue().startDate || value.endDate !== vm.baseDateValue().endDate) {
                                        vm.baseDateValue({ startDate: value.startDate, endDate: value.endDate });
                                        vm.findSaveSet();
                                    }
                                });
                                vm.loadDataGrid();
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                var previousDateText = moment.utc().subtract(1, 'months').add(1, 'days').format("YYYY/MM/DD");
                                var currentDateText = moment.utc().format("YYYY/MM/DD");
                                vm.dateValue({
                                    startDate: previousDateText,
                                    endDate: currentDateText
                                });
                                $("#J2_4 .ntsStartDate input").focus();
                            };
                            ScreenModel.prototype.findSaveSet = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                var momentFrom = moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString();
                                var momentTo = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString();
                                j.service.findSaveSetHistory(momentFrom, momentTo)
                                    .then(function (data) {
                                    console.log(data);
                                    var res = [
                                        { rowNumber: 1, patternCode: '', saveName: 'すべて' }
                                    ];
                                    if (data && data.length) {
                                        _.each(data, function (x, i) {
                                            x.rowNumber = i + 2;
                                            res.push(x);
                                        });
                                    }
                                    vm.searchItems(res);
                                    vm.searchValue(1);
                                    //Create green rowNumber column
                                    $("document").ready(function () {
                                        $("#J3 tbody td:first-child").each(function (index) {
                                            $(this).css('background-color', '#cff1a5');
                                        });
                                    });
                                })
                                    .then(function () { return vm.findData(); })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.startFindData = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.findData().always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.findData = function () {
                                var vm = this;
                                var arr = [];
                                var searchValue;
                                if (Number(vm.searchValue()) === 1) {
                                    arr = vm.searchItems()
                                        .filter(function (data) { return data.rowNumber !== 1; })
                                        .map(function (data) { return new FindDataHistoryDto(data.patternCode, data.saveName); });
                                }
                                else {
                                    searchValue = vm.getSearchValue(vm.searchValue());
                                    arr.push(new FindDataHistoryDto(searchValue.patternCode, searchValue.saveName));
                                }
                                var param = {
                                    objects: arr,
                                    from: moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString(),
                                    to: moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString(),
                                };
                                return j.service.findData(param).then(function (data) {
                                    var res = [];
                                    if (data && data.length) {
                                        _.each(data, function (x, i) {
                                            x.rowNumber = i + 1;
                                            x.id = nts.uk.util.randomId();
                                            x.restoreCount += "人";
                                            x.saveCount += "人";
                                            x.startDatetime = moment.utc(x.startDatetime).format("YYYY/MM/DD HH:mm:ss");
                                            x.saveStartDatetime = moment.utc(x.saveStartDatetime).format("YYYY/MM/DD HH:mm:ss");
                                            res.push(x);
                                            if (x.executionResult === 'Enum_SaveStatus_FAILURE') {
                                                _.each(vm.columnHeadersRes, function (col) {
                                                    vm.states.push(new State(x.id, col.key, ["red-color"]));
                                                });
                                            }
                                            x.executionResult = nts.uk.resource.getText(x.executionResult);
                                        });
                                    }
                                    vm.resultItems(res);
                                    vm.loadDataGrid();
                                });
                            };
                            ScreenModel.prototype.getSearchValue = function (val) {
                                var vm = this;
                                return vm.searchItems().filter(function (data) { return data.rowNumber === Number(val); }).pop();
                            };
                            ScreenModel.prototype.loadDataGrid = function () {
                                var vm = this;
                                if ($("#J6").data("mGrid")) {
                                    $("#J6").mGrid("destroy");
                                }
                                vm.dataGrid = new nts.uk.ui.mgrid.MGrid($("#J6")[0], {
                                    height: 800,
                                    subHeight: 575,
                                    headerHeight: "40px",
                                    autoFitWindow: false,
                                    dataSource: vm.resultItems(),
                                    primaryKey: 'id',
                                    primaryKeyDataType: 'number',
                                    value: vm.resultValue(),
                                    rowVirtualization: true,
                                    virtualization: true,
                                    virtualizationMode: 'continuous',
                                    enter: 'right',
                                    useOptions: true,
                                    idGen: function (id) { return id + "_" + nts.uk.util.randomId(); },
                                    columns: vm.columnHeadersRes,
                                    virtualrecordsrender: function (e, args) { return vm.updateGridUI(); },
                                    features: [
                                        {
                                            name: 'Paging',
                                            pageSize: 20,
                                            currentPageIndex: 0,
                                            loaded: function () { }
                                        },
                                        {
                                            name: 'ColumnFixing', fixingDirection: 'left',
                                            showFixButtons: true,
                                            columnSettings: [
                                                { columnKey: 'rowNumber', isFixed: true }
                                            ]
                                        },
                                        {
                                            name: 'Resizing'
                                        },
                                        {
                                            name: 'WidthSaving'
                                        },
                                        {
                                            name: 'CellStyles',
                                            states: vm.states
                                        },
                                    ]
                                }).create();
                                $("#J6").ready(function () {
                                    vm.updateGridUI();
                                });
                                $("#J6 .mgrid-free").scroll(function () {
                                    vm.updateGridUI();
                                });
                            };
                            ScreenModel.prototype.updateGridUI = function () {
                                $("#J6 .mcell").addClass("halign-center");
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        j.ScreenModel = ScreenModel;
                        var FindDataHistoryDto = /** @class */ (function () {
                            function FindDataHistoryDto(patternCode, saveName) {
                                this.patternCode = patternCode;
                                this.saveName = saveName;
                            }
                            return FindDataHistoryDto;
                        }());
                        j.FindDataHistoryDto = FindDataHistoryDto;
                        var State = /** @class */ (function () {
                            function State(rowId, columnKey, state) {
                                this.rowId = rowId;
                                this.columnKey = columnKey;
                                this.state = state;
                            }
                            return State;
                        }());
                        j.State = State;
                    })(j = cmf004.j || (cmf004.j = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.j.vm.js.map