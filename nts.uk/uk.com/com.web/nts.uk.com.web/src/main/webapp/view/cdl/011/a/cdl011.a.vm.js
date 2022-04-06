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
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cdl011;
                (function (cdl011) {
                    var a;
                    (function (a) {
                        var API = {
                            findData: "/screen/com/cdl011/findData/{0}",
                            register: "/sys/env/mailnoticeset/maildestination/register"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.mailFunctionName = ko.observable("");
                                _this.isCompany = ko.observable(false);
                                _this.isCompanyMobile = ko.observable(false);
                                _this.isPersonal = ko.observable(false);
                                _this.isPersonalMobile = ko.observable(false);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (param) {
                                var vm = this;
                                vm.$blockui("grayout");
                                if (!_.isNil(param)) {
                                    vm.functionId = param;
                                }
                                else {
                                    // Fall back to support old UI
                                    vm.functionId = nts.uk.ui.windows.getShared("CDL011_PARAM");
                                }
                                switch (vm.functionId) {
                                    case 1:
                                        vm.mailFunctionName(vm.$i18n("CDL011_2"));
                                        break;
                                    case 6:
                                        vm.mailFunctionName(vm.$i18n("CDL011_3"));
                                        break;
                                    case 9:
                                        vm.mailFunctionName(vm.$i18n("CDL011_4"));
                                        break;
                                }
                                vm.findData(vm.functionId)
                                    .always(function () { return vm.$blockui("clear").then(function () { return vm.$nextTick(function () { return $("#A2_1 input").focus(); }); }); });
                            };
                            ScreenModel.prototype.findData = function (functionId) {
                                var vm = this;
                                return vm.$ajax(nts.uk.text.format(API.findData, functionId))
                                    .then(function (result) {
                                    vm.isCompany(result.useCompanyMailAddress === 1);
                                    vm.isCompanyMobile(result.useCompanyMobileMailAddress === 1);
                                    vm.isPersonal(result.usePersonalMailAddress === 1);
                                    vm.isPersonalMobile(result.usePersonalMobileMailAddress === 1);
                                });
                            };
                            ScreenModel.prototype.registerData = function () {
                                var vm = this;
                                var param = {
                                    functionId: vm.functionId,
                                    useCompanyMailAddress: vm.isCompany() ? 1 : 0,
                                    useCompanyMobileMailAddress: vm.isCompanyMobile() ? 1 : 0,
                                    usePersonalMailAddress: vm.isPersonal() ? 1 : 0,
                                    usePersonalMobileMailAddress: vm.isPersonalMobile() ? 1 : 0
                                };
                                return vm.$ajax(API.register, param)
                                    .then(function () { return vm.$dialog.info({ messageId: "Msg_15" }); });
                            };
                            ScreenModel.prototype.processRegister = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.registerData()
                                    .always(function () { return vm.$blockui("clear").then(function () { return vm.closeDialog(); }); });
                            };
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                        var MailDestinationFunctionManageDto = /** @class */ (function () {
                            function MailDestinationFunctionManageDto() {
                            }
                            return MailDestinationFunctionManageDto;
                        }());
                        a.MailDestinationFunctionManageDto = MailDestinationFunctionManageDto;
                    })(a = cdl011.a || (cdl011.a = {}));
                })(cdl011 = view.cdl011 || (view.cdl011 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl011.a.vm.js.map