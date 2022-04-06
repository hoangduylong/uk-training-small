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
                    var g;
                    (function (g) {
                        var getText = nts.uk.resource.getText;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.partData = null;
                                // Link name
                                _this.linkName = ko.observable('');
                                // URL
                                _this.url = ko.observable('');
                                // Common text attribute
                                _this.fontSize = ko.observable(11);
                                _this.isBold = ko.observable(true);
                                _this.horizontalAlign = ko.observable(HorizontalAlign.LEFT);
                                _this.verticalAlign = ko.observable(VerticalAlign.TOP);
                                _this.horizontalAlignList = [
                                    { code: HorizontalAlign.LEFT, name: getText('CCG034_93') },
                                    { code: HorizontalAlign.MIDDLE, name: getText('CCG034_94') },
                                    { code: HorizontalAlign.RIGHT, name: getText('CCG034_95') }
                                ];
                                _this.verticalAlignList = [
                                    { code: VerticalAlign.TOP, name: getText('CCG034_97') },
                                    { code: VerticalAlign.CENTER, name: getText('CCG034_98') },
                                    { code: VerticalAlign.BOTTOM, name: getText('CCG034_99') }
                                ];
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.partData = params;
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                // Binding part data
                                vm.horizontalAlign(vm.partData.alignHorizontal);
                                vm.verticalAlign(vm.partData.alignVertical);
                                vm.linkName(vm.partData.linkContent);
                                vm.url(vm.partData.url);
                                vm.fontSize(vm.partData.fontSize);
                                vm.isBold(vm.partData.isBold);
                                $("#G1_2").focus();
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
                                        vm.partData.alignHorizontal = vm.horizontalAlign();
                                        vm.partData.alignVertical = vm.verticalAlign();
                                        vm.partData.linkContent = vm.linkName().trim();
                                        vm.partData.fontSize = Number(vm.fontSize());
                                        vm.partData.isBold = vm.isBold();
                                        vm.partData.url = vm.url().trim();
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
                        g.ScreenModel = ScreenModel;
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
                    })(g = ccg034.g || (ccg034.g = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.g.vm.js.map