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
        var ui;
        (function (ui) {
            var sample;
            (function (sample) {
                var layout;
                (function (layout) {
                    var simple;
                    (function (simple) {
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.text = ko.observable('編集モード');
                                _this.size = ko.observable(20);
                                _this.icon = ko.observable('SELECTED');
                                _this.vstate = ko.observable(1);
                                _this.vstatem = ko.observableArray([]);
                                _this.state1 = ko.observable(false);
                                _this.state2 = ko.observable(true);
                                _this.contents = contents;
                                return _this;
                            }
                            ViewModel.prototype.click = function () {
                                var vm = this;
                                vm.$dialog.error({ messageId: 'MsgB_1', messageParams: [vm.text()] });
                            };
                            ViewModel.prototype.created = function () {
                                var vm = this;
                                _.extend(window, { vm: vm });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        simple.ViewModel = ViewModel;
                        var contents = "\n# h1 content\n__code__ js\nconst wd = window;\nconst vm = new ko.ViewModel();\n__code__\n    ".replace(/__code__/g, '```');
                    })(simple = layout.simple || (layout.simple = {}));
                })(layout = sample.layout || (sample.layout = {}));
            })(sample = ui.sample || (ui.sample = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=viewmodel.js.map