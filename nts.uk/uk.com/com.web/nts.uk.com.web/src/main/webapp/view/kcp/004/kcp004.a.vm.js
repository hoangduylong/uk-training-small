var kcp004;
(function (kcp004) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var StartMode = kcp.share.tree.StartMode;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    // Control common
                    self.isMultipleUse = ko.observable(false);
                    self.listTreeType = ko.observableArray([
                        { code: 0, name: 'Single tree select grid' },
                        { code: 1, name: 'Multiple tree select grid' }
                    ]);
                    self.selectedTreeType = ko.observable(1);
                    self.isMultipleTreeGrid = ko.computed(function () {
                        return self.selectedTreeType() == 1;
                    });
                    self.isDialog = ko.observable(false);
                    self.isShowAlreadySet = ko.observable(true);
                    self.restrictionOfReferenceRange = ko.observable(true);
                    self.isShowSelectButton = ko.observable(true);
                    self.enableShowSelectButton = ko.computed(function () {
                        return self.isMultipleTreeGrid();
                    });
                    // Control component
                    self.baseDate = ko.observable(new Date());
                    self.selectedWorkplaceId = ko.observable('');
                    self.multiSelectedWorkplaceId = ko.observableArray([]);
                    self.enable = ko.observable(true);
                    self.listSelectionType = ko.observableArray([
                        { code: 1, name: 'Select by selected code', enable: self.enable },
                        { code: 2, name: 'Select all', enable: self.isMultipleTreeGrid },
                        { code: 3, name: 'Select first item', enable: self.enable },
                        { code: 4, name: 'No select', enable: self.enable }
                    ]);
                    self.selectedSelectionType = ko.observable(3);
                    self.listStartMode = ko.observableArray([
                        { code: StartMode.WORKPLACE, name: 'Workplace' },
                        { code: StartMode.DEPARTMENT, name: 'Department' }
                    ]);
                    self.selectedStartMode = ko.observable(StartMode.WORKPLACE);
                    self.listSystemType = ko.observableArray([
                        { code: 1, name: '個人情報', enable: self.enable },
                        { code: 2, name: '就業', enable: self.enable },
                        { code: 3, name: '給与', enable: self.enable },
                        { code: 4, name: '人事', enable: self.enable },
                        { code: 5, name: '管理者', enable: self.enable }
                    ]);
                    self.selectedSystemType = ko.observable(5);
                    self.alreadySettingList = ko.observableArray([]);
                    self.treeGrid = {
                        isShowAlreadySet: self.isShowAlreadySet(),
                        isMultipleUse: self.isMultipleUse(),
                        isMultiSelect: self.isMultipleTreeGrid(),
                        startMode: self.selectedStartMode(),
                        selectedId: self.getSelectedWorkplaceId(),
                        baseDate: self.baseDate,
                        selectType: self.selectedSelectionType(),
                        isShowSelectButton: self.isShowSelectButton(),
                        isDialog: self.isDialog(),
                        alreadySettingList: self.alreadySettingList,
                        systemType: self.selectedSystemType(),
                        restrictionOfReferenceRange: self.restrictionOfReferenceRange()
                    };
                    self.jsonData = ko.observable('');
                    self.rowSelected = ko.observable(new RowSelection('', ''));
                    self.isBindingTreeGrid = ko.observable(false);
                    // Subscribe
                    self.isMultipleUse.subscribe(function (code) {
                        self.resetSelectedWorkplace();
                        self.reloadTreeGrid().done(function () {
                            self.getSelectedData();
                        });
                    });
                    self.selectedTreeType.subscribe(function (code) {
                        // single tree grid
                        if (code == 0 && self.selectedSelectionType() == 2) {
                            self.selectedSelectionType(1);
                        }
                        self.resetSelectedWorkplace();
                        self.reloadTreeGrid().done(function () {
                            self.getSelectedData();
                        });
                    });
                    self.selectedStartMode.subscribe(function (code) {
                        self.reloadTreeGrid().done(function () {
                            self.getSelectedData();
                        });
                    });
                    self.isDialog.subscribe(function (value) {
                        self.reloadTreeGrid();
                    });
                    self.isShowAlreadySet.subscribe(function () {
                        self.reloadTreeGrid();
                    });
                    self.restrictionOfReferenceRange.subscribe(function () { return self.reloadTreeGrid(); });
                    //            self.alreadySettingList.subscribe(function() {
                    //                self.reloadTreeGrid();
                    //            });
                    self.isShowSelectButton.subscribe(function () {
                        self.reloadTreeGrid();
                    });
                    self.selectedSelectionType.subscribe(function (code) {
                        if (code == 1) {
                            self.selectedWorkplaceId();
                            self.multiSelectedWorkplaceId();
                        }
                        if (code == 4) {
                            self.resetSelectedWorkplace();
                        }
                        self.reloadTreeGrid().done(function () {
                            self.getSelectedData();
                        });
                    });
                    self.selectedSystemType.subscribe(function (code) {
                        // check in case NoSelect button active
                        if (self.selectedSelectionType() == 4) {
                            self.resetSelectedWorkplace();
                        }
                        self.reloadTreeGrid().done(function () {
                            self.getSelectedData();
                        });
                    });
                    self.selectedWorkplaceId.subscribe(function () {
                        self.getSelectedData();
                    });
                    self.multiSelectedWorkplaceId.subscribe(function () {
                        self.getSelectedData();
                    });
                }
                ScreenModel.prototype.copy = function () {
                    // issue #84074
                    nts.uk.ui.dialog.info('複写時の処理については現状対象外となります。');
                };
                ScreenModel.prototype.register = function () {
                    var self = this;
                    if (self.isMultipleTreeGrid()) {
                        for (var _i = 0, _a = self.multiSelectedWorkplaceId(); _i < _a.length; _i++) {
                            var workplaceId = _a[_i];
                            self.alreadySettingList.push({ workplaceId: workplaceId, isAlreadySetting: true });
                        }
                    }
                    else {
                        self.alreadySettingList.push({ workplaceId: self.selectedWorkplaceId(), isAlreadySetting: true });
                    }
                };
                ScreenModel.prototype.remove = function () {
                    var self = this;
                    var data = $('#tree-grid').getRowSelected();
                    var selecetdWorkplaceId = data.map(function (item) { return item.workplaceId; }).join(", ");
                    // remove setting by delete element in list.
                    self.alreadySettingList(self.alreadySettingList().filter(function (item) {
                        return selecetdWorkplaceId.indexOf(item.workplaceId) < 0;
                    }));
                    // remove setting by update alreadySetting = false;
                    //            self.alreadySettingList().forEach((item) => {
                    //                if (selecetdWorkplaceId.indexOf(item.workplaceId) > -1) {
                    //                    item.isAlreadySetting = false;
                    //                }
                    //            });
                    //            self.alreadySettingList.valueHasMutated();
                };
                ScreenModel.prototype.getSelectedWorkplaceId = function () {
                    var self = this;
                    if (self.isMultipleTreeGrid()) {
                        return self.multiSelectedWorkplaceId;
                    }
                    return self.selectedWorkplaceId;
                };
                ScreenModel.prototype.getSelectedData = function () {
                    var self = this;
                    if (!self.isBindingTreeGrid()) {
                        return;
                    }
                    var data = $('#tree-grid').getRowSelected();
                    self.rowSelected().workplaceId(data.length > 0 ? data.map(function (item) { return item.id; }).join(", ") : '');
                    self.rowSelected().workplaceCode(data.length > 0 ? data.map(function (item) { return item.code; }).join(", ") : '');
                };
                ScreenModel.prototype.setTreeData = function () {
                    var self = this;
                    self.treeGrid = {
                        isShowAlreadySet: self.isShowAlreadySet(),
                        isMultipleUse: self.isMultipleUse(),
                        isMultiSelect: self.isMultipleTreeGrid(),
                        startMode: self.selectedStartMode(),
                        selectedId: self.getSelectedWorkplaceId(),
                        baseDate: self.baseDate,
                        selectType: self.selectedSelectionType(),
                        isShowSelectButton: self.isShowSelectButton(),
                        isDialog: self.isDialog(),
                        alreadySettingList: self.alreadySettingList,
                        systemType: self.selectedSystemType(),
                        restrictionOfReferenceRange: self.restrictionOfReferenceRange()
                    };
                };
                ScreenModel.prototype.reloadTreeGrid = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    self.setTreeData();
                    $('#tree-grid').ntsTreeComponent(self.treeGrid).done(function () {
                        $('#tree-grid').focusTreeGridComponent();
                        dfd.resolve();
                    });
                    return dfd.promise();
                };
                ScreenModel.prototype.resetSelectedWorkplace = function () {
                    var self = this;
                    self.selectedWorkplaceId('');
                    self.multiSelectedWorkplaceId([]);
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            /**
             * Class Row Selection
             */
            var RowSelection = /** @class */ (function () {
                function RowSelection(workplaceId, workplaceCode) {
                    var self = this;
                    self.workplaceId = ko.observable(workplaceId);
                    self.workplaceCode = ko.observable(workplaceCode);
                }
                return RowSelection;
            }());
            viewmodel.RowSelection = RowSelection;
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = kcp004.a || (kcp004.a = {}));
})(kcp004 || (kcp004 = {}));
//# sourceMappingURL=kcp004.a.vm.js.map