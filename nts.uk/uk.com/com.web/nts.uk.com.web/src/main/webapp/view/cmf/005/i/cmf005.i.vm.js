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
                var cmf005;
                (function (cmf005) {
                    var i;
                    (function (i_1) {
                        var getText = nts.uk.resource.getText;
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
                                    { headerText: getText("CMF005_19"), key: 'patternCode', width: '100px', ntsControl: 'Label' },
                                    { headerText: getText('CMF005_20'), key: 'delName', width: '200px', ntsControl: 'Label' }
                                ];
                                _this.columnHeadersRes = [
                                    { headerText: '', key: 'rowNumber', width: '30px' },
                                    { headerText: getText('CMF005_127'), key: 'deleteFile', width: '90px', dataType: 'string', ntsControl: "Button" },
                                    { headerText: getText('CMF005_128'), key: 'downloadFile', width: '90px', dataType: 'string', ntsControl: "FlexImage" },
                                    { headerText: getText('CMF005_129'), key: 'delete', width: '75px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: getText('CMF005_130'), key: 'startDateTimeDel', width: '150px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: getText('CMF005_131'), key: 'practitioner', width: '150px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: getText('CMF005_132'), key: 'delName', width: '150px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: getText('CMF005_133'), key: 'delType', width: '75px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: getText('CMF005_134'), key: 'numberEmployees', width: '75px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: getText('CMF005_135'), key: 'fileName', width: '240px', dataType: 'string', ntsControl: "Label" },
                                    { headerText: getText('CMF005_136'), key: 'fileSize', width: '100px', dataType: 'string', ntsControl: "Label" },
                                ];
                                _this.states = [];
                                _this.storageSize = ko.observable(0);
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
                                $("#I3_1_1 .ntsStartDate input").focus();
                            };
                            ScreenModel.prototype.findSaveSet = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                var momentFrom = moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString();
                                var momentTo = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString();
                                i_1.service.findSaveSetHistory(momentFrom, momentTo)
                                    .then(function (data) {
                                    var res = [
                                        { rowNumber: 1, patternCode: '', delName: 'すべて' }
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
                                        $("#J3_1 tbody td:first-child").each(function (index) {
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
                                    arr = _.map(_.filter(vm.searchItems(), function (data) { return data.rowNumber !== 1; }), function (data) { return new FindDataHistoryDto(data.patternCode, data.delName); });
                                }
                                else {
                                    searchValue = vm.getSearchValue(vm.searchValue());
                                    arr.push(new FindDataHistoryDto(searchValue.patternCode, searchValue.delName));
                                }
                                var param = {
                                    objects: arr,
                                    from: moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString(),
                                    to: moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString(),
                                };
                                return i_1.service.findData(param).then(function (data) {
                                    var res = [];
                                    if (data && data.length) {
                                        _.each(data, function (x, i) {
                                            x.rowNumber = i + 1;
                                            x.id = nts.uk.util.randomId();
                                            x.numberEmployees += "人";
                                            x.fileSize = Math.round(Number(x.fileSize) / 1024) + "KB";
                                            x.saveStartDatetime = moment.utc(x.saveStartDatetime).format("YYYY/MM/DD HH:mm:ss");
                                            x.startDateTimeDel = moment.utc(x.startDateTimeDel).format("YYYY/MM/DD HH:mm:ss");
                                            x.delete = getText("CMF005_141");
                                            x.delType = getText(x.delType);
                                            x.deleteFile = !x.deletedFilesFlg ? "1" : null;
                                            x.downloadFile = !x.deletedFilesFlg ? "1" : null;
                                            res.push(x);
                                        });
                                    }
                                    vm.resultItems(res);
                                    vm.loadDataGrid();
                                });
                            };
                            ScreenModel.prototype.getSearchValue = function (val) {
                                var vm = this;
                                return _.filter(vm.searchItems(), function (data) { return data.rowNumber === Number(val); }).pop();
                            };
                            ScreenModel.prototype.loadDataGrid = function () {
                                var vm = this;
                                if ($("#I5").data("mGrid")) {
                                    $("#I5").mGrid("destroy");
                                }
                                vm.states = [];
                                _.forEach(vm.resultItems(), function (item) {
                                    if (item && item.deletedFilesFlg) {
                                        vm.states.push(new State(item.id, 'deleteFile', ['hidden-item']));
                                        vm.states.push(new State(item.id, 'downloadFile', ['hidden-item']));
                                    }
                                });
                                vm.dataGrid = new nts.uk.ui.mgrid.MGrid($("#I5")[0], {
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
                                            loaded: function () { return vm.updateGridUI(); }
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
                                            name: 'CellStyles',
                                            states: vm.states
                                        },
                                    ],
                                    ntsControls: [
                                        { name: 'Button', controlType: 'Button', text: getText('CMF005_141'), enable: true, click: function (i) { return vm.deleteFile(i); } },
                                        { name: 'FlexImage', controlType: 'Button', source: 'download-icon', text: ' ', enable: true, click: function (i) { return vm.download(i); } },
                                    ]
                                }).create();
                                $("#I5").ready(function () {
                                    vm.updateGridUI();
                                });
                                $("#I5 .mgrid-free").scroll(function () {
                                    vm.updateGridUI();
                                });
                            };
                            ScreenModel.prototype.updateGridUI = function () {
                                $("#I5 .mcell").addClass("halign-center");
                                $("#I5 .mcell:nth-child(2) button").addClass("download-icon");
                            };
                            ScreenModel.prototype.download = function (value) {
                                var vm = this;
                                nts.uk.request.specials.donwloadFile(value.fileId);
                            };
                            ScreenModel.prototype.deleteFile = function (value) {
                                var vm = this;
                                /**
                                 * 確認メッセージ（Msg_18）を表示する
                                 */
                                vm.$dialog.confirm({ messageId: 'Msg_18' }).then(function (result) {
                                    /**
                                     * 「いいえ」（ID：Msg_36）をクリック
                                     */
                                    if (result === 'no') {
                                        /**
                                         * 終了状態：削除処理をキャンセル
                                         */
                                        return;
                                    }
                                    /**
                                     * 「はい」（ID：Msg_35）をクリック
                                     */
                                    if (result === 'yes') {
                                        if (value.fileId) {
                                            vm.$blockui("grayout");
                                            /**
                                             * 終了状態：削除処理を実行
                                             */
                                            nts.uk.request.file.remove(value.fileId);
                                            i_1.service.deleteData(value.fileId).then(function () {
                                                var item = _.find(vm.resultItems(), { fileId: value.fileId });
                                                item.downloadFile = null;
                                                item.deleteFile = null;
                                                item.deletedFilesFlg = true;
                                                vm.resultItems.valueHasMutated();
                                                vm.loadDataGrid();
                                            }).always(function () {
                                                vm.$blockui("clear");
                                            });
                                        }
                                    }
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        i_1.ScreenModel = ScreenModel;
                        var FindDataHistoryDto = /** @class */ (function () {
                            function FindDataHistoryDto(patternCode, saveName) {
                                this.patternCode = patternCode;
                                this.saveName = saveName;
                            }
                            return FindDataHistoryDto;
                        }());
                        i_1.FindDataHistoryDto = FindDataHistoryDto;
                        var State = /** @class */ (function () {
                            function State(rowId, columnKey, state) {
                                this.rowId = rowId;
                                this.columnKey = columnKey;
                                this.state = state;
                            }
                            return State;
                        }());
                        i_1.State = State;
                        var DataDto = /** @class */ (function () {
                            function DataDto() {
                            }
                            return DataDto;
                        }());
                        i_1.DataDto = DataDto;
                    })(i = cmf005.i || (cmf005.i = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.i.vm.js.map