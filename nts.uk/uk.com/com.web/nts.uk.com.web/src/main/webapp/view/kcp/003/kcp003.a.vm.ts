module kcp003.a.viewmodel {
    import ComponentOption = kcp.share.list.ComponentOption;
    import ListType = kcp.share.list.ListType;
    import SelectType = kcp.share.list.SelectType;
    import UnitModel = kcp.share.list.UnitModel;
    import UnitAlreadySettingModel = kcp.share.list.UnitAlreadySettingModel;
    export class ScreenModel {
        baseDate: KnockoutObservable<Date>;
        selectedCode: KnockoutObservable<string>;
        bySelectedCode: KnockoutObservable<string>;
        isAlreadySetting: KnockoutObservable<boolean>;
        isDialog: KnockoutObservable<boolean>;
        isShowNoSelectionItem: KnockoutObservable<boolean>;
        isMultiSelect: KnockoutObservable<boolean>;
        isMultipleUse: KnockoutObservable<boolean>;

        multiSelectedCode: KnockoutObservableArray<string>;
        multiBySelectedCode: KnockoutObservableArray<string>;

        listComponentOption: ComponentOption;
        alreadySettingList: KnockoutObservableArray<any>;

        hasSelectedJobTitle: KnockoutObservable<boolean>;
        jobTitleList: KnockoutObservableArray<UnitModel>;

        selectionTypeList: KnockoutObservableArray<any>;
        selectedType: KnockoutObservable<number>;
        selectionOption: KnockoutObservableArray<any>;
        selectedOption: KnockoutObservable<number>;
        jsonData: KnockoutObservable<string>;

        constructor() {
            var self = this;
            self.baseDate = ko.observable(new Date());
            self.selectedCode = ko.observable(null);
            self.bySelectedCode = ko.observable(null);
            self.isAlreadySetting = ko.observable(false);
            self.isAlreadySetting.subscribe(function() {
                self.reloadComponent();
            });

            self.isDialog = ko.observable(false);
            self.isDialog.subscribe(function(value: boolean) {
                self.reloadComponent();
            });

            self.isShowNoSelectionItem = ko.observable(false);
            self.isShowNoSelectionItem.subscribe(function(data: boolean) {
                self.reloadComponent();
            });

            self.multiBySelectedCode = ko.observableArray([]);
            self.multiSelectedCode = ko.observableArray([]);

            self.isMultipleUse =  ko.observable(false);
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
                    } else if(self.selectedType() == SelectType.SELECT_ALL) {
                        self.selectedType(SelectType.SELECT_BY_SELECTED_CODE);
                        return;
                    } else {
                        self.listComponentOption.selectedCode = self.selectedCode;
                    }
                }
                self.reloadComponent();
            });
            self.isMultipleUse.subscribe(function(code) {
                self.reloadComponent();
            });

            self.alreadySettingList = ko.observableArray([]);
            self.jobTitleList = ko.observableArray<UnitModel>([]);
            self.hasSelectedJobTitle = ko.computed(function() {
                return (self.selectedCode != undefined);
            });
            self.selectedType = ko.observable(3);
            
            // Initial listComponentOption
            self.listComponentOption = {
                baseDate: self.baseDate,
                isShowAlreadySet: self.isAlreadySetting(),
                isMultipleUse: self.isMultipleUse(),
                isMultiSelect: self.isMultiSelect(),
                listType: ListType.JOB_TITLE,
                selectType: self.selectedType(),
                selectedCode: self.selectedCode,
                isDialog: self.isDialog(),
                isShowNoSelectRow: self.isShowNoSelectionItem(),
                alreadySettingList: self.alreadySettingList,
                maxRows: 12
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
                                return item.id == selected;
                            })[0];
                            if (!existItem) {
                                self.alreadySettingList.push({ "id": selected, "isAlreadySetting": true });
                            }
                        });
                    } else {
                        var existItem = self.alreadySettingList().filter((item) => {
                            return item.id == self.listComponentOption.selectedCode();
                        })[0];
                        if (!existItem) {
                            self.alreadySettingList.push({ "id": self.listComponentOption.selectedCode(), "isAlreadySetting": true });
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
                                return item.id == selected;
                            })[0]);
                        });
                    } else {
                        self.alreadySettingList.remove(self.alreadySettingList().filter((item) => {
                            return item.id == self.listComponentOption.selectedCode();
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
            self.listComponentOption.listType = ListType.JOB_TITLE;
            self.listComponentOption.isDialog = self.isDialog();
            self.listComponentOption.isShowNoSelectRow = self.isShowNoSelectionItem();
            self.listComponentOption.alreadySettingList = self.alreadySettingList;
            self.listComponentOption.isMultipleUse = self.isMultipleUse();
            self.listComponentOption.isMultiSelect = self.isMultiSelect();
            self.listComponentOption.selectType = self.selectedType();
            $('#component-items-list').ntsListComponent(self.listComponentOption).done(function() {
                $('#component-items-list').focusComponent();
            });
            
        }
    }
    
    export interface AlreadySettingModel {
        id: string;
        isAlreadySetting: boolean;
    }
}