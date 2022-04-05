module nts.uk.com.view.cps016.a.viewmodel {
    import getText = nts.uk.resource.getText;
    import confirm = nts.uk.ui.dialog.confirm;
    import alertError = nts.uk.ui.dialog.alertError;
    import info = nts.uk.ui.dialog.info;
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import textUK = nts.uk.text;
    import block = nts.uk.ui.block;
    export class ScreenModel {
        listItems: KnockoutObservableArray<ISelectionItem1> = ko.observableArray([]);
        perInfoSelectionItem: KnockoutObservable<SelectionItem1> = ko.observable(new SelectionItem1({ selectionItemId: '', selectionItemName: '' }));
        rulesFirst: KnockoutObservableArray<IRule>;
        checkCreate: KnockoutObservable<boolean>;
        closeUp: KnockoutObservable<boolean>;
        isDialog: KnockoutObservable<boolean> = ko.observable(false);
        isMaCoLog: KnockoutObservable<boolean> = ko.observable(false);
        langId: KnockoutObservable<string> = ko.observable('ja');
        param: any = getShared('CPS005B_PARAMS');

        constructor() {
            let self = this;
            let perInfoSelectionItem: SelectionItem1 = self.perInfoSelectionItem();
            perInfoSelectionItem.selectionItemId.extend({notify:"always"});
            self.checkCreate = ko.observable(true);
            self.closeUp = ko.observable(false);
            if (self.param) {
                self.isDialog(self.param.isDialog);
            };
            self.rulesFirst = ko.observableArray([
                { id: 0, name: getText('Enum_SelectionCodeCharacter_NUMBER_TYPE') },
                { id: 1, name: getText('Enum_SelectionCodeCharacter_CHARATERS_TYPE') }
            ]);

            perInfoSelectionItem.selectionItemId.subscribe(x => {
                if (x) {
                    block.invisible();
                    service.getPerInfoSelectionItem(x).done((_perInfoSelectionItem: ISelectionItem1) => {
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
                } else if(!self.checkCreate()) {
                    self.registerDataSelectioItem();
                }
            });
        }

        //開�
        start(): JQueryPromise<any> {
            let self = this;
            let groupCompanyAdmin = __viewContext.user.role.groupCompanyAdmin,
                systemAdmin = __viewContext.user.role.systemAdmin;
            
            if (groupCompanyAdmin === 'null' && systemAdmin === 'null') {
                alertError({ messageId: "Msg_1103" }).then(() => {
                    uk.request.jumpToTopPage();
                });
            } else {
                let dfd = $.Deferred();

                nts.uk.ui.errors.clearAll();
                block.invisible();
                // get selection items
                self.getAllSelectionItems().done(() => {
                    if (nts.uk.util.isNullOrUndefined(self.param)){
                        if (self.listItems().length > 0){
                            self.perInfoSelectionItem().selectionItemId(self.listItems()[0].selectionItemId);
                        } else {
                            self.registerDataSelectioItem();
                        }
                    } else {
                        if (self.param && !nts.uk.util.isNullOrUndefined(self.param.selectionItemId)) {
                            self.perInfoSelectionItem().selectionItemId(self.param.selectionItemId);
                        } else {
                            self.perInfoSelectionItem().selectionItemId(self.listItems()[0].selectionItemId);
                        }   
                        self.listItems.valueHasMutated();
                    }
                    block.clear();
                    $("#selectionItemName").focus();
                    dfd.resolve();
                });
                return dfd.promise();
            }
        }

        getAllSelectionItems(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();
            block.grayout();
            service.getAllSelectionItems().done((itemList: Array<ISelectionItem1>) => {
                self.listItems.removeAll();
                if (itemList && itemList.length > 0) {
                    self.listItems(itemList);
                     //itemList.forEach(x => self.listItems.push(x));
                } else {//0件の場� エラーメヂ�ージの表示(#Msg_455)
                    alertError({ messageId: "Msg_455" });
                    self.registerDataSelectioItem();
                    //$("#selectionItemName").focus();
                }
                dfd.resolve();
            }).always(function(){
                block.clear();
            });
            return dfd.promise();
        }

        //新規�タン
        registerDataSelectioItem() {
            let self = this;
            self.checkCreate(true);
            let perInfoSelectionItem: SelectionItem1 = self.perInfoSelectionItem();
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
        }

        //検証チェヂ�
        validate() {
            $(".nts-editor").trigger("validate");
            if (nts.uk.ui.errors.hasError()) {
                return false;
            }
            return true;
        }

        //登録ボタン
        addDataSelectioItem() {
            var self = this;

            if (self.validate()) {
                if (self.checkCreate() == true) {
                    self.add();
                } else {
                    self.update();
                }
            }
        }

        //新規モー�
        add() {
            let self = this;
            let command = ko.toJS(self.perInfoSelectionItem());
            block.invisible();    
            //「個人惱の選択雮」を登録する
            service.addDataSelectionItem(command).done(function(selectId:any) {
                //画面頛�「選択雮名称一覧�選択雮名称一覧」を登録する
                self.getAllSelectionItems().done(() => {
                    //「CPS017_個人惱の選択肢の登録」をモーダルダイアログで起動す�
                    confirm({ messageId: "Msg_456" }).ifYes(() => {
                        self.perInfoSelectionItem().selectionItemId(selectId);
                        let params = {
                            isDialog: true,
                            selectionItemId: ko.toJS(self.perInfoSelectionItem().selectionItemId)
                        }
                        setShared('CPS017_PARAMS', params);
                        modal('/view/cps/017/a/index.xhtml', { title: '', height: 750, width: 1260 }).onClosed(function(): any {
                        });
                    }).then(() => {
                        self.perInfoSelectionItem().selectionItemId(selectId);
                    });
                });
            }).fail(error => {
                alertError({ messageId: "Msg_513" });
                block.clear();
            });
        }

        //更新モー�
        update() {
            let self = this;
            let command = ko.toJS(self.perInfoSelectionItem());
            block.invisible();    
            //「個人惱の選択雮」を更新する
            service.updateDataSelectionItem(command).done(function() {
                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                    //画面頛�「選択雮名称一覧�選択雮名称一覧」を更新する
                    self.getAllSelectionItems().done(() => {
                        $("#selectionItemName").focus();
                    });
                });
                self.listItems.valueHasMutated();

            }).fail(error => {
                alertError({ messageId: "Msg_513" });
                block.clear();
            });
        }

        //削除ボタン
        removeDataSelectioItem() {
            let self = this;
            let currentItem: SelectionItem1 = self.perInfoSelectionItem();
            let listItems: Array<SelectionItem1> = self.listItems();

            let oldIndex = _.findIndex(listItems, x => x.selectionItemId == currentItem.selectionItemId());
            let lastIndex = listItems.length - 1;

            let command = ko.toJS(currentItem);
            block.grayout();
            service.checkUseSelectionItem(currentItem.selectionItemId()).done(function(result: boolean){
                if(result){
                    alertError({ messageId: "Msg_1431" });
                }else{
                    confirm({ messageId: "Msg_551" }).ifYes(() => {
                        block.grayout();     
                        service.removeDataSelectionItem(command).done(function() {
                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(() => {
                                self.getAllSelectionItems().done(() => {
                                    if (self.listItems().length > 0) {
                                        if (oldIndex == lastIndex) {
                                            oldIndex--;
                                        }
                                        let newItem = self.listItems()[oldIndex];
                                        currentItem.selectionItemId(newItem.selectionItemId);
                                    }
                                    //                        self.listItems.valueHasMutated();
                                    else {
                                        self.registerDataSelectioItem();
                                    }
                                });
                            });
                            self.listItems.valueHasMutated();
                        }).always(function(){
                            block.clear()
                        });
                    });
                }
            }).always(function(){
                block.clear()
            });
        }
        
        private exportExcel(): void {
            var self = this;
            nts.uk.ui.block.grayout();
            let langId = self.langId();
            service.saveAsExcel(langId).done(function() {
            }).fail(function(error) {
                nts.uk.ui.dialog.alertError({ messageId: error.messageId });
            }).always(function() {
                nts.uk.ui.block.clear();
            });
        }
        
        // 選択肢の登録ボタン
        OpenCPS017() {
            let self = this,
                params = {
                    isDialog: true,
                    selectionItemId: ko.toJS(self.perInfoSelectionItem().selectionItemId)

                }
            setShared('CPS017_PARAMS', params);

            modal('/view/cps/017/a/index.xhtml', { title: '', height: 750, width: 1260 }).onClosed(function(): any {
            });
            $("#selectionItemName").focus();
        }

        closeDialog() {
            nts.uk.ui.windows.close();
        }

        masterCorrLog() {
            //chua phat trien:    
        }

    }

    interface ISelectionItem1 {

        selectionItemId: string;
        selectionItemName: string;

        characterType?: number;
        codeLength?: number;
        nameLength?: number;
        extraCodeLength?: number;

        shareChecked?: boolean;
        integrationCode?: string;
        memo?: string;

    }

    class SelectionItem1 {
        selectionItemId: KnockoutObservable<string> = ko.observable('');
        selectionItemName: KnockoutObservable<string> = ko.observable('');

        characterType: KnockoutObservable<boolean> = ko.observable(false);
        codeLength: KnockoutObservable<number> = ko.observable(null);
        nameLength: KnockoutObservable<number> = ko.observable(null);
        extraCodeLength: KnockoutObservable<number> = ko.observable(null);

        shareChecked: KnockoutObservable<boolean> = ko.observable(false);

        integrationCode: KnockoutObservable<string> = ko.observable('');
        memo: KnockoutObservable<string> = ko.observable('');

        constructor(param: ISelectionItem1) {
            let self = this;
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
    }

    interface IRule {
        id: number;
        name: string;
    }
}