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
                    var d;
                    (function (d) {
                        var model = oew001.share.model;
                        var API = {
                            getEquipmentClsList: "query/equipment/classificationmaster/getAll"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.equipmentClsList = ko.observableArray([]);
                                _this.selectedEquipmentClsCode = ko.observable(null);
                                _this.columns = ko.observableArray([]);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (param) {
                                var vm = this;
                                vm.columns([
                                    { headerText: vm.$i18n("OEW001_50"), key: 'code', width: 100 },
                                    { headerText: vm.$i18n("OEW001_51"), key: 'name', width: 200 },
                                ]);
                                vm.enableSave = ko.computed(function () { return vm.equipmentClsList().length !== 0 && !!vm.selectedEquipmentClsCode(); });
                                vm.selectedEquipmentClsCode(param.equipmentClsCode);
                                vm.isOpenFromA = param.isOpenFromA;
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.$ajax(API.getEquipmentClsList)
                                    .then(function (result) {
                                    vm.equipmentClsList(result);
                                    if (!vm.isOpenFromA) {
                                        vm.equipmentClsList.unshift({
                                            code: model.constants.SELECT_ALL_CODE,
                                            name: vm.$i18n("OEW001_71")
                                        });
                                    }
                                })
                                    .then(function () {
                                    if (vm.equipmentClsList().length > 0 && !vm.selectedEquipmentClsCode()) {
                                        vm.selectedEquipmentClsCode(vm.equipmentClsList()[0].code);
                                    }
                                })
                                    .always(function () {
                                    $("#D2_container").focus();
                                    vm.$blockui("clear");
                                });
                            };
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close({
                                    code: vm.selectedEquipmentClsCode(),
                                    name: _.find(vm.equipmentClsList(), { "code": vm.selectedEquipmentClsCode() }).name
                                });
                            };
                            ScreenModel.prototype.cancel = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        d.ScreenModel = ScreenModel;
                        var EquipmentClassificationDto = /** @class */ (function () {
                            function EquipmentClassificationDto() {
                            }
                            return EquipmentClassificationDto;
                        }());
                        d.EquipmentClassificationDto = EquipmentClassificationDto;
                    })(d = oew001.d || (oew001.d = {}));
                })(oew001 = view.oew001 || (view.oew001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=oew001.d.vm.js.map