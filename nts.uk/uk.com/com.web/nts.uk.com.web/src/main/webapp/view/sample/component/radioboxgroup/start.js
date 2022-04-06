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
                var radiogroup;
                (function (radiogroup) {
                    var ScreenModel = /** @class */ (function (_super) {
                        __extends(ScreenModel, _super);
                        function ScreenModel() {
                            var _this = _super.call(this) || this;
                            _this.count = 10;
                            _this.focusable = ko.observable(false);
                            var self = _this;
                            self.itemList = ko.observableArray([]);
                            for (var i = 1; i < 10; i++) {
                                self.itemList.push(new BoxModel(i, 'box ' + i));
                            }
                            self.selectedValue = ko.observable(new BoxModel(3, 'box 3'));
                            self.selectedId = ko.observable(null);
                            self.enable = ko.observable(true);
                            self.value = ko.observable(0);
                            self.defaultValue = ko.observable();
                            return _this;
                        }
                        ScreenModel.prototype.addBoxes = function () {
                            var self = this;
                            self.itemList.push(new BoxModel(self.count, 'box ' + self.count));
                            self.count++;
                        };
                        ScreenModel.prototype.removeBoxes = function () {
                            var self = this;
                            self.itemList.pop();
                        };
                        ScreenModel.prototype.enableCheckBox = function () {
                            var self = this;
                            if (self.value() < self.itemList().length - 1) {
                                self.itemList()[self.value()].enable(true);
                            }
                        };
                        ScreenModel.prototype.setDefault = function () {
                            var self = this;
                            // nts.uk.util.value.reset($("#second-list"), self.defaultValue() !== undefined ? parseInt(self.defaultValue()) : undefined);
                        };
                        ScreenModel.prototype.focus = function () {
                            var vm = this;
                            vm.focusable(true);
                        };
                        ScreenModel = __decorate([
                            bean()
                        ], ScreenModel);
                        return ScreenModel;
                    }(ko.ViewModel));
                    radiogroup.ScreenModel = ScreenModel;
                    var BoxModel = /** @class */ (function () {
                        function BoxModel(id, name) {
                            var self = this;
                            self.id = id;
                            self.name = name;
                            self.enable = ko.observable(id % 3 === 0);
                        }
                        return BoxModel;
                    }());
                })(radiogroup = sample.radiogroup || (sample.radiogroup = {}));
            })(sample = ui.sample || (ui.sample = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=start.js.map