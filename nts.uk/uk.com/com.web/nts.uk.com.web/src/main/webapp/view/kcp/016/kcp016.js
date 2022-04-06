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
                var kcp016;
                (function (kcp016) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var PATH = {
                                getList: "screen/at/ksm008/alarm_contidion/list"
                            };
                            var template = "\n    <div id=\"kcp016-component\" \n        class=\"panel\" \n        style=\"display: inline-block;\" \n        data-bind=\"css: {\n            ntsPanel: !onDialog(), \n            'caret-right': !onDialog(), \n            'caret-background': !onDialog()\n        }\">\n            <table id=\"single-list\" \n                data-bind=\"ntsGridList: {\n                    name: $i18n('KCP016_2'),\t\t\t\t\t\t\t\t\n                    rows: rows(),\n                    dataSource: items,\n                    primaryKey: 'code',\n                    columns: columns,\n                    multiple: multiple(),\n                    value: value\n                }\"/>\n    </div>\n    ";
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.showNoSelectionItem = false;
                                    _this.items = ko.observableArray([]);
                                    return _this;
                                }
                                ViewModel.prototype.created = function (params) {
                                    var vm = this;
                                    if (params) {
                                        vm.multiple = ko.observable(!!params.multiple);
                                        vm.onDialog = ko.observable(!!params.onDialog);
                                        vm.selectType = ko.observable(params.selectType);
                                        vm.rows = ko.observable(params.rows || 10);
                                        vm.value = params.selectedValue;
                                        vm.tabindex = params.tabindex;
                                        vm.showNoSelectionItem = params.showNoSelectionItem;
                                    }
                                    else {
                                        vm.multiple = ko.observable(false);
                                        vm.onDialog = ko.observable(false);
                                        vm.value = ko.observable(null);
                                        vm.selectType = ko.observable(SelectType.NO_SELECT);
                                        vm.rows = ko.observable(10);
                                    }
                                    vm.columns = ko.observableArray([
                                        { headerText: vm.$i18n("KCP016_3"), key: 'code', width: 70 },
                                        { headerText: vm.$i18n("KCP016_4"), key: 'name', width: 200 },
                                    ]);
                                };
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    vm.$blockui("show").then(function () {
                                        return vm.$ajax("at", PATH.getList);
                                    }).done(function (data) {
                                        vm.items(data.map(function (i) { return ({ code: i.code, name: i.name }); }));
                                        if (vm.multiple()) {
                                            if (vm.selectType() == SelectType.SELECT_ALL)
                                                vm.value(data.map(function (i) { return i.code; }));
                                            else if (vm.selectType() == SelectType.SELECT_FIRST_ITEM && !_.isEmpty(data))
                                                vm.value([data[0].code]);
                                            else if (vm.selectType() == SelectType.NO_SELECT)
                                                vm.value([]);
                                        }
                                        else {
                                            if (vm.selectType() == SelectType.SELECT_FIRST_ITEM && !_.isEmpty(data))
                                                vm.value(data[0].code);
                                            else if (vm.selectType() == SelectType.NO_SELECT)
                                                vm.value(null);
                                            if (vm.showNoSelectionItem) {
                                                vm.items.unshift({ code: null, name: nts.uk.resource.getText('KCP001_5') });
                                            }
                                        }
                                    }).fail(function (error) {
                                        vm.$dialog.error(error);
                                    }).always(function () {
                                        vm.$blockui("hide");
                                        if (_.isNumber(vm.tabindex))
                                            $("#kcp016-component #single-list_container").attr('tabindex', 1);
                                    });
                                };
                                ViewModel = __decorate([
                                    component({
                                        name: 'kcp016-component',
                                        template: template
                                    })
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            var SelectType = /** @class */ (function () {
                                function SelectType() {
                                }
                                SelectType.SELECT_BY_SELECTED_CODE = 1;
                                SelectType.SELECT_ALL = 2;
                                SelectType.SELECT_FIRST_ITEM = 3;
                                SelectType.NO_SELECT = 4;
                                return SelectType;
                            }());
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = kcp016.a || (kcp016.a = {}));
                })(kcp016 = view.kcp016 || (view.kcp016 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=kcp016.js.map