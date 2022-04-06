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
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var template = "\n    <div id=\"kcp017-component\" \n        class=\"panel\" \n        style=\"display: inline-block;\" \n        data-bind=\"css: {\n            ntsPanel: !onDialog(), \n            'caret-right': !onDialog(), \n            'caret-background': !onDialog()\n        }\">\n        <div class=\"control-group valign-center\">\n            <div data-bind=\"ntsFormLabel: {text: $i18n('KCP017_2')}\"/>\n            <div id=\"kcp017-switch\" style=\"display: inline-block;\"\n            data-bind=\"ntsSwitchButton: {\n                name: $i18n('KCP017_2'),\n                options: [\n                    {code: 0, name: $i18n('Com_Workplace')},\n                    {code: 1, name: $i18n('Com_WorkplaceGroup')}\n                ],\n                optionsValue: 'code',\n                optionsText: 'name',\n                value: selectedUnit \n            }\"/>\n        </div>\n        <hr />\n        <div data-bind=\"visible: selectedUnit() == 0\">\n            <div id=\"workplace-tree-grid\"/>\n        </div>\n        <div data-bind=\"visible: selectedUnit() == 1\">\n            <div data-bind=\"component: {\n                name: 'workplace-group',\n                params: {\n                    options: kcp011Options\n                }\n            }\"/>\n        </div>\n        <i class=\"icon icon-searchbox\" data-bind=\"visible: !onDialog()\"></i>\n    </div>\n    <style>\n        #kcp017-switch .radio-wrapper {\n            width: 100px;\n            flex-direction: column;\n            text-align: center;\n        }\n    </style>\n    ";
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    return _super !== null && _super.apply(this, arguments) || this;
                                }
                                ViewModel.prototype.created = function (params) {
                                    var vm = this;
                                    if (params) {
                                        vm.selectedUnit = ko.isObservable(params.unit) ? params.unit : ko.observable(params.unit || 0);
                                        vm.baseDate = ko.isObservable(params.baseDate) ? params.baseDate : ko.observable(params.baseDate || new Date());
                                        vm.alreadySettingWorkplaces = params.alreadySettingWorkplaces;
                                        vm.alreadySettingWorkplaceGroups = params.alreadySettingWorkplaceGroups;
                                        vm.selectedIds = params.selectedWorkplaces;
                                        vm.selectedGroupIds = params.selectedWorkplaceGroups;
                                        vm.selectType = ko.observable(params.selectType || SelectType.SELECT_FIRST_ITEM);
                                        vm.onDialog = ko.observable(_.isNil(params.onDialog) ? false : params.onDialog);
                                        vm.multiple = ko.observable(_.isNil(params.multiple) ? false : params.multiple);
                                        vm.showAlreadySetting = ko.observable(_.isNil(params.showAlreadySetting) ? false : params.showAlreadySetting);
                                        vm.rows = ko.observable(params.rows || 10);
                                        vm.multipleUsage = ko.observable(_.isNil(params.multipleUsage) ? false : params.multipleUsage);
                                        vm.isShowSelectButton = ko.observable(_.isNil(params.isShowSelectButton) ? true : params.isShowSelectButton);
                                        vm.showEmptyItem = ko.observable(_.isNil(params.showEmptyItem) ? false : params.showEmptyItem);
                                    }
                                    else {
                                        vm.selectedUnit = ko.observable(0);
                                        vm.baseDate = ko.observable(new Date());
                                        vm.alreadySettingWorkplaces = ko.observableArray([]);
                                        vm.alreadySettingWorkplaceGroups = ko.observableArray([]);
                                        vm.selectedIds = ko.observable(null);
                                        vm.selectedGroupIds = ko.observable(null);
                                        vm.selectType = ko.observable(SelectType.SELECT_FIRST_ITEM);
                                        vm.onDialog = ko.observable(false);
                                        vm.multiple = ko.observable(false);
                                        vm.showAlreadySetting = ko.observable(false);
                                        vm.rows = ko.observable(10);
                                        vm.multipleUsage = ko.observable(false);
                                        vm.isShowSelectButton = ko.observable(true);
                                        vm.showEmptyItem = ko.observable(false);
                                    }
                                    vm.selectMode = ko.computed(function () {
                                        if (vm.selectType() == SelectType.SELECT_FIRST_ITEM)
                                            return SELECTED_MODE.FIRST;
                                        if (vm.selectType() == SelectType.NO_SELECT)
                                            return SELECTED_MODE.NONE;
                                        if (vm.selectType() == SelectType.SELECT_ALL)
                                            return SELECTED_MODE.ALL;
                                        if (vm.selectType() == SelectType.SELECT_BY_SELECTED_ID)
                                            return SELECTED_MODE.SELECT_ID;
                                    });
                                    vm.kcp004Options = {
                                        isShowAlreadySet: vm.showAlreadySetting(),
                                        isMultipleUse: vm.multipleUsage(),
                                        isMultiSelect: vm.multiple(),
                                        startMode: 0,
                                        baseDate: vm.baseDate,
                                        selectType: vm.selectType(),
                                        systemType: 2,
                                        isShowSelectButton: vm.isShowSelectButton(),
                                        isDialog: true,
                                        hasPadding: false,
                                        maxRows: vm.rows(),
                                        alreadySettingList: vm.alreadySettingWorkplaces,
                                        selectedId: vm.selectedIds,
                                        restrictionOfReferenceRange: true
                                    };
                                    vm.kcp011Options = {
                                        currentIds: vm.selectedGroupIds,
                                        alreadySettingList: vm.alreadySettingWorkplaceGroups,
                                        multiple: vm.multiple(),
                                        isAlreadySetting: vm.showAlreadySetting(),
                                        showPanel: false,
                                        showEmptyItem: vm.showEmptyItem(),
                                        reloadData: ko.observable(''),
                                        selectedMode: vm.selectMode(),
                                        rows: vm.rows()
                                    };
                                    $('#workplace-tree-grid').ntsTreeComponent(vm.kcp004Options);
                                };
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    vm.selectedUnit.subscribe(function (value) {
                                        if (value == 1 && $("#workplace-group-pannel input.ntsSearchBox").width() == 0)
                                            $("#workplace-group-pannel input.ntsSearchBox").css("width", "auto");
                                        if (value == 0 && vm.multipleUsage() && $("#workplace-tree-grid input.ntsSearchBox").width() != 161)
                                            $("#workplace-tree-grid input.ntsSearchBox").css("width", "161px");
                                    });
                                };
                                ViewModel = __decorate([
                                    component({
                                        name: 'kcp017-component',
                                        template: template
                                    })
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            var SelectType;
                            (function (SelectType) {
                                SelectType[SelectType["SELECT_BY_SELECTED_ID"] = 1] = "SELECT_BY_SELECTED_ID";
                                SelectType[SelectType["SELECT_ALL"] = 2] = "SELECT_ALL";
                                SelectType[SelectType["SELECT_FIRST_ITEM"] = 3] = "SELECT_FIRST_ITEM";
                                SelectType[SelectType["NO_SELECT"] = 4] = "NO_SELECT";
                            })(SelectType || (SelectType = {}));
                            var SELECTED_MODE;
                            (function (SELECTED_MODE) {
                                SELECTED_MODE[SELECTED_MODE["NONE"] = 0] = "NONE";
                                SELECTED_MODE[SELECTED_MODE["FIRST"] = 1] = "FIRST";
                                SELECTED_MODE[SELECTED_MODE["ALL"] = 2] = "ALL";
                                SELECTED_MODE[SELECTED_MODE["SELECT_ID"] = 3] = "SELECT_ID";
                            })(SELECTED_MODE || (SELECTED_MODE = {}));
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = kcp017.a || (kcp017.a = {}));
                })(kcp017 = view.kcp017 || (view.kcp017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=kcp017.js.map