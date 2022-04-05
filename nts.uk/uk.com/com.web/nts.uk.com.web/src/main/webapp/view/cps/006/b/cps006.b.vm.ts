module nts.uk.com.view.cps006.b.viewmodel {

    import alert = nts.uk.ui.dialog.alert;
    import getText = nts.uk.resource.getText;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import block = nts.uk.ui.block;
    import dialog = nts.uk.ui.dialog;
    import modal = nts.uk.ui.windows.sub.modal;
    export class ScreenModel {
        itemInfoDefList: KnockoutObservableArray<ItemInfoDef> = ko.observableArray([]);
        currentSelectId: KnockoutObservable<string> = ko.observable('');
        columns: KnockoutObservableArray<any> = ko.observableArray([
            { headerText: '', prop: 'id', width: 100, hidden: true },
            { headerText: getText('CPS006_16'), prop: 'itemName', width: 250 },
            { headerText: getText('CPS006_17'), prop: 'isAbolition', width: 50, formatter: makeIcon },
        ]);

        roundingRules: KnockoutObservableArray<any> = ko.observableArray([
            { code: 0, name: getText('CPS006_26') },
            { code: 1, name: getText('CPS006_27') }
        ]);

        selectedRuleCode: KnockoutObservable<number> = ko.observable(1);
        categoryType: KnockoutObservable<number> = ko.observable(1);
        isRequired: KnockoutObservable<number> = ko.observable(1);
        currentItem: KnockoutObservable<ItemInfoDef> = ko.observable(new ItemInfoDef(null));
        itemNameText: KnockoutObservable<string> = ko.observable('');
        currentCategory: PerInfoCategory;
        ckbDisplayAbolition: KnockoutObservable<boolean> = ko.observable(false);
        ckbIsAbolition: KnockoutObservable<boolean> = ko.observable(false);
        constructor() {
            let self = this;

            self.currentSelectId.subscribe(function(newValue) {
                nts.uk.ui.errors.clearAll();
                if (!newValue) {
                    return;
                }

                service.getPerInfoItemDefById(newValue, self.currentCategory.personEmployeeType).done(function(data: IItemInfoDef) {
                    self.currentItem(new ItemInfoDef(data));
                    $("#itemName").focus();
                });
            });

            self.currentItem.subscribe(function(newItem) {
                nts.uk.ui.errors.clearAll();
                self.itemNameText(newItem.itemName);
                self.isRequired(newItem.isRequired);
                self.ckbIsAbolition(newItem.isAbolition === 1 ? true : false);
            });

            self.ckbDisplayAbolition.subscribe(function(newValue) {

                self.loadDataForGrid();

            });
        }

        start(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred();
            self.currentCategory = new PerInfoCategory(getShared('categoryInfo'));
            self.loadDataForGrid().done(function() {
                dfd.resolve();
            });
            return dfd.promise();
        }

        loadDataForGrid(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred(),
                lastSelectedIndex = self.itemInfoDefList().indexOf(_.find(self.itemInfoDefList(), function(i) { return i.id == self.currentSelectId() })),
                selectedId;
            block.invisible();
            self.loadItemInfoDefList().done(function() {

                //set selected item for gridlist
                if (self.itemInfoDefList().length > 0) {
                    if (lastSelectedIndex != -1) {
                        let selectItem = _.find(self.itemInfoDefList(), function(i) { return i.id == self.currentSelectId() });
                        if (selectItem) {
                            selectedId = self.currentSelectId();
                        } else {
                            if (self.itemInfoDefList().length == 0) {
                                selectedId = '';
                            } else {
                                if (self.itemInfoDefList().length <= lastSelectedIndex) {
                                    selectedId = self.itemInfoDefList()[self.itemInfoDefList().length - 1].id;
                                } else {
                                    selectedId = self.itemInfoDefList()[lastSelectedIndex == 0 ? 0 : lastSelectedIndex].id;
                                }
                            }
                        }
                    } else {
                        selectedId = self.itemInfoDefList()[0].id;
                    }
                }
                self.currentSelectId(selectedId);
                dfd.resolve();
            }).always(() => {
                block.clear();
            });
            return dfd.promise();
        }

        loadItemInfoDefList(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred(),
                categoryId = self.currentCategory.id;
            block.invisible();
            service.getItemInfoDefList(categoryId, self.ckbDisplayAbolition()).done(function(itemInfoDefList: Array<IItemInfoDef>) {
                self.itemInfoDefList([]);
                for (let i of itemInfoDefList) {
                    self.itemInfoDefList().push(new ItemInfoDef(i));
                }
                self.itemInfoDefList.valueHasMutated();
                if (self.itemInfoDefList().length < 0) {
                }
                dfd.resolve();
            }).always(() => {
                block.clear();
            });
            return dfd.promise();
        }

        updateItemChange() {

            let self = this,

                command = {
                    id: self.currentItem().id,
                    itemName: self.itemNameText(),
                    isAbolition: self.ckbIsAbolition() === true ? 1 : 0,
                    isRequired: self.isRequired(),
                    dataType: self.dataType(),
                    selectionItemId: self.dataType() === 1 ? null : (self.currentItem().itemTypeState.dataTypeState !== undefined ? self.currentItem().itemTypeState.dataTypeState.typeCode : null),
                    personEmployeeType: self.currentCategory.personEmployeeType
                },
                baseDate = moment(new Date()).format('YYYY-MM-DD');

            block.invisible();

            service.updateItemChange(command)
                .done(function() {

                    dialog.info({ messageId: "Msg_15" }).then(function() {

                        self.loadDataForGrid().done(function() {
                            self.currentItem().selectionLst([]);
                            if (command.dataType === 6) {
                                service.getAllSelByHistory(command.selectionItemId, self.currentCategory.personEmployeeType ).done(function(data) {
                                    self.currentItem().selectionLst.removeAll();
                                    self.currentItem().selectionLst(data);
                                    self.currentItem().selectionLst.valueHasMutated();

                                });
                            }

                            block.clear();
                            $('#itemName').focus();
                        });
                    });
                }).fail(function(res) {
                    if (res.messageId == "Msg_928") {
                        dialog.alertError({
                            messageId: res.messageId,
                            messageParams: ["項目"]
                        }).then(() => {
                            $('#itemName').focus();
                        });
                    } else {

                        dialog.alertError({ messageId: res.messageId });
                    }
                    block.clear();

                });

        }

        closeDialog(): void {

            nts.uk.ui.windows.close();

        }

        genRequiredText() {
            let self = this;

            switch (self.isRequired()) {
                case 0:
                    return getText('CPS006_26');
                case 1:
                    return getText('CPS006_27');
            }
        }

        genDatatypeValueText() {
            let self = this;

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


        }

        genStringItemDataTypeText() {
            let self = this;
            if (self.itemType() === 1) {

                return;
            }
            switch (self.currentItem().itemTypeState.dataTypeState.stringItemDataType) {
                case 1:
                    return getText('Enum_StringItemDataType_FIXED_LENGTH');
                case 2:
                    return getText('Enum_StringItemDataType_VARIABLE_LENGTH');
            }
        }

        genStringItemTypeText() {
            let self = this;

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
        }

        genStringNumericItemMinusText() {
            let self = this;

            if (self.itemType() === 1) {

                return;
            }

            switch (self.currentItem().itemTypeState.dataTypeState.numericItemMinus) {
                case 0:
                    return getText('CPS006_55');
                case 1:
                    return getText('CPS006_54');
            }
        }

        genDateTypeText() {
            let self = this;

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

        }

        dataType() {
            let self = this;

            if (self.itemType() === 2) {
                return self.currentItem().itemTypeState.dataTypeState.dataTypeValue;
            }

            return null;

        }

        itemType() {
            let self = this;

            if (self.currentItem().itemTypeState == null) {

                return 1;
            }

            return self.currentItem().itemTypeState.itemType;

        }
        
        
    selectionType() {
        let self = this;
        if (self.itemType() === 2 && self.dataType() === 6) {
            if(self.currentItem().itemTypeState.dataTypeState.referenceType === "CODE_NAME"){
                return 2;
            }
        }else{
            
             return 1;
        }
        
    }

        
        displayB2_48() {
            let self = this;
            return self.itemType()===2 && self.dataType() !== 10;    
        }

        genParamDisplayOrder(paramList) {
            let self = this,
                disPlayOrderArray = [];

            for (let i of paramList) {

                var item = {
                    id: i.id,
                    name: i.itemName
                }

                disPlayOrderArray.push(item);

            }

            return disPlayOrderArray;
        }

        genTime(time) {


            return nts.uk.time.parseTime(time, true).format();


        }


        genNumber(itemNumber: any, decimalPart: any) {
            let option: any;
            if (nts.uk.text.isNullOrEmpty(decimalPart)) {
                option = new nts.uk.ui.option.NumberEditorOption({ grouplength: 3, decimallength: 0 });

            } else {
                option = new nts.uk.ui.option.NumberEditorOption({ grouplength: 3, decimallength: decimalPart });

            }
            return nts.uk.ntsNumber.formatNumber(itemNumber, option);
        }

        OpenCDL022Modal() {

            let self = this,
                command,
                paramList = [];

            block.invisible();

            service.getItemInfoDefList(self.currentCategory.id, true).done(function(itemInfoDefList: Array<IItemInfoDef>) {

                paramList = self.genParamDisplayOrder(itemInfoDefList);

                setShared('CDL020_PARAMS', paramList);

                nts.uk.ui.windows.sub.modal('/view/cdl/022/a/index.xhtml', { title: '' }).onClosed(function(): any {

                    if (!getShared('CDL020_VALUES')) {
                        block.clear();
                        $("#itemName").focus();
                        return;
                    }

                    command = {
                        categoryId: self.currentCategory.id,
                        orderItemList: getShared('CDL020_VALUES')
                    }

                    service.SetOrder(command).done(function() {

                        self.loadDataForGrid().done(function() {
                            $("#itemName").focus();
                            block.clear();
                        });
                    });
                });
            });
        }

        settingSelection() {
            let self = this,
                params = {
                    selectionItemId: self.currentItem().itemTypeState.dataTypeState.typeCode,
                    isDialog: true
                },
                baseDate = moment(new Date()).format('YYYY-MM-DD');
            setShared('CPS017_PARAMS', params);

            modal('/view/cps/017/a/index.xhtml', { title: ''}).onClosed(function(): any {
                self.currentItem().selectionLst([]);
                service.getAllSelByHistory(params.selectionItemId, self.currentCategory.personEmployeeType).done(function(data) {
                    self.currentItem().selectionLst(data);
                    self.currentItem().selectionLst.valueHasMutated();

                });
            });
        }


    }

    function makeIcon(value, row) {
        if (value == '1')
            return '<img src="../a/images/checked.png" style="width: 20px; height: 20px;" />';
        return '<span></span>';
    }

    export interface IItemInfoDef {
        id: string;
        perInfoCtgId: string;
        itemCode: string;
        itemName: string;
        itemDefaultName: string;
        isAbolition: number;
        isFixed: number;
        isRequired: number;
        systemRequired: number;
        requireChangable: number;
        dispOrder: number;
        itemTypeState: any;
        selectionItemRefType: any;
        selectionItemName: string;
        selectionLst: Array<any>;
        canAbolition: boolean;
    }

    export class ItemInfoDef {
        id: string;
        perInfoCtgId: string;
        itemCode: string;
        itemName: string;
        itemDefaultName: string;
        isAbolition: number;
        isFixed: number;
        isRequired: number;
        systemRequired: number;
        requireChangable: number;
        dispOrder: number;
        itemTypeState: any;
        selectionItemRefType: any;
        selectionItemName: string;
        selectionLst: KnockoutObservableArray<any> = ko.observableArray([]);
        canAbolition:  boolean;

        constructor(data: IItemInfoDef) {

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
            this.canAbolition = data? data.canAbolition : true;

        }

    }

    export class PerInfoCategory {

        id: string;
        personEmployeeType: number;
        constructor(param) {
            this.id = param.id;
            this.personEmployeeType = param.personEmployeeType;
        }

    }
    




}


