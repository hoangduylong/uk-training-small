module kcp012.a.viewmodel {
    import ComponentOption = kcp.share.list.ComponentOption;
    import ListType = kcp.share.list.ListType;
    import SelectType = kcp.share.list.SelectType;
    import UnitModel = kcp.share.list.UnitModel;
    import UnitAlreadySettingModel = kcp.share.list.UnitAlreadySettingModel;

    @bean()
    export class ScreenModel extends ko.ViewModel {
        selectedCode: KnockoutObservable<string> = ko.observable(null);
        bySelectedCode: KnockoutObservable<string> = ko.observable(null);
        isAlreadySetting: KnockoutObservable<boolean> = ko.observable(false);
        isDialog: KnockoutObservable<boolean> = ko.observable(false);
        isShowNoSelectionItem: KnockoutObservable<boolean> = ko.observable(false);
        isMultiSelect: KnockoutObservable<boolean> = ko.observable(false);

        multiSelectedCode: KnockoutObservableArray<string> = ko.observableArray([]);
        multiBySelectedCode: KnockoutObservableArray<string> = ko.observableArray([]);

        listComponentOption: ComponentOption;
        alreadySettingList: KnockoutObservableArray<UnitAlreadySettingModel> = ko.observableArray([]);

        hasSelectedEmp: KnockoutObservable<boolean> = ko.observable(false);
        workplaceList: KnockoutObservableArray<UnitModel> = ko.observableArray<UnitModel>([]);

        selectionTypeList: KnockoutObservableArray<any> = ko.observableArray([
            { code: 1, name: 'By Selected Code' },
            { code: 2, name: 'Select All Items', enable: this.isMultiSelect },
            { code: 3, name: 'Select First Item' },
            { code: 4, name: 'Select None' }
        ]);
        selectedType: KnockoutObservable<number>  = ko.observable(3);
        selectionOption: KnockoutObservableArray<any> = ko.observableArray([
            { code: 0, name: 'Single Selection' },
            { code: 1, name: 'Multiple Selection' },
        ]);
        selectedOption: KnockoutObservable<number> = ko.observable(0);
        jsonData: KnockoutObservable<string> = ko.observable('');
        selectedItems: KnockoutObservable<any> = ko.observable(null);

        isDisplayClosureSelection: KnockoutObservable<boolean> = ko.observable(false);
        isDisplayFullClosureOption: KnockoutObservable<boolean> = ko.observable(false);
        closureSelectionType: KnockoutObservable<number> = ko.observable(2);
        selectClosureTypeList: KnockoutObservableArray<any> = ko.observableArray([
            { code: 1, name: 'Select Full Closure option', enable: this.isDisplayFullClosureOption },
            { code: 2, name: 'Select by selected closure code' },
            { code: 3, name: 'Nothing (Select first option)' },
        ]);

        mounted() {
            const vm = this;

            vm.isAlreadySetting.subscribe(() => {
                vm.reloadComponent();
            });

            vm.isDialog.subscribe((value: boolean) => {
                vm.reloadComponent();
            });

            vm.isShowNoSelectionItem.subscribe((data: boolean) => {
                vm.reloadComponent();
            });

            vm.isDisplayClosureSelection.subscribe((val) => {
                vm.reloadComponent();
            })

            vm.isDisplayFullClosureOption.subscribe(val => {
                if (val === false) {
                    vm.closureSelectionType(2);
                    return;
                }
                vm.reloadComponent();
            });

            vm.closureSelectionType.subscribe(val => {
                vm.reloadComponent();
            })

            vm.isMultiSelect.subscribe((data: boolean) => {
                if (data) {
                    if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                        vm.listComponentOption.selectedCode = vm.multiBySelectedCode;
                    } else {
                        vm.listComponentOption.selectedCode = vm.multiSelectedCode;
                    }
                } else {
                    if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                        vm.listComponentOption.selectedCode = vm.bySelectedCode;
                    } else if (vm.selectedType() === SelectType.SELECT_ALL) {
                        vm.selectedType(SelectType.SELECT_BY_SELECTED_CODE);
                        return;
                    } else {
                        vm.listComponentOption.selectedCode = vm.selectedCode;
                    }
                }
                vm.reloadComponent();
            });


            // Selected Type Subscribe
            vm.selectedType.subscribe((data: number) => {
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
                        } else {
                            vm.listComponentOption.selectedCode = vm.multiSelectedCode;
                        }
                        break;
                }
                // case selectAll
                //                if (data != 2) {
                vm.reloadComponent();
                //                }
            });
            vm.selectedOption.subscribe((data: number) => {
                if (data === 0) {
                    vm.isMultiSelect(false);
                }
                else {
                    vm.isMultiSelect(true);
                }
            });
        }

        created() {
            const vm = this;

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

            vm.hasSelectedEmp = ko.computed(() => {
                return (vm.selectedCode != undefined);
            });


            $('#workplace-list-setting').ntsListComponent(vm.listComponentOption).done(() => {
                $('#workplace-list-setting').focusComponent();
                // Workplace List
                vm.workplaceList($('#workplace-list-setting').getDataList());
                vm.jsonData(JSON.stringify(vm.workplaceList(), undefined, 1));
            });
        }

        // Setting Item(s) which Registed/Saved from main screen
        public settingSavedItem(): void {
            const vm = this;
            if (vm.listComponentOption.selectedCode() != undefined) {
                if (vm.listComponentOption.selectedCode().length < 1) {
                    nts.uk.ui.dialog.alert("Select Item to Save ! ");
                } else {
                    if (vm.listComponentOption.isMultiSelect) {
                        vm.listComponentOption.selectedCode().forEach((selected) => {
                            const existItem = vm.alreadySettingList().filter((item) => {
                                return item.code === selected;
                            })[0];
                            if (!existItem) {
                                vm.alreadySettingList.push({ "code": selected, "isAlreadySetting": true });
                            }
                        });
                    } else {
                        const existItem = vm.alreadySettingList().filter((item) => {
                            return item.code === vm.listComponentOption.selectedCode();
                        })[0];
                        if (!existItem) {
                            vm.alreadySettingList.push({ "code": vm.listComponentOption.selectedCode(), "isAlreadySetting": true });
                        }
                    }
                    vm.isAlreadySetting(true);
                    nts.uk.ui.dialog.alert("Saved Successfully ! ");
                }
            } else {
                nts.uk.ui.dialog.alert("Select Item to Save ! ");
            }
        }
        // Setting Item(s) which deleted from main Screen
        public settingDeletedItem() {
            const vm = this;
            if (vm.listComponentOption.selectedCode() != undefined) {
                if (vm.listComponentOption.selectedCode().length < 1) {
                    nts.uk.ui.dialog.alert("Select Item to Delete ! ");
                } else {
                    if (vm.listComponentOption.isMultiSelect) {
                        vm.listComponentOption.selectedCode().forEach((selected) => {
                            vm.alreadySettingList.remove(vm.alreadySettingList().filter((item) => {
                                return item.code === selected;
                            })[0]);
                        });
                    } else {
                        vm.alreadySettingList.remove(vm.alreadySettingList().filter((item) => {
                            return item.code === vm.listComponentOption.selectedCode();
                        })[0]);
                    }
                    vm.isAlreadySetting(true);
                    nts.uk.ui.dialog.alert("Deleted Successfully ! ");
                }
            } else {
                nts.uk.ui.dialog.alert("Select Item to Delete ! ");
            }
        }

        // Get Code of Selected Item(s)
        public getSelectedItemCode(): string {
            const vm = this;
            if (vm.isMultiSelect()) {
                if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                    return _.isArray(vm.multiBySelectedCode()) ? vm.multiBySelectedCode().join(', ') : '';
                } else {
                    return _.isArray(vm.multiSelectedCode()) ? vm.multiSelectedCode().join(', ') : '';
                }
            } else {
                if (vm.selectedType() === SelectType.SELECT_BY_SELECTED_CODE) {
                    return vm.bySelectedCode();
                } else {
                    return vm.selectedCode();
                }
            }
        }

        // Reload component Method
        public reloadComponent() {
            const vm = this;
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
            $('#workplace-list-setting').ntsListComponent(vm.listComponentOption).done(() => {
                $('#workplace-list-setting').focusComponent();
            });

        }
    }
}