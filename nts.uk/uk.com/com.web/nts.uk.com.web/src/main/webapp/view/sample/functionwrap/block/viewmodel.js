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
                var functional;
                (function (functional) {
                    var block;
                    (function (block) {
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            ViewModel.prototype.blockView = function () {
                                nts.uk.ui.block.grayout();
                                setTimeout(function () {
                                    nts.uk.ui.block.clear();
                                }, 3000);
                            };
                            ViewModel.prototype.blockArea = function () {
                                var area = document.querySelector('#content');
                                nts.uk.ui.block.grayout(area);
                                setTimeout(function () {
                                    nts.uk.ui.block.clear(area);
                                }, 3000);
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        block.ViewModel = ViewModel;
                    })(block = functional.block || (functional.block = {}));
                })(functional = sample.functional || (sample.functional = {}));
            })(sample = ui.sample || (ui.sample = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=viewmodel.js.map