var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm001;
                (function (cmm001) {
                    var e;
                    (function (e) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.switchOptions = ko.observableArray([{ copyMethod: '0', text: nts.uk.resource.getText('CMM001_70') }, { copyMethod: '1', text: nts.uk.resource.getText('CMM001_71') }, { copyMethod: '2', text: nts.uk.resource.getText('CMM001_72') }]);
                                    self.isCheckedAll = ko.observable(false);
                                    self.isCheckedAll.subscribe(function (value) {
                                        ko.utils.arrayForEach(self.dataSource(), function (item) {
                                            item.flag(value);
                                        });
                                    });
                                    self.switchHeader = ko.observable(0);
                                    self.switchHeader.subscribe(function (value) {
                                        var listItems = self.dataSource();
                                        if (self.selectedCopyItems().length == 0) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_1433" });
                                            return;
                                        }
                                        ko.utils.arrayForEach(listItems, function (item) {
                                            if (item.flag()) {
                                                item.copyMethod(value);
                                            }
                                        });
                                    });
                                    self.dataSource = ko.observableArray([]);
                                    self.selectedCopyItems = ko.observableArray([]);
                                    self.selectedCopyItems = ko.computed(function () {
                                        return self.dataSource().filter(function (item) {
                                            if (item.flag() === true) {
                                                if (item.copyMethod() != self.switchHeader())
                                                    item.copyMethod(self.switchHeader());
                                                return item;
                                            }
                                        });
                                    });
                                    self.comName = nts.uk.text.format(nts.uk.resource.getText('CMM001_75'), nts.uk.ui.windows.getShared('companyName'));
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var cid = nts.uk.ui.windows.getShared('companyId');
                                    e.service.getAllMasterCopyCategory().then(function (masterCopyCateList) {
                                        var copyItemList;
                                        copyItemList = [];
                                        var preSystemType = '';
                                        var itemData;
                                        var nextItem;
                                        if (masterCopyCateList != null) {
                                            for (var _i = 0, masterCopyCateList_1 = masterCopyCateList; _i < masterCopyCateList_1.length; _i++) {
                                                itemData = masterCopyCateList_1[_i];
                                                if (itemData.systemType === preSystemType) {
                                                    copyItemList.push(new model.CopyItem(self.getSystemType(itemData.systemType), itemData.masterCopyId, itemData.masterCopyCategory, itemData.order, true));
                                                }
                                                else {
                                                    copyItemList.push(new model.CopyItem(self.getSystemType(itemData.systemType), itemData.masterCopyId, itemData.masterCopyCategory, itemData.order, false));
                                                }
                                                preSystemType = itemData.systemType;
                                            }
                                        }
                                        self.dataSource(copyItemList);
                                        $("#copy-method-header").focus();
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.getSystemType = function (systemTypeVal) {
                                    var systemType;
                                    switch (systemTypeVal) {
                                        case 0:
                                            systemType = '共通';
                                            break;
                                        case 1:
                                            systemType = '就業';
                                            break;
                                        case 2:
                                            systemType = '給与';
                                            break;
                                        case 3:
                                            systemType = '人事';
                                            break;
                                    }
                                    return systemType;
                                };
                                ScreenModel.prototype.openFDialog = function () {
                                    var self = this;
                                    var selectedItems;
                                    var companyName = nts.uk.ui.windows.getShared('companyName');
                                    selectedItems = self.selectedCopyItems();
                                    if (selectedItems.length == 0) {
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_1145" });
                                    }
                                    else {
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_1162", messageParams: [companyName] }).ifYes(function () {
                                            var cid = nts.uk.ui.windows.getShared('companyId');
                                            var IMasterDataList = [];
                                            var copyMethod;
                                            var item;
                                            for (var i = 0; i < selectedItems.length; i++) {
                                                item = selectedItems[i];
                                                copyMethod = item.copyMethod();
                                                var IMasterCopyCategoryDto = { masterCopyId: item.masterCopyId, categoryName: item.masterCopyCategory, order: item.order, systemType: item.systemType, copyMethod: copyMethod };
                                                IMasterDataList.push(IMasterCopyCategoryDto);
                                            }
                                            var masterCopyDataCmd = { companyId: cid, masterDataList: IMasterDataList };
                                            nts.uk.ui.windows.setShared('masterCopyDataCmd', masterCopyDataCmd);
                                            nts.uk.ui.windows.sub.modal('/view/cmm/001/f/index.xhtml', { title: '', }).onClosed(function () {
                                            });
                                        });
                                    }
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                        var model;
                        (function (model) {
                            // master copy category model
                            var MasterCopyCategory = /** @class */ (function () {
                                function MasterCopyCategory(systemType, masterCopyId, masterCopyCategory, order) {
                                    this.systemType = systemType;
                                    this.masterCopyId = masterCopyId;
                                    this.masterCopyCategory = masterCopyCategory;
                                    this.order = order;
                                }
                                return MasterCopyCategory;
                            }());
                            model.MasterCopyCategory = MasterCopyCategory;
                            // row model
                            var CopyItem = /** @class */ (function () {
                                function CopyItem(systemType, masterCopyId, masterCopyCategory, order, isBorder) {
                                    this.flag = ko.observable(false);
                                    this.copyMethod = ko.observable(0);
                                    this.systemType = systemType;
                                    this.masterCopyId = masterCopyId;
                                    this.masterCopyCategory = masterCopyCategory;
                                    this.order = order;
                                    this.isBorder = isBorder;
                                }
                                return CopyItem;
                            }());
                            model.CopyItem = CopyItem;
                        })(model = e.model || (e.model = {}));
                    })(e = cmm001.e || (cmm001.e = {}));
                })(cmm001 = view.cmm001 || (view.cmm001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm001.e.vm.js.map