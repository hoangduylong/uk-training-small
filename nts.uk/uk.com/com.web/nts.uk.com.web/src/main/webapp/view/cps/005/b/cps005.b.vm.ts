module nts.uk.com.view.cps005.b {
    import getText = nts.uk.resource.getText;
    import confirm = nts.uk.ui.dialog.confirm;
    import info = nts.uk.ui.dialog.info;
    import alertError = nts.uk.ui.dialog.alertError;
    import textUK = nts.uk.text;
    import block = nts.uk.ui.block;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import modal = nts.uk.ui.windows.sub.modal;

    let writeConstraint = window['nts']['uk']['ui']['validation']['writeConstraint'];

    export module viewmodel {
        export class ScreenModel {
            currentItemData: KnockoutObservable<ItemDataModel>;
            isUpdate: boolean = false;
            isEnableButtonProceed: KnockoutObservable<boolean>;
            currentCtg: any = getShared("CPS005_A");
            constructor() {
                let self = this,
                    dataItemModel = new ItemDataModel(null);
                self.currentItemData = ko.observable(dataItemModel);
                self.isEnableButtonProceed = ko.observable(true);
            }

            startPage(): JQueryPromise<any> {
                let self = this,
                    dfd = $.Deferred();
                block.invisible();
                service.getAllPerInfoItemDefByCtgId(self.currentCtg.categoryId, self.currentCtg.currentCtg.personEmployeeType).done(function(data: IItemData) {
                    self.currentItemData(new ItemDataModel(data));
                    if (data && data.personInfoItemList && data.personInfoItemList.length > 0) {
                        self.currentItemData().perInfoItemSelectCode(data.personInfoItemList ? data.personInfoItemList[0].id : "");
                        self.isUpdate = true;
                        self.currentItemData().isEnableButtonProceed(true);
                    } else {
                        self.register();
                    }
                    block.clear();
                    dfd.resolve();
                });

                return dfd.promise();
            }

            reloadData(): JQueryPromise<any> {
                let self = this,
                    isUpdate = self.isUpdate;
                    dfd = $.Deferred();
                self.currentItemData().personInfoItemList([]);
                self.currentItemData().selectionItemLst([]);
                service.getAllPerInfoItemDefByCtgId(self.currentCtg.categoryId, self.currentCtg.currentCtg.personEmployeeType).done(function(data: IItemData) {
                    if (data && data.personInfoItemList && data.personInfoItemList.length > 0) {
                        self.currentItemData().personInfoItemList(_.map(data.personInfoItemList, item => { return new PersonInfoItemShowListModel(item) }));
                        self.currentItemData().selectionItemLst(data.selectionItemLst);
                        // resset lai selectiuon Item List
                        self.isUpdate = isUpdate;
                        self.currentItemData().isEnableButtonProceed(true);
                    } else {
                        self.register();
                    }
                    dfd.resolve();
                });
                return dfd.promise();
            }

            register() {
                let self = this;
                nts.uk.ui.errors.clearAll();
                self.currentItemData().perInfoItemSelectCode("");
                self.currentItemData().currentItemSelected(new PersonInfoItem(null));
                self.isUpdate = false;
                $("#item-name-control").focus();
                self.currentItemData().isEnableButtonProceed(true);
                self.currentItemData().isEnableButtonDelete(false);
            }

            addUpdateData() {
                $("#item-name-control").trigger("validate");
                if (this.currentItemData().currentItemSelected().dataType() === 2) {
                    $("#integerPart").trigger("validate");
                }
                if (nts.uk.ui.errors.hasError()) { return; }
                let self = this,
                    newItemDef;

                newItemDef = new UpdateItemModel(self.currentItemData().currentItemSelected());

                if (self.checkRequired(newItemDef)) { return; };
                block.invisible();
                if (self.isUpdate == true) {

                    newItemDef.perInfoCtgId = self.currentCtg.categoryId;
                    if (newItemDef.singleItem.decimalPart === null) {
                        newItemDef.singleItem.decimalPart = 0;
                    }
                    service.updateItemDef(newItemDef).done(function(data: string) {
                        if (data) {
                            info({ messageId: data }).then(() => {
                                self.reloadData();
                                self.currentItemData().perInfoItemSelectCode(newItemDef.perInfoItemDefId);
                                self.currentItemData().perInfoItemSelectCode.valueHasMutated();
                                block.clear();
                            });
                        } else {
                            info({ messageId: "Msg_15" }).then(() => {
                                self.reloadData();
                                self.currentItemData().perInfoItemSelectCode(newItemDef.perInfoItemDefId);
                                self.currentItemData().perInfoItemSelectCode.valueHasMutated();
                                block.clear();
                            });
                        }

                    }).fail(error => {

                        if (error.messageId == 'Msg_928') {
                            alertError({
                                messageId: error.messageId,
                                messageParams: ["項目"]
                            }).then(() => {
                                $('#item-name-control').focus();
                            });
                        } else {
                            alertError({ messageId: error.messageId }).then(() => {
                            });
                        }
                        block.clear();

                    });
                } else {

                    newItemDef = new AddItemModel(self.currentItemData().currentItemSelected());
                    newItemDef.perInfoCtgId = self.currentCtg.categoryId;
                    if (newItemDef.singleItem.decimalPart === null) {
                        newItemDef.singleItem.decimalPart = 0;
                    }
                    service.addItemDef(newItemDef).done(function(data: string) {

                        info({ messageId: "Msg_15" }).then(() => {

                            self.reloadData().done(() => {
                                self.currentItemData().perInfoItemSelectCode(data);
                                //  self.selectionItemId(params.selectionItemId);
                            });

                            block.clear();

                        });
                    }).fail(error => {
                        if (error.messageId == 'Msg_928') {
                            alertError({
                                messageId: error.messageId,
                                messageParams: ["項目"]
                            }).then(() => {
                                $('#item-name-control').focus();
                            });
                        } else {
                            alertError({ messageId: error.messageId });
                        }
                        block.clear();

                    });
                }
            }

            removeData() {
                let self = this,
                    removeModel = new RemoveItemModel(self.currentItemData().perInfoItemSelectCode());
                block.invisible();
                if (!self.currentItemData().perInfoItemSelectCode()) return;
                let indexItemDelete = _.findIndex(self.currentItemData().personInfoItemList(), function(item) { return item.id == removeModel.perInfoItemDefId; });
                confirm({ messageId: "Msg_18" }).ifYes(() => {
                    service.removeItemDef(removeModel).done(function(data: string) {
                        if (data) {
                            info({ messageId: data }).then(() => { block.clear(); });
                            block.clear();
                            return;
                        }

                        info({ messageId: "Msg_16" }).then(() => {
                            self.reloadData().done(() => {
                                let itemListLength = self.currentItemData().personInfoItemList().length;
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

                    }).fail(error => {
                        alertError({ messageId: error.messageId });
                        block.clear();
                    });
                }).ifNo(() => {
                    block.clear();
                    return;
                })
            }

            closedDialog() {
                nts.uk.ui.windows.close();
            }

            checkRequired(newItemDef: any): boolean {
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
                    } else if (newItemDef.singleItem.timePointItemMax === undefined) {
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
            }

            genTextTime(time) {
                if (time == 0) {
                    return "0:00";
                }

                return nts.uk.time.parseTime(time(), true).format();

            }

            isNotsetOrnull(value) {
                return value() == 0 || !value();
            }
        }
    }

    export class ItemDataModel {
        personInfoItemList: KnockoutObservableArray<PersonInfoItemShowListModel> = ko.observableArray([]);
        perInfoItemSelectCode: KnockoutObservable<string> = ko.observable("");
        currentItemSelected: KnockoutObservable<PersonInfoItem> = ko.observable(new PersonInfoItem(null));
        isEnableButtonProceed: KnockoutObservable<boolean> = ko.observable(true);
        isEnableButtonDelete: KnockoutObservable<boolean> = ko.observable(true);
        dataTypeEnum: Array<any> = new Array();
        dataTypeEnumFilter: Array<any> = new Array();
        //Enum : dataTypeEnum is selected value 1 - 文字列(String)
        stringItemTypeEnum: Array<any> = new Array();
        stringItemTypeEnumFilter: Array<any> = new Array();
        stringItemDataTypeEnum: Array<any> = new Array();
        //Enum : dataTypeEnum is selected value 2 - 数値(Numeric)
        numericItemAmountAtrEnum: Array<any> = [
            { code: 1, name: getText("CPS005_50") },
            { code: 0, name: getText("CPS005_51") },
        ];
        numericItemMinusAtrEnum: Array<any> = [
            { code: 1, name: getText("CPS005_46") },
            { code: 0, name: getText("CPS005_47") },
        ];
        //Enum : dataTypeEnum is selected value 3 -日付(Date)
        dateItemTypeEnum: Array<any> = new Array();
        //Enum : dataTypeEnum is selected value 6 -選択(Selection)

        selectionItemLst: KnockoutObservableArray<any> = ko.observableArray([]);
        selectionItemId: KnockoutObservable<string> = ko.observable("");

        selectionLst: KnockoutObservableArray<any> = ko.observableArray([]);
        selectionId: KnockoutObservable<string> = ko.observable("");

        constructor(params: IItemData) {
            let self = this;
            if (params) {
                let personEmployeeType = __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType,
                    dataTypeEnumArray = (personEmployeeType == 2) ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
                
                self.personInfoItemList(_.map(params.personInfoItemList, item => { return new PersonInfoItemShowListModel(item) }));
                self.dataTypeEnum = params.dataTypeEnum || new Array();
                self.dataTypeEnumFilter = _.filter(params.dataTypeEnum, function(c) {
                    return dataTypeEnumArray.indexOf(c.value) > -1;
                });
                self.stringItemTypeEnum = params.stringItemTypeEnum || new Array();
                self.stringItemTypeEnumFilter = _.filter(params.stringItemTypeEnum, function(c) {
                    return [1, 2, 3, 4, 5].indexOf(c.value) > -1;
                });
                self.stringItemDataTypeEnum = params.stringItemDataTypeEnum || new Array();
                self.stringItemDataTypeEnum.reverse();
                self.dateItemTypeEnum = params.dateItemTypeEnum || new Array();
                self.selectionItemLst(params.selectionItemLst || []);
                self.selectionId("");
                self.selectionLst([]);
                //subscribe select category code
                self.perInfoItemSelectCode.subscribe(newItemId => {
                    nts.uk.ui.errors.clearAll();
                    if (textUK.isNullOrEmpty(newItemId)) return;
                    block.invisible();
                    service.getPerInfoItemDefById(newItemId, __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function(data: IPersonInfoItem) {
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
                            self.currentItemSelected().stringItem().stringItemTypeText(_.find(self.stringItemTypeEnum, function(o) { return o.value == self.currentItemSelected().stringItem().stringItemTypeFixed(); }).localizedName);
                            if ([DataTypeValue.SELECTION_RADIO, DataTypeValue.SELECTION_BUTTON].indexOf(self.currentItemSelected().dataTypeFixed()) > -1) {
                                self.currentItemSelected().dataTypeText(_.find(self.dataTypeEnum, function(o) { return o.value == DataTypeValue.SELECTION; }).localizedName);
                            } else {
                                self.currentItemSelected().dataTypeText(_.find(self.dataTypeEnum, function(o) { return o.value == self.currentItemSelected().dataTypeFixed(); }).localizedName);
                            }

                        } else {
                            self.currentItemSelected().stringItem().stringItemTypeText(_.find(self.stringItemTypeEnum, function(o) { return o.value == self.currentItemSelected().stringItem().stringItemType(); }).localizedName);
                            self.currentItemSelected().dataTypeText(_.find(self.dataTypeEnum, function(o) { return o.value == self.currentItemSelected().dataType(); }).localizedName);
                        }

                        self.currentItemSelected().stringItem().stringItemDataTypeText(_.find(self.stringItemDataTypeEnum, function(o) { return o.value == self.currentItemSelected().stringItem().stringItemDataType(); }).localizedName);
                        self.currentItemSelected().numericItem().numericItemAmountText(_.find(self.numericItemAmountAtrEnum, function(o) { return o.code == self.currentItemSelected().numericItem().numericItemAmount(); }).name);
                        self.currentItemSelected().numericItem().numericItemMinusText(_.find(self.numericItemMinusAtrEnum, function(o) { return o.code == self.currentItemSelected().numericItem().numericItemMinus(); }).name);
                        self.currentItemSelected().dateItem().dateItemTypeText(_.find(self.dateItemTypeEnum, function(o) { return o.value == self.currentItemSelected().dateItem().dateItemType(); }).localizedName);
                        block.clear();
                    }).always(() => {
                        let ctrl = $("#item-name-control"),
                            str = ctrl.val();
                        if ($('input.ntsSearchBox.nts-editor.ntsSearchBox_Component:focus').length == 0) {
                            ctrl.focus().val('').val(str);
                        }
                        block.clear();
                    });
                });


            }
        }
    }

    export class PersonInfoItem {
        id: string = "";
        itemName: KnockoutObservable<string> = ko.observable("");
        fixedAtr: KnockoutObservable<number> = ko.observable(0);
        itemType: KnockoutObservable<number> = ko.observable(2);
        dataType: KnockoutObservable<number> = ko.observable(1);
        dataTypeFixed: KnockoutObservable<number> = ko.observable(1);;
        stringItem: KnockoutObservable<StringItemModel> = ko.observable(new StringItemModel(null));
        numericItem: KnockoutObservable<NumericItemModel> = ko.observable(new NumericItemModel(null));
        dateItem: KnockoutObservable<DateItemModel> = ko.observable(new DateItemModel(null));
        timeItem: KnockoutObservable<TimeItemModel> = ko.observable(new TimeItemModel(null));
        timePointItem: KnockoutObservable<TimePointItemModel> = ko.observable(new TimePointItemModel(null));
        selectionItem: KnockoutObservable<SelectionItemModel> = ko.observable(new SelectionItemModel(null));
        dataTypeText: KnockoutObservable<string> = ko.observable("");
        selectionItemName: string;
        selectionLst: KnockoutObservableArray<any> = ko.observableArray([]);
        enable: KnockoutObservable<boolean> = ko.observable(true);

        constructor(data: IPersonInfoItem) {
            let self = this,
                vm: any = __viewContext['screenModelB'],
                dataTypeEnum: Array<any> = vm == undefined ? [] : vm.currentItemData() == null ? [] : (vm.currentItemData().dataTypeEnum);

            if (data) {
                self.id = data.id || "";
                self.itemName(data.itemName || "");
                self.fixedAtr(data.isFixed || 0);
                self.enable(data.enable);
                if (!data.itemTypeState) return;
                self.itemType(data.itemTypeState.itemType || 2);
                let dataTypeState = data.itemTypeState.dataTypeState;
                if (!dataTypeState) return;
                if (self.itemType() == 2) {
                    self.dataType(dataTypeState.dataTypeValue);
                    self.dataTypeFixed(dataTypeState.dataTypeValue);
                    switch (dataTypeState.dataTypeValue) {
                        case 1:
                            self.stringItem(new StringItemModel(dataTypeState));
                            break;
                        case 2:
                            self.numericItem(new NumericItemModel(dataTypeState));
                            break;
                        case 3:
                            self.dateItem(new DateItemModel(dataTypeState));
                            break;
                        case 4:
                            self.timeItem(new TimeItemModel(dataTypeState));
                            break;
                        case 5:
                            self.timePointItem(new TimePointItemModel(dataTypeState));
                            break;
                        case 6:
                            self.selectionItem(new SelectionItemModel(dataTypeState));
                            break;
                        case 7:
                            self.dataTypeText(_.find(dataTypeEnum, function(o) { return o.value == dataTypeState.dataTypeValue; }).localizedName);
                            break;
                        case 8:
                            self.dataTypeText(_.find(dataTypeEnum, function(o) { return o.value == dataTypeState.dataTypeValue; }).localizedName);
                            break;

                    }
                }
            }

            self.dataType.subscribe(function(value) {
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
                        service.getAllSelByHistory(ko.toJS(__viewContext['screenModelB'].currentItemData().selectionItemLst()[0].selectionItemId),
                            __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function(data: Array<any>) {
                                if (data.length > 0) {
                                    setTimeout(function() {
                                        self.selectionItem().selectionLst([]);
                                        self.selectionItem().selectionLst(data);
                                        self.selectionItem().selectionLst.valueHasMutated();
                                    }, 200);
                                } else {
                                    self.selectionItem().selectionLst.removeAll();
                                    self.selectionItem().selectionLst([]);
                                    self.selectionItem().selectionLst.valueHasMutated();
                                }
                                block.clear();
                            });
                    }

                    self.selectionItem().selectionItemId.subscribe(function(value) {
                        if (!value || _.size(value) == 0) {
                            return;
                        }
                        block.invisible();
                        service.getAllSelByHistory(value, __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function(data: Array<any>) {
                            if (data.length > 0) {
                                self.selectionItem().selectionLst([]);
                                self.selectionItem().selectionLst(data);
                                self.selectionItem().selectionLst.valueHasMutated();

                            } else {
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
    }

    export class StringItemModel {
        stringItemType: KnockoutObservable<number> = ko.observable(1);
        stringItemTypeFixed: KnockoutObservable<number> = ko.observable(1);
        stringItemTypeText: KnockoutObservable<string> = ko.observable("");
        stringItemLength: KnockoutObservable<number> = ko.observable(null);
        stringItemDataType: KnockoutObservable<number> = ko.observable(2);
        stringItemDataTypeText: KnockoutObservable<string> = ko.observable("");

        constructor(data: IStringItem) {
            let self = this;

            if (data) {
                self.stringItemType(data.stringItemType || 1);
                self.stringItemTypeFixed(data.stringItemType || 1);
                self.stringItemLength(data.stringItemLength || null);
                self.stringItemDataType(data.stringItemDataType || null);
            }
        }
    }

    export class NumericItemModel {
        numericItemMin: KnockoutObservable<number> = ko.observable();
        numericItemMax: KnockoutObservable<number> = ko.observable();
        numericItemAmount: KnockoutObservable<number> = ko.observable(0);
        numericItemAmountText: KnockoutObservable<string> = ko.observable("");
        numericItemMinus: KnockoutObservable<number> = ko.observable(1);
        numericItemMinusText: KnockoutObservable<string> = ko.observable("");
        decimalPart: KnockoutObservable<number> = ko.observable();
        integerPart: KnockoutObservable<number> = ko.observable();

        constructor(data: INumericItem) {
            let self = this,
                validate = v => {
                    $('#numericItemMin, #numericItemMax').trigger('blur');
                };

            self.numericItemAmount.subscribe((val) => {
                if (!ko.toJS(val)) {
                    $('#numericItemMin').parent().removeClass('symbol symbol-right');
                    $('#numericItemMax').parent().removeClass('symbol symbol-right');
                }
            })

            if (data) {
                let currentItemData = ko.toJS(window['__viewContext']['screenModelB'].currentItemData);

                self.numericItemMin(data.numericItemMin);
                self.numericItemMax(data.numericItemMax);
                self.numericItemAmount(data.numericItemAmount);
                self.numericItemMinus(data.numericItemMinus);

                if (currentItemData.currentItemSelected.fixedAtr === ISFIXED.FIXED) {
                    self.decimalPart(data.decimalPart || 0);
                } else {
                    if (data.decimalPart == 0 || data.decimalPart == null) {
                        self.decimalPart(data.decimalPart == 0 ? 0 : data.decimalPart || data.decimalPart == null ? null : data.decimalPart);
                    } else {
                        self.decimalPart(data.decimalPart);
                    }
                }
                self.integerPart(data.integerPart || 0);
            }

            ko.computed({
                read: () => {
                    let numericItemMinus = ko.toJS(self.numericItemMinus),
                        integerPart = Number(ko.toJS(self.integerPart)),
                        decimalPart = Number(ko.toJS(self.decimalPart)),
                        numericItemMin = ko.toJS(self.numericItemMin),
                        numericItemMax = ko.toJS(self.numericItemMax),
                        maxValue = Math.pow(10, integerPart || 10) - Math.pow(10, (decimalPart || 0) * -1);

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
            self.numericItemMin.subscribe(v => $('#numericItemMax').trigger('blur'));
            self.numericItemMax.subscribe(v => $('#numericItemMin').trigger('blur'));
        }
    }
    export class TimeItemModel {
        timeItemMin: KnockoutObservable<number> = ko.observable(null);
        timeItemMax: KnockoutObservable<number> = ko.observable(null);
        constructor(data: ITimeItem) {
            let self = this;
            if (!data) return;
            self.timeItemMin(data.min);
            self.timeItemMax(data.max);
        }
    }

    export class TimePointItemModel {
        timePointItemMin: KnockoutObservable<number> = ko.observable();
        timePointItemMax: KnockoutObservable<number> = ko.observable();
        constructor(data: ITimePointItem) {
            let self = this;
            if (!data) return;
            self.timePointItemMin(data.timePointItemMin);
            self.timePointItemMax(data.timePointItemMax);
        }
    }
    export class DateItemModel {
        dateItemType: KnockoutObservable<number> = ko.observable(1);
        dateItemTypeText: KnockoutObservable<string> = ko.observable("");
        constructor(data: IDateItem) {
            let self = this;
            if (!data) return;
            self.dateItemType(data.dateItemType || 1);
        }
    }

    export class SelectionItemModel {
        selectionItemRefType: KnockoutObservable<number> = ko.observable(0);
        selectionItemRefTypeText: KnockoutObservable<string> = ko.observable("");
        selectionItemRefCode: KnockoutObservable<string> = ko.observable(null);
        //danh sach selection item
        selectionItemLst: KnockoutObservableArray<any> = ko.observableArray([]);
        selectionItemId: KnockoutObservable<string> = ko.observable("");
        // danh sach cac selection cua item
        selectionLst: KnockoutObservableArray<any> = ko.observableArray([]);
        selectionLstColumns: KnockoutObservableArray<any>;
        selected: KnockoutObservable<string> = ko.observable("");
        selectionId: KnockoutObservable<string> = ko.observable("");
        selectionItemName: KnockoutObservable<string> = ko.observable("");
        constructor(data: ISelectionItem) {
            let self = this;
            self.selectionLstColumns = ko.observableArray([
                { headerText: getText('CPS005_59'), key: 'selectionCode', width: 80 },
                { headerText: getText('CPS005_60'), key: 'selectionName', width: 200 }
            ]);
            self.selected("");
            if (!data) return;
            self.selectionItemRefCode(data.typeCode || data.enumName || data.masterType || undefined);
            if (data.referenceType === "DESIGNATED_MASTER") {
                self.selectionItemRefType(1);
            } else if (data.referenceType === "CODE_NAME") {
                self.selectionItemRefType(2);
            } else if (data.referenceType === "ENUM") {
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

                    service.getAllSelByHistory(ko.toJS(__viewContext['screenModelB'].currentItemData().selectionItemLst()[0].selectionItemId),
                        __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function(data: Array<any>) {
                            if (data.length > 0) {
                                self.selectionLst.removeAll();
                                self.selectionLst(data);
                                self.selectionLst.valueHasMutated();

                            } else {
                                self.selectionLst.removeAll();
                                self.selectionLst([]);
                                self.selectionLst.valueHasMutated();

                            }


                        });
                }
            } else {

                service.getAllSelByHistory(ko.toJS(self.selectionItemId),
                    __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function(data: Array<any>) {
                        if (data.length > 0) {
                            self.selectionLst.removeAll();
                            self.selectionLst(data);
                            self.selectionLst.valueHasMutated();

                        } else {
                            self.selectionLst.removeAll();
                            self.selectionLst([]);
                            self.selectionLst.valueHasMutated();

                        }


                    });
            }
            self.selectionItemId.subscribe(function(value) {
                if (!value) {
                    return;
                }
                service.getAllSelByHistory(value, __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType).done(function(data: Array<any>) {
                    if (data.length > 0) {
                        self.selectionLst.removeAll();
                        self.selectionLst(data);
                        self.selectionLst.valueHasMutated();

                    } else {
                        self.selectionLst.removeAll();
                        self.selectionLst([]);
                        self.selectionLst.valueHasMutated();

                    }
                });
            });

        }

        settingSelection() {
            let self = this,
                params = {
                    selectionItemId: ko.toJS(self.selectionItemId()),
                    isDialog: true
                };

            setShared('CPS005B_PARAMS', params);
            let itemCurrent: string = ko.toJS(__viewContext.screenModelB.currentItemData().currentItemSelected().id);
            modal('/view/cps/016/a/index.xhtml', { title: '', height: 800, width: 1350 }).onClosed(function(): any {
                __viewContext['screenModelB'].reloadData().done(() => {
                    __viewContext['screenModelB'].currentItemData().perInfoItemSelectCode(itemCurrent);
                    self.selectionItemId(params.selectionItemId);
                });
            });
        }
    }
    export class PersonInfoItemShowListModel {
        id: string;
        itemName: string;
        constructor(data: IPersonInfoItemShowList) {
            let self = this;
            if (!data) return;
            self.id = data.id || null;
            self.itemName = data.itemName || null;
        }
    }
    export class AddItemModel {
        perInfoCtgId: string;
        personEmployeeType: number;
        itemName: string;
        singleItem: SingleItemAddModel;
        constructor(data: PersonInfoItem) {
            let self = this;
            if (!data) return;
            self.itemName = data.itemName();
            self.personEmployeeType = __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType;
            self.singleItem = new SingleItemAddModel(data);
        }
    }

    export class UpdateItemModel {
        perInfoItemDefId: string;
        perInfoCtgId: string;
        personEmployeeType: number;
        itemName: string;
        singleItem: SingleItemAddModel;
        constructor(data: PersonInfoItem) {
            let self = this;
            if (!data) return;
            self.perInfoItemDefId = data.id;
            self.itemName = data.itemName();
            self.personEmployeeType = __viewContext['screenModelB'].currentCtg.currentCtg.personEmployeeType;
            self.singleItem = new SingleItemAddModel(data);
        }
    }
    export class RemoveItemModel {
        perInfoItemDefId: string;
        constructor(perInfoItemDefId: string) {
            let self = this;
            self.perInfoItemDefId = perInfoItemDefId;
        }
    }
    export class SingleItemAddModel {
        dataType: number = -1;
        // StringItem property
        stringItemLength: number = 0;
        stringItemType: number = 0;
        stringItemDataType: number = 0;
        // NumericItem property
        numericItemMinus: number = 0;
        numericItemAmount: number = 0;
        integerPart: number = 0;
        decimalPart: number = 0;
        numericItemMin: number = 0;
        numericItemMax: number = 0;
        // DateItem property
        dateItemType: number = 0;
        // TimeItem property
        timeItemMax: number = 0;
        timeItemMin: number = 0;
        // TimePointItem property
        timePointItemMin: number = 0;
        timePointItemMax: number = 0;
        // SelectionItem property
        referenceType: number = 0;
        referenceCode: string = "";
        selectionItemId: string = undefined;
        selectionItemLst: Array<any>;
        selectionId: string = undefined;
        selectionLst: Array<any>;
        constructor(data: PersonInfoItem) {
            let self = this;
            if (!data) return;
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
    }

    interface IItemData {
        dataTypeEnum: any;
        stringItemTypeEnum: any;
        stringItemDataTypeEnum: any;
        dateItemTypeEnum: any;
        selectionItemLst: Array<any>;
        personInfoItemList: Array<IPersonInfoItemShowList>;
    }
    interface IPersonInfoItemShowList {
        id: string;
        itemName: string;
    }
    interface IPersonInfoItem {
        id: string;
        itemName: string;
        isFixed: number;
        enable: boolean;
        itemTypeState: IItemTypeState;
    }

    interface IItemTypeState {
        itemType: number;
        dataTypeState: any;
    }

    interface IStringItem {
        dataTypeValue: number;
        stringItemType: number;
        stringItemLength: number;
        stringItemDataType: number;
    }
    interface INumericItem {
        dataTypeValue: number;
        numericItemMin: number;
        numericItemMax: number;
        numericItemAmount: number;
        numericItemMinus: number;
        decimalPart: number;
        integerPart: number;
    }
    interface ITimeItem {
        dataTypeValue: number;
        min: number;
        max: number;
    }
    interface ITimePointItem {
        dataTypeValue: number;
        timePointItemMin: number;
        timePointItemMax: number;
    }
    interface IDateItem {
        dataTypeValue: number;
        dateItemType: number;
    }
    interface ISelectionItem {
        dataTypeValue: number;
        selectionItemRefType: string;
        selectionItemRefCode: string;
        selectionItemLst: Array<any>;
        selectionItemId: string;
        selectionLst: Array<any>;
        selectionId: string;
        selectionItemName?: string;
    }

    export enum ISFIXED {
        // 0:固定なし(Not Fixed)
        NOT_FIXED = 0,

        // 1:固定(Fixed)
        FIXED = 1
    }

    export enum DataTypeValue {
        STRING = 1,
        NUMBERIC = 2,
        DATE = 3,
        TIME = 4,
        TIMEPOINT = 5,
        SELECTION = 6,
        SELECTION_RADIO = 7,
        SELECTION_BUTTON = 8,
        READONLY = 9,
        RELATED_CATEGORY = 10,
        NUMBERIC_BUTTON = 11,
        READONLY_BUTTON = 12
    }

}