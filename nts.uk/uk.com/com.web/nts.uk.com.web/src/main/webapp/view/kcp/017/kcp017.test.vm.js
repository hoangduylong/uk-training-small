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
                var kcp017;
                (function (kcp017) {
                    var test;
                    (function (test) {
                        var viewmodel;
                        (function (viewmodel) {
                            var API = {};
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.componentName = ko.observable("kcp017-component");
                                    return _this;
                                }
                                ViewModel.prototype.created = function (params) {
                                    var vm = this;
                                    vm.unit = ko.observable(0);
                                    vm.multiple = ko.observable(true);
                                    vm.onDialog = ko.observable(false);
                                    vm.showAlreadySetting = ko.observable(false);
                                    vm.selectType = ko.observable(1);
                                    vm.rows = ko.observable(10);
                                    vm.baseDate = ko.observable(new Date);
                                    vm.alreadySettingWorkplaces = ko.observableArray([]);
                                    vm.alreadySettingWorkplaceGroups = ko.observableArray([]);
                                    vm.selectedWkpIds = ko.observableArray([]);
                                    vm.selectedWkpGroupIds = ko.observableArray([]);
                                    vm.selectTypes = ko.observableArray([
                                        { value: 1, name: "Selected List" },
                                        { value: 2, name: "Select All", enable: vm.multiple },
                                        { value: 3, name: "Select First" },
                                        { value: 4, name: "Select None" }
                                    ]);
                                };
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    vm.unit.subscribe(function (value) {
                                        vm.componentName.valueHasMutated();
                                    });
                                    vm.selectType.subscribe(function (value) {
                                        vm.componentName.valueHasMutated();
                                    });
                                    vm.multiple.subscribe(function (value) {
                                        if (value) {
                                            vm.selectedWkpIds = ko.observableArray([]);
                                            vm.selectedWkpGroupIds = ko.observableArray([]);
                                        }
                                        else {
                                            vm.selectedWkpIds = ko.observable(null);
                                            vm.selectedWkpGroupIds = ko.observable(null);
                                        }
                                        vm.componentName.valueHasMutated();
                                    });
                                    vm.onDialog.subscribe(function (value) {
                                        vm.componentName.valueHasMutated();
                                    });
                                    vm.rows.subscribe(function (value) {
                                        vm.componentName.valueHasMutated();
                                    });
                                    vm.showAlreadySetting.subscribe(function (value) {
                                        vm.componentName.valueHasMutated();
                                    });
                                };
                                ViewModel.prototype.saveSetting = function () {
                                    var vm = this;
                                    if (vm.unit() == 0) {
                                        vm.alreadySettingWorkplaces(vm.selectedWkpIds().map(function (i) { return ({ workplaceId: i, isAlreadySetting: true }); }));
                                    }
                                    else {
                                        vm.alreadySettingWorkplaceGroups(vm.selectedWkpGroupIds());
                                    }
                                };
                                ViewModel.prototype.deleteSetting = function () {
                                    var vm = this;
                                    if (vm.unit() == 0) {
                                        vm.alreadySettingWorkplaces(vm.alreadySettingWorkplaces().filter(function (i) { return vm.selectedWkpIds().indexOf(i.workplaceId) < 0; }));
                                    }
                                    else {
                                        vm.alreadySettingWorkplaceGroups(vm.alreadySettingWorkplaceGroups().filter(function (i) { return vm.selectedWkpGroupIds().indexOf(i) < 0; }));
                                    }
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                        })(viewmodel = test.viewmodel || (test.viewmodel = {}));
                    })(test = kcp017.test || (kcp017.test = {}));
                })(kcp017 = view.kcp017 || (view.kcp017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=kcp017.test.vm.js.map