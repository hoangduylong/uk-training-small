/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
/// <reference path="../../../../lib/nittsu/nts.uk.com.web.nittsu.bundles.d.ts" />
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
            var cmf001;
            (function (cmf001) {
                var c;
                (function (c) {
                    var datasource = {
                        importableItem: {
                            init: function () {
                                return ko.mapping.fromJS({
                                    name: null,
                                    type: null,
                                    constraintName: null,
                                    constraint: null,
                                    required: null,
                                });
                            }
                        },
                        itemMapping: {
                            init: function () {
                                var res = {
                                    source: null,
                                    settingCode: null,
                                    domainId: null,
                                    itemNo: null,
                                    type: null,
                                    revisingValue: {
                                        usePadding: null,
                                        paddingLength: null,
                                        paddingMethod: null,
                                        useCodeConvert: null,
                                        codeConvert: {
                                            importWithoutSetting: null,
                                            convertDetailsText: "",
                                        },
                                        isDecimalization: null,
                                        decimalizationLength: null,
                                        timeHourlySegment: null,
                                        timeBaseNumber: null,
                                        timeDelimiter: null,
                                        timeRounding: null,
                                        dateFormat: null,
                                    },
                                };
                                return ko.mapping.fromJS(res);
                            },
                        }
                    };
                    var ICON_CONFIGURED = nts.uk.request.resolvePath(__viewContext.rootPath + "../" + nts.uk.request.WEB_APP_NAME.comjs
                        + "/lib/nittsu/ui/style/stylesheets/images/icons/numbered/78.png");
                    function renderConfiguredIcon(configured) {
                        if (configured === "true") {
                            return '<div class="icon-configured"><span id="icon-configured" style="'
                                + 'background-image: url(\'' + ICON_CONFIGURED + '\');"></span></div>';
                        }
                        else {
                            return '';
                        }
                    }
                    var ViewModel = /** @class */ (function (_super) {
                        __extends(ViewModel, _super);
                        function ViewModel() {
                            var _this = _super.call(this) || this;
                            _this.items = ko.observableArray([]);
                            _this.itemsColumns = ko.observableArray([
                                { headerText: "NO", key: "itemNo", width: 0, hidden: true },
                                { headerText: "名称", key: "name", width: 200 },
                                {
                                    headerText: "",
                                    key: "alreadyDetail",
                                    width: 40,
                                    formatter: renderConfiguredIcon
                                },
                            ]);
                            _this.mappingSource = [
                                { code: "CSV", name: "CSV" },
                                { code: "固定値", name: "固定値" },
                            ];
                            _this.selectedItemNo = ko.observable(null);
                            _this.isItemSelected = ko.computed(function () { return !uk.util.isNullOrEmpty(_this.selectedItemNo()); });
                            _this.currentItem = ko.observable();
                            _this.canSave = ko.computed(function () { return _this.$errors.length === 0 && _this.isItemSelected(); });
                            _this.canDeleteSetting = ko.computed(function () { return _this.isItemSelected(); });
                            _this.settingCode = __viewContext.transferred.get().settingCode;
                            _this.domainId = __viewContext.transferred.get().domainId;
                            _this.backUrl = __viewContext.transferred.get().screenId === 'cmf001f'
                                ? '../f/index.xhtml'
                                : '../b/index.xhtml';
                            _this.currentItem({
                                def: datasource.importableItem.init(),
                                selectedMappingType: ko.observable(null),
                                csvMapping: datasource.itemMapping.init(),
                                fixedMapping: ko.observable(),
                            });
                            _this.selectedItemNo.subscribe(function (v) { return _this.itemSelected(v); });
                            return _this;
                        }
                        ViewModel.prototype.mounted = function () {
                            this.loadSetting().done(function () {
                                $("body").removeClass("ko-cloak");
                            });
                        };
                        ViewModel.prototype.loadSetting = function () {
                            var _this = this;
                            var dfd = $.Deferred();
                            var path = "exio/input/setting/find/" + this.settingCode + "/" + this.domainId;
                            this.$ajax(path).done(function (res) {
                                _this.items.removeAll();
                                res.layouts.forEach(function (layout) {
                                    _this.items.push(layout);
                                });
                                dfd.resolve();
                            });
                            return dfd.promise();
                        };
                        ViewModel.prototype.itemSelected = function (itemNo) {
                            var selectedItem = this.items().filter(function (e) { return e.itemNo == itemNo; })[0];
                            var current = this.currentItem();
                            current.def.name(selectedItem.name);
                            current.def.type(selectedItem.type);
                            current.selectedMappingType(selectedItem.source);
                            var fixedValue = selectedItem.fixedValue;
                            if (selectedItem.type === 'TIME_POINT' || selectedItem.type === 'TIME_DURATION') {
                                fixedValue = Number(fixedValue || 0);
                            }
                            current.fixedMapping(fixedValue);
                            this.loadImportableItem();
                            this.loadReviseItem();
                            this.checkError();
                        };
                        ViewModel.prototype.loadImportableItem = function () {
                            var _this = this;
                            var path = "/screen/com/cmf/cmf001/importable-item"
                                + "/" + this.settingCode
                                + "/" + this.domainId
                                + "/" + this.selectedItemNo();
                            this.$ajax(path).done(function (res) {
                                _this.currentItem().def.required(res.required);
                                if (res.constraint !== null) {
                                    if (res.constraint.charType === null) {
                                        res.constraint.charType = undefined; // util.getConstraintMesはundefined前提の設計なので
                                    }
                                    __viewContext.primitiveValueConstraints[res.constraint.name] = res.constraint;
                                    var constraintText = uk.util.getConstraintMes(res.constraint.name) + "　";
                                    if (res.constraint.domainType === "Enum") {
                                        constraintText = "整数 " + constraintText;
                                    }
                                    _this.currentItem().def.constraintName(res.constraint.name);
                                    _this.currentItem().def.constraint(constraintText);
                                }
                                else {
                                    _this.currentItem().def.constraintName(null);
                                    _this.currentItem().def.constraint("");
                                }
                            });
                        };
                        ViewModel.prototype.loadReviseItem = function () {
                            var _this = this;
                            var path = "/exio/input/setting/assembly/revise/reviseitem/get"
                                + "/" + this.settingCode
                                + "/" + this.domainId
                                + "/" + this.selectedItemNo();
                            this.$ajax(path).done(function (res) {
                                var mapping = _this.currentItem().csvMapping;
                                var r = mapping.revisingValue;
                                r.usePadding(null);
                                r.paddingLength(null);
                                r.paddingMethod(null);
                                r.useCodeConvert(null);
                                r.codeConvert.importWithoutSetting(null);
                                r.codeConvert.convertDetailsText("");
                                r.isDecimalization(null);
                                r.decimalizationLength(null);
                                r.timeHourlySegment(null);
                                r.timeBaseNumber(null);
                                r.timeDelimiter(null);
                                r.timeRounding(null);
                                r.dateFormat(null);
                                ko.mapping.fromJS(res.revisingValue, {}, mapping.revisingValue);
                                if (res.revisingValue && res.revisingValue.codeConvert) {
                                    mapping.revisingValue.codeConvert.convertDetailsText(res.revisingValue.codeConvert.details
                                        .map(function (d) { return d.before + "," + d.after; })
                                        .join("\n"));
                                }
                                else {
                                    mapping.revisingValue.codeConvert.convertDetailsText("");
                                }
                                if (!res.revisingValue || res.revisingValue.timeHourlySegment === undefined) {
                                    mapping.revisingValue.timeHourlySegment(1);
                                }
                                if (!res.revisingValue || res.revisingValue.timeBaseNumber === undefined) {
                                    mapping.revisingValue.timeBaseNumber(0);
                                }
                                if (!res.revisingValue || res.revisingValue.timeDelimiter === undefined) {
                                    mapping.revisingValue.timeRounding(0);
                                }
                                if (!res.revisingValue || res.revisingValue.timeRounding === undefined) {
                                    mapping.revisingValue.timeRounding(3);
                                }
                            });
                        };
                        ViewModel.prototype.checkError = function () {
                            nts.uk.ui.errors.clearAll();
                            $('.check-target').ntsError('check');
                        };
                        ViewModel.prototype.save = function () {
                            var _this = this;
                            this.checkError();
                            if (!nts.uk.ui.errors.hasError()) {
                                var path = "/screen/com/cmf/cmf001/save";
                                var item = this.currentItem();
                                var fixedValue = item.fixedMapping();
                                if (item.def.type() === 'DATE' && fixedValue) {
                                    var splitValue = fixedValue.split("T");
                                    if (splitValue.length === 0) {
                                        fixedValue = "";
                                    }
                                    else {
                                        fixedValue = splitValue[0].replace(/-/g, "");
                                    }
                                }
                                var s = item.csvMapping.revisingValue;
                                var revisingValue = ko.mapping.toJS({
                                    usePadding: s.usePadding,
                                    paddingLength: s.paddingLength,
                                    paddingMethod: s.paddingMethod,
                                    useCodeConvert: s.useCodeConvert,
                                    codeConvert: s.codeConvert,
                                    isDecimalization: s.isDecimalization,
                                    decimalizationLength: s.decimalizationLength,
                                    timeHourlySegment: s.timeHourlySegment,
                                    timeBaseNumber: s.timeBaseNumber,
                                    timeDelimiter: s.timeDelimiter,
                                    timeRounding: s.timeRounding,
                                    dateFormat: s.dateFormat,
                                });
                                if (revisingValue.codeConvert) {
                                    var convertDetailsText = revisingValue.codeConvert.convertDetailsText;
                                    if (convertDetailsText) {
                                        revisingValue.codeConvert.details = convertDetailsText
                                            .split("\n")
                                            .map(function (l) {
                                            var p = l.split(",");
                                            if (p.length !== 2)
                                                return null;
                                            return { before: p[0], after: p[1] };
                                        })
                                            .filter(function (d) { return d !== null; });
                                    }
                                    else {
                                        revisingValue.codeConvert.details = [];
                                    }
                                }
                                var command = {
                                    settingCode: this.settingCode,
                                    domainId: this.domainId,
                                    itemNo: this.selectedItemNo(),
                                    mappingSource: item.selectedMappingType(),
                                    fixedValue: fixedValue,
                                    revisingValue: revisingValue,
                                };
                                this.$ajax(path, command).done(function (res) {
                                    uk.ui.dialog.info({ messageId: "Msg_15" });
                                    _this.loadSetting();
                                });
                            }
                        };
                        ViewModel.prototype.deleteSetting = function () {
                            var _this = this;
                            var path = "/screen/com/cmf/cmf001/delete";
                            var itemNo = this.selectedItemNo();
                            var command = {
                                settingCode: this.settingCode,
                                domainId: this.domainId,
                                itemNo: itemNo,
                            };
                            uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                _this.$ajax(path, command).done(function () {
                                    uk.ui.dialog.info({ messageId: "Msg_16" });
                                    _this.loadSetting();
                                    _this.itemSelected(itemNo);
                                });
                            });
                        };
                        ViewModel.prototype.clickBackButton = function () {
                            var self = this;
                            uk.request.jump(self.backUrl, {
                                settingCode: self.settingCode,
                                domainId: self.domainId
                            });
                        };
                        ViewModel = __decorate([
                            bean()
                        ], ViewModel);
                        return ViewModel;
                    }(ko.ViewModel));
                    c.ViewModel = ViewModel;
                })(c = cmf001.c || (cmf001.c = {}));
            })(cmf001 = com.cmf001 || (com.cmf001 = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf001.c.vm.js.map