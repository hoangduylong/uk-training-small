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
                var ccg034;
                (function (ccg034) {
                    var e;
                    (function (e) {
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.partData = null;
                                _this.labelContentValue = ko.observable('');
                                _this.fontSizeValue = ko.observable(14);
                                _this.isBoldValue = ko.observable(false);
                                _this.textColorValue = ko.observable(null);
                                _this.backgroundColorValue = ko.observable(null);
                                _this.listHorizontalPosition = [];
                                _this.listVerticalPosition = [];
                                _this.selectedHorizontalPosition = ko.observable(HorizontalAlign.LEFT);
                                _this.selectedVerticalPosition = ko.observable(VerticalAlign.CENTER);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.partData = params;
                                // Init data
                                vm.listHorizontalPosition = [
                                    { code: HorizontalAlign.LEFT, name: vm.$i18n('CCG034_56') },
                                    { code: HorizontalAlign.MIDDLE, name: vm.$i18n('CCG034_57') },
                                    { code: HorizontalAlign.RIGHT, name: vm.$i18n('CCG034_58') },
                                ];
                                vm.listVerticalPosition = [
                                    { code: VerticalAlign.TOP, name: vm.$i18n('CCG034_60') },
                                    { code: VerticalAlign.CENTER, name: vm.$i18n('CCG034_61') },
                                    { code: VerticalAlign.BOTTOM, name: vm.$i18n('CCG034_62') },
                                ];
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                // Binding part data
                                vm.selectedHorizontalPosition(vm.partData.alignHorizontal);
                                vm.selectedVerticalPosition(vm.partData.alignVertical);
                                vm.labelContentValue(vm.partData.labelContent);
                                vm.fontSizeValue(vm.partData.fontSize);
                                vm.isBoldValue(vm.partData.isBold);
                                vm.textColorValue(vm.partData.textColor);
                                vm.backgroundColorValue(vm.partData.backgroundColor);
                                $("#E1_2").focus();
                            };
                            /**
                             * Close dialog
                             */
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            /**
                             * Update part data and close dialog
                             */
                            ScreenModel.prototype.updatePartDataAndCloseDialog = function () {
                                var vm = this;
                                vm.$validate().then(function (valid) {
                                    if (valid) {
                                        // Update part data
                                        vm.partData.alignHorizontal = vm.selectedHorizontalPosition();
                                        vm.partData.alignVertical = vm.selectedVerticalPosition();
                                        vm.partData.labelContent = vm.labelContentValue();
                                        vm.partData.fontSize = Number(vm.fontSizeValue());
                                        vm.partData.isBold = vm.isBoldValue();
                                        vm.partData.textColor = vm.textColorValue();
                                        vm.partData.backgroundColor = vm.backgroundColorValue();
                                        // Return data
                                        vm.$window.close(vm.partData);
                                    }
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        e.ScreenModel = ScreenModel;
                        var HorizontalAlign;
                        (function (HorizontalAlign) {
                            HorizontalAlign[HorizontalAlign["LEFT"] = 0] = "LEFT";
                            HorizontalAlign[HorizontalAlign["MIDDLE"] = 1] = "MIDDLE";
                            HorizontalAlign[HorizontalAlign["RIGHT"] = 2] = "RIGHT";
                        })(HorizontalAlign || (HorizontalAlign = {}));
                        var VerticalAlign;
                        (function (VerticalAlign) {
                            VerticalAlign[VerticalAlign["TOP"] = 0] = "TOP";
                            VerticalAlign[VerticalAlign["CENTER"] = 1] = "CENTER";
                            VerticalAlign[VerticalAlign["BOTTOM"] = 2] = "BOTTOM";
                        })(VerticalAlign || (VerticalAlign = {}));
                    })(e = ccg034.e || (ccg034.e = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.e.vm.js.map