module kcp005.a.viewmodel {
    import ComponentOption = kcp.share.list.ComponentOption;
    import ListType = kcp.share.list.ListType;
    import SelectType = kcp.share.list.SelectType;
    import UnitModel = kcp.share.list.UnitModel;
    import UnitAlreadySettingModel = kcp.share.list.UnitAlreadySettingModel;
    export class ScreenModel {
        selectedCode: KnockoutObservable<string>;
        bySelectedCode: KnockoutObservable<string>;
        isAlreadySetting: KnockoutObservable<boolean>;
        isDialog: KnockoutObservable<boolean>;
        isShowNoSelectionItem: KnockoutObservable<boolean>;
        isMultiSelect: KnockoutObservable<boolean>;
        isShowWorkPlaceName: KnockoutObservable<boolean>;
        isShowSelectAllButton: KnockoutObservable<boolean>;
        showOptionalColumn: KnockoutObservable<boolean>; //任意列表示
        disableSelection : KnockoutObservable<boolean>;

        multiSelectedCode: KnockoutObservableArray<string>;
        multiBySelectedCode: KnockoutObservableArray<string>;

        listComponentOption: ComponentOption;
        alreadySettingList: KnockoutObservableArray<UnitAlreadySettingModel>;

        hasSelectedEmp: KnockoutObservable<boolean>;
        employeeList: KnockoutObservableArray<UnitModel>;

        selectionTypeList: KnockoutObservableArray<any>;
        selectedType: KnockoutObservable<number>;
        selectionOption: KnockoutObservableArray<any>;
        selectedOption: KnockoutObservable<number>;
        jsonData: KnockoutObservable<string>;
        selectedInfo: KnockoutComputed<string>;

        constructor() {
            var self = this;
            self.selectedCode = ko.observable(null);
            self.bySelectedCode = ko.observable('2');
            self.isAlreadySetting = ko.observable(false);
            self.isAlreadySetting.subscribe(function() {
                self.reloadComponent();
            });

            self.showOptionalColumn = ko.observable(false);
            self.showOptionalColumn.subscribe(() => self.reloadComponent());
            self.isDialog = ko.observable(false);
            self.isDialog.subscribe(function(value: boolean) {
                self.reloadComponent();
            });

            self.isShowNoSelectionItem = ko.observable(false);
            self.isShowNoSelectionItem.subscribe(function(data: boolean) {
                self.reloadComponent();
            });
            
            self.disableSelection = ko.observable(false);
            self.disableSelection.subscribe(function(data: boolean) {
                self.reloadComponent();
            });

            self.multiBySelectedCode = ko.observableArray(['1', '2']);
            self.multiSelectedCode = ko.observableArray([]);

            self.isMultiSelect = ko.observable(false);
            // isMultiSelect Subscribe
            self.isMultiSelect.subscribe(function(data: boolean) {
                if (data) {
                    if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                        self.listComponentOption.selectedCode = self.multiBySelectedCode;
                    } else {
                        self.listComponentOption.selectedCode = self.multiSelectedCode;
                    }
                } else {
                    if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                        self.listComponentOption.selectedCode = self.bySelectedCode;
                    } else if (self.selectedType() == SelectType.SELECT_ALL) {
                        self.selectedType(SelectType.SELECT_BY_SELECTED_CODE);
                        return;
                    } else {
                        self.listComponentOption.selectedCode = self.selectedCode;
                    }
                    self.isShowSelectAllButton(false);
                }
                self.reloadComponent();
            });

            self.alreadySettingList = ko.observableArray([{ code: '1', isAlreadySetting: true }, { code: '2', isAlreadySetting: true }]);
            self.employeeList = ko.observableArray<UnitModel>([
                { id: '1a', code: '1', name: 'Angela Babykasjgdkajsghdkahskdhaksdhasd', workplaceName: 'HN' },
                { id: '2b', code: '2', name: 'Xuan Toc Doaslkdhasklhdlashdhlashdl', workplaceName: 'HN' },
                { id: '3c', code: '3', name: 'Park Shin Hye', workplaceName: 'HCM' },
                { id: '3d', code: '4', name: 'Vladimir Nabokov', workplaceName: 'HN' }
            ]);
            self.hasSelectedEmp = ko.computed(function() {
                return (self.selectedCode != undefined);
            });
            
