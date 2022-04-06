/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
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
var ccg018;
(function (ccg018) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function (_super) {
                __extends(ScreenModel, _super);
                function ScreenModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.title = ko.observable('');
                    _this.tabs = ko.observableArray([]);
                    _this.currentTab = ko.observable(null);
                    return _this;
                }
                ScreenModel.prototype.created = function (params) {
                    var vm = this;
                    vm.baseModel = new ccg018.base.result.BaseResultModel();
                    vm.tabs([
                        new TabModel({ id: 'a1', name: vm.$i18n('CCG018_45'), active: true, display: true, templateUrl: "jobtitle-template" }),
                        new TabModel({ id: 'b', name: vm.$i18n('CCG018_2'), display: true, templateUrl: "person-template" }),
                    ]);
                };
                ScreenModel.prototype.mounted = function () {
                    var vm = this;
                    // show active tab panel
                    vm.$blockui('grayout');
                    $.when(vm.findBySystemMenuCls(), vm.findDataForAfterLoginDis())
                        .then(function () {
                        vm.changeTab(vm.tabs()[0]);
                        $('.navigator li a.active').trigger('click');
                    })
                        .always(function () { return vm.$blockui('clear'); });
                };
                ScreenModel.prototype.changeTab = function (tab) {
                    var vm = this;
                    tab.active(true);
                    vm.currentTab(tab);
                    vm.title(tab.name());
                    vm.tabs().map(function (t) { return (t.id() != tab.id()) && t.active(false); });
                    // Clean binding area.
                    var resultArea = $(".screen-content");
                    resultArea.html("");
                    // call start function on view at here
                    switch (tab.id()) {
                        case 'a1':
                            var viewmodelA1_1 = new ccg018.a1.viewmodel.ScreenModel(vm.baseModel);
                            $(resultArea).load(viewmodelA1_1.screenTemplateUrl(), function () {
                                ko.applyBindings(viewmodelA1_1, resultArea.children().get(0));
                                ko.applyBindings(viewmodelA1_1, resultArea.children().get(1));
                                viewmodelA1_1.start();
                            });
                            break;
                        case 'b':
                            vm.findByCId().then(function () {
                                var viewmodelB = new ccg018.b.viewmodel.ScreenModel(vm.baseModel);
                                $(resultArea).load(viewmodelB.screenTemplateUrl(), function () {
                                    // viewmodelB.start().done(function() {
                                    ko.applyBindings(viewmodelB, resultArea.children().get(0));
                                    ko.applyBindings(viewmodelB, resultArea.children().get(1));
                                    _.defer(function () {
                                        viewmodelB.bindGrid();
                                        viewmodelB.initCCG001();
                                    });
                                });
                            });
                            break;
                    }
                };
                /**
                 * find data in table STANDARD_MENU with companyId and
                 * afterLoginDisplay = 1 (display)  or System = 0(common) and MenuClassification = 8(top page)
                 */
                ScreenModel.prototype.findDataForAfterLoginDis = function () {
                    var vm = this;
                    var dfd = $.Deferred();
                    vm.baseModel.comboItemsAfterLogin = [];
                    a.service.findDataForAfterLoginDis()
                        .then(function (data) {
                        var newComboBox = [];
                        newComboBox.push(new ComboBox({
                            code: '',
                            name: '未設定',
                            system: 0,
                            menuCls: 0
                        }));
                        _.forEach(data, function (x) {
                            newComboBox.push(new ComboBox({
                                code: x.code,
                                name: x.displayName,
                                system: x.system,
                                menuCls: x.classification
                            }));
                        });
                        vm.baseModel.comboItemsAfterLogin = newComboBox;
                        dfd.resolve();
                    })
                        .fail(function () { return dfd.reject(); });
                    return dfd.promise();
                };
                /**
                 * Find data in table STANDARD_MENU base on CompanyId and System = 0(common) and MenuClassification = 8(top page)
                 * Return array comboItemsAsTopPage
                 */
                ScreenModel.prototype.findBySystemMenuCls = function () {
                    var vm = this;
                    var dfd = $.Deferred();
                    vm.baseModel.comboItemsAsTopPage = [];
                    a.service.findBySystemMenuCls()
                        .then(function (data) {
                        if (data.length >= 0) {
                            var newComboBox_1 = [];
                            newComboBox_1.push(new ComboBox({
                                code: '',
                                name: '未設定',
                                system: 0,
                                menuCls: 0
                            }));
                            _.forEach(data, function (x) {
                                newComboBox_1.push(new ComboBox({
                                    code: x.code,
                                    name: x.displayName,
                                    system: x.system,
                                    menuCls: x.classification
                                }));
                            });
                            vm.baseModel.comboItemsAsTopPage = newComboBox_1;
                        }
                        dfd.resolve();
                    })
                        .fail(function () { return dfd.reject(); });
                    return dfd.promise();
                };
                /**
                 * get categorySet in DB TOPPAGE_SET base on companyId
                 */
                ScreenModel.prototype.findByCId = function () {
                    var vm = this;
                    var dfd = $.Deferred();
                    a.service.findByCId()
                        .then(function (data) {
                        if (!(!!data)) {
                            vm.baseModel.categorySet = null;
                        }
                        else {
                            vm.baseModel.categorySet = data.ctgSet;
                        }
                        dfd.resolve();
                    }).fail(function () { return dfd.reject(); });
                    return dfd.promise();
                };
                ScreenModel = __decorate([
                    bean()
                ], ScreenModel);
                return ScreenModel;
            }(ko.ViewModel));
            viewmodel.ScreenModel = ScreenModel;
            var TabModel = /** @class */ (function () {
                function TabModel(param) {
                    this.id = ko.observable(param.id);
                    this.name = ko.observable(param.name);
                    this.active = ko.observable(param.active || false);
                    this.display = ko.observable(param.display || false);
                    this.templateUrl = ko.observable(param.templateUrl);
                }
                return TabModel;
            }());
            var ComboBox = /** @class */ (function () {
                function ComboBox(param) {
                    this.code = param.code;
                    this.name = param.name;
                    this.system = param.system;
                    this.menuCls = param.menuCls;
                    this.uniqueCode = nts.uk.text.format("{0}{1}{2}", param.code, param.system, param.menuCls);
                }
                return ComboBox;
            }());
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = ccg018.a || (ccg018.a = {}));
})(ccg018 || (ccg018 = {}));
//# sourceMappingURL=ccg018.a.vm.js.map