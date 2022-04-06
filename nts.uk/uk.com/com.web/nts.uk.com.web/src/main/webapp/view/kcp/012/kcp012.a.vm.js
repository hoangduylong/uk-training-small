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
var kcp012;
(function (kcp012) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var ListType = kcp.share.list.ListType;
            var SelectType = kcp.share.list.SelectType;
            var ScreenModel = /** @class */ (function (_super) {
                __extends(ScreenModel, _super);
                function ScreenModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.selectedCode = ko.observable(null);
                    _this.bySelectedCode = ko.observable(null);
                    _this.isAlreadySetting = ko.observable(false);
                    _this.isDialog = ko.observable(false);
                    _this.isShowNoSelectionItem = ko.observable(false);
                    _this.isMultiSelect = ko.observable(false);
                    _this.multiSelectedCode = ko.observableArray([]);
                    _this.multiBySelectedCode = ko.observableArray([]);
                    _this.alreadySettingList = ko.observableArray([]);
                    _this.hasSelectedEmp = ko.observable(false);
                    _this.workplaceList = ko.observableArray([]);
                    _this.selectionTypeList = ko.observableArray([
                        { code: 1, name: 'By Selected Code' },
                        { code: 2, name: 'Select All Items', enable: _this.isMultiSelect },
                        { code: 3, name: 'Select First Item' },
                        { code: 4, name: 'Select None' }
                    ]);
                    _this.selectedType = ko.observable(3);
                    _this.selectionOption = ko.observableArray([
                        { code: 0, name: 'Single Selection' },
                        { code: 1, name: 'Multiple Selection' },
                    ]);
                    _this.selectedOption = ko.observable(0);
                    _this.jsonData = ko.observable('');
                    _this.selectedItems = ko.observable(null);
                    _this.isDisplayClosureSelection = ko.observable(false);
                    _this.isDisplayFullClosureOption = ko.observable(false);
                    _this.closureSelectionType = ko.observable(2);
                    _this.selectClosureTypeList = ko.observableArray([
                        { code: 1, name: 'Select Full Closure option', enable: _this.isDisplayFullClosureOption },
                        { code: 2, name: 'Select by selected closure code' },
                        { code: 3, name: 'Nothing (Select first option)' },
                    ]);
                    return _this;
                }
                ScreenModel.prototype.mounted = function () {
                    var vm = this;
                    vm.isAlreadySetting.subscribe(function () {
                        vm.reloadComponent();
                    });
                    vm.isDialog.subscribe(function (value) {
                        vm.reloadComponent();
                    });
                    vm.isShowNoSelectionItem.subscribe(function (data) {
                        vm.reloadComponent();
                    });
                    vm.isDisplayClosureSelection.subscribe(function (val) {
                        vm.reloadComponent();
                    });
                    vm.isDisplayFullClosureOption.subscribe(function (val) {
                        if (val === false) {
                            vm.closureSelectionType(2);
                            return;
                        }
                        vm.reloadComponent();
                    });
                    vm.closureSelectionType.subscribe(function (val) {
                        vm.reloadComponent();
                    });
                    vm.isMultiSelect.subscribe(function (data) {
                        if (data) {
                            if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                                vm.listComponentOption.selectedCode = vm.multiBySelectedCode;
                            }
                            else {
                                vm.listComponentOption.selectedCode = vm.multiSelectedCode;
                            }
                        }
                        else {
                            if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                                vm.listComponentOption.selectedCode = vm.bySelectedCode;
                            }
                            else if (vm.selectedType() === SelectType.SELECT_ALL) {
                                vm.selectedType(SelectType.SELECT_BY_SELECTED_CODE);
                                return;
                            }
                            else {
                                vm.listComponentOption.selectedCode = vm.selectedCode;
                            }
                        }
                        vm.reloadComponent();
                    });
                    // Selected Type Subscribe
                    vm.selectedType.subscribe(function (data) {
                        switch (data) {
                            case 1:
                                if (vm.isMultiSelect()) {
                                    vm.listComponentOption.selectedCode = vm.multiBySelectedCode;
                                }
                                else {
                                    vm.listComponentOption.selectedCode = vm.bySelectedCode;
                                }
                                break;
                            case 2:
                                if (vm.isMultiSelect()) {
                                    vm.listComponentOption.selectedCode = vm.multiSelectedCode;
                                }
                                else {
                                    vm.selectedType(1);
                                    nts.uk.ui.dialog.alert("SelectAll is not available for Single selection ! ");
                                    return;
                                }
                                break;
                            case 3:
                                if (vm.isMultiSelect()) {
                                    vm.listComponentOption.selectedCode = vm.multiSelectedCode;
                                }
                                else {
                                    vm.listComponentOption.selectedCode = vm.selectedCode;
                                }
                                break;
                            case 4:
                                if (!vm.isMultiSelect()) {
                                    vm.listComponentOption.selectedCode = vm.selectedCode;
                                }
                                else {
                                    vm.listComponentOption.selectedCode = vm.multiSelectedCode;
                                }
                                break;
                        }
                        // case selectAll
                        //                if (data != 2) {
                        vm.reloadComponent();
                        //                }
                    });
                    vm.selectedOption.subscribe(function (data) {
                        if (data === 0) {
                            vm.isMultiSelect(false);
                        }
                        else {
                            vm.isMultiSelect(true);
                        }
                    });
                };
                ScreenModel.prototype.created = function () {
                    var vm = this;
                    // Initial listComponentOption
                    vm.listComponentOption = {
                        isShowAlreadySet: vm.isAlreadySetting(),
                        isMultiSelect: vm.isMultiSelect(),
                        isMultipleUse: true,
                        listType: ListType.WORKPLACE,
                        selectType: vm.selectedType(),
                        selectedCode: vm.selectedCode,
                        isDialog: !vm.isDialog(),
                        isShowNoSelectRow: vm.isShowNoSelectionItem(),
                        alreadySettingList: vm.alreadySettingList,
                        maxRows: 12,
                    };
                    vm.hasSelectedEmp = ko.computed(function () {
                        return (vm.selectedCode != undefined);
                    });
                    $('#workplace-list-setting').ntsListComponent(vm.listComponentOption).done(function () {
                        $('#workplace-list-setting').focusComponent();
                        // Workplace List
                        vm.workplaceList($('#workplace-list-setting').getDataList());
                        vm.jsonData(JSON.stringify(vm.workplaceList(), undefined, 1));
                    });
                };
                // Setting Item(s) which Registed/Saved from main screen
                ScreenModel.prototype.settingSavedItem = function () {
                    var vm = this;
                    if (vm.listComponentOption.selectedCode() != undefined) {
                        if (vm.listComponentOption.selectedCode().length < 1) {
                            nts.uk.ui.dialog.alert("Select Item to Save ! ");
                        }
                        else {
                            if (vm.listComponentOption.isMultiSelect) {
                                vm.listComponentOption.selectedCode().forEach(function (selected) {
                                    var existItem = vm.alreadySettingList().filter(function (item) {
                                        return item.code === selected;
                                    })[0];
                                    if (!existItem) {
                                        vm.alreadySettingList.push({ "code": selected, "isAlreadySetting": true });
                                    }
                                });
                            }
                            else {
                                var existItem = vm.alreadySettingList().filter(function (item) {
                                    return item.code === vm.listComponentOption.selectedCode();
                                })[0];
                                if (!existItem) {
                                    vm.alreadySettingList.push({ "code": vm.listComponentOption.selectedCode(), "isAlreadySetting": true });
                                }
                            }
                            vm.isAlreadySetting(true);
                            nts.uk.ui.dialog.alert("Saved Successfully ! ");
                        }
                    }
                    else {
                        nts.uk.ui.dialog.alert("Select Item to Save ! ");
                    }
                };
                // Setting Item(s) which deleted from main Screen
                ScreenModel.prototype.settingDeletedItem = function () {
                    var vm = this;
                    if (vm.listComponentOption.selectedCode() != undefined) {
                        if (vm.listComponentOption.selectedCode().length < 1) {
                            nts.uk.ui.dialog.alert("Select Item to Delete ! ");
                        }
                        else {
                            if (vm.listComponentOption.isMultiSelect) {
                                vm.listComponentOption.selectedCode().forEach(function (selected) {
                                    vm.alreadySettingList.remove(vm.alreadySettingList().filter(function (item) {
                                        return item.code === selected;
                                    })[0]);
                                });
                            }
                            else {
                                vm.alreadySettingList.remove(vm.alreadySettingList().filter(function (item) {
                                    return item.code === vm.listComponentOption.selectedCode();
                                })[0]);
                            }
                            vm.isAlreadySetting(true);
                            nts.uk.ui.dialog.alert("Deleted Successfully ! ");
                        }
                    }
                    else {
                        nts.uk.ui.dialog.alert("Select Item to Delete ! ");
                    }
                };
                // Get Code of Selected Item(s)
                ScreenModel.prototype.getSelectedItemCode = function () {
                    var vm = this;
                    if (vm.isMultiSelect()) {
                        if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                            return _.isArray(vm.multiBySelectedCode()) ? vm.multiBySelectedCode().join(', ') : '';
                        }
                        else {
                            return _.isArray(vm.multiSelectedCode()) ? vm.multiSelectedCode().join(', ') : '';
                        }
                    }
                    else {
                        if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                            return vm.bySelectedCode();
                        }
                        else {
                            return vm.selectedCode();
                        }
                    }
                };
                // Reload component Method
                ScreenModel.prototype.reloadComponent = function () {
                    var vm = this;
                    vm.listComponentOption.isShowAlreadySet = vm.isAlreadySetting();
                    vm.listComponentOption.listType = ListType.WORKPLACE;
                    vm.listComponentOption.isDialog = !vm.isDialog();
                    vm.listComponentOption.isShowNoSelectRow = vm.isShowNoSelectionItem();
                    vm.listComponentOption.alreadySettingList = vm.alreadySettingList;
                    vm.listComponentOption.isMultiSelect = vm.isMultiSelect();
                    vm.listComponentOption.selectType = vm.selectedType();
                    vm.listComponentOption.isDisplayClosureSelection = vm.isDisplayClosureSelection();
                    vm.listComponentOption.isDisplayFullClosureOption = vm.isDisplayFullClosureOption();
                    vm.listComponentOption.closureSelectionType = vm.closureSelectionType();
                    $('#workplace-list-setting').ntsListComponent(vm.listComponentOption).done(function () {
                        $('#workplace-list-setting').focusComponent();
                    });
                };
                ScreenModel = __decorate([
                    bean()
                ], ScreenModel);
                return ScreenModel;
            }(ko.ViewModel));
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = kcp012.a || (kcp012.a = {}));
})(kcp012 || (kcp012 = {}));
//# sourceMappingURL=kcp012.a.vm.js.map