            self.isShowWorkPlaceName = ko.observable(false);
            self.isShowWorkPlaceName.subscribe(function() {
                self.reloadComponent();
            });
            
            self.isShowSelectAllButton = ko.observable(false);
            // isShowSelectAllButton Subscribe
            self.isShowSelectAllButton.subscribe(function(data: boolean) {
                if (data) {
                    if (!self.isMultiSelect()) {
                        
                        nts.uk.ui.dialog.alert("SelectAll button is not available for Single selection ! ");
                        self.isShowSelectAllButton(false);
                        return;
                    } 
                } 
                if (!data && !self.isMultiSelect() ) {
                    return;
                }
                self.reloadComponent();
            });
            self.selectedType = ko.observable(1);
            
            // Initial listComponentOption
            self.listComponentOption = {
                isShowAlreadySet: self.isAlreadySetting(),
                isMultiSelect: self.isMultiSelect(),
                listType: ListType.EMPLOYEE,
                employeeInputList: self.employeeList,
                selectType: self.selectedType(),
                selectedCode: self.bySelectedCode,
                isDialog: self.isDialog(),
                isShowNoSelectRow: self.isShowNoSelectionItem(),
                alreadySettingList: self.alreadySettingList,
                isShowWorkPlaceName: self.isShowWorkPlaceName(),
                isShowSelectAllButton: self.isShowSelectAllButton(),
                maxRows: 12,
                disableSelection : self.disableSelection()
            };

            self.selectionTypeList = ko.observableArray([
                { code: 1, name: 'By Selected Code' },
                { code: 2, name: 'Select All Items', enable: self.isMultiSelect },
                { code: 3, name: 'Select First Item' },
                { code: 4, name: 'Select None' }
            ]);
            // Selected Type Subscribe
            self.selectedType.subscribe(function(data: number) {
                switch (data) {
                    case 1:
                        if (self.isMultiSelect()) {
                            self.listComponentOption.selectedCode = self.multiBySelectedCode;
                        }
                        else {
                            self.listComponentOption.selectedCode = self.bySelectedCode;
                        }
                        break;
                    case 2:
                        if (self.isMultiSelect()) {
                            self.listComponentOption.selectedCode = self.multiSelectedCode;
                        }
                        else {
                            self.selectedType(1);
                            nts.uk.ui.dialog.alert("SelectAll is not available for Single selection ! ");
                            return;
                        }
                        break;
                    case 3:
                        if (self.isMultiSelect()) {
                            self.listComponentOption.selectedCode = self.multiSelectedCode;
                        }
                        else {
                            self.listComponentOption.selectedCode = self.selectedCode;
                        }
                        break;
                    case 4:
                        if (!self.isMultiSelect()) {
                            self.listComponentOption.selectedCode = self.selectedCode;
                        } else {
                            self.listComponentOption.selectedCode = self.multiSelectedCode;
                        }
                        break;
                }
                self.reloadComponent();
            });
            self.selectionOption = ko.observableArray([
                { code: 0, name: 'Single Selection' },
                { code: 1, name: 'Multiple Selection' },
            ]);
            self.selectedOption = ko.observable(0);
            self.selectedOption.subscribe(function(data: number) {
                if (data == 0) {
                    self.isMultiSelect(false);
                }
                else {
                    self.isMultiSelect(true);
                }
            });
            self.jsonData = ko.observable('');
            
