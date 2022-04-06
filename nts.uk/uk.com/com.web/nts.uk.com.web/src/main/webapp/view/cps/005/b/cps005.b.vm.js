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
                    var b;
                    (function (b) {
                        var getText = nts.uk.resource.getText;
                        var confirm = nts.uk.ui.dialog.confirm;
                        var info = nts.uk.ui.dialog.info;
                        var alertError = nts.uk.ui.dialog.alertError;
                        var textUK = nts.uk.text;
                        var block = nts.uk.ui.block;
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var modal = nts.uk.ui.windows.sub.modal;
                        var writeConstraint = window['nts']['uk']['ui']['validation']['writeConstraint'];
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.isUpdate = false;
                                    this.currentCtg = getShared("CPS005_A");
                                    var self = this, dataItemModel = new ItemDataModel(null);
                                    self.currentItemData = ko.observable(dataItemModel);
                                    self.isEnableButtonProceed = ko.observable(true);
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred();
                                    block.invisible();
                                    b.service.getAllPerInfoItemDefByCtgId(self.currentCtg.categoryId, self.currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                        self.currentItemData(new ItemDataModel(data));
                                        if (data && data.personInfoItemList && data.personInfoItemList.length > 0) {
                                            self.currentItemData().perInfoItemSelectCode(data.personInfoItemList ? data.personInfoItemList[0].id : "");
                                            self.isUpdate = true;
                                            self.currentItemData().isEnableButtonProceed(true);
                                        }
                                        else {
                                            self.register();
                                        }
                                        block.clear();
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.reloadData = function () {
                                    var self = this, isUpdate = self.isUpdate;
                                    dfd = $.Deferred();
                                    self.currentItemData().personInfoItemList([]);
                                    self.currentItemData().selectionItemLst([]);
                                    b.service.getAllPerInfoItemDefByCtgId(self.currentCtg.categoryId, self.currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                        if (data && data.personInfoItemList && data.personInfoItemList.length > 0) {
                                            self.currentItemData().personInfoItemList(_.map(data.personInfoItemList, function (item) { return new PersonInfoItemShowListModel(item); }));
                                            self.currentItemData().selectionItemLst(data.selectionItemLst);
                                            // resset lai selectiuon Item List
                                            self.isUpdate = isUpdate;
                                            self.currentItemData().isEnableButtonProceed(true);
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
                                    self.currentItemData().perInfoItemSelectCode("");
                                    self.currentItemData().currentItemSelected(new PersonInfoItem(null));
                                    self.isUpdate = false;
                                    $("#item-name-control").focus();
                                    self.currentItemData().isEnableButtonProceed(true);
                                    self.currentItemData().isEnableButtonDelete(false);
                                };
                                ScreenModel.prototype.addUpdateData = function () {
                                    $("#item-name-control").trigger("validate");
                                    if (this.currentItemData().currentItemSelected().dataType() === 2) {
                                        $("#integerPart").trigger("validate");
                                    }
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var self = this, newItemDef;
                                    newItemDef = new UpdateItemModel(self.currentItemData().currentItemSelected());
                                    if (self.checkRequired(newItemDef)) {
                                        return;
                                    }
                                    ;
                                    block.invisible();
                                    if (self.isUpdate == true) {
                                        newItemDef.perInfoCtgId = self.currentCtg.categoryId;
                                        if (newItemDef.singleItem.decimalPart === null) {
                                            newItemDef.singleItem.decimalPart = 0;
                                        }
                                        b.service.updateItemDef(newItemDef).done(function (data) {
                                            if (data) {
                                                info({ messageId: data }).then(function () {
                                                    self.reloadData();
                                                    self.currentItemData().perInfoItemSelectCode(newItemDef.perInfoItemDefId);
                                                    self.currentItemData().perInfoItemSelectCode.valueHasMutated();
                                                    block.clear();
                                                });
                                            }
                                            else {
                                                info({ messageId: "Msg_15" }).then(function () {
                                                    self.reloadData();
                                                    self.currentItemData().perInfoItemSelectCode(newItemDef.perInfoItemDefId);
                                                    self.currentItemData().perInfoItemSelectCode.valueHasMutated();
                                                    block.clear();
                                                });
                                            }
                                        }).fail(function (error) {
                                            if (error.messageId == 'Msg_928') {
                                                alertError({
                                                    messageId: error.messageId,
                                                    messageParams: ["項目"]
                                                }).then(function () {
                                                    $('#item-name-control').focus();
                                                });
                                            }
                                            else {
                                                alertError({ messageId: error.messageId }).then(function () {
                                                });
                                            }
                                            block.clear();
                                        });
                                    }
                                    else {
                                        newItemDef = new AddItemModel(self.currentItemData().currentItemSelected());
                                        newItemDef.perInfoCtgId = self.currentCtg.categoryId;
                                        if (newItemDef.singleItem.decimalPart === null) {
                                            newItemDef.singleItem.decimalPart = 0;
                                        }
                                        b.service.addItemDef(newItemDef).done(function (data) {
                                            info({ messageId: "Msg_15" }).then(function () {
                                                self.reloadData().done(function () {
                                                    self.currentItemData().perInfoItemSelectCode(data);
                                                    //  self.selectionItemId(params.selectionItemId);
                                                });
                                                block.clear();
                                            });
                                        }).fail(function (error) {
                                            if (error.messageId == 'Msg_928') {
                                                alertError({
                                                    messageId: error.messageId,
                                                    messageParams: ["項目"]
                                                }).then(function () {
                                                    $('#item-name-control').focus();
                                                });
                                            }
                                            else {
                                                alertError({ messageId: error.messageId });
                                            }
                                            block.clear();
                                        });
                                    }
                                };
                                ScreenModel.prototype.removeData = function () {
                                    var self = this, removeModel = new RemoveItemModel(self.currentItemData().perInfoItemSelectCode());
                                    block.invisible();
                                    if (!self.currentItemData().perInfoItemSelectCode())
                                        return;
                                    var indexItemDelete = _.findIndex(self.currentItemData().personInfoItemList(), function (item) { return item.id == removeModel.perInfoItemDefId; });
                                    confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        b.service.removeItemDef(removeModel).done(function (data) {
                                            if (data) {
                                                info({ messageId: data }).then(function () { block.clear(); });
                                                block.clear();
                                                return;
                                            }
                                            info({ messageId: "Msg_16" }).then(function () {
                                                self.reloadData().done(function () {
                                                    var itemListLength = self.currentItemData().personInfoItemList().length;
                                                    if (itemListLength === 0) {
                                                        self.register();
                                                        block.clear();
                                                        return;
                                                    }
                                                    if (itemListLength - 1 >= indexItemDelete) {
                                                        self.currentItemData().perInfoItemSelectCode(self.currentItemData().personInfoItemList()[indexItemDelete].id);
                                                        block.clear();
                                                        return;
                                                    }
                                                    if (itemListLength - 1 < indexItemDelete) {
                                                        self.currentItemData().perInfoItemSelectCode(self.currentItemData().personInfoItemList()[itemListLength - 1].id);
                                                        block.clear();
                                                        return;
                                                    }
                                                });
                                            });
                                        }).fail(function (error) {
                                            alertError({ messageId: error.messageId });
                                            block.clear();
                                        });
                                    }).ifNo(function () {
                                        block.clear();
                                        return;
                                    });
                                };
                                ScreenModel.prototype.closedDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.checkRequired = function (newItemDef) {
                                    if (newItemDef.itemName == "") {
                                        $("#item-name-control").focus();
                                        return true;
                                    }
                                    if (newItemDef.singleItem.dataType === 1) {
                                        if (newItemDef.singleItem.stringItemLength === null) {
                                            $("#stringItemLength").focus();
                                            return true;
                                        }
                                    }
                                    if (newItemDef.singleItem.dataType === 2) {
                                        if (newItemDef.singleItem.integerPart === null) {
                                            $("#integerPart").focus();
                                            return true;
                                        }
                                    }
                                    if (newItemDef.singleItem.dataType === 4) {
                                        if (newItemDef.singleItem.timeItemMin === null) {
                                            $('#timeItemMin').ntsError('check');
                                            $("#timeItemMin").focus();
                                            return true;
                                        }
                                        else if (newItemDef.singleItem.timeItemMax === null) {
                                            $('#timeItemMax').ntsError('check');
                                            $("#timeItemMax").focus();
                                            block.clear();
                                            return true;
                                        }
                                        else if (newItemDef.singleItem.timeItemMin > newItemDef.singleItem.timeItemMax) {
                                            $('#timeItemMin').ntsError('set', { messageId: "Msg_1399" });
                                            return true;
                                        }
                                    }
                                    if (newItemDef.singleItem.dataType === 5) {
                                        if (newItemDef.singleItem.timePointItemMin === undefined) {
                                            $('#timePointItemMin').ntsError('check');
                                            $("#timePointItemMin").focus();
                                            return true;
                                        }
                                        else if (newItemDef.singleItem.timePointItemMax === undefined) {
                                            $('#timePointItemMax').ntsError('check');
                                            $("#timePointItemMax").focus();
                                            return true;
                                        }
                                        else if (newItemDef.singleItem.timePointItemMin > newItemDef.singleItem.timePointItemMax) {
                                            $('#timePointItemMin').ntsError('set', { messageId: "Msg_1399" });
                                            return true;
                                        }
                                    }
                                    return false;
                                };
                                ScreenModel.prototype.genTextTime = function (time) {
                                    if (time == 0) {
                                        return "0:00";
                                    }
                                    return nts.uk.time.parseTime(time(), true).format();
                                };
                                ScreenModel.prototype.isNotsetOrnull = function (value) {
                                    return value() == 0 || !value();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                        var ItemDataModel = /** @class */ (function () {
                            function ItemDataModel(params) {
                                this.personInfoItemList = ko.observableArray([]);
                                this.perInfoItemSelectCode = ko.observable("");
                                this.currentItemSelected = ko.observable(new PersonInfoItem(null));
                                this.isEnableButtonProceed = ko.observable(true);
                                this.isEnableButtonDelete = ko.observable(true);
                                this.dataTypeEnum = new Array();
                                this.dataTypeEnumFilter = new Array();
                                //Enum : dataTypeEnum is selected value 1 - 文字列(String)
                                this.stringItemTypeEnum = new Array();
                                this.stringItemTypeEnumFilter = new Array();
                                this.stringItemDataTypeEnum = new Array();
                                //Enum : dataTypeEnum is selected value 2 - 数値(Numeric)
                                this.numericItemAmountAtrEnum = [
                                    { code: 1, name: getText("CPS005_50") },
                                    { code: 0, name: getText("CPS005_51") },
                                ];
                                this.numericItemMinusAtrEnum = [
                                    { code: 1, name: getText("CPS005_46") },
                                    { code: 0, name: getText("CPS005_47") },
                                ];
                                //Enum : dataTypeEnum is selected value 3 -日付(Date)
                                this.dateItemTypeEnum = new Array();
                                //Enum : dataTypeEnum is selected value 6 -選択(Selection)
                                this.selectionItemLst = ko.observableArray([]);
                                this.selectionItemId = ko.observable("");
                                this.selectionLst = ko.observableArray([]);
                                this.selectionId = ko.observable("");
                                var self = this;
                                if (params) {
                                    var personEmployeeType = __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType, dataTypeEnumArray_1 = (personEmployeeType == 2) ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
                                    self.personInfoItemList(_.map(params.personInfoItemList, function (item) { return new PersonInfoItemShowListModel(item); }));
                                    self.dataTypeEnum = params.dataTypeEnum || new Array();
                                    self.dataTypeEnumFilter = _.filter(params.dataTypeEnum, function (c) {
                                        return dataTypeEnumArray_1.indexOf(c.value) > -1;
                                    });
                                    self.stringItemTypeEnum = params.stringItemTypeEnum || new Array();
                                    self.stringItemTypeEnumFilter = _.filter(params.stringItemTypeEnum, function (c) {
                                        return [1, 2, 3, 4, 5].indexOf(c.value) > -1;
                                    });
                                    self.stringItemDataTypeEnum = params.stringItemDataTypeEnum || new Array();
                                    self.stringItemDataTypeEnum.reverse();
                                    self.dateItemTypeEnum = params.dateItemTypeEnum || new Array();
                                    self.selectionItemLst(params.selectionItemLst || []);
                                    self.selectionId("");
                                    self.selectionLst([]);
                                    //subscribe select category code
                                    self.perInfoItemSelectCode.subscribe(function (newItemId) {
                                        nts.uk.ui.errors.clearAll();
                                        if (textUK.isNullOrEmpty(newItemId))
                                            return;
                                        block.invisible();
                                        b.service.getPerInfoItemDefById(newItemId, __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                            nts.uk.ui.errors.clearAll();
                                            self.currentItemSelected(new PersonInfoItem(data));
                                            self.isEnableButtonProceed(true);
                                            self.isEnableButtonDelete(true);
                                            __viewContext['screenModelB'].isUpdate = true;
                                            if (self.currentItemSelected().fixedAtr() == 1) {
                                                self.currentItemSelected().selectionItem().selectionItemName(data.selectionItemName);
                                                self.isEnableButtonProceed(false);
                                                self.isEnableButtonDelete(false);
                                            }
                                            if (data.itemTypeState.dataTypeState !== undefined
                                                && data.itemTypeState.dataTypeState.dataTypeValue === 6
                                                && data.itemTypeState.dataTypeState.referenceType === "CODE_NAME") {
                                                self.currentItemSelected().selectionItem().selectionItemId(data.itemTypeState.dataTypeState.typeCode || undefined);
                                            }
                                            if (self.currentItemSelected().fixedAtr() == 1) {
                                                self.currentItemSelected().stringItem().stringItemTypeText(_.find(self.stringItemTypeEnum, function (o) { return o.value == self.currentItemSelected().stringItem().stringItemTypeFixed(); }).localizedName);
                                                if ([DataTypeValue.SELECTION_RADIO, DataTypeValue.SELECTION_BUTTON].indexOf(self.currentItemSelected().dataTypeFixed()) > -1) {
                                                    self.currentItemSelected().dataTypeText(_.find(self.dataTypeEnum, function (o) { return o.value == DataTypeValue.SELECTION; }).localizedName);
                                                }
                                                else {
                                                    self.currentItemSelected().dataTypeText(_.find(self.dataTypeEnum, function (o) { return o.value == self.currentItemSelected().dataTypeFixed(); }).localizedName);
                                                }
                                            }
                                            else {
                                                self.currentItemSelected().stringItem().stringItemTypeText(_.find(self.stringItemTypeEnum, function (o) { return o.value == self.currentItemSelected().stringItem().stringItemType(); }).localizedName);
                                                self.currentItemSelected().dataTypeText(_.find(self.dataTypeEnum, function (o) { return o.value == self.currentItemSelected().dataType(); }).localizedName);
                                            }
                                            self.currentItemSelected().stringItem().stringItemDataTypeText(_.find(self.stringItemDataTypeEnum, function (o) { return o.value == self.currentItemSelected().stringItem().stringItemDataType(); }).localizedName);
                                            self.currentItemSelected().numericItem().numericItemAmountText(_.find(self.numericItemAmountAtrEnum, function (o) { return o.code == self.currentItemSelected().numericItem().numericItemAmount(); }).name);
                                            self.currentItemSelected().numericItem().numericItemMinusText(_.find(self.numericItemMinusAtrEnum, function (o) { return o.code == self.currentItemSelected().numericItem().numericItemMinus(); }).name);
                                            self.currentItemSelected().dateItem().dateItemTypeText(_.find(self.dateItemTypeEnum, function (o) { return o.value == self.currentItemSelected().dateItem().dateItemType(); }).localizedName);
                                            block.clear();
                                        }).always(function () {
                                            var ctrl = $("#item-name-control"), str = ctrl.val();
                                            if ($('input.ntsSearchBox.nts-editor.ntsSearchBox_Component:focus').length == 0) {
                                                ctrl.focus().val('').val(str);
                                            }
                                            block.clear();
                                        });
                                    });
                                }
                            }
                            return ItemDataModel;
                        }());
                        b.ItemDataModel = ItemDataModel;
                        var PersonInfoItem = /** @class */ (function () {
                            function PersonInfoItem(data) {
                                this.id = "";
                                this.itemName = ko.observable("");
                                this.fixedAtr = ko.observable(0);
                                this.itemType = ko.observable(2);
                                this.dataType = ko.observable(1);
                                this.dataTypeFixed = ko.observable(1);
                                this.stringItem = ko.observable(new StringItemModel(null));
                                this.numericItem = ko.observable(new NumericItemModel(null));
                                this.dateItem = ko.observable(new DateItemModel(null));
                                this.timeItem = ko.observable(new TimeItemModel(null));
                                this.timePointItem = ko.observable(new TimePointItemModel(null));
                                this.selectionItem = ko.observable(new SelectionItemModel(null));
                                this.dataTypeText = ko.observable("");
                                this.selectionLst = ko.observableArray([]);
                                this.enable = ko.observable(true);
                                var self = this, vm = __viewContext['screenModelB'], dataTypeEnum = vm == undefined ? [] : vm.currentItemData() == null ? [] : (vm.currentItemData().dataTypeEnum);
                                if (data) {
                                    self.id = data.id || "";
                                    self.itemName(data.itemName || "");
                                    self.fixedAtr(data.isFixed || 0);
                                    self.enable(data.enable);
                                    if (!data.itemTypeState)
                                        return;
                                    self.itemType(data.itemTypeState.itemType || 2);
                                    var dataTypeState_1 = data.itemTypeState.dataTypeState;
                                    if (!dataTypeState_1)
                                        return;
                                    if (self.itemType() == 2) {
                                        self.dataType(dataTypeState_1.dataTypeValue);
                                        self.dataTypeFixed(dataTypeState_1.dataTypeValue);
                                        switch (dataTypeState_1.dataTypeValue) {
                                            case 1:
                                                self.stringItem(new StringItemModel(dataTypeState_1));
                                                break;
                                            case 2:
                                                self.numericItem(new NumericItemModel(dataTypeState_1));
                                                break;
                                            case 3:
                                                self.dateItem(new DateItemModel(dataTypeState_1));
                                                break;
                                            case 4:
                                                self.timeItem(new TimeItemModel(dataTypeState_1));
                                                break;
                                            case 5:
                                                self.timePointItem(new TimePointItemModel(dataTypeState_1));
                                                break;
                                            case 6:
                                                self.selectionItem(new SelectionItemModel(dataTypeState_1));
                                                break;
                                            case 7:
                                                self.dataTypeText(_.find(dataTypeEnum, function (o) { return o.value == dataTypeState_1.dataTypeValue; }).localizedName);
                                                break;
                                            case 8:
                                                self.dataTypeText(_.find(dataTypeEnum, function (o) { return o.value == dataTypeState_1.dataTypeValue; }).localizedName);
                                                break;
                                        }
                                    }
                                }
                                self.dataType.subscribe(function (value) {
                                    if (data != null && data.itemTypeState != null && value === data.itemTypeState.dataTypeState.dataTypeValue) {
                                        __viewContext['screenModelB'].currentItemData().perInfoItemSelectCode.valueHasMutated();
                                        return;
                                    }
                                    self.stringItem(new StringItemModel(null));
                                    self.numericItem(new NumericItemModel(null));
                                    self.dateItem(new DateItemModel(null));
                                    self.timeItem(new TimeItemModel(null));
                                    self.timePointItem(new TimePointItemModel(null));
                                    self.selectionItem(new SelectionItemModel(null));
                                    nts.uk.ui.errors.clearAll();
                                    if (value === 6) {
                                        self.selectionItem().selectionItemRefType(2);
                                        if (ko.toJS(__viewContext['screenModelB'].currentItemData().selectionItemLst()).length > 0) {
                                            block.invisible();
                                            b.service.getAllSelByHistory(ko.toJS(__viewContext['screenModelB'].currentItemData().selectionItemLst()[0].selectionItemId), __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                                if (data.length > 0) {
                                                    setTimeout(function () {
                                                        self.selectionItem().selectionLst([]);
                                                        self.selectionItem().selectionLst(data);
                                                        self.selectionItem().selectionLst.valueHasMutated();
                                                    }, 200);
                                                }
                                                else {
                                                    self.selectionItem().selectionLst.removeAll();
                                                    self.selectionItem().selectionLst([]);
                                                    self.selectionItem().selectionLst.valueHasMutated();
                                                }
                                                block.clear();
                                            });
                                        }
                                        self.selectionItem().selectionItemId.subscribe(function (value) {
                                            if (!value || _.size(value) == 0) {
                                                return;
                                            }
                                            block.invisible();
                                            b.service.getAllSelByHistory(value, __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                                if (data.length > 0) {
                                                    self.selectionItem().selectionLst([]);
                                                    self.selectionItem().selectionLst(data);
                                                    self.selectionItem().selectionLst.valueHasMutated();
                                                }
                                                else {
                                                    self.selectionItem().selectionLst.removeAll();
                                                    self.selectionItem().selectionLst([]);
                                                    self.selectionItem().selectionLst.valueHasMutated();
                                                }
                                                block.clear();
                                            });
                                        });
                                    }
                                });
                            }
                            ;
                            return PersonInfoItem;
                        }());
                        b.PersonInfoItem = PersonInfoItem;
                        var StringItemModel = /** @class */ (function () {
                            function StringItemModel(data) {
                                this.stringItemType = ko.observable(1);
                                this.stringItemTypeFixed = ko.observable(1);
                                this.stringItemTypeText = ko.observable("");
                                this.stringItemLength = ko.observable(null);
                                this.stringItemDataType = ko.observable(2);
                                this.stringItemDataTypeText = ko.observable("");
                                var self = this;
                                if (data) {
                                    self.stringItemType(data.stringItemType || 1);
                                    self.stringItemTypeFixed(data.stringItemType || 1);
                                    self.stringItemLength(data.stringItemLength || null);
                                    self.stringItemDataType(data.stringItemDataType || null);
                                }
                            }
                            return StringItemModel;
                        }());
                        b.StringItemModel = StringItemModel;
                        var NumericItemModel = /** @class */ (function () {
                            function NumericItemModel(data) {
                                this.numericItemMin = ko.observable();
                                this.numericItemMax = ko.observable();
                                this.numericItemAmount = ko.observable(0);
                                this.numericItemAmountText = ko.observable("");
                                this.numericItemMinus = ko.observable(1);
                                this.numericItemMinusText = ko.observable("");
                                this.decimalPart = ko.observable();
                                this.integerPart = ko.observable();
                                var self = this, validate = function (v) {
                                    $('#numericItemMin, #numericItemMax').trigger('blur');
                                };
                                self.numericItemAmount.subscribe(function (val) {
                                    if (!ko.toJS(val)) {
                                        $('#numericItemMin').parent().removeClass('symbol symbol-right');
                                        $('#numericItemMax').parent().removeClass('symbol symbol-right');
                                    }
                                });
                                if (data) {
                                    var currentItemData = ko.toJS(window['__viewContext']['screenModelB'].currentItemData);
                                    self.numericItemMin(data.numericItemMin);
                                    self.numericItemMax(data.numericItemMax);
                                    self.numericItemAmount(data.numericItemAmount);
                                    self.numericItemMinus(data.numericItemMinus);
                                    if (currentItemData.currentItemSelected.fixedAtr === ISFIXED.FIXED) {
                                        self.decimalPart(data.decimalPart || 0);
                                    }
                                    else {
                                        if (data.decimalPart == 0 || data.decimalPart == null) {
                                            self.decimalPart(data.decimalPart == 0 ? 0 : data.decimalPart || data.decimalPart == null ? null : data.decimalPart);
                                        }
                                        else {
                                            self.decimalPart(data.decimalPart);
                                        }
                                    }
                                    self.integerPart(data.integerPart || 0);
                                }
                                ko.computed({
                                    read: function () {
                                        var numericItemMinus = ko.toJS(self.numericItemMinus), integerPart = Number(ko.toJS(self.integerPart)), decimalPart = Number(ko.toJS(self.decimalPart)), numericItemMin = ko.toJS(self.numericItemMin), numericItemMax = ko.toJS(self.numericItemMax), maxValue = Math.pow(10, integerPart || 10) - Math.pow(10, (decimalPart || 0) * -1);
                                        writeConstraint("NumericItemMin", {
                                            mantissaMaxLength: !decimalPart ? 0 : decimalPart,
                                            min: Number(!!numericItemMinus ? maxValue * (-1) : 0),
                                            max: _.isNil(numericItemMax) || _.isEmpty(numericItemMax) ? Number(maxValue) : _.min([Number(numericItemMax), Number(maxValue)])
                                        });
                                        writeConstraint("NumericItemMax", {
                                            mantissaMaxLength: !decimalPart ? 0 : decimalPart,
                                            min: Number(numericItemMin) && Number(numericItemMin) < Number(maxValue) ? Number(numericItemMin) : (!!numericItemMinus ? Number(maxValue) * (-1) : 0),
                                            max: Number(maxValue)
                                        });
                                    }
                                });
                                self.integerPart.subscribe(validate);
                                self.decimalPart.subscribe(validate);
                                self.numericItemMinus.subscribe(validate);
                                self.numericItemMin.subscribe(function (v) { return $('#numericItemMax').trigger('blur'); });
                                self.numericItemMax.subscribe(function (v) { return $('#numericItemMin').trigger('blur'); });
                            }
                            return NumericItemModel;
                        }());
                        b.NumericItemModel = NumericItemModel;
                        var TimeItemModel = /** @class */ (function () {
                            function TimeItemModel(data) {
                                this.timeItemMin = ko.observable(null);
                                this.timeItemMax = ko.observable(null);
                                var self = this;
                                if (!data)
                                    return;
                                self.timeItemMin(data.min);
                                self.timeItemMax(data.max);
                            }
                            return TimeItemModel;
                        }());
                        b.TimeItemModel = TimeItemModel;
                        var TimePointItemModel = /** @class */ (function () {
                            function TimePointItemModel(data) {
                                this.timePointItemMin = ko.observable();
                                this.timePointItemMax = ko.observable();
                                var self = this;
                                if (!data)
                                    return;
                                self.timePointItemMin(data.timePointItemMin);
                                self.timePointItemMax(data.timePointItemMax);
                            }
                            return TimePointItemModel;
                        }());
                        b.TimePointItemModel = TimePointItemModel;
                        var DateItemModel = /** @class */ (function () {
                            function DateItemModel(data) {
                                this.dateItemType = ko.observable(1);
                                this.dateItemTypeText = ko.observable("");
                                var self = this;
                                if (!data)
                                    return;
                                self.dateItemType(data.dateItemType || 1);
                            }
                            return DateItemModel;
                        }());
                        b.DateItemModel = DateItemModel;
                        var SelectionItemModel = /** @class */ (function () {
                            function SelectionItemModel(data) {
                                this.selectionItemRefType = ko.observable(0);
                                this.selectionItemRefTypeText = ko.observable("");
                                this.selectionItemRefCode = ko.observable(null);
                                //danh sach selection item
                                this.selectionItemLst = ko.observableArray([]);
                                this.selectionItemId = ko.observable("");
                                // danh sach cac selection cua item
                                this.selectionLst = ko.observableArray([]);
                                this.selected = ko.observable("");
                                this.selectionId = ko.observable("");
                                this.selectionItemName = ko.observable("");
                                var self = this;
                                self.selectionLstColumns = ko.observableArray([
                                    { headerText: getText('CPS005_59'), key: 'selectionCode', width: 80 },
                                    { headerText: getText('CPS005_60'), key: 'selectionName', width: 200 }
                                ]);
                                self.selected("");
                                if (!data)
                                    return;
                                self.selectionItemRefCode(data.typeCode || data.enumName || data.masterType || undefined);
                                if (data.referenceType === "DESIGNATED_MASTER") {
                                    self.selectionItemRefType(1);
                                }
                                else if (data.referenceType === "CODE_NAME") {
                                    self.selectionItemRefType(2);
                                }
                                else if (data.referenceType === "ENUM") {
                                    self.selectionItemRefType(3);
                                }
                                self.selectionItemId(data.selectionItemId || data.typeCode || undefined);
                                self.selectionItemName(data.selectionItemName || undefined);
                                if (!nts.uk.util.isNullOrUndefined(self.selectionItemId())) {
                                    self.selectionItemId(self.selectionItemId());
                                }
                                self.selectionItemLst(data.selectionItemLst || []);
                                self.selectionLst([]);
                                if (self.selectionItemId() === undefined || self.selectionItemId() === "") {
                                    if (ko.toJS(__viewContext['screenModelB'].currentItemData().selectionItemLst()).length > 0) {
                                        b.service.getAllSelByHistory(ko.toJS(__viewContext['screenModelB'].currentItemData().selectionItemLst()[0].selectionItemId), __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                            if (data.length > 0) {
                                                self.selectionLst.removeAll();
                                                self.selectionLst(data);
                                                self.selectionLst.valueHasMutated();
                                            }
                                            else {
                                                self.selectionLst.removeAll();
                                                self.selectionLst([]);
                                                self.selectionLst.valueHasMutated();
                                            }
                                        });
                                    }
                                }
                                else {
                                    b.service.getAllSelByHistory(ko.toJS(self.selectionItemId), __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                        if (data.length > 0) {
                                            self.selectionLst.removeAll();
                                            self.selectionLst(data);
                                            self.selectionLst.valueHasMutated();
                                        }
                                        else {
                                            self.selectionLst.removeAll();
                                            self.selectionLst([]);
                                            self.selectionLst.valueHasMutated();
                                        }
                                    });
                                }
                                self.selectionItemId.subscribe(function (value) {
                                    if (!value) {
                                        return;
                                    }
                                    b.service.getAllSelByHistory(value, __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function (data) {
                                        if (data.length > 0) {
                                            self.selectionLst.removeAll();
                                            self.selectionLst(data);
                                            self.selectionLst.valueHasMutated();
                                        }
                                        else {
                                            self.selectionLst.removeAll();
                                            self.selectionLst([]);
                                            self.selectionLst.valueHasMutated();
                                        }
                                    });
                                });
                            }
                            SelectionItemModel.prototype.settingSelection = function () {
                                var self = this, params = {
                                    selectionItemId: ko.toJS(self.selectionItemId()),
                                    isDialog: true
                                };
                                setShared('CPS005B_PARAMS', params);
                                var itemCurrent = ko.toJS(__viewContext.screenModelB.currentItemData().currentItemSelected().id);
                                modal('/view/cps/016/a/index.xhtml', { title: '', height: 800, width: 1350 }).onClosed(function () {
                                    __viewContext['screenModelB'].reloadData().done(function () {
                                        __viewContext['screenModelB'].currentItemData().perInfoItemSelectCode(itemCurrent);
                                        self.selectionItemId(params.selectionItemId);
                                    });
                                });
                            };
                            return SelectionItemModel;
                        }());
                        b.SelectionItemModel = SelectionItemModel;
                        var PersonInfoItemShowListModel = /** @class */ (function () {
                            function PersonInfoItemShowListModel(data) {
                                var self = this;
                                if (!data)
                                    return;
                                self.id = data.id || null;
                                self.itemName = data.itemName || null;
                            }
                            return PersonInfoItemShowListModel;
                        }());
                        b.PersonInfoItemShowListModel = PersonInfoItemShowListModel;
                        var AddItemModel = /** @class */ (function () {
                            function AddItemModel(data) {
                                var self = this;
                                if (!data)
                                    return;
                                self.itemName = data.itemName();
                                self.personEmployeeType = __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType;
                                self.singleItem = new SingleItemAddModel(data);
                            }
                            return AddItemModel;
                        }());
                        b.AddItemModel = AddItemModel;
                        var UpdateItemModel = /** @class */ (function () {
                            function UpdateItemModel(data) {
                                var self = this;
                                if (!data)
                                    return;
                                self.perInfoItemDefId = data.id;
                                self.itemName = data.itemName();
                                self.personEmployeeType = __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType;
                                self.singleItem = new SingleItemAddModel(data);
                            }
                            return UpdateItemModel;
                        }());
                        b.UpdateItemModel = UpdateItemModel;
                        var RemoveItemModel = /** @class */ (function () {
                            function RemoveItemModel(perInfoItemDefId) {
                                var self = this;
                                self.perInfoItemDefId = perInfoItemDefId;
                            }
                            return RemoveItemModel;
                        }());
                        b.RemoveItemModel = RemoveItemModel;
                        var SingleItemAddModel = /** @class */ (function () {
                            function SingleItemAddModel(data) {
                                this.dataType = -1;
                                // StringItem property
                                this.stringItemLength = 0;
                                this.stringItemType = 0;
                                this.stringItemDataType = 0;
                                // NumericItem property
                                this.numericItemMinus = 0;
                                this.numericItemAmount = 0;
                                this.integerPart = 0;
                                this.decimalPart = 0;
                                this.numericItemMin = 0;
                                this.numericItemMax = 0;
                                // DateItem property
                                this.dateItemType = 0;
                                // TimeItem property
                                this.timeItemMax = 0;
                                this.timeItemMin = 0;
                                // TimePointItem property
                                this.timePointItemMin = 0;
                                this.timePointItemMax = 0;
                                // SelectionItem property
                                this.referenceType = 0;
                                this.referenceCode = "";
                                this.selectionItemId = undefined;
                                this.selectionId = undefined;
                                var self = this;
                                if (!data)
                                    return;
                                self.dataType = data.dataType();
                                if (data.stringItem()) {
                                    self.stringItemLength = data.stringItem().stringItemLength();
                                    self.stringItemType = data.stringItem().stringItemType();
                                    self.stringItemDataType = data.stringItem().stringItemDataType();
                                }
                                if (data.numericItem()) {
                                    self.numericItemMinus = data.numericItem().numericItemMinus();
                                    self.numericItemAmount = data.numericItem().numericItemAmount();
                                    self.integerPart = data.numericItem().integerPart();
                                    self.decimalPart = data.numericItem().decimalPart();
                                    self.numericItemMin = data.numericItem().numericItemMin();
                                    self.numericItemMax = data.numericItem().numericItemMax();
                                }
                                if (data.dateItem()) {
                                    self.dateItemType = data.dateItem().dateItemType();
                                }
                                if (data.timeItem()) {
                                    self.timeItemMax = data.timeItem().timeItemMax();
                                    self.timeItemMin = data.timeItem().timeItemMin();
                                }
                                if (data.timePointItem()) {
                                    self.timePointItemMin = data.timePointItem().timePointItemMin();
                                    self.timePointItemMax = data.timePointItem().timePointItemMax();
                                }
                                if (data.selectionItem()) {
                                    self.referenceType = data.selectionItem().selectionItemRefType();
                                    self.referenceCode = data.selectionItem().selectionItemId();
                                    self.selectionItemId = data.selectionItem().selectionItemId();
                                    self.selectionItemLst = data.selectionItem().selectionItemLst();
                                    self.selectionId = data.selectionItem().selectionId();
                                    self.selectionLst = data.selectionItem().selectionLst();
                                }
                            }
                            return SingleItemAddModel;
                        }());
                        b.SingleItemAddModel = SingleItemAddModel;
                        var ISFIXED;
                        (function (ISFIXED) {
                            // 0:固定なし(Not Fixed)
                            ISFIXED[ISFIXED["NOT_FIXED"] = 0] = "NOT_FIXED";
                            // 1:固定(Fixed)
                            ISFIXED[ISFIXED["FIXED"] = 1] = "FIXED";
                        })(ISFIXED = b.ISFIXED || (b.ISFIXED = {}));
                        var DataTypeValue;
                        (function (DataTypeValue) {
                            DataTypeValue[DataTypeValue["STRING"] = 1] = "STRING";
                            DataTypeValue[DataTypeValue["NUMBERIC"] = 2] = "NUMBERIC";
                            DataTypeValue[DataTypeValue["DATE"] = 3] = "DATE";
                            DataTypeValue[DataTypeValue["TIME"] = 4] = "TIME";
                            DataTypeValue[DataTypeValue["TIMEPOINT"] = 5] = "TIMEPOINT";
                            DataTypeValue[DataTypeValue["SELECTION"] = 6] = "SELECTION";
                            DataTypeValue[DataTypeValue["SELECTION_RADIO"] = 7] = "SELECTION_RADIO";
                            DataTypeValue[DataTypeValue["SELECTION_BUTTON"] = 8] = "SELECTION_BUTTON";
                            DataTypeValue[DataTypeValue["READONLY"] = 9] = "READONLY";
                            DataTypeValue[DataTypeValue["RELATED_CATEGORY"] = 10] = "RELATED_CATEGORY";
                            DataTypeValue[DataTypeValue["NUMBERIC_BUTTON"] = 11] = "NUMBERIC_BUTTON";
                            DataTypeValue[DataTypeValue["READONLY_BUTTON"] = 12] = "READONLY_BUTTON";
                        })(DataTypeValue = b.DataTypeValue || (b.DataTypeValue = {}));
                    })(b = cps005.b || (cps005.b = {}));
                })(cps005 = view.cps005 || (view.cps005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps005.b.vm.js.map