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
                var ccg015;
                (function (ccg015) {
                    var a;
                    (function (a) {
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.textButton = ko.computed(function () { return _.replace(_this.$i18n('CCG015_49'), '\n', '<br/>'); });
                                return _this;
                            }
                            ScreenModel.prototype.mounted = function () {
                                $('#A1_3').focus();
                            };
                            ScreenModel.prototype.openScreenCCG034 = function () {
                                var vm = this;
                                vm.$jump('/view/ccg/034/a/index.xhtml');
                            };
                            ScreenModel.prototype.openDialogCCG030 = function () {
                                var vm = this;
                                vm.$window.modal('/view/ccg/030/a/index.xhtml');
                            };
                            ScreenModel.prototype.openScreenCCG018 = function () {
                                var vm = this;
                                vm.$jump('/view/ccg/018/a/index.xhtml');
                            };
                            ScreenModel.prototype.openScreenCCG015B = function () {
                                var vm = this;
                                vm.$jump('/view/ccg/015/b/index.xhtml');
                            };
                            ScreenModel.prototype.openModalCCG015G = function () {
                                var vm = this;
                                vm.$window.modal('com', '/view/ccg/015/g/index.xhtml');
                            };
                            ScreenModel.prototype.openModalCCG015H = function () {
                                var vm = this;
                                vm.$window.modal('com', '/view/ccg/015/h/index.xhtml');
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                    })(a = ccg015.a || (ccg015.a = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.a.vm.js.map