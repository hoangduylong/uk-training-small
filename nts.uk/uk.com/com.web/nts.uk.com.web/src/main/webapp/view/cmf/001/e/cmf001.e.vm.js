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
                    var e;
                    (function (e) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ajax = nts.uk.request.ajax;
                            var info = nts.uk.ui.dialog.info;
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super.call(this) || this;
                                    _this.isNewMode = ko.observable(true);
                                    _this.settingList = ko.observableArray([]);
                                    _this.settingCode = ko.observable();
                                    _this.settingName = ko.observable();
                                    _this.itemNameRow = ko.observable();
                                    _this.importStartRow = ko.observable();
                                    _this.importDomainOption = ko.observableArray(__viewContext.enums.ImportingDomainId);
                                    _this.selectedCode = ko.observable();
                                    _this.selectedItem = ko.observable();
                                    _this.canEditDetail = ko.computed(function () { return !uk.util.isNullOrEmpty(_this.selectedCode()); });
                                    // csv
                                    _this.csvFileName = ko.observable();
                                    _this.csvFileId = ko.observable();
                                    _this.settingListColumns = ko.observableArray([
                                        { headerText: "コード", key: "code", width: 50 },
                                        { headerText: "名称", key: "name", width: 200 },
                                    ]);
                                    _this.canSave = ko.computed(function () { return !nts.uk.ui.errors.hasError(); });
                                    _this.canRemove = ko.computed(function () { return !uk.util.isNullOrEmpty(_this.selectedCode()); });
                                    var self = _this;
                                    self.startPage();
                                    self.selectedCode.subscribe(function (value) {
                                        if (value) {
                                            self.updateMode();
                                        }
                                        else {
                                            self.newMode();
                                        }
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
                                    ajax("screen/com/cmf/cmf001/e/get/settings/csvbase")
                                        .done(function (lstData) {
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
                                    ajax("com", "screen/com/cmf/cmf001/e/get/setting/" + self.selectedCode())
                                        .done(function (infoData) {
                                        self.setInfo(infoData);
                                        self.isNewMode(false);
                                        self.checkError();
                                        ajax("com", "shr/infra/file/storage/infor/" + self.csvFileId())
                                            .done(function (res) {
                                            self.csvFileName(res.originalName);
                                        });
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
                                    self.itemNameRow(info.itemNameRow);
                                    self.importStartRow(info.importStartRow);
                                    self.csvFileId(info.csvFileId);
                                };
                                ViewModel.prototype.csvFileUploaded = function (fileInfo) {
                                    var self = this;
                                    self.csvFileId(fileInfo.id);
                                };
                                ViewModel.prototype.save = function () {
                                    var self = this;
                                    self.checkError();
                                    if (!nts.uk.ui.errors.hasError()) {
                                        var saveContents = {
                                            createMode: self.isNewMode(),
                                            baseType: 2,
                                            setting: new SettingInfo(__viewContext.user.companyId, self.settingCode(), self.settingName(), self.itemNameRow(), self.importStartRow(), self.csvFileId())
                                        };
                                        ajax("screen/com/cmf/cmf001/e/save", saveContents).done(function () {
                                            info(nts.uk.resource.getMessage("Msg_15", [])).then(function () {
                                                uk.ui.dialog.confirm("続けて受入レイアウトを登録しますか？").ifYes(function () {
                                                    self.gotoDetailSetting();
                                                });
                                            });
                                            self.reloadPage();
                                            self.selectedCode(self.settingCode());
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
                                ViewModel.prototype.gotoDetailSetting = function () {
                                    uk.request.jump("../f/index.xhtml", {
                                        settingCode: this.settingCode()
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
                                function SettingInfo(companyId, code, name, itemNameRow, importStartRow, csvFileId) {
                                    this.companyId = companyId;
                                    this.code = code;
                                    this.name = name;
                                    this.itemNameRow = itemNameRow;
                                    this.importStartRow = importStartRow;
                                    this.csvFileId = csvFileId;
                                    this.domains = [];
                                }
                                SettingInfo.new = function () {
                                    return new SettingInfo(__viewContext.user.companyId, "", "", null, null, null, "");
                                };
                                return SettingInfo;
                            }());
                            viewmodel.SettingInfo = SettingInfo;
                            var ImportDomain = /** @class */ (function () {
                                function ImportDomain(domainId, itemNo) {
                                    this.domainId = domainId;
                                    this.itemNo = itemNo;
                                }
                                return ImportDomain;
                            }());
                            viewmodel.ImportDomain = ImportDomain;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                    })(e = cmf001.e || (cmf001.e = {}));
                })(cmf001 = view.cmf001 || (view.cmf001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf001.e.vm.js.map