            self.selectedInfo = ko.observable("");
        }
        
        getSelectedInfo () {
            let self = this;
            let selectedInfos = $("#component-items-list").ntsListComponentApi("getSelectedRecords");
            let text = "";
            _.forEach(selectedInfos, (s) => {
                text = text.concat(JSON.stringify(s)).concat("/n");
            });
            self.selectedInfo(text);
        }
        
        // Setting Item(s) which Registed/Saved from main screen
        private settingSavedItem(): void {
            var self = this;
            if (self.listComponentOption.selectedCode() != undefined) {
                if (self.listComponentOption.selectedCode().length < 1) {
                    nts.uk.ui.dialog.alert("Select Item to Save ! ");
                } else {
                    if (self.listComponentOption.isMultiSelect) {
                    self.listComponentOption.selectedCode().forEach((selected) => {
                        var existItem = self.alreadySettingList().filter((item) => {
                            return item.code == selected;
                        })[0];
                        if (!existItem) {
                            self.alreadySettingList.push({ "code": selected, "isAlreadySetting": true });
                        }
                    });
                } else {
                    var existItem = self.alreadySettingList().filter((item) => {
                        return item.code == self.listComponentOption.selectedCode();
                    })[0];
                    if (!existItem) {
                        self.alreadySettingList.push({ "code": self.listComponentOption.selectedCode(), "isAlreadySetting": true });
                    }
                }
                self.isAlreadySetting(true);
                nts.uk.ui.dialog.alert("Saved Successfully ! ");
                }
                
            } else {
                nts.uk.ui.dialog.alert("Select Item to Save ! ");
            }
        }
        // Setting Item(s) which deleted from main Screen
        private settingDeletedItem() {
            let self = this;
            if (self.listComponentOption.selectedCode() != undefined) {
                if (self.listComponentOption.selectedCode().length < 1) {
                    nts.uk.ui.dialog.alert("Select Item to Delete ! ");
                } else {
                    if (self.listComponentOption.isMultiSelect) {
                    self.listComponentOption.selectedCode().forEach((selected) => {
                        self.alreadySettingList.remove(self.alreadySettingList().filter((item) => {
                            return item.code == selected;
                        })[0]);
                    });
                } else {
                    self.alreadySettingList.remove(self.alreadySettingList().filter((item) => {
                        return item.code == self.listComponentOption.selectedCode();
                    })[0]);
                }
                self.isAlreadySetting(true);
                nts.uk.ui.dialog.alert("Deleted Successfully ! ");
                }
                
            } else {
                nts.uk.ui.dialog.alert("Select Item to Delete ! ");
            }
        }
        // Get Code of Selected Item(s)
        private getSelectedItemCode(): string {
            var self = this;
            if (self.isMultiSelect()) {
                if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                    return self.multiBySelectedCode().join(', ');
                } else {
                    return self.multiSelectedCode().join(', ');
                }
            } else {
                if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                    return self.bySelectedCode();
                } else {
                    return self.selectedCode();
                }
            }
        }
        // Reload component Method
        private reloadComponent() {
            var self = this;
            self.listComponentOption.isShowAlreadySet = self.isAlreadySetting();
            self.listComponentOption.listType = ListType.EMPLOYEE;
            self.listComponentOption.employeeInputList = self.employeeList;
            self.listComponentOption.isDialog = self.isDialog();
            self.listComponentOption.isShowNoSelectRow = self.isShowNoSelectionItem();
            self.listComponentOption.alreadySettingList = self.alreadySettingList;
            self.listComponentOption.isMultiSelect = self.isMultiSelect();
            self.listComponentOption.selectType = self.selectedType();
            self.listComponentOption.isShowWorkPlaceName = self.isShowWorkPlaceName();
            self.listComponentOption.isShowSelectAllButton = self.isShowSelectAllButton();
            self.listComponentOption.showOptionalColumn = self.showOptionalColumn();
            self.listComponentOption.optionalColumnName = nts.uk.resource.getText('KSM005_18');
            self.listComponentOption.optionalColumnDatasource = ko.observableArray([{empId: '1', content: 'abc'}, {empId: '2', content: 'xyz'}]);
            self.listComponentOption.disableSelection = self.disableSelection();

            $('#component-items-list').ntsListComponent(self.listComponentOption).done(function() {
                $('#component-items-list').focusComponent();
            });
            
        }
    }
}