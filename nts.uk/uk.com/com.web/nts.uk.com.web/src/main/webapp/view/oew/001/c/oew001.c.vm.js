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
                    var c;
                    (function (c) {
                        var model = oew001.share.model;
                        var API = {
                            getEquipmentInfoList: "com/screen/oew001/getEquipmentInfoList",
                            export: "com/file/equipment/data/report"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.selectedEquipmentClsCode = ko.observable("");
                                _this.equipmentClsName = ko.observable("");
                                _this.selectedEquipmentInfoCode = ko.observable("");
                                _this.yearMonth = ko.observable("");
                                _this.isSelectAll = ko.observable(false);
                                _this.isInitComplete = false;
                                // dto
                                _this.equipmentClassification = ko.observable(null);
                                _this.equipmentInformationList = ko.observableArray([]);
                                _this.itemSettings = ko.observableArray([]);
                                _this.formatSetting = ko.observable(null);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (param) {
                                var vm = this;
                                vm.selectedEquipmentClsCode.subscribe(function () {
                                    vm.$blockui("grayout");
                                    vm.getEquipmentInfoList(param.equipmentCode).always(function () {
                                        vm.isInitComplete = true;
                                        vm.$blockui("clear");
                                    });
                                });
                                vm.selectedEquipmentClsCode(param.equipmentClsCode);
                                vm.equipmentClsName(param.equipmentClsName);
                                vm.yearMonth(param.yearMonth);
                                vm.formatSetting(param.formatSetting);
                                vm.itemSettings(param.itemSettings);
                                // subscribe
                                vm.selectedEquipmentInfoCode.subscribe(function () { return vm.focusOnItemAfterInit("#C3_2"); });
                                vm.yearMonth.subscribe(function () { return vm.focusOnItemAfterInit("#C4_1"); });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                $("#C4_1").focus();
                            };
                            ScreenModel.prototype.getEquipmentInfoList = function (equipmentInfoCode) {
                                var vm = this;
                                var param = {
                                    equipmentClsCode: vm.selectedEquipmentClsCode(),
                                    isInput: false
                                };
                                return vm.$ajax(API.getEquipmentInfoList, param).then(function (result) {
                                    vm.isSelectAll(param.equipmentClsCode === model.constants.SELECT_ALL_CODE);
                                    if (vm.isSelectAll()) {
                                        vm.equipmentInformationList([]);
                                    }
                                    else {
                                        vm.equipmentInformationList(result);
                                        vm.equipmentInformationList.unshift(new model.EquipmentInformationDto({
                                            code: model.constants.SELECT_ALL_CODE,
                                            name: vm.$i18n("OEW001_70")
                                        }));
                                    }
                                    vm.selectedEquipmentInfoCode(equipmentInfoCode);
                                });
                            };
                            ScreenModel.prototype.exportReport = function (printType) {
                                var vm = this;
                                var param = {
                                    printType: printType,
                                    ym: Number(vm.yearMonth()),
                                    formatSetting: vm.formatSetting(),
                                    itemSettings: vm.itemSettings()
                                };
                                if (vm.selectedEquipmentClsCode() !== model.constants.SELECT_ALL_CODE) {
                                    param.equipmentClsCode = vm.selectedEquipmentClsCode();
                                }
                                if (vm.selectedEquipmentInfoCode() !== model.constants.SELECT_ALL_CODE) {
                                    param.equipmentCode = vm.selectedEquipmentInfoCode();
                                }
                                return nts.uk.request.exportFile(API.export, param)
                                    .then(function () { return vm.processCloseDialog(); })
                                    .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); });
                            };
                            ScreenModel.prototype.focusOnItemAfterInit = function (itemId) {
                                var vm = this;
                                if (vm.isInitComplete) {
                                    $(itemId).focus();
                                }
                            };
                            ScreenModel.prototype.openDialogD = function () {
                                var vm = this;
                                var param = {
                                    equipmentClsCode: vm.selectedEquipmentClsCode(),
                                    isOpenFromA: false
                                };
                                vm.$window.modal("/view/oew/001/d/index.xhtml", param)
                                    .then(function (result) {
                                    if (!!result) {
                                        vm.isInitComplete = false;
                                        vm.selectedEquipmentClsCode(result.code);
                                        vm.equipmentClsName(result.name);
                                    }
                                    vm.$nextTick(function () { return $("#C2_2").focus(); });
                                });
                            };
                            ScreenModel.prototype.processExportExcel = function () {
                                var vm = this;
                                if (nts.uk.ui.errors.hasError()) {
                                    return;
                                }
                                vm.$blockui("grayout");
                                vm.exportReport(model.enums.PrintType.EXCEL).always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.processExportCsv = function () {
                                var vm = this;
                                if (nts.uk.ui.errors.hasError()) {
                                    return;
                                }
                                vm.$blockui("grayout");
                                vm.exportReport(model.enums.PrintType.CSV).always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.processCloseDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        c.ScreenModel = ScreenModel;
                        var EquipmentDataQuery = /** @class */ (function () {
                            function EquipmentDataQuery() {
                            }
                            return EquipmentDataQuery;
                        }());
                    })(c = oew001.c || (oew001.c = {}));
                })(oew001 = view.oew001 || (view.oew001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=oew001.c.vm.js.map