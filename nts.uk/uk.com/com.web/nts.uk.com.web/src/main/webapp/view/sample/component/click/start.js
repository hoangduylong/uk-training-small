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
                var ViewModel = /** @class */ (function (_super) {
                    __extends(ViewModel, _super);
                    function ViewModel() {
                        var _this = _super !== null && _super.apply(this, arguments) || this;
                        _this.timeClick = ko.observable(500);
                        return _this;
                    }
                    ViewModel.prototype.created = function () {
                        var vm = this;
                        vm.timeClickNumber = ko.computed({
                            read: function () {
                                return Number(ko.unwrap(vm.timeClick));
                            }
                        });
                    };
                    ViewModel.prototype.clickEvent = function () {
                        $('#clickResult').append($('<pre>', { text: "click at: ".concat(new Date().toJSON()) }));
                    };
                    ViewModel = __decorate([
                        bean()
                    ], ViewModel);
                    return ViewModel;
                }(ko.ViewModel));
                sample.ViewModel = ViewModel;
            })(sample = ui.sample || (ui.sample = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=start.js.map