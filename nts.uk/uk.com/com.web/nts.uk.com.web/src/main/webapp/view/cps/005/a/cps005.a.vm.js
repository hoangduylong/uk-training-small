var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps005;
                (function (cps005) {
                    var a;
                    (function (a) {
                        var getText = nts.uk.resource.getText;
                        var confirm = nts.uk.ui.dialog.confirm;
                        var alertError = nts.uk.ui.dialog.alertError;
                        var info = nts.uk.ui.dialog.info;
                        var modal = nts.uk.ui.windows.sub.modal;
                        var setShared = nts.uk.ui.windows.setShared;
                        var textUK = nts.uk.text;
                        var block = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.isUpdate = false;
                                    var self = this, dataModel = new DataModel(null);
                                    self.currentData = ko.observable(dataModel);
                                    self.isEnableButtonProceedA = ko.observable(true);
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred();
                                    block.invisible();
                                    new a.service.Service().getAllPerInfoCtg().done(function (data) {
                                        self.isUpdate = false;
                                        self.currentData(new DataModel(data));
                                        if (data && data.categoryList && data.categoryList.length > 0) {
                                            self.isUpdate = true;
                                            self.currentData().perInfoCtgSelectCode(data.categoryList[0].id);
                                            self.currentData().isEnableButtonProceed(true);
                                        }
                                        else {
                                            self.register();
                                        }
                                        block.clear();
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        alertError({ messageId: res.messageId }).then(function () {
                                            nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                                        });
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.reloadData = function (newCtgName) {
                                    var self = this, dfd = $.Deferred();
                                    new a.service.Service().getAllPerInfoCtg().done(function (data) {
                                        self.isUpdate = false;
                                        if (data && data.categoryList && data.categoryList.length > 0) {
                                            self.currentData().categoryList(_.map(data.categoryList, function (item) { return new PerInfoCtgModel(item); }));
                                            self.isUpdate = true;
                                            self.currentData().isEnableButtonProceed(true);
                                            if (newCtgName) {
                                                var newCtg = _.find(data.categoryList, function (item) { return item.categoryName == newCtgName; });
                                                self.currentData().perInfoCtgSelectCode(newCtg ? newCtg.id : "");
                                            }
                                        }
                                        else {
                                            self.register();
                                        }
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    nts.uk.ui.errors.clearAll();
                                    self.currentData().perInfoCtgSelectCode("");
                                    self.currentData().currentCtgSelected(new PerInfoCtgModel(null));
                                    self.isUpdate = false;
                                    $("#category-name-control").focus();
                                    self.currentData().isEnableButtonProceed(true);
                                    self.currentData().isEnableButtonOpenDialog(false);
                                    self.currentData().isHisTypeUpdateModel(false);
                                };
                                ScreenModel.prototype.addUpdateData = function () {
                                    var self = this;
                                    if (!self.currentData().currentCtgSelected().perInfoCtgName()) {
                                        $("#category-name-control").focus();
                                        return;
                                    }
                                    block.invisible();
                                    if (self.isUpdate) {
                                        var updateCategory = new UpdatePerInfoCtgModel(self.currentData().currentCtgSelected());
                                        new a.service.Service().updatePerInfoCtg(updateCategory).done(function () {
                                            self.reloadData();
                                            info({ messageId: "Msg_15" }).then(function () {
                                                var ctrl = $("#category-name-control"), str = ctrl.val();
                                                ctrl.focus().val('').val(str);
                                                block.clear();
                                            });
                                        }).fail(function (res) {
                                            if (res.messageId == 'Msg_928') {
                                                alertError({
                                                    messageId: res.messageId,
                                                    messageParams: ["個人情報カテゴリ"]
                                                }).then(function () {
                                                    $("#category-name-control").focus();
                                                });
                                            }
                                            else {
                                                alertError({ messageId: res.messageId });
                                            }
                                            block.clear();
                                        });
                                    }
                                    else {
                                        var newCategory_1 = new AddPerInfoCtgModel(self.currentData().currentCtgSelected());
                                        new a.service.Service().addPerInfoCtg(newCategory_1).done(function () {
                                            self.reloadData(newCategory_1.categoryName);
                                            confirm({ messageId: "Msg_213" }).ifYes(function () {
                                                var params = {
                                                    categoryId: self.currentData().perInfoCtgSelectCode(),
                                                    currentCtg: ko.toJS(self.currentData().currentCtgSelected()),
                                                    isAdd: ko.toJS(self.currentData().currentCtgSelected().addItemObjCls())
                                                };
                                                setShared('CPS005_A', params);
                                                modal("/view/cps/005/b/index.xhtml").onClosed(function () {
                                                    var ctgCode = self.currentData().perInfoCtgSelectCode();
                                                    self.currentData().perInfoCtgSelectCode("");
                                                    self.currentData().perInfoCtgSelectCode(ctgCode);
                                                    var ctrl = $("#category-name-control"), str = ctrl.val();
                                                    ctrl.focus().val('').val(str);
                                                    block.clear();
                                                });
                                            }).ifNo(function () {
                                                var ctrl = $("#category-name-control"), str = ctrl.val();
                                                ctrl.focus().val('').val(str);
                                                block.clear();
                                            });
                                        }).fail(function (res) {
                                            if (res.messageId == 'Msg_928') {
                                                alertError({
                                                    messageId: res.messageId,
                                                    messageParams: ["個人情報カテゴリ"]
                                                }).then(function () {
                                                    $("#category-name-control").focus();
                                                });
                                            }
                                            else {
                                                alertError({ messageId: res.messageId });
                                            }
                                            block.clear();
                                        });
                                    }
                                };
                                ScreenModel.prototype.openDialogB = function () {
                                    var self = this, params = {
                                        categoryId: self.currentData().perInfoCtgSelectCode(),
                                        currentCtg: ko.toJS(self.currentData().currentCtgSelected()),
                                        isAdd: ko.toJS(self.currentData().currentCtgSelected().addItemObjCls())
                                    };
                                    if (nts.uk.text.isNullOrEmpty(params.categoryId)) {
                                        return;
                                    }
                                    block.invisible();
                                    setShared('CPS005_A', params);
                                    modal("/view/cps/005/b/index.xhtml").onClosed(function () {
                                        var ctgCode = self.currentData().perInfoCtgSelectCode();
                                        self.currentData().perInfoCtgSelectCode("");
                                        self.currentData().perInfoCtgSelectCode(ctgCode);
                                        block.clear();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                        var DataModel = /** @class */ (function () {
                            function DataModel(data) {
                                this.categoryList = ko.observableArray([]);
                                this.perInfoCtgSelectCode = ko.observable("");
                                this.currentCtgSelected = ko.observable(new PerInfoCtgModel(null));
                                this.isEnableButtonProceed = ko.observable(true);
                                this.isEnableButtonOpenDialog = ko.observable(false);
                                this.isHisTypeUpdateModel = ko.observable(false);
                                this.rowCategoryItems = Math.round((window.screen.height - 391) / 23) >= 20 ? 20 : Math.round((window.screen.height - 391) / 23);
                                this.historyClassification = [
                                    { code: 1, name: getText("CPS005_53") },
                                    { code: 2, name: getText("CPS005_54") },
                                ];
                                //<!-- mapping CategoryType enum value = 3 or 4 or 5 . But using enum HistoryType to display -->
                                this.historyTypes = new Array();
                                //mapping CategoryType enum value = 1 or 2. Theo thiết kế không lấy từ enum CategoryType
                                this.singleMultipleType = [
                                    { value: 1, name: getText("CPS005_55") },
                                    { value: 2, name: getText("CPS005_56") },
                                ];
                                var self = this;
                                self.rowCategoryItems = self.rowCategoryItems - 1;
                                if (data) {
                                    self.categoryList(_.map(data.categoryList, function (item) { return new PerInfoCtgModel(item); }));
                                    self.historyTypes = data.historyTypes ? data.historyTypes.splice(0, 3) : [];
                                }
                                //subscribe select category code
                                self.perInfoCtgSelectCode.subscribe(function (newId) {
                                    if (textUK.isNullOrEmpty(newId))
                                        return;
                                    nts.uk.ui.errors.clearAll();
                                    var vm = __viewContext['screenModel'];
                                    vm.isUpdate = true;
                                    new a.service.Service().getPerInfoCtgWithItemsName(newId).done(function (data) {
                                        self.currentCtgSelected(new PerInfoCtgModel(data));
                                        nts.uk.ui.errors.clearAll();
                                        self.isHisTypeUpdateModel(true);
                                        self.isEnableButtonProceed(true);
                                        self.isEnableButtonOpenDialog(true);
                                        if (self.currentCtgSelected().fixedIsSelected()) {
                                            self.isEnableButtonProceed(false);
                                        }
                                        var ctrl = $("#category-name-control"), str = ctrl.val();
                                        if ($('input.ntsSearchBox.nts-editor.ntsSearchBox_Component:focus').length == 0) {
                                            ctrl.focus().val('').val(str);
                                        }
                                    });
                                });
                            }
                            return DataModel;
                        }());
                        a.DataModel = DataModel;
                        var PerInfoCtgModel = /** @class */ (function () {
                            function PerInfoCtgModel(data) {
                                this.id = "";
                                this.categoryName = "";
                                this.perInfoCtgName = ko.observable("");
                                this.historyFixedName = "";
                                this.categoryType = 1;
                                this.categoryTypeName = "";
                                this.historyClassSelected = ko.observable(1);
                                this.historyClassSelectedText = ko.observable("");
                                // historyTypesSelected and singleMulTypeSelected == categoryType
                                this.historyTypesSelected = ko.observable(1);
                                this.singleMulTypeSelected = ko.observable(1);
                                this.itemNameList = ko.observableArray([]);
                                //all visiable
                                this.historyTypesDisplay = ko.observable(true);
                                this.fixedIsSelected = ko.observable(false);
                                this.isChangeAbleCtgType = ko.observable(true);
                                this.initValMasterObjCls = ko.observable(true);
                                this.addItemObjCls = ko.observable(true);
                                var self = this;
                                if (data) {
                                    self.id = data.id || "";
                                    self.categoryName = data.categoryName || "";
                                    self.perInfoCtgName(data.categoryName || "");
                                    self.itemNameList(_.map(data.itemNameList, function (item) { return new PerInfoItemModel(item); }));
                                    self.historyFixedName = (data.categoryType == 1 || data.categoryType == 2) ? getText("CPS005_54") : getText("CPS005_53");
                                    self.categoryType = data.categoryType;
                                    self.personEmployeeType = data.personEmployeeType;
                                    self.initValMasterObjCls(data.initValMasterObjCls);
                                    self.addItemObjCls(data.addItemObjCls);
                                    switch (self.categoryType) {
                                        case 1:
                                            self.categoryTypeName = getText("CPS005_55");
                                            break;
                                        case 2:
                                            self.categoryTypeName = getText("CPS005_56");
                                            break;
                                        case 3:
                                            self.categoryTypeName = getText("Enum_HistoryTypes_CONTINUOUS");
                                            break;
                                        case 4:
                                            self.categoryTypeName = getText("Enum_HistoryTypes_NO_DUPLICATE");
                                            break;
                                        case 5:
                                            self.categoryTypeName = getText("Enum_HistoryTypes_DUPLICATE");
                                            break;
                                        case 6:
                                            self.categoryTypeName = getText("Enum_HistoryTypes_CONTINUOUS");
                                            break;
                                    }
                                    self.historyClassSelected((data.categoryType == 1 || data.categoryType == 2) ? 2 : 1);
                                    self.singleMulTypeSelected(data.categoryType || 1);
                                    self.historyTypesDisplay(false);
                                    if (self.historyClassSelected() == 1) {
                                        self.historyTypesSelected(data.categoryType - 2);
                                        self.singleMulTypeSelected(1);
                                        self.historyTypesDisplay(true);
                                        self.historyClassSelectedText(getText("CPS005_53"));
                                    }
                                    else {
                                        self.historyClassSelectedText(getText("CPS005_54"));
                                    }
                                    self.fixedIsSelected(data.isFixed == 1 ? true : false);
                                    self.isChangeAbleCtgType(data.changeAbleCtgType);
                                }
                                //subscribe select history type (1: history, 2: not history)
                                self.historyClassSelected.subscribe(function (newHisClassification) {
                                    if (textUK.isNullOrEmpty(newHisClassification))
                                        return;
                                    self.historyTypesDisplay(false);
                                    if (newHisClassification == 1) {
                                        self.historyTypesDisplay(true);
                                    }
                                });
                            }
                            return PerInfoCtgModel;
                        }());
                        a.PerInfoCtgModel = PerInfoCtgModel;
                        var PerInfoItemModel = /** @class */ (function () {
                            function PerInfoItemModel(itemName) {
                                var self = this;
                                self.itemName = itemName;
                            }
                            return PerInfoItemModel;
                        }());
                        a.PerInfoItemModel = PerInfoItemModel;
                        var AddPerInfoCtgModel = /** @class */ (function () {
                            function AddPerInfoCtgModel(data) {
                                var self = this;
                                self.categoryName = data.perInfoCtgName();
                                if (data.historyClassSelected() == 2) {
                                    self.categoryType = data.singleMulTypeSelected();
                                }
                                else {
                                    self.categoryType = data.historyTypesSelected() + 2;
                                }
                            }
                            return AddPerInfoCtgModel;
                        }());
                        a.AddPerInfoCtgModel = AddPerInfoCtgModel;
                        var UpdatePerInfoCtgModel = /** @class */ (function () {
                            function UpdatePerInfoCtgModel(data) {
                                var self = this;
                                self.id = data.id;
                                self.categoryName = data.perInfoCtgName();
                                if (data.historyClassSelected() == 2) {
                                    self.categoryType = data.singleMulTypeSelected();
                                }
                                else {
                                    self.categoryType = data.historyTypesSelected() + 2;
                                }
                            }
                            return UpdatePerInfoCtgModel;
                        }());
                        a.UpdatePerInfoCtgModel = UpdatePerInfoCtgModel;
                    })(a = cps005.a || (cps005.a = {}));
                })(cps005 = view.cps005 || (view.cps005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps005.a.vm.js.map