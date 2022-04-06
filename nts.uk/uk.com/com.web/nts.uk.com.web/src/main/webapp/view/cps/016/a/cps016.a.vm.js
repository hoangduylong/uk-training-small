var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps016;
                (function (cps016) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var confirm = nts.uk.ui.dialog.confirm;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.listItems = ko.observableArray([]);
                                    this.perInfoSelectionItem = ko.observable(new SelectionItem1({ selectionItemId: '', selectionItemName: '' }));
                                    this.isDialog = ko.observable(false);
                                    this.isMaCoLog = ko.observable(false);
                                    this.langId = ko.observable('ja');
                                    this.param = getShared('CPS005B_PARAMS');
                                    var self = this;
                                    var perInfoSelectionItem = self.perInfoSelectionItem();
                                    perInfoSelectionItem.selectionItemId.extend({ notify: "always" });
                                    self.checkCreate = ko.observable(true);
                                    self.closeUp = ko.observable(false);
                                    if (self.param) {
                                        self.isDialog(self.param.isDialog);
                                    }
                                    ;
                                    self.rulesFirst = ko.observableArray([
                                        { id: 0, name: getText('Enum_SelectionCodeCharacter_NUMBER_TYPE') },
                                        { id: 1, name: getText('Enum_SelectionCodeCharacter_CHARATERS_TYPE') }
                                    ]);
                                    perInfoSelectionItem.selectionItemId.subscribe(function (x) {
                                        if (x) {
                                            block.invisible();
                                            a.service.getPerInfoSelectionItem(x).done(function (_perInfoSelectionItem) {
                                                if (_perInfoSelectionItem) {
                                                    perInfoSelectionItem.selectionItemName(_perInfoSelectionItem.selectionItemName);
                                                    perInfoSelectionItem.characterType(_perInfoSelectionItem.characterType);
                                                    perInfoSelectionItem.codeLength(_perInfoSelectionItem.codeLength);
                                                    perInfoSelectionItem.nameLength(_perInfoSelectionItem.nameLength);
                                                    perInfoSelectionItem.extraCodeLength(_perInfoSelectionItem.extraCodeLength);
                                                    perInfoSelectionItem.shareChecked(_perInfoSelectionItem.shareChecked);
                                                    perInfoSelectionItem.memo(_perInfoSelectionItem.memo);
                                                    perInfoSelectionItem.integrationCode(_perInfoSelectionItem.integrationCode);
                                                }
                                                block.clear();
                                                nts.uk.ui.errors.clearAll();
                                                $("#selectionItemName").focus();
                                            });
                                            self.checkCreate(false);
                                        }
                                        else if (!self.checkCreate()) {
                                            self.registerDataSelectioItem();
                                        }
                                    });
                                }
                                //開�
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var groupCompanyAdmin = __viewContext.user.role.groupCompanyAdmin, systemAdmin = __viewContext.user.role.systemAdmin;
                                    if (groupCompanyAdmin === 'null' && systemAdmin === 'null') {
                                        alertError({ messageId: "Msg_1103" }).then(function () {
                                            uk.request.jumpToTopPage();
                                        });
                                    }
                                    else {
                                        var dfd_1 = $.Deferred();
                                        nts.uk.ui.errors.clearAll();
                                        block.invisible();
                                        // get selection items
                                        self.getAllSelectionItems().done(function () {
                                            if (nts.uk.util.isNullOrUndefined(self.param)) {
                                                if (self.listItems().length > 0) {
                                                    self.perInfoSelectionItem().selectionItemId(self.listItems()[0].selectionItemId);
                                                }
                                                else {
                                                    self.registerDataSelectioItem();
                                                }
                                            }
                                            else {
                                                if (self.param && !nts.uk.util.isNullOrUndefined(self.param.selectionItemId)) {
                                                    self.perInfoSelectionItem().selectionItemId(self.param.selectionItemId);
                                                }
                                                else {
                                                    self.perInfoSelectionItem().selectionItemId(self.listItems()[0].selectionItemId);
                                                }
                                                self.listItems.valueHasMutated();
                                            }
                                            block.clear();
                                            $("#selectionItemName").focus();
                                            dfd_1.resolve();
                                        });
                                        return dfd_1.promise();
                                    }
                                };
                                ScreenModel.prototype.getAllSelectionItems = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.grayout();
                                    a.service.getAllSelectionItems().done(function (itemList) {
                                        self.listItems.removeAll();
                                        if (itemList && itemList.length > 0) {
                                            self.listItems(itemList);
                                            //itemList.forEach(x => self.listItems.push(x));
                                        }
                                        else { //0件の場� エラーメヂ�ージの表示(#Msg_455)
                                            alertError({ messageId: "Msg_455" });
                                            self.registerDataSelectioItem();
                                            //$("#selectionItemName").focus();
                                        }
                                        dfd.resolve();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                //新規�タン
                                ScreenModel.prototype.registerDataSelectioItem = function () {
                                    var self = this;
                                    self.checkCreate(true);
                                    var perInfoSelectionItem = self.perInfoSelectionItem();
                                    nts.uk.ui.errors.clearAll();
                                    perInfoSelectionItem.selectionItemId('');
                                    perInfoSelectionItem.selectionItemName('');
                                    perInfoSelectionItem.characterType(false);
                                    perInfoSelectionItem.codeLength(null);
                                    perInfoSelectionItem.nameLength(null);
                                    perInfoSelectionItem.extraCodeLength(null);
                                    perInfoSelectionItem.shareChecked(false);
                                    perInfoSelectionItem.integrationCode('');
                                    perInfoSelectionItem.memo('');
                                    $("#selectionItemName").focus();
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
                                ScreenModel.prototype.addDataSelectioItem = function () {
                                    var self = this;
                                    if (self.validate()) {
                                        if (self.checkCreate() == true) {
                                            self.add();
                                        }
                                        else {
                                            self.update();
                                        }
                                    }
                                };
                                //新規モー�
                                ScreenModel.prototype.add = function () {
                                    var self = this;
                                    var command = ko.toJS(self.perInfoSelectionItem());
                                    block.invisible();
                                    //「個人惱の選択雮」を登録する
                                    a.service.addDataSelectionItem(command).done(function (selectId) {
                                        //画面頛�「選択雮名称一覧�選択雮名称一覧」を登録する
                                        self.getAllSelectionItems().done(function () {
                                            //「CPS017_個人惱の選択肢の登録」をモーダルダイアログで起動す�
                                            confirm({ messageId: "Msg_456" }).ifYes(function () {
                                                self.perInfoSelectionItem().selectionItemId(selectId);
                                                var params = {
                                                    isDialog: true,
                                                    selectionItemId: ko.toJS(self.perInfoSelectionItem().selectionItemId)
                                                };
                                                setShared('CPS017_PARAMS', params);
                                                modal('/view/cps/017/a/index.xhtml', { title: '', height: 750, width: 1260 }).onClosed(function () {
                                                });
                                            }).then(function () {
                                                self.perInfoSelectionItem().selectionItemId(selectId);
                                            });
                                        });
                                    }).fail(function (error) {
                                        alertError({ messageId: "Msg_513" });
                                        block.clear();
                                    });
                                };
                                //更新モー�
                                ScreenModel.prototype.update = function () {
                                    var self = this;
                                    var command = ko.toJS(self.perInfoSelectionItem());
                                    block.invisible();
                                    //「個人惱の選択雮」を更新する
                                    a.service.updateDataSelectionItem(command).done(function () {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            //画面頛�「選択雮名称一覧�選択雮名称一覧」を更新する
                                            self.getAllSelectionItems().done(function () {
                                                $("#selectionItemName").focus();
                                            });
                                        });
                                        self.listItems.valueHasMutated();
                                    }).fail(function (error) {
                                        alertError({ messageId: "Msg_513" });
                                        block.clear();
                                    });
                                };
                                //削除ボタン
                                ScreenModel.prototype.removeDataSelectioItem = function () {
                                    var self = this;
                                    var currentItem = self.perInfoSelectionItem();
                                    var listItems = self.listItems();
                                    var oldIndex = _.findIndex(listItems, function (x) { return x.selectionItemId == currentItem.selectionItemId(); });
                                    var lastIndex = listItems.length - 1;
                                    var command = ko.toJS(currentItem);
                                    block.grayout();
                                    a.service.checkUseSelectionItem(currentItem.selectionItemId()).done(function (result) {
                                        if (result) {
                                            alertError({ messageId: "Msg_1431" });
                                        }
                                        else {
                                            confirm({ messageId: "Msg_551" }).ifYes(function () {
                                                block.grayout();
                                                a.service.removeDataSelectionItem(command).done(function () {
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                        self.getAllSelectionItems().done(function () {
                                                            if (self.listItems().length > 0) {
                                                                if (oldIndex == lastIndex) {
                                                                    oldIndex--;
                                                                }
                                                                var newItem = self.listItems()[oldIndex];
                                                                currentItem.selectionItemId(newItem.selectionItemId);
                                                            }
                                                            //                        self.listItems.valueHasMutated();
                                                            else {
                                                                self.registerDataSelectioItem();
                                                            }
                                                        });
                                                    });
                                                    self.listItems.valueHasMutated();
                                                }).always(function () {
                                                    block.clear();
                                                });
                                            });
                                        }
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.exportExcel = function () {
                                    var self = this;
                                    nts.uk.ui.block.grayout();
                                    var langId = self.langId();
                                    a.service.saveAsExcel(langId).done(function () {
                                    }).fail(function (error) {
                                        nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                // 選択肢の登録ボタン
                                ScreenModel.prototype.OpenCPS017 = function () {
                                    var self = this, params = {
                                        isDialog: true,
                                        selectionItemId: ko.toJS(self.perInfoSelectionItem().selectionItemId)
                                    };
                                    setShared('CPS017_PARAMS', params);
                                    modal('/view/cps/017/a/index.xhtml', { title: '', height: 750, width: 1260 }).onClosed(function () {
                                    });
                                    $("#selectionItemName").focus();
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.masterCorrLog = function () {
                                    //chua phat trien:    
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var SelectionItem1 = /** @class */ (function () {
                                function SelectionItem1(param) {
                                    this.selectionItemId = ko.observable('');
                                    this.selectionItemName = ko.observable('');
                                    this.characterType = ko.observable(false);
                                    this.codeLength = ko.observable(null);
                                    this.nameLength = ko.observable(null);
                                    this.extraCodeLength = ko.observable(null);
                                    this.shareChecked = ko.observable(false);
                                    this.integrationCode = ko.observable('');
                                    this.memo = ko.observable('');
                                    var self = this;
                                    self.selectionItemId(param.selectionItemId || '');
                                    self.selectionItemName(param.selectionItemName || '');
                                    self.characterType(param.characterType === 1 ? true : false);
                                    self.codeLength(param.codeLength || '');
                                    self.nameLength(param.nameLength || '');
                                    self.extraCodeLength(param.extraCodeLength || '');
                                    self.shareChecked(param.shareChecked);
                                    self.integrationCode(param.integrationCode || '');
                                    self.memo(param.memo || '');
                                }
                                return SelectionItem1;
                            }());
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cps016.a || (cps016.a = {}));
                })(cps016 = view.cps016 || (view.cps016 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps016.a.vm.js.map