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
                var widget;
                (function (widget) {
                    var ViewModel = /** @class */ (function (_super) {
                        __extends(ViewModel, _super);
                        function ViewModel() {
                            var _this = _super !== null && _super.apply(this, arguments) || this;
                            _this.kmode = ko.observable('a');
                            return _this;
                        }
                        ViewModel.prototype.changeMode = function () {
                            var vm = this;
                            var kmode = vm.kmode;
                            switch (ko.unwrap(kmode)) {
                                case 'a':
                                    kmode('b');
                                    break;
                                case 'b':
                                    kmode('c');
                                    break;
                                case 'c':
                                    kmode('d');
                                    break;
                                case 'd':
                                    kmode('a');
                                    break;
                            }
                        };
                        ViewModel = __decorate([
                            bean()
                        ], ViewModel);
                        return ViewModel;
                    }(ko.ViewModel));
                    widget.ViewModel = ViewModel;
                    var WidgetComponent = /** @class */ (function (_super) {
                        __extends(WidgetComponent, _super);
                        function WidgetComponent(params) {
                            var _this = _super.call(this) || this;
                            _this.params = params;
                            _this.widget = 'CCG023A';
                            return _this;
                        }
                        WidgetComponent.prototype.created = function () {
                        };
                        WidgetComponent.prototype.mounted = function () {
                        };
                        WidgetComponent.prototype.destroyed = function () {
                        };
                        WidgetComponent = __decorate([
                            component({
                                name: 'ccg-widget-1',
                                template: "\n        <div class=\"widget-title\">\n            <table>\n                <colgroup>\n                    <col width=\"auto\" />\n                    <col width=\"auto\" />\n                    <col width=\"41px\" />\n                </colgroup>\n                <thead>\n                    <tr>\n                        <th colspan=\"2\" data-bind=\"i18n: 'COMPONENT_TITLE'\"></th>\n                        <th>\n                            <button class=\"icon\" data-bind=\"\n                                    click : function() {},\n                                    timeClick: -1,\n                                    visible: true\n                                \">\n                                <i data-bind=\"ntsIcon: { no: 5 }\"></i>\n                            </button>\n                        </th>\n                    </tr>\n                </thead>\n            </table>\n        </div>\n        <div data-bind=\"widget-content: 200\">\n            <div>\n                <table>\n                    <colgroup>\n                        <col width=\"auto\" />\n                        <col width=\"auto\" />\n                        <col width=\"41px\" />\n                    </colgroup>\n                    <tbody data-bind=\"foreach: [1,2,3,4,5,6,7,8,9,0]\">\n                        <tr>\n                            <td data-bind=\"i18n: 'OPTION_NAME'\"></td>\n                            <td>\n                                <button class=\"icon\" data-bind=\"\n                                        click: function() {},\n                                        visible: true\n                                    \">\n                                    <i data-bind=\"ntsIcon: { no: 145 }\"></i>\n                                </button>\n                            </td>\n                            <td data-bind=\"i18n: 'COUNT'\"></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>"
                            })
                        ], WidgetComponent);
                        return WidgetComponent;
                    }(ko.ViewModel));
                    widget.WidgetComponent = WidgetComponent;
                    var WidgetFrameComponent = /** @class */ (function (_super) {
                        __extends(WidgetFrameComponent, _super);
                        function WidgetFrameComponent(params) {
                            var _this = _super.call(this) || this;
                            _this.params = params;
                            _this.widget = 'CCG_WF';
                            return _this;
                        }
                        WidgetFrameComponent.prototype.created = function () {
                        };
                        WidgetFrameComponent.prototype.mounted = function () {
                        };
                        WidgetFrameComponent.prototype.destroyed = function () {
                        };
                        WidgetFrameComponent = __decorate([
                            component({
                                name: 'ccg-widget-frame',
                                template: "<div data-bind=\"widget-content: 200, src: '/nts.uk.at.web/view/ktg/004/a/index.xhtml'\"></div>"
                            })
                        ], WidgetFrameComponent);
                        return WidgetFrameComponent;
                    }(ko.ViewModel));
                    widget.WidgetFrameComponent = WidgetFrameComponent;
                })(widget = sample.widget || (sample.widget = {}));
            })(sample = ui.sample || (ui.sample = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=viewmodel.js.map