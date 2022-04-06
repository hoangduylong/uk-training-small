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
            var wizard;
            (function (wizard) {
                var viewmodel;
                (function (viewmodel) {
                    var ScreenModel = /** @class */ (function (_super) {
                        __extends(ScreenModel, _super);
                        function ScreenModel() {
                            var _this = _super.call(this) || this;
                            var self = _this;
                            self.items = ko.observableArray([]);
                            var str = ['a0', 'b0', 'c0', 'd0'];
                            for (var j = 0; j < 4; j++) {
                                for (var i = 1; i < 51; i++) {
                                    var code = i < 10 ? str[j] + '0' + i : str[j] + i;
                                    self.items.push(new ItemModel(code, code, code, code));
                                }
                            }
                            self.columns = ko.observableArray([
                                { headerText: 'コード', prop: 'code', width: 50 },
                                { headerText: '名称', prop: 'name', width: 100 },
                                { headerText: '説明', prop: 'description', width: 100 },
                                { headerText: '説明1', prop: 'other1', width: 100 },
                                { headerText: '説明2', prop: 'other2', width: 100 }
                            ]);
                            self.currentCode = ko.observable();
                            self.currentCodeList = ko.observableArray([]);
                            self.currentCodeList.subscribe(function (newValue) {
                                //                alert(newValue);    
                            });
                            self.roundingRules = ko.observableArray([
                                { code: '1', name: '四捨五入' },
                                { code: '2', name: '切り上げ' },
                                { code: '3', name: '切り捨て' }
                            ]);
                            self.selectedRuleCode = ko.observable(1);
                            self.tabs = ko.observableArray([
                                { id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                                { id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                                { id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) },
                                { id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
                            ]);
                            self.selectedTab = ko.observable('tab-2');
                            self.yearMonth = ko.observable("200002");
                            self.date = ko.observable(nts.uk.time.UTCDate(2000, 0, 1));
                            self.timeOfDay = ko.observable("12:00");
                            self.time = ko.observable("1200");
                            self.yearmontheditor = {
                                value: ko.observable(200001),
                                constraint: 'LayoutCode',
                                option: ko.mapping.fromJS(new nts.uk.ui.option.TimeEditorOption({
                                    inputFormat: 'yearmonth'
                                })),
                                required: ko.observable(false),
                                enable: ko.observable(true),
                                readonly: ko.observable(false)
                            };
                            self.stepList = [
                                { content: '.step-1' },
                                { content: '.step-2' },
                                { content: '.step-3' },
                                { content: '.step-4' },
                                { content: '.step-5' },
                                { content: '.step-6' }
                            ];
                            self.activeStep = ko.observable(0);
                            self.stepSelected = ko.observable({ content: '.step-1' });
                            return _this;
                        }
                        ScreenModel.prototype.begin = function () {
                            $('#wizard').ntsWizard("begin");
                        };
                        ScreenModel.prototype.end = function () {
                            $('#wizard').ntsWizard("end");
                        };
                        ScreenModel.prototype.next = function () {
                            $('#wizard').ntsWizard("next").done(function () {
                                $('#inputSelectImplementAtr').focus();
                            });
                        };
                        ScreenModel.prototype.previous = function () {
                            $('#wizard').ntsWizard("prev").done(function () {
                                $('#inputSelectImplementAtr').focus();
                            });
                        };
                        ScreenModel.prototype.getCurrentStep = function () {
                            alert($('#wizard').ntsWizard("getCurrentStep"));
                        };
                        ScreenModel.prototype.goto = function () {
                            var index = this.stepList.indexOf(this.stepSelected());
                            $('#wizard').ntsWizard("goto", index);
                        };
                        ScreenModel.prototype.mounted = function () {
                            var vm = this;
                            _.extend(window, { vm: vm });
                        };
                        ScreenModel = __decorate([
                            bean()
                        ], ScreenModel);
                        return ScreenModel;
                    }(ko.ViewModel));
                    viewmodel.ScreenModel = ScreenModel;
                    var ItemModel = /** @class */ (function () {
                        function ItemModel(code, name, description, other1, other2) {
                            this.code = code;
                            this.name = name;
                            this.description = description;
                            this.other1 = other1;
                            this.other2 = other2 || other1;
                        }
                        return ItemModel;
                    }());
                })(viewmodel = wizard.viewmodel || (wizard.viewmodel = {}));
            })(wizard = ui.wizard || (ui.wizard = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=viewmodel.js.map