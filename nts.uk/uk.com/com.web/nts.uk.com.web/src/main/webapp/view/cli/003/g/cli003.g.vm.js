var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli003;
                (function (cli003) {
                    var g;
                    (function (g) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var confirm = nts.uk.ui.dialog.confirm;
                            var infor = nts.uk.ui.dialog.info;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var service = nts.uk.com.view.cli003.g.service;
                            var block = nts.uk.ui.block;
                            var errors = nts.uk.ui.errors;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
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
                                ScreenModel.prototype.initCombobox = function () {
                                    var self = this;
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
                                        new ItemTypeModel(-1, '')
                                    ]);
                                    self.setDataTypeList();
                                };
                                ScreenModel.prototype.resetDataTypeList = function () {
                                    $('#G3_8_1').hide();
                                    $('#G3_8_2').show();
                                };
                                ScreenModel.prototype.setDataTypeList = function () {
                                    $('#G3_8_1').show();
                                    $('#G3_8_2').hide();
                                };
                                ScreenModel.prototype.initSwapList = function () {
                                    var self = this;
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
                                    self.selectedCodeList.subscribe(function (newValue) {
                                    });
                                };
                                //event for change option the isShow on the selected code list
                                ScreenModel.prototype.changeShowOption = function (value, code) {
                                    var self = this;
                                    for (var i = 0; i < self.selectedCodeList().length; i++) {
                                        var logSetOutputItem = self.selectedCodeList()[i];
                                        if (logSetOutputItem.code == code) {
                                            logSetOutputItem.isShow = value;
                                            break;
                                        }
                                    }
                                };
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    return self.getAllLogDisplaySet();
                                };
                                ScreenModel.prototype.setFocus = function () {
                                    var self = this;
                                    if (self.mode() == MODE.INSERT) {
                                        $("#G3_2").focus();
                                    }
                                    else if (self.mode() == MODE.UPDATE) {
                                        $("#G3_3").focus();
                                    }
                                    else if (self.mode() == MODE.COPY) {
                                        $("#G3_2").focus();
                                    }
                                };
                                ScreenModel.prototype.getAllLogDisplaySet = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.grayout();
                                    self.logSets.removeAll();
                                    service.getAllLogDisplaySet().done(function (logDisplaySets) {
                                        if (logDisplaySets && logDisplaySets.length > 0) {
                                            self.logDisplaySets(logDisplaySets);
                                            for (var i = 0; i < logDisplaySets.length; i++) {
                                                var logDisplaySet = logDisplaySets[i];
                                                self.logSets.push(new ItemLogSetModel(logDisplaySet.logSetId, logDisplaySet.code, logDisplaySet.name, logDisplaySet.recordType, logDisplaySet.dataType, logDisplaySet.systemType, logDisplaySet.logSetOutputItems));
                                            }
                                            self.mode(MODE.UPDATE);
                                            if (self.selectCode()) {
                                                $("#G2_1").ntsGridList('setSelected', self.selectCode());
                                                self.currentCode(self.selectCode());
                                            }
                                            else {
                                                var logDisplaySetFirst = logDisplaySets[0];
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
                                    }).fail(function (error) {
                                        alertError(error);
                                        dfd.resolve();
                                    }).always(function () {
                                        block.clear();
                                        errors.clearAll();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.setLogSetInfo = function (logSet) {
                                    var self = this;
                                    self.currentLogDisplaySet(logSet);
                                    self.logSetId(logSet.id);
                                    self.inputCode(self.currentCode());
                                    self.currentName(logSet.name);
                                    self.recordType(logSet.recordType);
                                    self.systemType(logSet.systemType);
                                    //            self.dataType(logSet.dataType);
                                };
                                ScreenModel.prototype.resetAllForm = function () {
                                    var self = this;
                                    self.currentLogDisplaySet();
                                    self.currentCode('');
                                    self.inputCode('');
                                    self.currentName('');
                                    self.recordType('-1');
                                    //            self.dataType(-1);
                                    self.systemType('-1');
                                    self.selectedCodeList.removeAll();
                                };
                                ScreenModel.prototype.resetForm = function () {
                                    var self = this;
                                    self.currentLogDisplaySet();
                                    self.currentName('');
                                    self.recordType('-1');
                                    self.dataType('-1');
                                    self.systemType('-1');
                                    self.selectedCodeList.removeAll();
                                };
                                ScreenModel.prototype.initForm = function () {
                                    var self = this;
                                    self.recordType('0');
                                    self.dataType('-1');
                                    self.systemType('0');
                                };
                                ScreenModel.prototype.obsSelectedLogSet = function () {
                                    var self = this;
                                    self.currentCode.subscribe(function (newValue) {
                                        errors.clearAll();
                                        for (var i = 0; i < self.logSets().length; i++) {
                                            var logSet = self.logSets()[i];
                                            if (logSet.code == newValue) {
                                                self.resetForm();
                                                self.setLogSetInfo(logSet);
                                                self.mode(MODE.UPDATE);
                                                self.setFocus();
                                                break;
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.obsSelectedLogRecordType = function () {
                                    var self = this;
                                    self.recordType.subscribe(function (newValue) {
                                        if (typeof newValue !== "undefined" && newValue != null) {
                                            if (newValue != '-1') {
                                                self.getLogItemByRecordType(newValue.toString());
                                            }
                                            else {
                                                self.handleDataType(newValue);
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.obsSelectedLogSystemType = function () {
                                    var self = this;
                                    self.systemType.subscribe(function (newValue) {
                                        if (typeof newValue !== "undefined" && newValue != null) {
                                            if (newValue != '-1') {
                                                // self.getLogItemBySystemType(newValue.toString());
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.obsSelectedLogDataType = function () {
                                    var self = this;
                                    self.dataType.subscribe(function (newValue) {
                                        if (typeof newValue !== "undefined" && newValue != null) {
                                            if (newValue != '-1') {
                                                self.showLogItems(parseInt(newValue));
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.showLogItems = function (dataType) {
                                    var self = this;
                                    var logItemsEdit = [];
                                    if (dataType == 0 || dataType == 1) {
                                        for (var k = 0; k < self.logItemsFull().length; k++) {
                                            var logOutputItem = self.logItemsFull()[k];
                                            if (logOutputItem.code != 23 && logOutputItem.code != 24) {
                                                logItemsEdit.push(logOutputItem);
                                            }
                                        }
                                        self.itemsSwap(logItemsEdit);
                                        var selectCodeLists_1 = [];
                                        _.forEach(self.selectedCodeList(), function (logSetOutput) {
                                            var code = logSetOutput.code;
                                            if (code != 23 && code != 24) {
                                                selectCodeLists_1.push(logSetOutput);
                                            }
                                        });
                                        self.selectedCodeList.removeAll();
                                        self.selectedCodeList(selectCodeLists_1);
                                    }
                                    else if (dataType == 2) {
                                        for (var k = 0; k < self.logItemsFull().length; k++) {
                                            var logOutputItem = self.logItemsFull()[k];
                                            if (logOutputItem.code != 22 && logOutputItem.code != 24) {
                                                logItemsEdit.push(logOutputItem);
                                            }
                                        }
                                        ;
                                        self.itemsSwap(logItemsEdit);
                                        var selectCodeLists_2 = [];
                                        _.forEach(self.selectedCodeList(), function (logSetOutput) {
                                            var code = logSetOutput.code;
                                            if (code != 22 && code != 24) {
                                                selectCodeLists_2.push(logSetOutput);
                                            }
                                        });
                                        self.selectedCodeList.removeAll();
                                        self.selectedCodeList(selectCodeLists_2);
                                    }
                                };
                                ScreenModel.prototype.handleDataType = function (recoredType) {
                                    var self = this;
                                    if ((recoredType == '4' || recoredType == '5' || recoredType == '6')) {
                                        self.setDataTypeList();
                                        if (self.mode() == MODE.INSERT) {
                                            self.dataType('0');
                                        }
                                        else {
                                            self.dataType(String(self.currentLogDisplaySet().dataType));
                                        }
                                    }
                                    else {
                                        self.resetDataTypeList();
                                    }
                                    if ((recoredType == '4' || recoredType == '5' || recoredType == '6') && (self.mode() == MODE.INSERT)) {
                                        self.enableDataType(true);
                                    }
                                    else {
                                        self.enableDataType(false);
                                    }
                                };
                                ScreenModel.prototype.getLogItemByRecordType = function (recordType) {
                                    var self = this;
                                    self.itemsSwap.removeAll();
                                    self.selectedCodeList.removeAll();
                                    block.grayout();
                                    service.getLogOutputItemByRecordType(recordType).done(function (logOutputItems) {
                                        if (logOutputItems && logOutputItems.length > 0) {
                                            var id_1;
                                            if (self.currentLogDisplaySet()) {
                                                id_1 = self.currentLogDisplaySet().logSetId;
                                            }
                                            var logItemsTemp_1 = [];
                                            _.forEach(logOutputItems, function (logOutputItem) {
                                                logItemsTemp_1.push(new ItemLogSetRecordTypeModel(logOutputItem.itemNo, logOutputItem.itemName, 0, self.createNewItemDetail(id_1, logOutputItem.itemNo)));
                                            });
                                            self.itemsSwap(logItemsTemp_1);
                                            //                    self.logItemsFull.removeAll();
                                            self.logItemsFull(logItemsTemp_1);
                                            //check selected code
                                            if (self.mode() !== MODE.INSERT) {
                                                if (self.currentLogDisplaySet() && self.currentLogDisplaySet().recordType == recordType) {
                                                    var logSetOutputs = self.currentLogDisplaySet().logSetOutputs;
                                                    if (logSetOutputs) {
                                                        var lengthItemSwap_1 = logItemsTemp_1.length;
                                                        var logItemSetted_1 = [];
                                                        _.forEach(logSetOutputs, function (logSetOutput) {
                                                            var itemNo = logSetOutput.itemNo;
                                                            var itemName;
                                                            for (var k = 0; k < lengthItemSwap_1; k++) {
                                                                if (logItemsTemp_1[k].code == itemNo) {
                                                                    itemName = logItemsTemp_1[k].name;
                                                                    logItemSetted_1.push(new ItemLogSetRecordTypeModel(logSetOutput.itemNo, itemName, logSetOutput.isUseFlag, logSetOutput.logSetItemDetails));
                                                                    break;
                                                                }
                                                            }
                                                        });
                                                        self.selectedCodeList(logItemSetted_1);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            alertError({ messageId: "Msg_1221" });
                                        }
                                    }).fail(function (error) {
                                        alertError({ messageId: "Msg_1221" });
                                    }).always(function () {
                                        self.handleDataType(recordType);
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.obsMode = function () {
                                    var self = this;
                                    self.mode.subscribe(function (newValue) {
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
                                };
                                ScreenModel.prototype.createNewItemDetail = function (logSetId, itemNo) {
                                    var listItemDetail = [];
                                    for (var i = 1; i <= 5; i++) {
                                        listItemDetail.push(new LogSetItemDetailModal(logSetId, itemNo, i, 0, '', 0));
                                    }
                                    return listItemDetail;
                                };
                                ScreenModel.prototype.openH = function (itemNo, itemName) {
                                    var self = this;
                                    var curLogSetOutputItem;
                                    for (var i = 0; i < self.selectedCodeList().length; i++) {
                                        var logSetOutputItem = self.selectedCodeList()[i];
                                        if (logSetOutputItem.code == itemNo) {
                                            curLogSetOutputItem = logSetOutputItem;
                                        }
                                    }
                                    if (curLogSetOutputItem) {
                                        setShared("CLI003GParams_ListSetItemDetail", curLogSetOutputItem.detail);
                                        setShared("CLI003GParams_ItemName", curLogSetOutputItem.name);
                                        modal("/view/cli/003/h/index.xhtml").onClosed(function () {
                                            var listDetailConSet = getShared('CLI003GParams_ListSetItemDetailReturn');
                                            if (listDetailConSet) {
                                                var listDetails = [];
                                                for (var i = 0; i < listDetailConSet.length; i++) {
                                                    var isUseCondFlg = listDetailConSet[i].isUseCondFlg == true ? 1 : 0;
                                                    listDetails.push(new LogSetItemDetailModal(self.logSetId(), curLogSetOutputItem.code, i, isUseCondFlg, listDetailConSet[i].condition, listDetailConSet[i].symbolStr));
                                                }
                                                curLogSetOutputItem.detail = listDetails;
                                            }
                                        });
                                    }
                                };
                                ScreenModel.prototype.validateForm = function () {
                                    $(".validate_form").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        return false;
                                    }
                                    return true;
                                };
                                ;
                                ScreenModel.prototype.validateCode = function () {
                                    var self = this;
                                    for (var i = 0; i < self.logSets().length; i++) {
                                        if (Number(self.inputCode()) == Number(self.logSets()[i].code)) {
                                            alertError({ messageId: 'Msg_3' });
                                            return false;
                                        }
                                    }
                                    return true;
                                };
                                //Call server api
                                ScreenModel.prototype.registerLogSetNew = function () {
                                    var self = this;
                                    if (!(self.selectedCodeList().length === 0)) {
                                        if (self.mode() == MODE.INSERT
                                            || self.mode() == MODE.COPY) {
                                            if (self.validateForm() && self.validateCode() && self.validateLogSetOutputItem()) {
                                                self.saveLogDisplaySet();
                                            }
                                        }
                                        else {
                                            if (self.validateForm() && self.validateLogSetOutputItem()) {
                                                self.updateLogDisplaySet();
                                            }
                                        }
                                    }
                                    else {
                                        alertError({ messageId: "Msg_2037" }).then(function () {
                                            self.setFocus();
                                        });
                                    }
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    self.mode(MODE.INSERT);
                                    self.resetAllForm();
                                    self.initForm();
                                    self.setFocus();
                                };
                                ScreenModel.prototype.copyLogSet = function () {
                                    var self = this;
                                    $("#G2_1").ntsGridList('setSelected', null);
                                    self.mode(MODE.COPY);
                                    self.setFocus();
                                };
                                ScreenModel.prototype.deleteLogSet = function () {
                                    var self = this;
                                    confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        block.grayout();
                                        service.deleteLogDisplaySet(self.logSetId()).done(function (data) {
                                            infor({ messageId: "Msg_16" }).then(function () {
                                                self.setFocus();
                                            });
                                            ;
                                            var newSelectedCode = self.updateSelectCodeAfterDel(self.logSetId());
                                            self.selectCode(newSelectedCode);
                                            self.getAllLogDisplaySet();
                                        }).fail(function (error) {
                                            alertError(error).then(function () {
                                                self.setFocus();
                                            });
                                            ;
                                            errors.clearAll();
                                        }).always(function () {
                                            block.clear();
                                        });
                                    });
                                };
                                ScreenModel.prototype.updateSelectCodeAfterDel = function (currentLogSetId) {
                                    var self = this;
                                    var length = self.logSets().length;
                                    for (var i = 0; i < length; i++) {
                                        var logSet = self.logSets()[i];
                                        if (logSet.id == currentLogSetId) {
                                            if (i <= length - 2) {
                                                return self.logSets()[i + 1].code;
                                            }
                                            else {
                                                if (i > 0) {
                                                    return self.logSets()[i - 1].code;
                                                }
                                                else {
                                                    return null;
                                                }
                                            }
                                        }
                                    }
                                    return null;
                                };
                                ScreenModel.prototype.saveLogDisplaySet = function () {
                                    var self = this;
                                    //self.logSetOutputItems(self.getListSetOutputItems());
                                    var dataType = self.dataType();
                                    if (self.recordType() != '6') {
                                        dataType = '';
                                    }
                                    var logDisplaySet = new LogDisplaySetModal(self.logSetId(), self.inputCode(), self.currentName(), dataType, self.recordType(), self.systemType(), self.logSetOutputItems());
                                    block.grayout();
                                    service.addLogDisplaySet(logDisplaySet).done(function (id) {
                                        infor({ messageId: "Msg_15" }).then(function () {
                                            self.setFocus();
                                        });
                                        ;
                                        self.logSetId(id);
                                        self.selectCode(self.inputCode());
                                        self.getAllLogDisplaySet();
                                    }).fail(function (error) {
                                        alertError({ messageId: "Msg_1222" }).then(function () {
                                            self.setFocus();
                                        });
                                        ;
                                        errors.clearAll();
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.updateLogDisplaySet = function () {
                                    var self = this;
                                    //self.logSetOutputItems(self.getListSetOutputItems());
                                    var dataType = self.dataType();
                                    if (self.recordType() != '6') {
                                        dataType = '';
                                    }
                                    var logDisplaySet = new LogDisplaySetModal(self.logSetId(), self.inputCode(), self.currentName(), dataType, self.recordType(), self.systemType(), self.logSetOutputItems());
                                    block.grayout();
                                    service.updateLogDisplaySet(logDisplaySet).done(function (data) {
                                        infor({ messageId: "Msg_15" }).then(function () {
                                            self.setFocus();
                                        });
                                        self.selectCode(self.inputCode());
                                        self.getAllLogDisplaySet();
                                    }).fail(function (error) {
                                        alertError({ messageId: "Msg_1222" }).then(function () {
                                            self.setFocus();
                                        });
                                        errors.clearAll();
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                //get list of output item that was selected in the swap list
                                ScreenModel.prototype.getListSetOutputItems = function () {
                                    var self = this;
                                    var listSelectedLogOutputItems = [];
                                    for (var i = 0; i < self.selectedCodeList().length; i++) {
                                        var item = self.selectedCodeList()[i];
                                        listSelectedLogOutputItems.push(new LogSetOutputItemModal(self.logSetId(), item.code, i, item.isShow, item.detail));
                                    }
                                    return listSelectedLogOutputItems;
                                };
                                ScreenModel.prototype.validateLogSetOutputItem = function () {
                                    var self = this;
                                    self.logSetOutputItems(self.getListSetOutputItems());
                                    return true;
                                };
                                ScreenModel.prototype.validateLogSetOutputItemDetail = function (items) {
                                    for (var i = 0; i < items.length; i++) {
                                        if (items[i].condition) {
                                            return true;
                                        }
                                    }
                                    return false;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                             *
                             */
                            var ItemLogSetModel = /** @class */ (function () {
                                function ItemLogSetModel(id, code, name, recordType, dataType, systemType, logSetOutputs) {
                                    this.id = id;
                                    this.code = code;
                                    this.name = name;
                                    this.recordType = recordType;
                                    this.dataType = dataType;
                                    this.systemType = systemType;
                                    this.logSetOutputs = logSetOutputs;
                                }
                                return ItemLogSetModel;
                            }());
                            viewmodel.ItemLogSetModel = ItemLogSetModel;
                            /**
                            * The enum of MODE
                            */
                            var MODE;
                            (function (MODE) {
                                MODE[MODE["INSERT"] = 0] = "INSERT";
                                MODE[MODE["UPDATE"] = 1] = "UPDATE";
                                MODE[MODE["COPY"] = 2] = "COPY";
                            })(MODE = viewmodel.MODE || (viewmodel.MODE = {}));
                            /**
                             *
                             */
                            var ItemTypeModel = /** @class */ (function () {
                                function ItemTypeModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemTypeModel;
                            }());
                            viewmodel.ItemTypeModel = ItemTypeModel;
                            var ItemLogSetRecordTypeModel = /** @class */ (function () {
                                function ItemLogSetRecordTypeModel(code, name, isShow, detail) {
                                    this.code = code;
                                    this.name = name;
                                    this.isShow = isShow;
                                    this.detail = detail;
                                }
                                return ItemLogSetRecordTypeModel;
                            }());
                            viewmodel.ItemLogSetRecordTypeModel = ItemLogSetRecordTypeModel;
                            var LogDisplaySetModal = /** @class */ (function () {
                                function LogDisplaySetModal(logSetId, code, name, dataType, recordType, systemType, logSetOutputs) {
                                    this.logSetId = logSetId;
                                    this.code = code;
                                    this.name = name;
                                    this.dataType = dataType;
                                    this.recordType = recordType;
                                    this.systemType = systemType;
                                    this.logSetOutputItems = logSetOutputs;
                                }
                                return LogDisplaySetModal;
                            }());
                            viewmodel.LogDisplaySetModal = LogDisplaySetModal;
                            var LogSetOutputItemModal = /** @class */ (function () {
                                function LogSetOutputItemModal(logSetId, itemNo, displayOrder, isUseFlag, logSetItemDetails) {
                                    this.logSetId = logSetId;
                                    this.itemNo = itemNo;
                                    this.displayOrder = displayOrder;
                                    this.isUseFlag = isUseFlag;
                                    this.logSetItemDetails = logSetItemDetails;
                                }
                                return LogSetOutputItemModal;
                            }());
                            viewmodel.LogSetOutputItemModal = LogSetOutputItemModal;
                            var LogSetItemDetailModal = /** @class */ (function () {
                                function LogSetItemDetailModal(logSetId, itemNo, frame, isUseCondFlg, condition, sybol) {
                                    this.logSetId = logSetId;
                                    this.itemNo = itemNo;
                                    this.frame = frame;
                                    this.isUseCondFlg = isUseCondFlg;
                                    this.condition = condition;
                                    this.sybol = sybol;
                                }
                                return LogSetItemDetailModal;
                            }());
                            viewmodel.LogSetItemDetailModal = LogSetItemDetailModal;
                        })(viewmodel = g.viewmodel || (g.viewmodel = {}));
                    })(g = cli003.g || (cli003.g = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
function openHDialog(element) {
    var itemNo = $(element).data("code");
    var itemName = $(element).data("name");
    nts.uk.ui._viewModel.content.openH(itemNo, itemName);
}
function changeShowOption(element, code) {
    nts.uk.ui._viewModel.content.changeShowOption(element.value, code);
}
function afterLeft(toRight, oldSource, newI) {
    var currentLogDisplaySet = nts.uk.ui._viewModel.content.currentLogDisplaySet();
    for (var j = 0; j < newI.length; j++) {
        var logSetOutputItem = newI[j];
        var id = void 0;
        if (currentLogDisplaySet) {
            id = currentLogDisplaySet.id;
        }
        logSetOutputItem.detail = nts.uk.ui._viewModel.content.createNewItemDetail(id, logSetOutputItem.code);
        logSetOutputItem.isShow = 0;
    }
}
//# sourceMappingURL=cli003.g.vm.js.map