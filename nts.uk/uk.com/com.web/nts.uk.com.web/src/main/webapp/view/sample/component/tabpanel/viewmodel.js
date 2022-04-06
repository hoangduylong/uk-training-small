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
            var tabpanel;
            (function (tabpanel) {
                var viewmodel;
                (function (viewmodel) {
                    var ScreenModel = /** @class */ (function (_super) {
                        __extends(ScreenModel, _super);
                        function ScreenModel() {
                            var _this = _super.call(this) || this;
                            _this.direction = ko.observable('vertical');
                            var self = _this;
                            self.tabs = ko.observableArray([
                                { id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) },
                                { id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) },
                                { id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) },
                                { id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', icon: 'LIST_PLUS', enable: ko.observable(true), visible: ko.observable(true) }
                            ]);
                            self.selectedTab = ko.observable('tab-1');
                            self.tabs2 = ko.observableArray([
                                { id: 'x-tab-1', title: 'Tab Title 1', content: '.x-tab-content-1' },
                                { id: 'x-tab-2', title: 'Tab Title 2', content: '.x-tab-content-2', enable: ko.observable(false) },
                                { id: 'x-tab-3', title: 'Tab Title 3', content: '.x-tab-content-3', visible: ko.observable(true) },
                                { id: 'x-tab-4', title: 'Tab Title 4', content: '.x-tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
                            ]);
                            self.selectedTab2 = ko.observable('x-tab-2');
                            self.items = ko.observableArray([]);
                            for (var i = 1; i < 5; i++) {
                                self.items.push(new ItemModel('00' + i, '基本給', "description " + i, i % 3 === 0, "2010/1/1"));
                            }
                            self.columns = ko.observableArray([
                                { headerText: 'コード', key: 'code', width: 125 },
                                { headerText: '名称', key: 'name', width: 125 },
                                { headerText: '説明', key: 'description', width: 125 },
                                { headerText: '説明1', key: 'other1', width: 125 },
                                { headerText: '説明2', key: 'other2', width: 125, isDateColumn: true, format: 'YYYY/MM/DD' }
                            ]);
                            self.currentCode = ko.observable("001");
                            self.currentCodeList = ko.observableArray([]);
                            $("#grid").igGrid({
                                dataSource: self.items(),
                                primaryKey: 'code',
                                width: undefined,
                                height: '350px',
                                columns: self.columns(),
                                virtualization: true,
                                virtualizationMode: 'continuous',
                                features: [
                                    { name: 'Selection', multipleSelection: true },
                                    { name: 'RowSelectors', enableCheckBoxes: true, enableRowNumbering: false }
                                ]
                            });
                            self.commonAmount = ko.observable(10);
                            return _this;
                        }
                        ScreenModel.prototype.created = function () {
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
                        function ItemModel(code, name, description, deletable, other1, other2) {
                            this.code = code;
                            this.name = name;
                            this.description = description;
                            this.other1 = other1;
                            this.other2 = other2 || other1;
                            this.deletable = deletable;
                        }
                        return ItemModel;
                    }());
                })(viewmodel = tabpanel.viewmodel || (tabpanel.viewmodel = {}));
            })(tabpanel = ui.tabpanel || (ui.tabpanel = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=viewmodel.js.map