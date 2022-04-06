var kcp003;
(function (kcp003) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var ListType = kcp.share.list.ListType;
            var SelectType = kcp.share.list.SelectType;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.baseDate = ko.observable(new Date());
                    self.selectedCode = ko.observable(null);
                    self.bySelectedCode = ko.observable(null);
                    self.isAlreadySetting = ko.observable(false);
                    self.isAlreadySetting.subscribe(function () {
                        self.reloadComponent();
                    });
                    self.isDialog = ko.observable(false);
                    self.isDialog.subscribe(function (value) {
                        self.reloadComponent();
                    });
                    self.isShowNoSelectionItem = ko.observable(false);
                    self.isShowNoSelectionItem.subscribe(function (data) {
                        self.reloadComponent();
                    });
                    self.multiBySelectedCode = ko.observableArray([]);
                    self.multiSelectedCode = ko.observableArray([]);
                    self.isMultipleUse = ko.observable(false);
                    self.isMultiSelect = ko.observable(false);
                    // isMultiSelect Subscribe
                    self.isMultiSelect.subscribe(function (data) {
                        if (data) {
                            if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                                self.listComponentOption.selectedCode = self.multiBySelectedCode;
                            }
                            else {
                                self.listComponentOption.selectedCode = self.multiSelectedCode;
                            }
                        }
                        else {
                            if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                                self.listComponentOption.selectedCode = self.bySelectedCode;
                            }
                            else if (self.selectedType() == SelectType.SELECT_ALL) {
                                self.selectedType(SelectType.SELECT_BY_SELECTED_CODE);
                                return;
                            }
                            else {
                                self.listComponentOption.selectedCode = self.selectedCode;
                            }
                        }
                        self.reloadComponent();
                    });
                    self.isMultipleUse.subscribe(function (code) {
                        self.reloadComponent();
                    });
                    self.alreadySettingList = ko.observableArray([]);
                    self.jobTitleList = ko.observableArray([]);
                    self.hasSelectedJobTitle = ko.computed(function () {
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
                    self.selectedType.subscribe(function (data) {
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
                                }
                                else {
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
                    self.selectedOption.subscribe(function (data) {
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
                ScreenModel.prototype.settingSavedItem = function () {
                    var self = this;
                    if (self.listComponentOption.selectedCode() != undefined) {
                        if (self.listComponentOption.selectedCode().length < 1) {
                            nts.uk.ui.dialog.alert("Select Item to Save ! ");
                        }
                        else {
                            if (self.listComponentOption.isMultiSelect) {
                                self.listComponentOption.selectedCode().forEach(function (selected) {
                                    var existItem = self.alreadySettingList().filter(function (item) {
                                        return item.id == selected;
                                    })[0];
                                    if (!existItem) {
                                        self.alreadySettingList.push({ "id": selected, "isAlreadySetting": true });
                                    }
                                });
                            }
                            else {
                                var existItem = self.alreadySettingList().filter(function (item) {
                                    return item.id == self.listComponentOption.selectedCode();
                                })[0];
                                if (!existItem) {
                                    self.alreadySettingList.push({ "id": self.listComponentOption.selectedCode(), "isAlreadySetting": true });
                                }
                            }
                            self.isAlreadySetting(true);
                            nts.uk.ui.dialog.alert("Saved Successfully ! ");
                        }
                    }
                    else {
                        nts.uk.ui.dialog.alert("Select Item to Save ! ");
                    }
                };
                // Setting Item(s) which deleted from main Screen
                ScreenModel.prototype.settingDeletedItem = function () {
                    var self = this;
                    if (self.listComponentOption.selectedCode() != undefined) {
                        if (self.listComponentOption.selectedCode().length < 1) {
                            nts.uk.ui.dialog.alert("Select Item to Delete ! ");
                        }
                        else {
                            if (self.listComponentOption.isMultiSelect) {
                                self.listComponentOption.selectedCode().forEach(function (selected) {
                                    self.alreadySettingList.remove(self.alreadySettingList().filter(function (item) {
                                        return item.id == selected;
                                    })[0]);
                                });
                            }
                            else {
                                self.alreadySettingList.remove(self.alreadySettingList().filter(function (item) {
                                    return item.id == self.listComponentOption.selectedCode();
                                })[0]);
                            }
                            self.isAlreadySetting(true);
                            nts.uk.ui.dialog.alert("Deleted Successfully ! ");
                        }
                    }
                    else {
                        nts.uk.ui.dialog.alert("Select Item to Delete ! ");
                    }
                };
                // Get Code of Selected Item(s)
                ScreenModel.prototype.getSelectedItemCode = function () {
                    var self = this;
                    if (self.isMultiSelect()) {
                        if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                            return self.multiBySelectedCode().join(', ');
                        }
                        else {
                            return self.multiSelectedCode().join(', ');
                        }
                    }
                    else {
                        if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                            return self.bySelectedCode();
                        }
                        else {
                            return self.selectedCode();
                        }
                    }
                };
                // Reload component Method
                ScreenModel.prototype.reloadComponent = function () {
                    var self = this;
                    self.listComponentOption.isShowAlreadySet = self.isAlreadySetting();
                    self.listComponentOption.listType = ListType.JOB_TITLE;
                    self.listComponentOption.isDialog = self.isDialog();
                    self.listComponentOption.isShowNoSelectRow = self.isShowNoSelectionItem();
                    self.listComponentOption.alreadySettingList = self.alreadySettingList;
                    self.listComponentOption.isMultipleUse = self.isMultipleUse();
                    self.listComponentOption.isMultiSelect = self.isMultiSelect();
                    self.listComponentOption.selectType = self.selectedType();
                    $('#component-items-list').ntsListComponent(self.listComponentOption).done(function () {
                        $('#component-items-list').focusComponent();
                    });
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = kcp003.a || (kcp003.a = {}));
})(kcp003 || (kcp003 = {}));
//# sourceMappingURL=kcp003.a.vm.js.map