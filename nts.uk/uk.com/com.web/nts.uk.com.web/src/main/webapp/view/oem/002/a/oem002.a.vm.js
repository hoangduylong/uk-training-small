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
                var oem002;
                (function (oem002) {
                    var a;
                    (function (a) {
                        var API = {
                            insert: "ctx/office/equipment/information/insert",
                            update: "ctx/office/equipment/information/update",
                            delete: "ctx/office/equipment/information/delete/{0}",
                            initScreen: "com/screen/oem002/initScreen",
                            getEquipmentInfo: "com/screen/oem002/getEquipmentInfo/{0}",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.equipmentInfoList = ko.observableArray([]);
                                _this.equipmentClsList = ko.observableArray([]);
                                _this.selectedEquipmentInfo = ko.observable(new EquipmentInformation());
                                _this.selectedEquipmentInfoCode = ko.observable(null);
                                _this.columns = ko.observableArray([]);
                                _this.isNewMode = ko.observable(true).extend({ notify: 'always' });
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                vm.columns([
                                    { headerText: vm.$i18n("OEM002_9"), key: 'equipmentClsName', width: 150 },
                                    { headerText: vm.$i18n("OEM002_10"), key: 'code', width: 70 },
                                    { headerText: vm.$i18n("OEM002_11"), key: 'name', width: 200 },
                                ]);
                                vm.selectedEquipmentInfoCode.subscribe(function (value) {
                                    if (value) {
                                        var api = nts.uk.text.format(API.getEquipmentInfo, value);
                                        vm.$ajax(api).then(function (result) {
                                            vm.isNewMode(false);
                                            vm.$errors("clear");
                                            vm.selectedEquipmentInfo(EquipmentInformation.createFromDto(result, vm.equipmentClsList()));
                                            vm.fixReadonlyA2_9();
                                        });
                                    }
                                    else {
                                        vm.isNewMode(true);
                                        vm.selectedEquipmentInfo(new EquipmentInformation());
                                        vm.selectedEquipmentInfo.valueHasMutated();
                                        vm.fixReadonlyA2_9();
                                    }
                                });
                                vm.isNewMode.subscribe(function () { return vm.$nextTick(function () { return $("#A2_10").focus(); }); });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.getAll().always(function () { return vm.$blockui("clear"); });
                                $("#A2_10").focus();
                                vm.$nextTick(function () { return vm.fixReadonlyA2_9(); });
                            };
                            ScreenModel.prototype.getAll = function (selectedCode) {
                                var vm = this;
                                return vm.$ajax(API.initScreen).then(function (result) {
                                    vm.isNewMode.valueHasMutated();
                                    vm.equipmentClsList(result.equipmentClassificationList);
                                    _.forEach(result.equipmentInformationList, function (data) { return data.equipmentClsName = _.find(vm.equipmentClsList(), { code: data.equipmentClsCode }).name; });
                                    vm.equipmentInfoList(result.equipmentInformationList);
                                    if (vm.equipmentInfoList().length > 0) {
                                        if (!!selectedCode) {
                                            vm.selectedEquipmentInfoCode(selectedCode);
                                        }
                                        else {
                                            vm.selectedEquipmentInfoCode(vm.equipmentInfoList()[0].code);
                                        }
                                    }
                                });
                            };
                            ScreenModel.prototype.resetNewMode = function () {
                                var vm = this;
                                vm.isNewMode(true);
                                vm.selectedEquipmentInfoCode(null);
                                vm.selectedEquipmentInfoCode.valueHasMutated();
                            };
                            ScreenModel.prototype.processSave = function () {
                                var vm = this;
                                vm.$validate().then(function (isValid) {
                                    if (isValid && !nts.uk.ui.errors.hasError()) {
                                        vm.$blockui("grayout");
                                        var param = EquipmentInformationDto.createFromData(vm.selectedEquipmentInfo());
                                        var code_1 = param.code;
                                        var api = vm.isNewMode() ? API.insert : API.update;
                                        vm.$ajax(api, param)
                                            .then(function () { return vm.$dialog.info({ messageId: "Msg_15" }).then(function () { return vm.getAll(code_1); }); })
                                            .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); })
                                            .always(function () { return vm.$blockui("clear"); });
                                    }
                                });
                            };
                            ScreenModel.prototype.processDelete = function () {
                                var vm = this;
                                vm.$dialog.confirm({ messageId: "Msg_18" }).then(function (result) {
                                    if (result === "yes") {
                                        vm.$blockui("grayout");
                                        var length_1 = vm.equipmentInfoList().length;
                                        var index_1 = _.findIndex(vm.equipmentInfoList(), { "code": vm.selectedEquipmentInfoCode() });
                                        var api = nts.uk.text.format(API.delete, vm.selectedEquipmentInfoCode());
                                        vm.$ajax(api).then(function () {
                                            vm.$dialog.info({ messageId: "Msg_16" }).then(function () {
                                                var newIndex = length_1 === 1 ? null : (length_1 === index_1 + 1 ? index_1 - 1 : index_1 + 1);
                                                if (!!newIndex) {
                                                    return vm.getAll(vm.equipmentInfoList()[newIndex].code);
                                                }
                                                else {
                                                    return vm.getAll().then(function () { return vm.resetNewMode(); });
                                                }
                                            });
                                        }).always(function () { return vm.$blockui("clear"); });
                                    }
                                });
                            };
                            ScreenModel.prototype.processExport = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "OEM002_設備の登録";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                nts.uk.request.exportFile('/masterlist/report/print', {
                                    domainId: "EquipmentInformation",
                                    domainType: domainType,
                                    languageId: 'ja', reportType: 0,
                                }).fail(function (err) { return vm.$dialog.alert({ messageId: err.messageId }); })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.openDialogB = function () {
                                var vm = this;
                                vm.$window.modal("/view/oem/002/b/index.xhtml", vm.selectedEquipmentInfo().equipmentClsCode())
                                    .then(function (result) {
                                    if (result) {
                                        vm.selectedEquipmentInfo().equipmentClsCode(result.code);
                                        vm.selectedEquipmentInfo().equipmentClsName(result.name);
                                        vm.$validate("#A2_9");
                                        vm.fixReadonlyA2_9();
                                    }
                                });
                            };
                            ScreenModel.prototype.fixReadonlyA2_9 = function () {
                                var vm = this;
                                // Fix bug A2_9
                                // Avoid using readonly attr because of tabindex
                                vm.$nextTick(function () { return $("#A2_9").attr("readonly", "readonly"); });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                        var EquipmentInformationDto = /** @class */ (function () {
                            function EquipmentInformationDto() {
                            }
                            EquipmentInformationDto.createFromData = function (data) {
                                var dto = new EquipmentInformationDto();
                                dto.code = data.code();
                                dto.effectiveStartDate = moment.utc(data.validPeriod().startDate, "YYYY/MM/DD").toISOString();
                                dto.effectiveEndDate = moment.utc(data.validPeriod().endDate, "YYYY/MM/DD").toISOString();
                                dto.equipmentClsCode = data.equipmentClsCode();
                                dto.name = data.name();
                                dto.remark = data.remark();
                                return dto;
                            };
                            return EquipmentInformationDto;
                        }());
                        a.EquipmentInformationDto = EquipmentInformationDto;
                        var EquipmentClassificationDto = /** @class */ (function () {
                            function EquipmentClassificationDto() {
                            }
                            return EquipmentClassificationDto;
                        }());
                        a.EquipmentClassificationDto = EquipmentClassificationDto;
                        var EquipmentInformation = /** @class */ (function () {
                            function EquipmentInformation() {
                                this.code = ko.observable(null);
                                this.name = ko.observable(null);
                                this.validPeriod = ko.observable({
                                    startDate: null,
                                    endDate: moment.utc("9999/12/31", "YYYY/MM/DD")
                                });
                                this.equipmentClsCode = ko.observable(null);
                                this.equipmentClsName = ko.observable(null);
                                this.remark = ko.observable(null);
                            }
                            EquipmentInformation.createFromDto = function (data, clsList) {
                                var _a;
                                var info = new EquipmentInformation();
                                info.code(data.code);
                                info.name(data.name);
                                info.validPeriod({
                                    startDate: moment.utc(data.effectiveStartDate, "YYYY/MM/DD"),
                                    endDate: moment.utc((_a = data.effectiveEndDate) !== null && _a !== void 0 ? _a : "9999/12/31", "YYYY/MM/DD")
                                });
                                info.equipmentClsCode(data.equipmentClsCode);
                                info.equipmentClsName(_.find(clsList, { "code": data.equipmentClsCode }).name);
                                info.remark(data.remark);
                                return info;
                            };
                            return EquipmentInformation;
                        }());
                        a.EquipmentInformation = EquipmentInformation;
                    })(a = oem002.a || (oem002.a = {}));
                })(oem002 = view.oem002 || (view.oem002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=oem002.a.vm.js.map