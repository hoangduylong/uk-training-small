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
                var ccg015;
                (function (ccg015) {
                    var f;
                    (function (f) {
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.topPageCd = ko.observable(null);
                                _this.paramWidgetLayout2 = ko.observableArray([]);
                                _this.paramWidgetLayout3 = ko.observableArray([]);
                                _this.paramIframe1 = ko.observable();
                                _this.layoutDisplayType = ko.observable(null);
                                _this.visible = ko.observable(false);
                                _this.isNoContent = ko.observable(false);
                                _this.isNoContentLayout2 = ko.observable(false);
                                _this.isNoContentLayout3 = ko.observable(false);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                if (params.topPageModel) {
                                    vm.topPageCd(params.topPageModel.topPageCode);
                                }
                                vm.$blockui('grayout');
                                vm.$ajax("/toppage/getDisplayTopPage/".concat(vm.topPageCd()))
                                    .then(function (result) {
                                    vm.layoutDisplayType(result.layoutDisplayType);
                                    vm.getToppage(result);
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ScreenModel.prototype.getToppage = function (data) {
                                var vm = this;
                                if (data.layout1) {
                                    vm.getLayout1(data);
                                }
                                vm.visible(true);
                                if (data.layout2) {
                                    vm.getLayout2(data);
                                }
                                if (data.layout3) {
                                    vm.getLayout3(data);
                                }
                                if (!data.layout1 && data.layout2.length < 1 && data.layout3.length < 1) {
                                    vm.isNoContent(true);
                                }
                                if (data.layout2.length < 1) {
                                    vm.isNoContentLayout2(true);
                                }
                                if (data.layout3.length < 1) {
                                    vm.isNoContentLayout3(true);
                                }
                            };
                            ScreenModel.prototype.getLayout1 = function (data) {
                                var vm = this;
                                vm.paramIframe1(data);
                                vm.visible(true);
                            };
                            ScreenModel.prototype.getLayout2 = function (data) {
                                var vm = this;
                                vm.paramWidgetLayout2(data.layout2);
                            };
                            ScreenModel.prototype.getLayout3 = function (data) {
                                var vm = this;
                                vm.paramWidgetLayout3(data.layout3);
                            };
                            ScreenModel.prototype.close = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        f.ScreenModel = ScreenModel;
                        var DataTopPageDto = /** @class */ (function () {
                            function DataTopPageDto(init) {
                                $.extend(this, init);
                            }
                            return DataTopPageDto;
                        }());
                        f.DataTopPageDto = DataTopPageDto;
                        var DisplayInTopPageDto = /** @class */ (function () {
                            function DisplayInTopPageDto(init) {
                                $.extend(this, init);
                            }
                            return DisplayInTopPageDto;
                        }());
                        f.DisplayInTopPageDto = DisplayInTopPageDto;
                        var WidgetSettingDto = /** @class */ (function () {
                            function WidgetSettingDto(init) {
                                $.extend(this, init);
                            }
                            return WidgetSettingDto;
                        }());
                        f.WidgetSettingDto = WidgetSettingDto;
                        var FlowMenuOutputCCG008 = /** @class */ (function () {
                            function FlowMenuOutputCCG008(init) {
                                $.extend(this, init);
                            }
                            return FlowMenuOutputCCG008;
                        }());
                        f.FlowMenuOutputCCG008 = FlowMenuOutputCCG008;
                        var StandardMenuDto = /** @class */ (function () {
                            function StandardMenuDto(init) {
                                $.extend(this, init);
                            }
                            return StandardMenuDto;
                        }());
                        f.StandardMenuDto = StandardMenuDto;
                        var LogSettingDisplayDto = /** @class */ (function () {
                            function LogSettingDisplayDto() {
                            }
                            return LogSettingDisplayDto;
                        }());
                        f.LogSettingDisplayDto = LogSettingDisplayDto;
                    })(f = ccg015.f || (ccg015.f = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.f.vm.js.map