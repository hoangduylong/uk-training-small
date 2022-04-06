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
                var ScreenModel = /** @class */ (function (_super) {
                    __extends(ScreenModel, _super);
                    function ScreenModel() {
                        var _this = _super.call(this) || this;
                        _this.focusable = ko.observable(false);
                        var self = _this;
                        self.enable = ko.observable(true);
                        self.items = ko.observableArray([
                            { value: 1, text: 'One' },
                            { value: 2, text: 'Two' },
                            { value: 3, text: 'Three' }
                        ]);
                        self.selectedValue = ko.observable(1);
                        self.selectedValue2 = ko.observable(false);
                        self.selectedValue3 = ko.observable(false);
                        self.option = ko.observable({ value: 1, text: 'Radio button' });
                        return _this;
                    }
                    ScreenModel.prototype.focus = function () {
                        var vm = this;
                        vm.focusable(true);
                    };
                    ScreenModel = __decorate([
                        bean()
                    ], ScreenModel);
                    return ScreenModel;
                }(ko.ViewModel));
                sample.ScreenModel = ScreenModel;
            })(sample = ui.sample || (ui.sample = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=start.js.map