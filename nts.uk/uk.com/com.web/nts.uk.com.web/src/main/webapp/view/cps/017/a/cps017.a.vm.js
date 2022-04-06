var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps017;
                (function (cps017) {
                    var a;
                    (function (a_1) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var confirm = nts.uk.ui.dialog.confirm;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var writeConstraint = window['nts']['uk']['ui']['validation']['writeConstraint'], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"];
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.langId = ko.observable('ja');
                                    this.date = ko.observable(moment(new Date()).toDate());
                                    //listSelectionItem
                                    this.listItems = ko.observableArray([]);
                                    this.perInfoSelectionItem = ko.observable(new SelectionItem({ selectionItemId: '', selectionItemName: '' }));
                                    // history:
                                    this.listHistorySelection = ko.observableArray([]);
                                    this.historySelection = ko.observable(new HistorySelection({ histId: '', selectionItemId: '' }));
                                    //Selection:
                                    this.listSelection = ko.observableArray([]);
                                    this.selection = ko.observable(new Selection({ selectionID: '', histId: '' }));
                                    //OrderSelection:
                                    this.listOrderSelection = ko.observableArray([]);
                                    this.orderSelection = ko.observable(new OrderSelection({ selectionID: '', histId: '' }));
                                    this.closeUp = ko.observable(false);
                                    this.isDialog = ko.observable(false);
                                    this.selHistId = ko.observable('');
                                    // status of function-button
                                    this.enableRegister = ko.observable(false);
                                    this.enableRemove = ko.observable(false);
                                    this.enableOpenDialogB = ko.observable(false);
                                    this.enableCreateNew = ko.observable(false);
                                    // status of history-function-button
                                    this.enableAddUpdateHist = ko.observable(false);
                                    this.enableDelHist = ko.observable(false);
                                    // status of selection-name, selection-code
                                    this.enableSelectionCd = ko.observable(true);
                                    this.enableSelectionName = ko.observable(true);
                                    // constraints
                                    this.constraints = ko.observable();
                                    this.codeNameLabelConstraint = ko.observableArray();
                                    this.codeConstraint = ko.observable('');
                                    this.nameConstraint = ko.observable('');
                                    this.extenalLabelConstraint = ko.observable();
                                    this.focus = {
                                        code: ko.observable(false),
                                        name: ko.observable(false)
                                    };
                                    this.enableReflUnrComp = ko.observable(true);
                                    var self = this;
                                    var historySelection = self.historySelection();
                                    var selection = self.selection();
                                    var perInfoSelectionItem = self.perInfoSelectionItem();
                                    var groupCompanyAdmin = __viewContext.user.role.groupCompanyAdmin;
                                    self.isGroupManager = groupCompanyAdmin !== 'null';
                                    //check insert/update
                                    self.checkCreateaaa = ko.observable(true);
                                    //Subscribe: 頛�変更→雮のID変更
                                    perInfoSelectionItem.selectionItemId.subscribe(function (id) {
                                        if (id) {
                                            var selectedObject = _.find(self.listItems(), function (item) {
                                                return item.selectionItemId == id;
                                            });
                                            if (selectedObject != undefined) {
                                                //self.perInfoSelectionItem(new SelectionItem(selectedObject));
                                                perInfoSelectionItem.selectionItemName(selectedObject.selectionItemName);
                                                perInfoSelectionItem.characterType(selectedObject.characterType ? 1 : 0);
                                                perInfoSelectionItem.selectionItemClassification(selectedObject.shareChecked ? 0 : 1);
                                                self.constraints.selectionCode = selectedObject.codeLength;
                                                self.constraints.selectionName = selectedObject.nameLength;
                                                self.constraints.selectionExternalCode = selectedObject.extraCodeLength;
                                                var primitiveConstraint = __viewContext.primitiveValueConstraints;
                                                // change constrain
                                                self.changeTextEditorConstrain(primitiveConstraint);
                                                // change form-label
                                                self.changeLabelConstrain(selectedObject.characterType);
                                            }
                                            // history
                                            a_1.service.getAllPerInfoHistorySelection(id).done(function (_selectionItemList) {
                                                var changeData = _.each(_selectionItemList, function (item) {
                                                    item.displayDate = item.startDate + "  " + getText('CPS017_12') + "  " + item.endDate;
                                                    return item;
                                                });
                                                self.listHistorySelection(changeData);
                                                if (self.listHistorySelection().length > 0) {
                                                    if (self.historySelection().histId() !== self.listHistorySelection()[0].histId) {
                                                        self.historySelection().histId(self.listHistorySelection()[0].histId);
                                                    }
                                                    else {
                                                        self.historySelection().histId.valueHasMutated();
                                                    }
                                                }
                                                else {
                                                    self.historySelection().histId("");
                                                    self.historySelection().histId.valueHasMutated();
                                                }
                                            });
                                            self.enableReflUnrComp(true);
                                        }
                                        else {
                                            self.createNewData();
                                            perInfoSelectionItem.selectionItemName('');
                                            self.listSelection.removeAll();
                                            self.historySelection().histId('');
                                            self.listHistorySelection.removeAll();
                                            self.enableAddUpdateHist(false);
                                            self.enableReflUnrComp(false);
                                        }
                                    });
                                    historySelection.histId.subscribe(function (x) {
                                        if (x) {
                                            self.enableRegister(true);
                                            var histCur = _.find(self.listHistorySelection(), function (a) { return a.histId == x; });
                                            if (histCur.endDate !== '9999/12/31') {
                                                self.setEnableDisplay5(false);
                                                self.enableSelectionName(false);
                                            }
                                            else {
                                                self.setEnableDisplay5(true);
                                                self.enableSelectionName(true);
                                                // if it has only one history
                                                if (self.listHistorySelection().length === 1) {
                                                    self.enableDelHist(false);
                                                }
                                            }
                                            // fill startDate and endDate
                                            self.historySelection().startDate(histCur.startDate);
                                            self.historySelection().endDate(histCur.endDate);
                                            self.listSelection.removeAll();
                                            a_1.service.getAllOrderItemSelection(x).done(function (itemList) {
                                                if (itemList && itemList.length > 0) {
                                                    self.checkCreateaaa(false);
                                                    // fix responsive bug
                                                    ko.utils.arrayPushAll(self.listSelection, itemList);
                                                    if (self.selection().selectionID() !== self.listSelection()[0].selectionID) {
                                                        self.selection().selectionID(self.listSelection()[0].selectionID);
                                                    }
                                                    else {
                                                        self.selection().selectionID.valueHasMutated();
                                                    }
                                                }
                                                else {
                                                    self.createNewData();
                                                }
                                            });
                                        }
                                        else {
                                            self.listSelection.removeAll();
                                            self.createNewData();
                                            self.enableRegister(false);
                                        }
                                    });
                                    // sub theo selectionID: 
                                    selection.selectionID.subscribe(function (x) {
                                        if (x) {
                                            self.checkCreateaaa(false);
                                            self.enableCreateNew(true);
                                            self.enableRemove(true);
                                            self.enableOpenDialogB(true);
                                            nts.uk.ui.errors.clearAll();
                                            var selectLists_1 = _.find(self.listSelection(), function (item) {
                                                return item.selectionID == x;
                                            });
                                            selection.selectionCD(selectLists_1.selectionCD);
                                            selection.selectionName(selectLists_1.selectionName);
                                            selection.externalCD(selectLists_1.externalCD);
                                            selection.memoSelection(selectLists_1.memoSelection);
                                            // Chu y: Tim hieu them ham _.defer
                                            selection.codeType(99);
                                            _.defer(function () {
                                                selection.codeType(selectLists_1.codeType);
                                            });
                                            if (x == undefined && self.enableSelectionName() == true) {
                                                self.enableSelectionCd(true);
                                            }
                                            else {
                                                self.enableSelectionCd(false);
                                            }
                                            self.focus.name(true);
                                        }
                                        else {
                                            self.createNewData();
                                        }
                                    });
                                }
                                //開�
                                ScreenModel.prototype.start = function () {
                                    var self = this, historySelection = self.historySelection(), listHistorySelection = self.listHistorySelection(), _selectId = _.find(listHistorySelection, function (x) { return x.selectionItemId == historySelection.selectionItemId; }), comand = ko.toJS(historySelection), dfd = $.Deferred();
                                    nts.uk.ui.errors.clearAll();
                                    //xu ly dialog: 
                                    var param = getShared('CPS017_PARAMS');
                                    // ドメインモッ�「個人惱の選択雮」をすべて取得す�
                                    a_1.service.getAllSelectionItems().done(function (itemList) {
                                        if (itemList && itemList.length > 0) {
                                            self.listItems(itemList);
                                            if (param != null && param != undefined) {
                                                self.isDialog(param.isDialog);
                                                self.closeUp(true);
                                                var isContain = _.findIndex(self.listItems(), function (x) {
                                                    return x.selectionItemId == param.selectionItemId;
                                                });
                                                if (isContain > 0) {
                                                    self.perInfoSelectionItem().selectionItemId(param.selectionItemId);
                                                }
                                                else {
                                                    self.perInfoSelectionItem().selectionItemId(self.listItems()[0].selectionItemId);
                                                }
                                            }
                                            else {
                                                self.perInfoSelectionItem().selectionItemId(self.listItems()[0].selectionItemId);
                                            }
                                        }
                                        else {
                                            if (param != null && param != undefined) {
                                                alertError({ messageId: "Msg_455" }).then(function () {
                                                    self.close();
                                                });
                                            }
                                            else {
                                                alertError({ messageId: "Msg_455" }).then(function () {
                                                    uk.request.jumpToTopPage();
                                                });
                                            }
                                        }
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        if (param != null && param != undefined) {
                                            alertError({ messageId: "Msg_455" }).then(function () {
                                                self.close();
                                            });
                                        }
                                        else {
                                            alertError({ messageId: "Msg_455" }).then(function () {
                                                uk.request.jumpToTopPage();
                                            });
                                        }
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.changeTextEditorConstrain = function (primitiveConstraint) {
                                    var self = this;
                                    writeConstraint("SelectionCdNumeric", {
                                        charType: primitiveConstraint.SelectionCdNumeric.charType,
                                        maxLength: self.constraints.selectionCode,
                                        valueType: primitiveConstraint.SelectionCdNumeric.valueType
                                    });
                                    writeConstraint("SelectionCdAlphaNumeric", {
                                        charType: primitiveConstraint.SelectionCdAlphaNumeric.charType,
                                        maxLength: self.constraints.selectionCode,
                                        valueType: primitiveConstraint.SelectionCdAlphaNumeric.valueType
                                    });
                                    writeConstraint("SelectionName", {
                                        charType: "Any",
                                        maxLength: self.constraints.selectionName,
                                        valueType: primitiveConstraint.SelectionName.valueType
                                    });
                                    writeConstraint("ExternalCdAlphalNumeric", {
                                        charType: primitiveConstraint.ExternalCdAlphalNumeric.charType,
                                        maxLength: self.constraints.selectionExternalCode,
                                        valueType: primitiveConstraint.ExternalCdAlphalNumeric.valueType
                                    });
                                    writeConstraint("ExternalCdNumeric", {
                                        charType: primitiveConstraint.ExternalCdNumeric.charType,
                                        maxLength: self.constraints.selectionExternalCode,
                                        valueType: primitiveConstraint.ExternalCdNumeric.valueType
                                    });
                                };
                                ScreenModel.prototype.changeLabelConstrain = function (characterType) {
                                    var self = this;
                                    self.codeNameLabelConstraint.removeAll();
                                    if (characterType == 1) {
                                        self.codeNameLabelConstraint.push('SelectionCdAlphaNumeric');
                                        self.codeConstraint('SelectionCdAlphaNumeric');
                                        self.extenalLabelConstraint('ExternalCdAlphalNumeric');
                                    }
                                    else {
                                        self.codeNameLabelConstraint.push('SelectionCdNumeric');
                                        self.codeConstraint('SelectionCdNumeric');
                                        self.extenalLabelConstraint('ExternalCdNumeric');
                                    }
                                    self.codeNameLabelConstraint.push('SelectionName');
                                    self.nameConstraint('SelectionName');
                                    self.codeNameLabelConstraint.valueHasMutated();
                                    self.extenalLabelConstraint.valueHasMutated();
                                };
                                //新規�タン
                                ScreenModel.prototype.createNewData = function () {
                                    var self = this;
                                    var selection = self.selection();
                                    var perSelection = ko.toJS(self.perInfoSelectionItem);
                                    nts.uk.ui.errors.clearAll();
                                    selection.selectionID(undefined);
                                    selection.externalCD('');
                                    selection.selectionCD('');
                                    selection.selectionName('');
                                    selection.memoSelection('');
                                    selection.codeType(99);
                                    _.defer(function () {
                                        selection.codeType(perSelection.characterType);
                                    });
                                    self.checkCreateaaa(true);
                                    if (self.enableSelectionName() == true) {
                                        self.enableSelectionCd(true);
                                    }
                                    else {
                                        self.enableSelectionCd(false);
                                    }
                                    self.enableCreateNew(false);
                                    self.enableRegister(true);
                                    self.enableRemove(false);
                                    self.enableOpenDialogB(false);
                                    self.focus.code(true);
                                };
                                // enableFuctionArea
                                ScreenModel.prototype.setEnableFuctionArea = function (value) {
                                    var self = this;
                                    self.enableCreateNew(value);
                                    self.enableRemove(value);
                                    self.enableRegister(value);
                                    self.enableOpenDialogB(value);
                                };
                                ScreenModel.prototype.setEnableDisplay5 = function (value) {
                                    var self = this;
                                    self.enableCreateNew(value);
                                    self.enableRemove(value);
                                    self.enableRegister(value);
                                    self.enableOpenDialogB(value);
                                    self.enableAddUpdateHist(value);
                                    self.enableDelHist(value);
                                };
                                //検証チェヂ� 
                                ScreenModel.prototype.validate = function () {
                                    $(".nts-editor").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        return false;
                                    }
                                    return true;
                                };
                                //登録ボタン
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    if (self.validate()) {
                                        if (self.checkCreateaaa()) {
                                            self.add();
                                        }
                                        else {
                                            self.update();
                                        }
                                    }
                                };
                                //新規モー�
                                ScreenModel.prototype.add = function () {
                                    var self = this, currentItem = self.selection(), _selectionCD = _.find(self.listSelection(), function (x) { return x.selectionCD == currentItem.selectionCD(); }), histId = self.historySelection().histId();
                                    if (!self.checkSelectionConstraints())
                                        return;
                                    currentItem.histId(self.historySelection().histId());
                                    var command = ko.toJS(currentItem);
                                    if (_selectionCD) {
                                        $('#code').ntsError('set', { messageId: "Msg_3" });
                                    }
                                    else {
                                        self.enableRegister(false);
                                        a_1.service.saveDataSelection(command).done(function (newSelectionId) {
                                            self.listSelection.removeAll();
                                            block.grayout();
                                            a_1.service.getAllOrderItemSelection(histId)
                                                .done(function (itemList) {
                                                if (itemList && itemList.length) {
                                                    itemList.forEach(function (x) { return self.listSelection.push(x); });
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                        if (itemList.length == 1) {
                                                            nts.uk.ui.dialog.info({ messageId: "Msg_530" }).then(function () {
                                                            });
                                                        }
                                                        self.enableRemove(true);
                                                        self.enableOpenDialogB(true);
                                                        self.enableCreateNew(true);
                                                        self.selection().selectionID(newSelectionId);
                                                        self.enableRegister(true);
                                                    });
                                                }
                                            });
                                        }).always(function () { return block.clear(); });
                                        self.enableRegister(true);
                                        self.checkCreateaaa(false);
                                    }
                                };
                                //更新モー�
                                ScreenModel.prototype.update = function () {
                                    var self = this, currentItem = self.selection(), listSelection = self.listSelection(), perInfoSelectionItem = self.perInfoSelectionItem(), _selectionCD = _.find(listSelection, function (x) { return x.selectionCD == currentItem.selectionCD(); });
                                    if (!self.checkSelectionConstraints())
                                        return;
                                    currentItem.histId(self.historySelection().histId());
                                    var command = ko.toJS(currentItem);
                                    block.grayout();
                                    a_1.service.updateDataSelection(command).done(function () {
                                        self.listSelection.removeAll();
                                        a_1.service.getAllOrderItemSelection(self.historySelection().histId()).done(function (itemList) {
                                            if (itemList && itemList.length) {
                                                itemList.forEach(function (x) { return self.listSelection.push(x); });
                                            }
                                            var oldIndex = _.findIndex(itemList, function (x) { return x.selectionID == currentItem.selectionID(); });
                                            var newItem = itemList[oldIndex];
                                            currentItem.selectionID(newItem.selectionID);
                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                self.selection().selectionID.valueHasMutated();
                                            });
                                        });
                                    }).always(function () { return block.clear(); });
                                };
                                //削除ボタン
                                ScreenModel.prototype.remove = function () {
                                    var self = this, currentItem = self.selection(), listSelection = self.listSelection();
                                    currentItem.histId(self.historySelection().histId());
                                    var command = ko.toJS(currentItem);
                                    var oldIndex = _.findIndex(listSelection, function (x) { return x.selectionID == currentItem.selectionID(); });
                                    var lastIndex = self.listSelection().length - 1;
                                    confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        a_1.service.removeDataSelection(command).done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                self.listSelection.removeAll();
                                                a_1.service.getAllOrderItemSelection(self.historySelection().histId()).done(function (itemList) {
                                                    if (itemList) {
                                                        itemList.forEach(function (x) { return self.listSelection.push(x); });
                                                        if (oldIndex == lastIndex) {
                                                            oldIndex--;
                                                        }
                                                        var newItem = itemList[oldIndex];
                                                        currentItem.selectionID(newItem.selectionID);
                                                    }
                                                    else {
                                                        self.historySelection().histId.valueHasMutated();
                                                    }
                                                });
                                            });
                                        });
                                        if (self.listSelection().length > 1) {
                                            self.checkCreateaaa(false);
                                        }
                                        else {
                                            self.createNewData();
                                            self.checkCreateaaa(true);
                                        }
                                    }).ifNo(function () {
                                        self.selection().selectionID.valueHasMutated();
                                    });
                                };
                                // 履歴削除をす�
                                ScreenModel.prototype.removeHistory = function () {
                                    var self = this;
                                    var perInfoSelectionItem = self.perInfoSelectionItem();
                                    var command = {
                                        selectionItemId: perInfoSelectionItem.selectionItemId(),
                                        histId: self.historySelection().histId()
                                    };
                                    confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        a_1.service.removeHistory(command).done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                perInfoSelectionItem.selectionItemId.valueHasMutated();
                                            });
                                        });
                                    }).ifNo(function () {
                                        self.selection().selectionID.valueHasMutated();
                                    });
                                };
                                // 選択肢未登録会社へ反映する
                                ScreenModel.prototype.ReflUnrComp = function () {
                                    var self = this;
                                    var command = { 'selectionItemId': self.perInfoSelectionItem().selectionItemId() };
                                    if (command.selectionItemId == "")
                                        return;
                                    confirm({ messageId: "Msg_532", messageParams: ["1"] }).ifYes(function () {
                                        invisible();
                                        a_1.service.reflUnrComp(command).done(function () {
                                            unblock();
                                            nts.uk.ui.dialog.info({ messageId: "Msg_81" }).then(function () {
                                                self.selection().selectionID.valueHasMutated();
                                            });
                                        });
                                    }).ifNo(function () {
                                        return;
                                    });
                                };
                                //ダイアログC画面
                                ScreenModel.prototype.openDialogB = function () {
                                    var self = this, hist = self.historySelection(), currentItem = self.orderSelection();
                                    setShared('selectedHisId', self.historySelection().histId());
                                    block.invisible();
                                    modal('/view/cps/017/b/index.xhtml', { title: '' }).onClosed(function () {
                                        if (getShared('closeButton') == true) {
                                            block.clear();
                                            return;
                                        }
                                        hist.histId.valueHasMutated();
                                        block.clear();
                                    });
                                };
                                //ダイアログC画面
                                ScreenModel.prototype.openDialogC = function () {
                                    var self = this;
                                    var perInfoSelectionItem = self.perInfoSelectionItem();
                                    var selectionItemName = perInfoSelectionItem.selectionItemName();
                                    var selectionItemId = perInfoSelectionItem.selectionItemId();
                                    var histId = self.historySelection().histId();
                                    setShared('CPS017C_PARAMS', { id: selectionItemId, name: selectionItemName, histId: histId });
                                    block.invisible();
                                    modal('/view/cps/017/c/index.xhtml', { title: '' }).onClosed(function () {
                                        block.clear();
                                        //reload lai History:
                                        perInfoSelectionItem.selectionItemId.valueHasMutated();
                                    });
                                };
                                //ダイアログD画面
                                ScreenModel.prototype.openDialogD = function () {
                                    var self = this;
                                    var perInfoSelectionItem = self.perInfoSelectionItem();
                                    var selectingHistory = self.historySelection();
                                    var param = {
                                        id: perInfoSelectionItem.selectionItemId(),
                                        name: perInfoSelectionItem.selectionItemName(),
                                        histId: selectingHistory.histId(),
                                        startDate: selectingHistory.startDate()
                                    };
                                    setShared('CPS017D_PARAMS', param);
                                    block.invisible();
                                    modal('/view/cps/017/d/index.xhtml', { title: '' }).onClosed(function () {
                                        block.clear();
                                        //reload lai History:
                                        perInfoSelectionItem.selectionItemId.valueHasMutated();
                                    });
                                };
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                //check constraints from cps 016
                                ScreenModel.prototype.checkSelectionConstraints = function () {
                                    var self = this, selCD = self.selection().selectionCD(), selName = self.selection().selectionName(), exCd = self.selection().externalCD(), 
                                    //fibux: 23.2.2018
                                    selIteClass = self.perInfoSelectionItem().selectionItemClassification(), allValid = true;
                                    if (!self.constraints)
                                        return false;
                                    if (selCD.length > self.constraints.selectionCode) {
                                        allValid = false;
                                        $('#code').ntsError('set', getText('CPS017_21') + "は" + self.constraints.selectionCode + "桁を超えない");
                                    }
                                    if (selName.length > self.constraints.selectionName) {
                                        allValid = false;
                                        $('#name').ntsError('set', getText('CPS017_22') + "は" + self.constraints.selectionName + "桁を超えない");
                                    }
                                    if (exCd.length > self.constraints.selectionExternalCode && exCd != "") {
                                        allValid = false;
                                        $('#exCode').ntsError('set', getText('CPS017_24') + "は" + self.constraints.selectionExternalCode + "桁を超えない");
                                    }
                                    return allValid;
                                };
                                /*
                                  * Print file excel
                                  */
                                ScreenModel.prototype.saveAsExcel = function () {
                                    var self = this;
                                    //                modal("/view/cmm/051/m/index.xhtml").onClosed(function() {
                                    //                });
                                    var params = {
                                        date: null,
                                        mode: 1
                                    };
                                    if (!nts.uk.ui.windows.getShared("CDL028_INPUT")) {
                                        nts.uk.ui.windows.setShared("CDL028_INPUT", params);
                                    }
                                    nts.uk.ui.windows.sub.modal("/view/cdl/028/a/index.xhtml").onClosed(function () {
                                        var result = getShared('CDL028_A_PARAMS');
                                        if (result.status) {
                                            nts.uk.ui.block.grayout();
                                            var langId = self.langId();
                                            var date = moment.utc(result.standardDate, "YYYY/MM/DD");
                                            a_1.service.saveAsExcel(langId, date).done(function () {
                                                //nts.uk.ui.windows.close();
                                            }).fail(function (error) {
                                                nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                                            }).always(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        }
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var SelectionItem = /** @class */ (function () {
                                function SelectionItem(param) {
                                    this.selectionItemId = ko.observable('');
                                    this.selectionItemName = ko.observable('');
                                    this.characterType = ko.observable(1);
                                    this.codeLength = ko.observable(null);
                                    this.nameLength = ko.observable(null);
                                    this.extraCodeLength = ko.observable(null);
                                    this.selectionItemClassification = ko.observable();
                                    var self = this;
                                    self.selectionItemId(param.selectionItemId || '');
                                    self.selectionItemName(param.selectionItemName || '');
                                    self.characterType(param.characterType ? 1 : 0);
                                    self.codeLength(param.codeLength);
                                    self.nameLength(param.nameLength);
                                    self.extraCodeLength(param.extraCodeLength);
                                    self.selectionItemClassification((param.shareChecked ? 0 : 1) || '');
                                }
                                return SelectionItem;
                            }());
                            var HistorySelection = /** @class */ (function () {
                                function HistorySelection(param) {
                                    this.histId = ko.observable('');
                                    this.selectionItemId = ko.observable('');
                                    this.companyId = ko.observable('');
                                    this.startDate = ko.observable('');
                                    this.endDate = ko.observable('');
                                    var self = this;
                                    self.histId(param.histId || '');
                                    self.selectionItemId(param.selectionItemId || '');
                                    self.companyId(param.companyId || '');
                                    self.startDate(param.startDate || '');
                                    self.endDate(param.endDate || '');
                                }
                                return HistorySelection;
                            }());
                            var Selection = /** @class */ (function () {
                                function Selection(param) {
                                    this.selectionID = ko.observable('');
                                    this.histId = ko.observable('');
                                    this.selectionCD = ko.observable('');
                                    this.selectionName = ko.observable('');
                                    this.externalCD = ko.observable('');
                                    this.memoSelection = ko.observable('');
                                    this.initSelection = ko.observable();
                                    this.codeType = ko.observable(0);
                                    this.codeTypeConstraint = ko.observable('');
                                    var self = this;
                                    self.selectionID(param.selectionID || '');
                                    self.histId(param.histId || '');
                                    self.selectionCD(param.selectionCD || '');
                                    self.selectionName(param.selectionName || '');
                                    self.externalCD(param.externalCD || '');
                                    self.memoSelection(param.memoSelection || '');
                                    self.initSelection(param.initSelection || '');
                                    self.codeType(param.codeType || 0);
                                }
                                return Selection;
                            }());
                            var OrderSelection = /** @class */ (function () {
                                function OrderSelection(param) {
                                    this.selectionID = ko.observable('');
                                    this.histId = ko.observable('');
                                    this.disporder = ko.observable('');
                                    this.initSelection = ko.observable('');
                                    var self = this;
                                    self.selectionID(param.selectionID || '');
                                    self.histId(param.histId || '');
                                    self.disporder(param.disporder || '');
                                    self.initSelection(param.initSelection || '');
                                }
                                return OrderSelection;
                            }());
                        })(viewmodel = a_1.viewmodel || (a_1.viewmodel = {}));
                    })(a = cps017.a || (cps017.a = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
function makeIcon(value, row) {
    if (value == 1)
        return "●";
    return '';
}
//# sourceMappingURL=cps017.a.vm.js.map