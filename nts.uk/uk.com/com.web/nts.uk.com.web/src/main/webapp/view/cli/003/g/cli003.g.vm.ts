module nts.uk.com.view.cli003.g.viewmodel {
    import getText = nts.uk.resource.getText;
    import confirm = nts.uk.ui.dialog.confirm;
    import infor = nts.uk.ui.dialog.info;
    import alertError = nts.uk.ui.dialog.alertError;
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import service = nts.uk.com.view.cli003.g.service;
    import block = nts.uk.ui.block;
    import errors = nts.uk.ui.errors;

    export class ScreenModel {
        logSets: KnockoutObservableArray<ItemLogSetModel>;
        columns: KnockoutObservableArray<any>;


        recordTypeList: KnockoutObservableArray<ItemTypeModel>;
        selectedRecordType: KnockoutObservable<string>;

        systemTypeList: KnockoutObservableArray<ItemTypeModel>;

        dataTypeList: KnockoutObservableArray<ItemTypeModel>;
        selectedDataType: KnockoutObservable<string>;
        dataTypeListEmpty: KnockoutObservableArray<ItemTypeModel>;

        //G4_2
        itemsSwap: KnockoutObservableArray<ItemLogSetRecordTypeModel>;
        leftColumns: KnockoutObservableArray<any>;
        rightColumns: KnockoutObservableArray<any>;
        selectedCodeList: KnockoutObservableArray<any>;


        logDisplaySets: KnockoutObservableArray<any>;

        currentLogDisplaySet: KnockoutObservable<LogDisplaySetModal>;
        logSetId: KnockoutObservable<string>;
        currentCode: KnockoutObservable<string>;
        inputCode: KnockoutObservable<string>;
        currentName: KnockoutObservable<string>;
        recordType: KnockoutObservable<string>;
        dataType: KnockoutObservable<string>;
        systemType: KnockoutObservable<string>;
        logSetOutputItems: KnockoutObservableArray<any>;
        dataTypeEmpty: KnockoutObservable<string>;


        moveItems: KnockoutObservableArray<any>;
        mode: KnockoutObservable<number>;
        selectCode: KnockoutObservable<any>;

        enableBtnReg: KnockoutObservable<boolean>;
        enableBtnRegNew: KnockoutObservable<boolean>;
        enableBtnCopy: KnockoutObservable<boolean>;
        enableBtnDel: KnockoutObservable<boolean>;
        enableCode: KnockoutObservable<boolean>;
        enableRecordType: KnockoutObservable<boolean>;
        enableDataType: KnockoutObservable<boolean>;
        enableSystemType: KnockoutObservable<boolean>;

        logItemsFull: KnockoutObservableArray<ItemLogSetRecordTypeModel>;

        constructor() {
            const self = this;

            self.logSets = ko.observableArray([]);
            self.currentLogDisplaySet = ko.observable();
            self.columns = ko.observableArray([
                { headerText: getText("CLI003_11"), key: 'code', width: 50 },
                { headerText: getText("CLI003_12"), key: 'name', width: 200 }
            ]);
            
            self.logDisplaySets = ko.observableArray([]);
            self.logItemsFull = ko.observableArray([]);
            
            self.logSetId = ko.observable('');
            self.currentCode = ko.observable('');
            self.inputCode = ko.observable('');
            self.currentName = ko.observable('');
            self.recordType = ko.observable('-1');
            self.dataType = ko.observable('-1');
            self.systemType = ko.observable('-1');
            self.dataTypeEmpty = ko.observable('-1');
            self.logSetOutputItems = ko.observableArray([]);

            self.moveItems = ko.observableArray([]);
            self.mode = ko.observable(MODE.INSERT);
            self.selectCode = ko.observable(null);

            self.enableBtnReg = ko.observable(true);
            self.enableBtnRegNew = ko.observable(true);
            self.enableBtnCopy = ko.observable(false);
            self.enableBtnDel = ko.observable(false);
            self.enableCode = ko.observable(true);
            self.enableRecordType = ko.observable(true);
            self.enableDataType = ko.observable(true);
            self.enableSystemType = ko.observable(true);

            self.initCombobox();
            self.initSwapList();
            self.obsSelectedLogSet();
            self.obsSelectedLogRecordType();
            self.obsSelectedLogSystemType();
            self.obsSelectedLogDataType();
            self.obsMode();
        }

        initCombobox() {
            const self = this;
            self.recordTypeList = ko.observableArray([
                new ItemTypeModel(0, getText('Enum_RecordType_Login')),
                new ItemTypeModel(1, getText('Enum_RecordType_StartUp')),
//                new ItemTypeModel(2, getText('Enum_RecordType_UpdateMaster')),
                new ItemTypeModel(3, getText('Enum_RecordType_UpdatePersionInfo')),
//                new ItemTypeModel(4, getText('Enum_RecordType_DataReference')),
//                new ItemTypeModel(5, getText('Enum_RecordType_DataManipulation')),
                new ItemTypeModel(6, getText('Enum_RecordType_DataCorrect')),
//                new ItemTypeModel(7, getText('Enum_RecordType_MyNumber')),
//                new ItemTypeModel(8, getText('Enum_RecordType_TerminalCommucationInfo')),
                new ItemTypeModel(9, getText("Enum_RecordType_DataStorage")),
                new ItemTypeModel(10, getText("Enum_RecordType_DataRecovery")),
                new ItemTypeModel(11, getText("Enum_RecordType_DataDeletion")),
            ]);

            self.systemTypeList = ko.observableArray([
                new ItemTypeModel(0, getText('Enum_SystemType_PERSON_SYSTEM')),
                new ItemTypeModel(1, getText('Enum_SystemType_ATTENDANCE_SYSTEM')),
                new ItemTypeModel(2, getText('Enum_SystemType_PAYROLL_SYSTEM')),
                new ItemTypeModel(3, getText('Enum_SystemType_OFFICE_HELPER')),
            ]);
            self.dataTypeList = ko.observableArray([
                new ItemTypeModel(0, getText('Enum_DataType_Schedule')),
                new ItemTypeModel(1, getText('Enum_DataType_DailyResults')),
                new ItemTypeModel(2, getText('Enum_DataType_MonthlyResults')),
            ]);
            self.dataTypeListEmpty = ko.observableArray([
                new ItemTypeModel(-1, '')]);
            
            self.setDataTypeList();
        }
        
        resetDataTypeList() {
            $('#G3_8_1').hide();
            $('#G3_8_2').show();
        }
        
        setDataTypeList() {
            $('#G3_8_1').show();
            $('#G3_8_2').hide();
        }

        initSwapList() {
            const self = this;
            self.itemsSwap = ko.observableArray([]);
            self.leftColumns = ko.observableArray([
                { headerText: "code", dataType: 'string', key: 'code', hidden: true },
                { headerText: getText("CLI003_41"), key: 'name', width: 200 }
            ]);


            self.rightColumns = ko.observableArray([
                { headerText: "code", dataType: 'string', key: 'code', hidden: true },
                { headerText: getText("CLI003_41"), dataType: 'string', key: 'name', width: 150 },
                {
                    headerText: getText("CLI003_42"), dataType: 'string', key: 'isShow', width: 100,
                    template: '<select style="width: 100%; padding-right:0px!important", onchange="changeShowOption(this, ${code});">'
                    + '{{if ${isShow} == "0" }}'
                    + '<option value="0" selected="true">' + getText("CLI003_44") + '</option>'
                    + '<option value="1">' + getText("CLI003_45") + '</option>'
                    + '{{else}}'
                    + '<option value="0">' + getText("CLI003_44") + '</option>'
                    + '<option value="1" selected="true">' + getText("CLI003_45") + '</option>'
                    + '{{/if}}'
                    + '</select>'
                },
                {
                    headerText: getText("CLI003_43"), dataType: 'string', key: 'detail', width: 100,
                    template: '<button class="small" onclick="openHDialog(this);" data-code="${code}" data-name="${name}" style="width: 100%; padding-right:0px!important">' + getText("CLI003_46") + '</button>'
                }
            ]);

            self.selectedCodeList = ko.observableArray([]);
            self.selectedCodeList.subscribe(function(newValue) {
            });
        }

        //event for change option the isShow on the selected code list
        changeShowOption(value: number, code: string) {
            const self = this;
            for (let i = 0; i < self.selectedCodeList().length; i++) {
                let logSetOutputItem = self.selectedCodeList()[i];
                if (logSetOutputItem.code == code) {
                    logSetOutputItem.isShow = value;
                    break;
                }
            }
        }

        public startPage(): JQueryPromise<any> {
            let self = this;
            return self.getAllLogDisplaySet();
        }

        public setFocus(): void {
            let self = this;
            if (self.mode() == MODE.INSERT) {
                $("#G3_2").focus();
            } else if (self.mode() == MODE.UPDATE) {
                $("#G3_3").focus();
            } else if (self.mode() == MODE.COPY) {
                 $("#G3_2").focus();
            }
        }

        getAllLogDisplaySet() {
            const self = this;
            let dfd = $.Deferred<any>();
            block.grayout();

            self.logSets.removeAll();
            service.getAllLogDisplaySet().done(function(logDisplaySets: any) {
                if (logDisplaySets && logDisplaySets.length > 0) {
                    self.logDisplaySets(logDisplaySets);
                    for (let i = 0; i < logDisplaySets.length; i++) {
                        const logDisplaySet = logDisplaySets[i];
                        self.logSets.push(new ItemLogSetModel(logDisplaySet.logSetId, logDisplaySet.code, logDisplaySet.name,
                            logDisplaySet.recordType, logDisplaySet.dataType,logDisplaySet.systemType, logDisplaySet.logSetOutputItems));
                    }

                    self.mode(MODE.UPDATE);
                    if (self.selectCode()) {
                        $("#G2_1").ntsGridList('setSelected', self.selectCode());
                        self.currentCode(self.selectCode());
                    } else {
                        const logDisplaySetFirst = logDisplaySets[0];
                        $("#G2_1").ntsGridList('setSelected', logDisplaySetFirst.code);
                        self.currentCode(logDisplaySetFirst.code);
                    }

                   
                }
                else {
                    //Mode INSERT
                    self.mode(MODE.INSERT);
                    self.resetAllForm();
                    self.initForm();
                }
                self.setFocus();

                dfd.resolve();
            }).fail(function(error) {
                alertError(error);
                dfd.resolve();
            }).always(() => {
                block.clear();
                errors.clearAll();
            });
            return dfd.promise();
        }

        setLogSetInfo(logSet: any) {
            const self = this;
            self.currentLogDisplaySet(logSet);
            self.logSetId(logSet.id);
            self.inputCode(self.currentCode());
            self.currentName(logSet.name);
            self.recordType(logSet.recordType);
            self.systemType(logSet.systemType);
//            self.dataType(logSet.dataType);
        }

        resetAllForm() {
            const self = this;
            self.currentLogDisplaySet();
            self.currentCode('');
            self.inputCode('');
            self.currentName('');
            self.recordType('-1');
//            self.dataType(-1);
            self.systemType('-1');
            self.selectedCodeList.removeAll();
        }

        resetForm() {
            const self = this;
            self.currentLogDisplaySet();
            self.currentName('');
            self.recordType('-1');
            self.dataType('-1');
            self.systemType('-1');
            self.selectedCodeList.removeAll();
        }
        
        initForm() {
            const self = this;
            self.recordType('0');
            self.dataType('-1');
            self.systemType('0');
        }

        obsSelectedLogSet() {
            const self = this;
            self.currentCode.subscribe((newValue) => {
                errors.clearAll();
                for (let i = 0; i < self.logSets().length; i++) {
                    const logSet = self.logSets()[i];
                    if (logSet.code == newValue) {
                        self.resetForm();
                        self.setLogSetInfo(logSet);
                        self.mode(MODE.UPDATE);
                        self.setFocus();
                        break;
                    }
                }
            });
        }

        obsSelectedLogRecordType() {
            const self = this;
            self.recordType.subscribe(function(newValue) {
                if (typeof newValue !== "undefined" && newValue !=null ) {
                    if (newValue != '-1') {
                        self.getLogItemByRecordType(newValue.toString());
                    }
                    else {
                        self.handleDataType(newValue);
                    }
                }
            });
        }

        obsSelectedLogSystemType() {
            const self = this;
            self.systemType.subscribe(function(newValue) {
                if (typeof newValue !== "undefined" && newValue !=null ) {
                    if (newValue != '-1') {
                        // self.getLogItemBySystemType(newValue.toString());
                    }
                }
            });
        }
        
        obsSelectedLogDataType() {
            const self = this;
            self.dataType.subscribe(function(newValue) {
                if (typeof newValue !== "undefined" && newValue !=null ) {
                    if (newValue != '-1') {
                        self.showLogItems(parseInt(newValue));
                    }
                }
            });
        }
        
        showLogItems(dataType : number) {
            const self = this;
            const logItemsEdit = [];
            if (dataType == 0 || dataType == 1) {
                for (var k = 0; k < self.logItemsFull().length; k++) {
                    const logOutputItem = self.logItemsFull()[k];
                    if (logOutputItem.code != 23 && logOutputItem.code != 24) {
                        logItemsEdit.push(logOutputItem);
                    }
                }
                
                self.itemsSwap(logItemsEdit);
                const selectCodeLists = [];
                _.forEach(self.selectedCodeList(), function(logSetOutput) {
                    const code = logSetOutput.code;
                    if (code != 23 && code != 24) {
                        selectCodeLists.push(logSetOutput);
                    }
                });
                self.selectedCodeList.removeAll();
                self.selectedCodeList(selectCodeLists);
            } else if (dataType == 2) {
                for (var k = 0; k < self.logItemsFull().length; k++) {
                    const logOutputItem = self.logItemsFull()[k];
                    if (logOutputItem.code != 22 && logOutputItem.code != 24) {
                        logItemsEdit.push(logOutputItem);
                    }
                };
                self.itemsSwap(logItemsEdit);
                 const selectCodeLists = [];
                _.forEach(self.selectedCodeList(), function(logSetOutput) {
                    const code = logSetOutput.code;
                    if (code != 22 && code != 24) {
                        selectCodeLists.push(logSetOutput);
                    }
                });
                self.selectedCodeList.removeAll();
                self.selectedCodeList(selectCodeLists);
            }
        }

        
        handleDataType(recoredType: string) {
            const self = this;
            
            if ((recoredType == '4' || recoredType == '5' || recoredType == '6')) {
                self.setDataTypeList();
                if (self.mode() == MODE.INSERT) {
                    self.dataType('0');
                } else {
                    self.dataType(String(self.currentLogDisplaySet().dataType));
                }
            } else {
                self.resetDataTypeList();
            }
            
            if ((recoredType == '4' || recoredType == '5' || recoredType == '6') && (self.mode() == MODE.INSERT)) {
                self.enableDataType(true);
            } else {
                self.enableDataType(false);
            }
        }

        getLogItemByRecordType(recordType: string) {
            const self = this;
            self.itemsSwap.removeAll();
            self.selectedCodeList.removeAll();
            block.grayout();
            service.getLogOutputItemByRecordType(recordType).done(function(logOutputItems: any) {
                if (logOutputItems && logOutputItems.length > 0) {
                    let id;
                    if (self.currentLogDisplaySet()) {
                        id = self.currentLogDisplaySet().logSetId;
                    }
                    
                    const logItemsTemp = [];
                    _.forEach(logOutputItems, function(logOutputItem) {
                        logItemsTemp.push(
                            new ItemLogSetRecordTypeModel(logOutputItem.itemNo, logOutputItem.itemName, 0,
                                self.createNewItemDetail(id, logOutputItem.itemNo)));


                    });
                    self.itemsSwap(logItemsTemp);
//                    self.logItemsFull.removeAll();
                    self.logItemsFull(logItemsTemp);

                    //check selected code
                    if(self.mode() !== MODE.INSERT) {
                        if (self.currentLogDisplaySet() && self.currentLogDisplaySet().recordType == recordType) {
                            const logSetOutputs = self.currentLogDisplaySet().logSetOutputs;
                            if (logSetOutputs) {
                                const lengthItemSwap = logItemsTemp.length;
                                const logItemSetted = [];
                                _.forEach(logSetOutputs, function(logSetOutput) {
                                    let itemNo = logSetOutput.itemNo;
                                    let itemName;
                                    for (var k = 0; k < lengthItemSwap; k++) {
                                        if (logItemsTemp[k].code == itemNo) {
                                            itemName = logItemsTemp[k].name;
                                            logItemSetted.push(
                                                new ItemLogSetRecordTypeModel(logSetOutput.itemNo, itemName, logSetOutput.isUseFlag,
                                                    logSetOutput.logSetItemDetails));
                                            break;
                                        }
                                    }
                                });
                                self.selectedCodeList(logItemSetted);
                            }
                        }
                    }
                } else {
                     alertError({ messageId: "Msg_1221" });
                }    
            }).fail(function(error) {
                alertError({ messageId: "Msg_1221" });
            }).always(() => {
                self.handleDataType(recordType);
                block.clear();
            });
        }

        obsMode() {
            const self = this;
            self.mode.subscribe(function(newValue) {
                if (newValue == MODE.INSERT) {
                    self.enableBtnReg(true);
                    self.enableBtnRegNew(true);
                    self.enableBtnCopy(false);
                    self.enableBtnDel(false);
                    self.enableCode(true);
                    self.enableRecordType(true);
                    self.enableDataType(true);
                    self.enableSystemType(true);
                }
                else if (newValue == MODE.UPDATE) {
                    self.enableBtnReg(true);
                    self.enableBtnRegNew(true);
                    self.enableBtnCopy(true);
                    self.enableBtnDel(true);
                    self.enableCode(false);
                    self.enableRecordType(false);
                    self.enableDataType(false);
                    self.enableSystemType(false);
                }
                else {
                    self.enableBtnReg(true);
                    self.enableBtnRegNew(true);
                    self.enableBtnCopy(false);
                    self.enableBtnDel(false);
                    self.enableCode(true);
                    self.enableRecordType(false);
                    self.enableDataType(false);
                    self.enableSystemType(false);
                }
            });
        }

        createNewItemDetail(logSetId: string, itemNo: number): Array<LogSetItemDetailModal> {
            const listItemDetail = [];
            for (let i = 1; i <= 5; i++) {
                listItemDetail.push(new LogSetItemDetailModal(logSetId, itemNo, i, 0, '', 0));
            }
            return listItemDetail;
        }


        openH(itemNo, itemName) {
            const self = this;
            let curLogSetOutputItem;

            for (let i = 0; i < self.selectedCodeList().length; i++) {
                let logSetOutputItem = self.selectedCodeList()[i];
                if (logSetOutputItem.code == itemNo) {
                    curLogSetOutputItem = logSetOutputItem;
                }
            }

            if (curLogSetOutputItem) {
                setShared("CLI003GParams_ListSetItemDetail", curLogSetOutputItem.detail);
                setShared("CLI003GParams_ItemName", curLogSetOutputItem.name);
                modal("/view/cli/003/h/index.xhtml").onClosed(() => {
                    let listDetailConSet = getShared('CLI003GParams_ListSetItemDetailReturn');
                    if (listDetailConSet) {
                        const listDetails = [];
                        for (let i = 0; i < listDetailConSet.length; i++) {
                            const isUseCondFlg = listDetailConSet[i].isUseCondFlg == true ? 1 : 0;
                            listDetails.push(new LogSetItemDetailModal(self.logSetId(), curLogSetOutputItem.code, i,
                                isUseCondFlg, listDetailConSet[i].condition, listDetailConSet[i].symbolStr));
                        }
                        curLogSetOutputItem.detail = listDetails;
                    }
                });
            }
        }

        private validateForm(): boolean {
            $(".validate_form").trigger("validate");
            if (nts.uk.ui.errors.hasError()) {
                return false;
            }
            return true;
        };

        private validateCode(): boolean {
            const self = this;
            for (let i = 0; i < self.logSets().length; i++) {
                if (Number(self.inputCode()) == Number(self.logSets()[i].code)) {
                    alertError({ messageId: 'Msg_3' });
                    return false;
                }
            }
            return true;
        }

        //Call server api
        registerLogSetNew() {
            let self = this;
            if(!(self.selectedCodeList().length === 0)) {
                if (self.mode() == MODE.INSERT
                || self.mode() == MODE.COPY) {
                    if (self.validateForm() && self.validateCode() && self.validateLogSetOutputItem()) {
                        self.saveLogDisplaySet();
                    }
                } else {
                    if (self.validateForm() && self.validateLogSetOutputItem()) {
                        self.updateLogDisplaySet();
                    }
                }
            } else {
                alertError({ messageId: "Msg_2037" }).then(() => {
                    self.setFocus();
               });
            }
        }

        register() {
            let self = this;
            self.mode(MODE.INSERT);
            self.resetAllForm();
            self.initForm();
            self.setFocus();
        }

        copyLogSet() {
            let self = this;
            $("#G2_1").ntsGridList('setSelected', null);
            self.mode(MODE.COPY);
            self.setFocus();
        }

        deleteLogSet() {
            let self = this;
            confirm({ messageId: "Msg_18" }).ifYes(() => {
                block.grayout();
                service.deleteLogDisplaySet(self.logSetId()).done(function(data: any) {
                    infor({ messageId: "Msg_16" }).then(function() {
                     self.setFocus();
                    });;
                    const newSelectedCode = self.updateSelectCodeAfterDel(self.logSetId());
                    self.selectCode(newSelectedCode);
                    self.getAllLogDisplaySet();
                }).fail(function(error) {
                    alertError(error).then(function() {
                     self.setFocus();
                    });;
                    errors.clearAll();
                }).always(() => {
                    block.clear();
                });
            });
        }

        updateSelectCodeAfterDel(currentLogSetId: string): string {
            let self = this;
            const length = self.logSets().length;
            for (let i = 0; i < length; i++) {
                const logSet = self.logSets()[i];
                if (logSet.id == currentLogSetId) {
                    if (i <= length - 2) {
                        return self.logSets()[i + 1].code;
                    } else {
                        if (i > 0) {
                            return self.logSets()[i - 1].code;
                        } else {
                            return null;
                        }
                    }
                }
            }
            return null;
        }

        private saveLogDisplaySet(): void {
            let self = this;
            //self.logSetOutputItems(self.getListSetOutputItems());

            let dataType = self.dataType();
            if (self.recordType() != '6') {
                dataType = '';
            }
            
            const logDisplaySet = new LogDisplaySetModal(self.logSetId(), self.inputCode(),
                self.currentName(), dataType, self.recordType(),self.systemType(),  self.logSetOutputItems());
            block.grayout();

            service.addLogDisplaySet(logDisplaySet).done(function(id: any) {
                infor({ messageId: "Msg_15" }).then(function() {
                     self.setFocus();
                });;
                self.logSetId(id);
                self.selectCode(self.inputCode());
                self.getAllLogDisplaySet();
            }).fail(function(error) {
                alertError({ messageId: "Msg_1222" }).then(function() {
                     self.setFocus();
                });;
                errors.clearAll();
            }).always(() => {
                block.clear();
            });
        }

        private updateLogDisplaySet(): void {
            let self = this;
            //self.logSetOutputItems(self.getListSetOutputItems());

            let dataType = self.dataType();
            if (self.recordType() != '6') {
                dataType = '';
            }
            
            const logDisplaySet = new LogDisplaySetModal(self.logSetId(), self.inputCode(),
                self.currentName(), dataType, self.recordType(),self.systemType(), self.logSetOutputItems());
            block.grayout();
            service.updateLogDisplaySet(logDisplaySet).done(function(data: any) {
                infor({ messageId: "Msg_15" }).then(function() {
                     self.setFocus();
                });
                self.selectCode(self.inputCode());
                self.getAllLogDisplaySet();
            }).fail(function(error) {
                alertError({ messageId: "Msg_1222" }).then(function() {
                     self.setFocus();
                });
                errors.clearAll();
            }).always(() => {
                block.clear();
            });
        }

        //get list of output item that was selected in the swap list
        getListSetOutputItems(): Array<LogSetOutputItemModal> {
            const self = this;
            const listSelectedLogOutputItems = [];
            for (let i = 0; i < self.selectedCodeList().length; i++) {
                const item = self.selectedCodeList()[i];
                listSelectedLogOutputItems.push(new LogSetOutputItemModal(self.logSetId(), item.code, i, item.isShow, item.detail));
            }
            return listSelectedLogOutputItems;
        }

        validateLogSetOutputItem(): boolean {
            const self = this;
            self.logSetOutputItems(self.getListSetOutputItems());
            return true;
        }

        validateLogSetOutputItemDetail(items: any): boolean {
            for (var i = 0; i < items.length; i++) {
                if (items[i].condition) {
                    return true;
                }
            }
            return false;
        }
    }



    /**
     * 
     */
    export class ItemLogSetModel {
        id: string;
        code: any;
        name: string;
        recordType: string;
        dataType: string;
        systemType: string;
        logSetOutputs: any;

        constructor(id: string, code: any, name: string, recordType: string,
            dataType: string, systemType: string,  logSetOutputs: any) {
            this.id = id;
            this.code = code;
            this.name = name;
            this.recordType = recordType;
            this.dataType = dataType;
            this.systemType = systemType
            this.logSetOutputs = logSetOutputs;
        }
    }

    /**
    * The enum of MODE
    */
    export enum MODE {
        INSERT = 0,
        UPDATE = 1,
        COPY = 2
    }

    /**
     * 
     */
    export class ItemTypeModel {
        code: any;
        name: string;

        constructor(code: any, name: string) {
            this.code = code;
            this.name = name;
        }
    }

    export class ItemLogSetRecordTypeModel {
        code: number;
        name: string;
        isShow: number;
        detail: any;

        constructor(code: number, name: string, isShow: number, detail: any) {
            this.code = code;
            this.name = name;
            this.isShow = isShow;
            this.detail = detail;
        }
    }

    export class LogDisplaySetModal {
        logSetId: string;
        code: string;
        name: string;
        dataType: string;
        recordType: string;
        systemType: string;
        logSetOutputItems: Array<LogSetOutputItemModal>;

        constructor(logSetId: string, code: string, name: string, dataType: string, recordType: string,systemType: string,
            logSetOutputs: Array<LogSetOutputItemModal>) {
            this.logSetId = logSetId;
            this.code = code;
            this.name = name;
            this.dataType = dataType;
            this.recordType = recordType;
            this.systemType = systemType;
            this.logSetOutputItems = logSetOutputs;
        }
    }

    export class LogSetOutputItemModal {
        logSetId: string;
        itemNo: number;
        displayOrder: number;
        isUseFlag: number;
        logSetItemDetails: Array<LogSetItemDetailModal>;

        constructor(logSetId: string, itemNo: number, displayOrder: number, isUseFlag: number,
            logSetItemDetails: Array<LogSetItemDetailModal>) {
            this.logSetId = logSetId;
            this.itemNo = itemNo;
            this.displayOrder = displayOrder;
            this.isUseFlag = isUseFlag;
            this.logSetItemDetails = logSetItemDetails;
        }
    }


    export class LogSetItemDetailModal {
        logSetId: string;
        itemNo: number;
        frame: number;
        isUseCondFlg: number;
        condition: string;
        sybol: number;


        constructor(logSetId: string, itemNo: number, frame: number, isUseCondFlg: number,
            condition: string, sybol: number) {
            this.logSetId = logSetId;
            this.itemNo = itemNo;
            this.frame = frame;
            this.isUseCondFlg = isUseCondFlg;
            this.condition = condition;
            this.sybol = sybol;
        }
    }
}

function openHDialog(element) {
    const itemNo = $(element).data("code");
    const itemName = $(element).data("name");
    nts.uk.ui._viewModel.content.openH(itemNo, itemName);
}

function changeShowOption(element, code) {
    nts.uk.ui._viewModel.content.changeShowOption(element.value, code);
}

function afterLeft(toRight, oldSource, newI) {
    const currentLogDisplaySet = nts.uk.ui._viewModel.content.currentLogDisplaySet();
    for (let j = 0; j < newI.length; j++) {
        let logSetOutputItem = newI[j];
        let id;
        if (currentLogDisplaySet) {
            id = currentLogDisplaySet.id;
        }
        logSetOutputItem.detail = nts.uk.ui._viewModel.content.createNewItemDetail(id, logSetOutputItem.code);
        logSetOutputItem.isShow = 0;
    }
}

