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
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ajax = nts.uk.request.ajax;
                            var info = nts.uk.ui.dialog.info;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            function deleteButton(required, data) {
                                if (required === "false") {
                                    return '<button type="button" class="delete-button" data-target="' + data.itemNo + '">削除</button>';
                                }
                                else {
                                    return '';
                                }
                            }
                            $(function () {
                                $("#layout-list").on("click", ".delete-button", function () {
                                    var vm = nts.uk.ui._viewModel.content;
                                    vm.removeItem($(this).data("target"));
                                });
                            });
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super.call(this) || this;
                                    _this.isNewMode = ko.observable(true);
                                    _this.settingList = ko.observableArray([]);
                                    _this.settingCode = ko.observable();
                                    _this.settingName = ko.observable();
                                    _this.importDomain = ko.observable();
                                    _this.importMode = ko.observable();
                                    _this.itemNameRow = ko.observable();
                                    _this.importStartRow = ko.observable();
                                    _this.layoutItemNoList = ko.observableArray([]);
                                    _this.csvFileId = "";
                                    _this.importDomainOption = ko.observableArray(__viewContext.enums.ImportingDomainId);
                                    _this.importModeOption = ko.observableArray(__viewContext.enums.ImportingMode);
                                    _this.selectedCode = ko.observable();
                                    _this.layout = ko.observableArray([]);
                                    _this.selectedItem = ko.observable();
                                    _this.canAddItem = ko.computed(function () { return !uk.util.isNullOrEmpty(_this.importDomain()); });
                                    _this.canEditDetail = ko.computed(function () { return !uk.util.isNullOrEmpty(_this.selectedCode()); });
                                    _this.settingListColumns = ko.observableArray([
                                        { headerText: "コード", key: "code", width: 50 },
                                        { headerText: "名称", key: "name", width: 200 },
                                    ]);
                                    _this.layoutListColumns = ko.observableArray([
                                        { headerText: "削除", key: "required", width: 50, formatter: deleteButton },
                                        { headerText: "NO", key: "itemNo", width: 100, hidden: true },
                                        { headerText: "名称", key: "name", width: 300 },
                                        { headerText: "型", key: "type", width: 80 },
                                        { headerText: "受入元", key: "source", width: 80 },
                                    ]);
                                    _this.canSave = ko.computed(function () { return !nts.uk.ui.errors.hasError(); });
                                    _this.canRemove = ko.computed(function () { return !uk.util.isNullOrEmpty(_this.selectedCode()); });
                                    var self = _this;
                                    self.startPage();
                                    // 受入設定の変更検知
                                    self.selectedCode.subscribe(function (value) {
                                        if (value) {
                                            // 選択した場合、更新モードへ
                                            self.updateMode();
                                        }
                                        else {
                                            // 選択解除した場合、新規モードへ
                                            self.newMode();
                                        }
                                    });
                                    self.importDomain.extend({ notify: 'always' });
                                    self.importDomain.subscribe(function (value) {
                                        if (value) {
                                            var condition = {
                                                settingCode: self.settingCode(),
                                                importingDomainId: self.importDomain(),
                                                itemNoList: []
                                            };
                                            ajax("com", "screen/com/cmf/cmf001/b/get/layout", condition).done(function (itemNoList) {
                                                self.layoutItemNoList(itemNoList);
                                            });
                                        }
                                        else {
                                            self.layoutItemNoList([]);
                                        }
                                    });
                                    self.layoutItemNoList.subscribe(function (value) {
                                        self.setLayout(value);
                                    });
                                    return _this;
                                }
                                ViewModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.getListData().done(function () {
                                        if (self.settingList().length !== 0) {
                                            self.selectedCode(self.settingList()[0].code.toString());
                                        }
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ViewModel.prototype.reloadPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.getListData().done(function () {
                                        dfd.resolve();
                                    });
                                };
                                ViewModel.prototype.getListData = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    ajax("screen/com/cmf/cmf001/b/get/settings/domainbase").done(function (lstData) {
                                        var sortedData = _.orderBy(lstData, ['code'], ['asc']);
                                        self.settingList(sortedData);
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.reject();
                                        alert(error.message);
                                    });
                                    return dfd.promise();
                                };
                                ViewModel.prototype.newMode = function () {
                                    var self = this;
                                    self.selectedCode("");
                                    self.setInfo(SettingInfo.new());
                                    self.isNewMode(true);
                                };
                                ViewModel.prototype.updateMode = function () {
                                    var self = this;
                                    ajax("com", "screen/com/cmf/cmf001/b/get/setting/" + self.selectedCode()).done(function (infoData) {
                                        self.setInfo(infoData);
                                        self.isNewMode(false);
                                        self.checkError();
                                    });
                                };
                                ViewModel.prototype.checkError = function () {
                                    nts.uk.ui.errors.clearAll();
                                    $('.check-target').ntsError('check');
                                };
                                ViewModel.prototype.setInfo = function (info) {
                                    var self = this;
                                    self.settingCode(info.code);
                                    self.settingName(info.name);
                                    self.importMode(info.mode);
                                    self.itemNameRow(info.itemNameRow);
                                    self.importStartRow(info.importStartRow);
                                    self.csvFileId = info.csvFileId;
                                    self.importDomain(info.domains[0].domainId);
                                };
                                ViewModel.prototype.setLayout = function (itemNoList) {
                                    var self = this;
                                    if (itemNoList.length > 0) {
                                        var condition = {
                                            settingCode: self.settingCode(),
                                            importingDomainId: self.importDomain(),
                                            itemNoList: itemNoList
                                        };
                                        ajax("screen/com/cmf/cmf001/b/get/layout/detail", condition).done(function (layoutItems) {
                                            self.layout(layoutItems);
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
                                        var saveContents = {
                                            createMode: self.isNewMode(),
                                            baseType: 1,
                                            setting: new SettingInfo(__viewContext.user.companyId, self.settingCode(), self.settingName(), self.importDomain(), self.importMode(), self.itemNameRow(), self.importStartRow(), self.csvFileId, self.layoutItemNoList()),
                                        };
                                        ajax("screen/com/cmf/cmf001/b/save", saveContents).done(function () {
                                            info(nts.uk.resource.getMessage("Msg_15", []));
                                            self.reloadPage();
                                            self.selectedCode(self.settingCode());
                                        }).fail(function (error) {
                                            nts.uk.ui.dialog.alert({ messageId: error.messageId });
                                        });
                                    }
                                };
                                ViewModel.prototype.remove = function () {
                                    var _this = this;
                                    var self = this;
                                    var target = { code: self.selectedCode() };
                                    uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        _this.$ajax("exio/input/setting/remove", target).done(function () {
                                            info(nts.uk.resource.getMessage("Msg_16", []));
                                            self.reloadPage();
                                            self.selectedCode("");
                                        });
                                    });
                                };
                                ViewModel.prototype.selectLayout = function () {
                                    var self = this;
                                    setShared('CMF001DParams', {
                                        domainId: self.importDomain(),
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
                                    uk.request.jump("../c/index.xhtml", {
                                        settingCode: this.settingCode(),
                                        domainId: this.importDomain(),
                                        screenId: 'cmf001b'
                                    });
                                };
                                ViewModel.prototype.removeItem = function (target) {
                                    var self = this;
                                    self.layoutItemNoList(self.layoutItemNoList().filter(function (itemNo) {
                                        return itemNo !== target;
                                    }));
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
                                function SettingInfo(companyId, code, name, domain, mode, itemNameRow, importStartRow, csvFileId, itemNoList) {
                                    this.companyId = companyId;
                                    this.code = code;
                                    this.name = name;
                                    this.mode = mode;
                                    this.itemNameRow = itemNameRow;
                                    this.importStartRow = importStartRow;
                                    this.csvFileId = csvFileId;
                                    this.domains = [
                                        {
                                            domainId: domain,
                                            itemNoList: itemNoList
                                        }
                                    ];
                                }
                                SettingInfo.new = function () {
                                    return new SettingInfo(__viewContext.user.companyId, "", "", null, null, null, []);
                                };
                                return SettingInfo;
                            }());
                            viewmodel.SettingInfo = SettingInfo;
                            var Layout = /** @class */ (function () {
                                function Layout(itemNo, name, required, type, source) {
                                    this.itemNo = itemNo;
                                    this.name = name;
                                    this.required = required;
                                    this.type = type;
                                    this.source = source;
                                }
                                return Layout;
                            }());
                            viewmodel.Layout = Layout;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmf001.b || (cmf001.b = {}));
                })(cmf001 = view.cmf001 || (view.cmf001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf001.b.vm.js.map