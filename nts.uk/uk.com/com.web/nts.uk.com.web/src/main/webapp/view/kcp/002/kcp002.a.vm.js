var kcp002;
(function (kcp002) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var ListType = kcp.share.list.ListType;
            var SelectType = kcp.share.list.SelectType;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    // Control component
                    self.isAlreadySetting = ko.observable(false);
                    self.isDialog = ko.observable(false);
                    self.isShowNoSelectionItem = ko.observable(false);
                    self.isMultiSelect = ko.observable(false);
                    self.selectionTypeList = ko.observableArray([
                        { code: 1, name: 'By Selected Code' },
                        { code: 2, name: 'Select All Items', enable: self.isMultiSelect },
                        { code: 3, name: 'Select First Item' },
                        { code: 4, name: 'Select None' }
                    ]);
                    self.selectionOption = ko.observableArray([
                        { code: 0, name: 'Single Selection' },
                        { code: 1, name: 'Multiple Selection' },
                    ]);
                    self.selectedType = ko.observable(1);
                    // Control common
                    self.selectedOption = ko.observable(0);
                    self.selectedCode = ko.observable(null);
                    self.bySelectedCode = ko.observable('');
                    self.multiSelectionCode = ko.observableArray([]);
                    self.multiSelectedCode = ko.observableArray(['']);
                    self.alreadySettingList = ko.observableArray([{ code: '', isAlreadySetting: true }]);
                    self.classificationList = ko.observableArray([]);
                    self.hasSelectedClass = ko.computed(function () {
                        return (self.selectedCode != undefined);
                    });
                    self.listComponentOption = {
                        isShowAlreadySet: self.isAlreadySetting(),
                        isMultiSelect: self.isMultiSelect(),
                        listType: ListType.Classification,
                        selectType: self.selectedType(),
                        selectedCode: self.bySelectedCode,
                        isDialog: self.isDialog(),
                        isShowNoSelectRow: self.isShowNoSelectionItem(),
                        alreadySettingList: self.alreadySettingList,
                        maxRows: 12,
                    };
                    //subscribe
                    self.isAlreadySetting.subscribe(function () {
                        self.reloadComponent();
                    });
                    self.isDialog.subscribe(function (value) {
                        self.reloadComponent();
                    });
                    self.isShowNoSelectionItem.subscribe(function () {
                        self.reloadComponent();
                    });
                    self.selectedType.subscribe(function (data) {
                        switch (data) {
                            case 1:
                                if (self.isMultiSelect()) {
                                    self.listComponentOption.selectedCode = self.multiSelectedCode;
                                }
                                else {
                                    self.listComponentOption.selectedCode = self.bySelectedCode;
                                }
                                break;
                            case 2:
                                if (self.isMultiSelect()) {
                                    self.listComponentOption.selectedCode = self.multiSelectionCode;
                                }
                                else {
                                    self.selectedType(1);
                                    nts.uk.ui.dialog.alert("使用できません ! ");
                                    return;
                                }
                                break;
                            case 3:
                                if (self.isMultiSelect()) {
                                    self.listComponentOption.selectedCode = self.multiSelectionCode;
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
                                    self.listComponentOption.selectedCode = self.multiSelectionCode;
                                }
                                break;
                        }
                        self.reloadComponent();
                    });
                    self.selectedOption.subscribe(function (data) {
                        if (data == 0) {
                            self.isMultiSelect(false);
                        }
                        else {
                            self.isMultiSelect(true);
                        }
                    });
                    self.isMultiSelect.subscribe(function (data) {
                        if (data) {
                            if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                                self.listComponentOption.selectedCode = self.multiSelectedCode;
                            }
                            else {
                                self.listComponentOption.selectedCode = self.multiSelectionCode;
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
                    self.jsonData = ko.observable('');
                }
                ScreenModel.prototype.copy = function () {
                    // issue #84074
                    nts.uk.ui.dialog.info('複写時の処理については現状対象外となります。');
                };
                ScreenModel.prototype.save = function () {
                    var self = this;
                    if (self.listComponentOption.selectedCode() != undefined) {
                        if (self.listComponentOption.selectedCode().length < 1) {
                            nts.uk.ui.dialog.alert("保存する項目を選択してください!!! ");
                        }
                        else {
                            if (self.listComponentOption.isMultiSelect) {
                                self.listComponentOption.selectedCode().forEach(function (selected) {
                                    var existItem = self.alreadySettingList().filter(function (item) {
                                        return item.code == selected;
                                    })[0];
                                    if (!existItem) {
                                        self.alreadySettingList.push({ "code": selected, "isAlreadySetting": true });
                                    }
                                });
                            }
                            else {
                                var existItem = self.alreadySettingList().filter(function (item) {
                                    return item.code == self.listComponentOption.selectedCode();
                                })[0];
                                if (!existItem) {
                                    self.alreadySettingList.push({ "code": self.listComponentOption.selectedCode(), "isAlreadySetting": true });
                                }
                            }
                            self.isAlreadySetting(true);
                            nts.uk.ui.dialog.alert("完了しました! ");
                        }
                    }
                    else {
                        nts.uk.ui.dialog.alert("保存する項目を選択してください! ");
                    }
                };
                ScreenModel.prototype.remove = function () {
                    var self = this;
                    if (self.listComponentOption.selectedCode() != undefined) {
                        if (self.listComponentOption.selectedCode().length < 1) {
                            nts.uk.ui.dialog.alert("削除する項目を選択してください !!! ");
                        }
                        else {
                            if (self.listComponentOption.isMultiSelect) {
                                self.listComponentOption.selectedCode().forEach(function (selected) {
                                    self.alreadySettingList.remove(self.alreadySettingList().filter(function (item) {
                                        return item.code == selected;
                                    })[0]);
                                });
                            }
                            else {
                                self.alreadySettingList.remove(self.alreadySettingList().filter(function (item) {
                                    return item.code == self.listComponentOption.selectedCode();
                                })[0]);
                            }
                            self.isAlreadySetting(true);
                            nts.uk.ui.dialog.alert("削除しました ! ");
                        }
                    }
                    else {
                        nts.uk.ui.dialog.alert("削除する項目を選択してください ! ");
                    }
                };
                ScreenModel.prototype.getSelectedItemCode = function () {
                    var self = this;
                    if (self.isMultiSelect()) {
                        if (self.selectedType() == SelectType.SELECT_BY_SELECTED_CODE) {
                            return self.multiSelectedCode().join(', ');
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
                ScreenModel.prototype.reloadComponent = function () {
                    var self = this;
                    self.listComponentOption.isShowAlreadySet = self.isAlreadySetting();
                    self.listComponentOption.listType = ListType.Classification;
                    self.listComponentOption.isDialog = self.isDialog();
                    self.listComponentOption.isShowNoSelectRow = self.isShowNoSelectionItem();
                    self.listComponentOption.alreadySettingList = self.alreadySettingList;
                    self.listComponentOption.isMultiSelect = self.isMultiSelect();
                    self.listComponentOption.selectType = self.selectedType();
                    $('#classification-list-setting').ntsListComponent(self.listComponentOption);
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = kcp002.a || (kcp002.a = {}));
})(kcp002 || (kcp002 = {}));
//# sourceMappingURL=kcp002.a.vm.js.map