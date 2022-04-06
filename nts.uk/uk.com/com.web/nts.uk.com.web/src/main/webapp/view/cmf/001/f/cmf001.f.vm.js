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
                var cmf001;
                (function (cmf001) {
                    var f;
                    (function (f) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ajax = nts.uk.request.ajax;
                            var info = nts.uk.ui.dialog.info;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            function deleteButton(required, data) {
                                if (required === false) {
                                    return '<button type="button" class="delete-button" data-target="' + data.itemNo + '">削除</button>';
                                }
                                else {
                                    return '';
                                }
                            }
                            $(function () {
                                $(document).on("click", ".delete-button", function () {
                                    var vm = nts.uk.ui._viewModel.content;
                                    vm.removeItem($(this).data("target"));
                                });
                            });
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super.call(this) || this;
                                    _this.itemNameRow = ko.observable();
                                    _this.importStartRow = ko.observable();
                                    _this.canEditDetail = ko.observable(false);
                                    //domain
                                    _this.domainInfoList = ko.observableArray([]);
                                    _this.domainList = ko.observableArray([]);
                                    _this.layoutItemNoList = ko.observableArray([]);
                                    _this.layout = ko.observableArray([]);
                                    _this.importDomainOption = ko.observableArray(__viewContext.enums.ImportingDomainId);
                                    _this.importDomain = ko.observable();
                                    _this.selectedDomainId = ko.observable();
                                    //csv
                                    _this.csvItemOption = ko.observableArray([]);
                                    _this.selectedItem = ko.observable();
                                    _this.domainListColumns = ko.observableArray([
                                        { headerText: "ID", key: "domainId", width: 50, hidden: true },
                                        { headerText: "受入ドメイン", key: "name", width: 280 },
                                    ]);
                                    _this.canSave = ko.computed(function () { return !nts.uk.ui.errors.hasError(); });
                                    var self = _this;
                                    var params = __viewContext.transferred.get();
                                    self.settingCode = params.settingCode;
                                    self.startPage();
                                    self.selectedDomainId.subscribe(function (value) {
                                        if (value) {
                                            var info = $.grep(self.domainInfoList(), function (di) {
                                                return di.domainId == self.selectedDomainId();
                                            });
                                            if (info.length !== 0) {
                                                self.setDomain(info[0]);
                                                self.canEditDetail(info[0].resistered);
                                                return;
                                            }
                                        }
                                        self.layoutItemNoList([]);
                                        self.canEditDetail(false);
                                    });
                                    self.layoutItemNoList.subscribe(function (value) {
                                        self.setLayout(value);
                                    });
                                    if (params.domainId !== undefined) {
                                        self.selectedDomainId(params.domainId);
                                    }
                                    return _this;
                                }
                                ViewModel.prototype.setDomain = function (info) {
                                    var self = this;
                                    self.layoutItemNoList(info.itemNoList);
                                };
                                ViewModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.getListData().done(function () {
                                        if (self.domainList() !== null && self.domainList().length !== 0) {
                                            self.selectedDomainId(self.domainList()[0].domainId);
                                        }
                                    });
                                    self.$grid = $("#grid");
                                    self.initGrid();
                                    return dfd.promise();
                                };
                                ViewModel.prototype.reloadPage = function () {
                                    var self = this;
                                    self.getListData().done(function () {
                                        self.initGrid();
                                    });
                                };
                                ViewModel.prototype.getListData = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    ajax("screen/com/cmf/cmf001/e/get/setting/" + self.settingCode)
                                        .done(function (res) {
                                        var importDomains = $.map(res.domains, function (d) {
                                            var target = $.grep(__viewContext.enums.ImportingDomainId, function (domain) { return domain.value === d.domainId; })[0];
                                            return new ImportDomain(d.domainId, target.name, true);
                                        });
                                        var importDomainInfoList = $.map(res.domains, function (d) {
                                            var target = $.grep(__viewContext.enums.ImportingDomainId, function (domain) { return domain.value === d.domainId; })[0];
                                            return new DomainInfo(d.domainId, d.itemNoList, true);
                                        });
                                        self.domainList(importDomains);
                                        self.domainInfoList(importDomainInfoList);
                                        var csvItem = $.map(res.csvItems, function (value, index) {
                                            return new CsvItem(index + 1, value);
                                        });
                                        csvItem.unshift(new CsvItem(null, ''));
                                        self.csvItemOption = ko.observableArray(csvItem);
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.reject();
                                        alert(error.message);
                                    });
                                    return dfd.promise();
                                };
                                ViewModel.prototype.initGrid = function () {
                                    var self = this;
                                    var comboColumns = [
                                        { prop: "no", length: 2 },
                                        { prop: "name", length: 10 }
                                    ];
                                    if (self.$grid.data("igGrid")) {
                                        self.$grid.ntsGrid("destroy");
                                    }
                                    self.$grid.ntsGrid({
                                        height: '300px',
                                        dataSource: self.layout(),
                                        primaryKey: 'itemNo',
                                        rowVirtualization: true,
                                        virtualization: true,
                                        virtualizationMode: 'continuous',
                                        columns: [
                                            { headerText: "削除", key: "required", dataType: 'boolean', width: 50, formatter: deleteButton },
                                            { headerText: "NO", key: "itemNo", dataType: 'number', width: 50, hidden: true },
                                            { headerText: "名称", key: "name", dataType: 'string', width: 250 },
                                            { headerText: "受入元", key: "isFixedValue", dataType: 'number', width: 130, ntsControl: 'SwitchButtons' },
                                            { headerText: "CSVヘッダ名", key: "selectedCsvItemNo", dataType: 'number', width: 220, ntsControl: 'Combobox' },
                                            { headerText: "サンプルデータ", key: "csvData", dataType: 'string', width: 120 }
                                        ],
                                        features: [
                                            {},
                                        ],
                                        ntsControls: [
                                            {
                                                name: 'SwitchButtons',
                                                options: [{ value: 0, text: 'CSV' }, { value: 1, text: '固定値' }],
                                                optionsValue: 'value',
                                                optionsText: 'text',
                                                controlType: 'SwitchButtons',
                                                enable: true
                                            },
                                            {
                                                name: 'Combobox',
                                                options: self.csvItemOption(),
                                                optionsValue: 'no',
                                                optionsText: 'name',
                                                columns: comboColumns,
                                                controlType: 'ComboBox',
                                                visibleItemsCount: 5,
                                                dropDownAttachedToBody: false,
                                                selectFirstIfNull: false,
                                                enable: true
                                            }
                                        ]
                                    });
                                };
                                ViewModel.prototype.removeItem = function (target) {
                                    var self = this;
                                    var index = self.layoutItemNoList().findIndex(function (item) { return item === target; });
                                    self.layoutItemNoList().splice(index, 1);
                                    self.setLayout(self.layoutItemNoList());
                                };
                                ViewModel.prototype.checkError = function () {
                                    nts.uk.ui.errors.clearAll();
                                    $('.check-target').ntsError('check');
                                };
                                ViewModel.prototype.setLayout = function (itemNoList) {
                                    var self = this;
                                    if (itemNoList.length > 0) {
                                        var condition = {
                                            settingCode: self.settingCode,
                                            importingDomainId: self.selectedDomainId(),
                                            itemNoList: itemNoList
                                        };
                                        ajax("screen/com/cmf/cmf001/f/get/layout/detail", condition).done(function (layoutItems) {
                                            self.layout(layoutItems);
                                            self.initGrid();
                                        });
                                    }
                                    else {
                                        self.layout([]);
                                    }
                                };
                                ViewModel.prototype.save = function () {
                                    var self = this;
                                    self.checkError();
                                    if (!nts.uk.ui.errors.hasError()) {
                                        var domains = $.map(self.layout(), function (l) {
                                            return {
                                                itemNo: l.itemNo,
                                                isFixedValue: l.isFixedValue,
                                                csvItemNo: l.selectedCsvItemNo,
                                                fixedValue: l.fixedValue
                                            };
                                        });
                                        var saveContents = {
                                            code: self.settingCode,
                                            domainId: self.selectedDomainId(),
                                            items: domains
                                        };
                                        ajax("screen/com/cmf/cmf001/f/save", saveContents).done(function () {
                                            info(nts.uk.resource.getMessage("Msg_15", []));
                                            self.reloadPage();
                                        });
                                    }
                                };
                                ViewModel.prototype.uploadCsv = function () {
                                    var self = this;
                                };
                                ViewModel.prototype.addImportDomain = function () {
                                    var self = this;
                                    var index = self.domainInfoList().findIndex(function (di) { return di.domainId === self.importDomain(); });
                                    if (index != -1) {
                                        info("既に追加されています");
                                        return;
                                    }
                                    var selected = $.grep(__viewContext.enums.ImportingDomainId, function (domain) { return domain.value === self.importDomain(); })[0];
                                    self.domainList.push(new ImportDomain(selected.value, selected.name, true));
                                    var condition = {
                                        settingCode: self.settingCode,
                                        importingDomainId: self.importDomain(),
                                        itemNoList: []
                                    };
                                    ajax("com", "screen/com/cmf/cmf001/b/get/layout", condition)
                                        .done(function (itemNoList) {
                                        self.domainInfoList.push(new DomainInfo(self.importDomain(), itemNoList), false);
                                        self.selectedDomainId(self.importDomain());
                                        self.importDomain(null);
                                    });
                                };
                                ViewModel.prototype.deleteImportDomain = function () {
                                    var self = this;
                                    uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        ajax("screen/com/cmf/cmf001/f/delete", {
                                            code: self.settingCode,
                                            domainId: self.selectedDomainId()
                                        }).done(function () {
                                            info(nts.uk.resource.getMessage("Msg_16", []));
                                            var index = self.domainInfoList().findIndex(function (di) { return di.domainId === self.selectedDomainId(); });
                                            self.domainInfoList.splice(index, 1);
                                            self.domainList.splice(index, 1);
                                            self.selectedDomainId(null);
                                            self.reloadPage();
                                        });
                                    });
                                };
                                ViewModel.prototype.selectLayout = function () {
                                    var self = this;
                                    setShared('CMF001DParams', {
                                        domainId: self.selectedDomainId(),
                                        selectedItems: self.layoutItemNoList()
                                    }, true);
                                    nts.uk.ui.windows.sub.modal("/view/cmf/001/d/index.xhtml").onClosed(function () {
                                        // ダイアログを閉じたときの処理
                                        if (!getShared('CMF001DCancel')) {
                                            var ItemNoList = getShared('CMF001DOutput');
                                            console.log("closed: " + ItemNoList);
                                            ko.utils.arrayPushAll(self.layoutItemNoList, ItemNoList.map(function (n) { return Number(n); }));
                                        }
                                    });
                                };
                                ViewModel.prototype.gotoDetailSetting = function () {
                                    var self = this;
                                    uk.request.jump("../c/index.xhtml", {
                                        settingCode: self.settingCode,
                                        domainId: self.selectedDomainId(),
                                        screenId: 'cmf001f'
                                    });
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            var Setting = /** @class */ (function () {
                                function Setting(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return Setting;
                            }());
                            viewmodel.Setting = Setting;
                            var SettingInfo = /** @class */ (function () {
                                function SettingInfo(companyId, code, name, itemNameRow, importStartRow) {
                                    this.companyId = companyId;
                                    this.code = code;
                                    this.name = name;
                                    this.itemNameRow = itemNameRow;
                                    this.importStartRow = importStartRow;
                                }
                                SettingInfo.new = function () {
                                    return new SettingInfo(__viewContext.user.companyId, "", "", null, null, null);
                                };
                                return SettingInfo;
                            }());
                            viewmodel.SettingInfo = SettingInfo;
                            var ImportDomain = /** @class */ (function () {
                                function ImportDomain(domainId, name, deletable) {
                                    this.domainId = domainId;
                                    this.name = name;
                                    this.deletable = deletable;
                                }
                                return ImportDomain;
                            }());
                            viewmodel.ImportDomain = ImportDomain;
                            var DomainInfo = /** @class */ (function () {
                                function DomainInfo(domainId, itemNoList, resistered) {
                                    this.domainId = domainId;
                                    this.itemNoList = itemNoList;
                                    this.resistered = resistered;
                                }
                                DomainInfo.new = function () {
                                    return new DomainInfo(null, [], false);
                                };
                                return DomainInfo;
                            }());
                            viewmodel.DomainInfo = DomainInfo;
                            var Layout = /** @class */ (function () {
                                function Layout(itemNo, name, required, selectedCsvItemNo, fixedValue, csvData, isFixedValue) {
                                    this.itemNo = itemNo;
                                    this.name = name;
                                    this.required = required;
                                    this.selectedCsvItemNo = selectedCsvItemNo;
                                    this.fixedValue = fixedValue;
                                    this.csvData = csvData;
                                    this.isFixedValue = isFixedValue;
                                }
                                return Layout;
                            }());
                            viewmodel.Layout = Layout;
                            var CsvItem = /** @class */ (function () {
                                function CsvItem(no, name) {
                                    this.no = no;
                                    this.name = name;
                                }
                                return CsvItem;
                            }());
                            viewmodel.CsvItem = CsvItem;
                        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
                    })(f = cmf001.f || (cmf001.f = {}));
                })(cmf001 = view.cmf001 || (view.cmf001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf001.f.vm.js.map