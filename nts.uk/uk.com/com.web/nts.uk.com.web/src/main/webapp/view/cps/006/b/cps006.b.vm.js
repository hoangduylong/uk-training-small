var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps006;
                (function (cps006) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var dialog = nts.uk.ui.dialog;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.itemInfoDefList = ko.observableArray([]);
                                    this.currentSelectId = ko.observable('');
                                    this.columns = ko.observableArray([
                                        { headerText: '', prop: 'id', width: 100, hidden: true },
                                        { headerText: getText('CPS006_16'), prop: 'itemName', width: 250 },
                                        { headerText: getText('CPS006_17'), prop: 'isAbolition', width: 50, formatter: makeIcon },
                                    ]);
                                    this.roundingRules = ko.observableArray([
                                        { code: 0, name: getText('CPS006_26') },
                                        { code: 1, name: getText('CPS006_27') }
                                    ]);
                                    this.selectedRuleCode = ko.observable(1);
                                    this.categoryType = ko.observable(1);
                                    this.isRequired = ko.observable(1);
                                    this.currentItem = ko.observable(new ItemInfoDef(null));
                                    this.itemNameText = ko.observable('');
                                    this.ckbDisplayAbolition = ko.observable(false);
                                    this.ckbIsAbolition = ko.observable(false);
                                    var self = this;
                                    self.currentSelectId.subscribe(function (newValue) {
                                        nts.uk.ui.errors.clearAll();
                                        if (!newValue) {
                                            return;
                                        }
                                        b.service.getPerInfoItemDefById(newValue, self.currentCategory.personEmployeeType).done(function (data) {
                                            self.currentItem(new ItemInfoDef(data));
                                            $("#itemName").focus();
                                        });
                                    });
                                    self.currentItem.subscribe(function (newItem) {
                                        nts.uk.ui.errors.clearAll();
                                        self.itemNameText(newItem.itemName);
                                        self.isRequired(newItem.isRequired);
                                        self.ckbIsAbolition(newItem.isAbolition === 1 ? true : false);
                                    });
                                    self.ckbDisplayAbolition.subscribe(function (newValue) {
                                        self.loadDataForGrid();
                                    });
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this, dfd = $.Deferred();
                                    self.currentCategory = new PerInfoCategory(getShared('categoryInfo'));
                                    self.loadDataForGrid().done(function () {
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.loadDataForGrid = function () {
                                    var self = this, dfd = $.Deferred(), lastSelectedIndex = self.itemInfoDefList().indexOf(_.find(self.itemInfoDefList(), function (i) { return i.id == self.currentSelectId(); })), selectedId;
                                    block.invisible();
                                    self.loadItemInfoDefList().done(function () {
                                        //set selected item for gridlist
                                        if (self.itemInfoDefList().length > 0) {
                                            if (lastSelectedIndex != -1) {
                                                var selectItem = _.find(self.itemInfoDefList(), function (i) { return i.id == self.currentSelectId(); });
                                                if (selectItem) {
                                                    selectedId = self.currentSelectId();
                                                }
                                                else {
                                                    if (self.itemInfoDefList().length == 0) {
                                                        selectedId = '';
                                                    }
                                                    else {
                                                        if (self.itemInfoDefList().length <= lastSelectedIndex) {
                                                            selectedId = self.itemInfoDefList()[self.itemInfoDefList().length - 1].id;
                                                        }
                                                        else {
                                                            selectedId = self.itemInfoDefList()[lastSelectedIndex == 0 ? 0 : lastSelectedIndex].id;
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                selectedId = self.itemInfoDefList()[0].id;
                                            }
                                        }
                                        self.currentSelectId(selectedId);
                                        dfd.resolve();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.loadItemInfoDefList = function () {
                                    var self = this, dfd = $.Deferred(), categoryId = self.currentCategory.id;
                                    block.invisible();
                                    b.service.getItemInfoDefList(categoryId, self.ckbDisplayAbolition()).done(function (itemInfoDefList) {
                                        self.itemInfoDefList([]);
                                        for (var _i = 0, itemInfoDefList_1 = itemInfoDefList; _i < itemInfoDefList_1.length; _i++) {
                                            var i = itemInfoDefList_1[_i];
                                            self.itemInfoDefList().push(new ItemInfoDef(i));
                                        }
                                        self.itemInfoDefList.valueHasMutated();
                                        if (self.itemInfoDefList().length < 0) {
                                        }
                                        dfd.resolve();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.updateItemChange = function () {
                                    var self = this, command = {
                                        id: self.currentItem().id,
                                        itemName: self.itemNameText(),
                                        isAbolition: self.ckbIsAbolition() === true ? 1 : 0,
                                        isRequired: self.isRequired(),
                                        dataType: self.dataType(),
                                        selectionItemId: self.dataType() === 1 ? null : (self.currentItem().itemTypeState.dataTypeState !== undefined ? self.currentItem().itemTypeState.dataTypeState.typeCode : null),
                                        personEmployeeType: self.currentCategory.personEmployeeType
                                    }, baseDate = moment(new Date()).format('YYYY-MM-DD');
                                    block.invisible();
                                    b.service.updateItemChange(command)
                                        .done(function () {
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            self.loadDataForGrid().done(function () {
                                                self.currentItem().selectionLst([]);
                                                if (command.dataType === 6) {
                                                    b.service.getAllSelByHistory(command.selectionItemId, self.currentCategory.personEmployeeType).done(function (data) {
                                                        self.currentItem().selectionLst.removeAll();
                                                        self.currentItem().selectionLst(data);
                                                        self.currentItem().selectionLst.valueHasMutated();
                                                    });
                                                }
                                                block.clear();
                                                $('#itemName').focus();
                                            });
                                        });
                                    }).fail(function (res) {
                                        if (res.messageId == "Msg_928") {
                                            dialog.alertError({
                                                messageId: res.messageId,
                                                messageParams: ["項目"]
                                            }).then(function () {
                                                $('#itemName').focus();
                                            });
                                        }
                                        else {
                                            dialog.alertError({ messageId: res.messageId });
                                        }
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.genRequiredText = function () {
                                    var self = this;
                                    switch (self.isRequired()) {
                                        case 0:
                                            return getText('CPS006_26');
                                        case 1:
                                            return getText('CPS006_27');
                                    }
                                };
                                ScreenModel.prototype.genDatatypeValueText = function () {
                                    var self = this;
                                    if (self.itemType() === 1) {
                                        return;
                                    }
                                    switch (self.currentItem().itemTypeState.dataTypeState.dataTypeValue) {
                                        case 1:
                                            return getText('Enum_DataTypeValue_STRING');
                                        case 2:
                                            return getText('Enum_DataTypeValue_NUMERIC');
                                        case 3:
                                            return getText('Enum_DataTypeValue_DATE');
                                        case 4:
                                            return getText('Enum_DataTypeValue_TIME');
                                        case 5:
                                            return getText('Enum_DataTypeValue_TIMEPOINT');
                                        case 6:
                                            return getText('Enum_DataTypeValue_SELECTION');
                                        case 7:
                                            return getText('Enum_DataTypeValue_SELECTION');
                                        case 8:
                                            return getText('Enum_DataTypeValue_SELECTION');
                                        case 9:
                                            return getText('Enum_DataTypeValue_READONLY');
                                        case 10:
                                            return getText('Enum_DataTypeValue_RELATE_CATEGORY');
                                        case 11:
                                            return getText('Enum_DataTypeValue_NUMBERIC_BUTTON');
                                        case 12:
                                            return getText('Enum_DataTypeValue_READONLY_BUTTON');
                                    }
                                };
                                ScreenModel.prototype.genStringItemDataTypeText = function () {
                                    var self = this;
                                    if (self.itemType() === 1) {
                                        return;
                                    }
                                    switch (self.currentItem().itemTypeState.dataTypeState.stringItemDataType) {
                                        case 1:
                                            return getText('Enum_StringItemDataType_FIXED_LENGTH');
                                        case 2:
                                            return getText('Enum_StringItemDataType_VARIABLE_LENGTH');
                                    }
                                };
                                ScreenModel.prototype.genStringItemTypeText = function () {
                                    var self = this;
                                    if (self.itemType() === 1) {
                                        return;
                                    }
                                    switch (self.currentItem().itemTypeState.dataTypeState.stringItemType) {
                                        case 1:
                                            return getText('CPS006_66');
                                        case 2:
                                            return getText('CPS006_67');
                                        case 3:
                                            return getText('CPS006_68');
                                        case 4:
                                            return getText('CPS006_69');
                                        case 5:
                                            return getText('CPS006_70');
                                        case 6:
                                        case 7:
                                            return getText('CPS006_68');
                                    }
                                };
                                ScreenModel.prototype.genStringNumericItemMinusText = function () {
                                    var self = this;
                                    if (self.itemType() === 1) {
                                        return;
                                    }
                                    switch (self.currentItem().itemTypeState.dataTypeState.numericItemMinus) {
                                        case 0:
                                            return getText('CPS006_55');
                                        case 1:
                                            return getText('CPS006_54');
                                    }
                                };
                                ScreenModel.prototype.genDateTypeText = function () {
                                    var self = this;
                                    if (self.itemType() === 1) {
                                        return;
                                    }
                                    switch (self.currentItem().itemTypeState.dataTypeState.dateItemType) {
                                        case 1:
                                            return getText('Enum_DateType_YEARMONTHDAY');
                                        case 2:
                                            return getText('Enum_DateType_YEARMONTH');
                                        case 3:
                                            return getText('Enum_DateType_YEAR');
                                    }
                                };
                                ScreenModel.prototype.dataType = function () {
                                    var self = this;
                                    if (self.itemType() === 2) {
                                        return self.currentItem().itemTypeState.dataTypeState.dataTypeValue;
                                    }
                                    return null;
                                };
                                ScreenModel.prototype.itemType = function () {
                                    var self = this;
                                    if (self.currentItem().itemTypeState == null) {
                                        return 1;
                                    }
                                    return self.currentItem().itemTypeState.itemType;
                                };
                                ScreenModel.prototype.selectionType = function () {
                                    var self = this;
                                    if (self.itemType() === 2 && self.dataType() === 6) {
                                        if (self.currentItem().itemTypeState.dataTypeState.referenceType === "CODE_NAME") {
                                            return 2;
                                        }
                                    }
                                    else {
                                        return 1;
                                    }
                                };
                                ScreenModel.prototype.displayB2_48 = function () {
                                    var self = this;
                                    return self.itemType() === 2 && self.dataType() !== 10;
                                };
                                ScreenModel.prototype.genParamDisplayOrder = function (paramList) {
                                    var self = this, disPlayOrderArray = [];
                                    for (var _i = 0, paramList_1 = paramList; _i < paramList_1.length; _i++) {
                                        var i = paramList_1[_i];
                                        var item = {
                                            id: i.id,
                                            name: i.itemName
                                        };
                                        disPlayOrderArray.push(item);
                                    }
                                    return disPlayOrderArray;
                                };
                                ScreenModel.prototype.genTime = function (time) {
                                    return nts.uk.time.parseTime(time, true).format();
                                };
                                ScreenModel.prototype.genNumber = function (itemNumber, decimalPart) {
                                    var option;
                                    if (nts.uk.text.isNullOrEmpty(decimalPart)) {
                                        option = new nts.uk.ui.option.NumberEditorOption({ grouplength: 3, decimallength: 0 });
                                    }
                                    else {
                                        option = new nts.uk.ui.option.NumberEditorOption({ grouplength: 3, decimallength: decimalPart });
                                    }
                                    return nts.uk.ntsNumber.formatNumber(itemNumber, option);
                                };
                                ScreenModel.prototype.OpenCDL022Modal = function () {
                                    var self = this, command, paramList = [];
                                    block.invisible();
                                    b.service.getItemInfoDefList(self.currentCategory.id, true).done(function (itemInfoDefList) {
                                        paramList = self.genParamDisplayOrder(itemInfoDefList);
                                        setShared('CDL020_PARAMS', paramList);
                                        nts.uk.ui.windows.sub.modal('/view/cdl/022/a/index.xhtml', { title: '' }).onClosed(function () {
                                            if (!getShared('CDL020_VALUES')) {
                                                block.clear();
                                                $("#itemName").focus();
                                                return;
                                            }
                                            command = {
                                                categoryId: self.currentCategory.id,
                                                orderItemList: getShared('CDL020_VALUES')
                                            };
                                            b.service.SetOrder(command).done(function () {
                                                self.loadDataForGrid().done(function () {
                                                    $("#itemName").focus();
                                                    block.clear();
                                                });
                                            });
                                        });
                                    });
                                };
                                ScreenModel.prototype.settingSelection = function () {
                                    var self = this, params = {
                                        selectionItemId: self.currentItem().itemTypeState.dataTypeState.typeCode,
                                        isDialog: true
                                    }, baseDate = moment(new Date()).format('YYYY-MM-DD');
                                    setShared('CPS017_PARAMS', params);
                                    modal('/view/cps/017/a/index.xhtml', { title: '' }).onClosed(function () {
                                        self.currentItem().selectionLst([]);
                                        b.service.getAllSelByHistory(params.selectionItemId, self.currentCategory.personEmployeeType).done(function (data) {
                                            self.currentItem().selectionLst(data);
                                            self.currentItem().selectionLst.valueHasMutated();
                                        });
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            function makeIcon(value, row) {
                                if (value == '1')
                                    return '<img src="../a/images/checked.png" style="width: 20px; height: 20px;" />';
                                return '<span></span>';
                            }
                            var ItemInfoDef = /** @class */ (function () {
                                function ItemInfoDef(data) {
                                    this.selectionLst = ko.observableArray([]);
                                    this.id = data ? data.id : '';
                                    this.perInfoCtgId = data ? data.perInfoCtgId : '';
                                    this.itemCode = data ? data.itemCode : '';
                                    this.itemName = data ? data.itemName : '';
                                    this.itemDefaultName = data ? data.itemDefaultName : '';
                                    this.isAbolition = data ? data.isAbolition : 0;
                                    this.isFixed = data ? data.isFixed : 0;
                                    this.isRequired = data ? data.isRequired : 0;
                                    this.systemRequired = data ? data.systemRequired : 0;
                                    this.requireChangable = data ? data.requireChangable : 0;
                                    this.dispOrder = data ? data.dispOrder : 0;
                                    this.itemTypeState = data ? data.itemTypeState : null;
                                    this.selectionItemRefType = data ? data.selectionItemRefType : null;
                                    this.selectionItemName = data ? data.selectionItemName : null;
                                    this.selectionLst(data ? data.selectionLst : []);
                                    this.canAbolition = data ? data.canAbolition : true;
                                }
                                return ItemInfoDef;
                            }());
                            viewmodel.ItemInfoDef = ItemInfoDef;
                            var PerInfoCategory = /** @class */ (function () {
                                function PerInfoCategory(param) {
                                    this.id = param.id;
                                    this.personEmployeeType = param.personEmployeeType;
                                }
                                return PerInfoCategory;
                            }());
                            viewmodel.PerInfoCategory = PerInfoCategory;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cps006.b || (cps006.b = {}));
                })(cps006 = view.cps006 || (view.cps006 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps006.b.vm.js.map