module nts.uk.com.view.cps005.a {
    import getText = nts.uk.resource.getText;
    import confirm = nts.uk.ui.dialog.confirm;
    import alertError = nts.uk.ui.dialog.alertError;
    import info = nts.uk.ui.dialog.info;
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import textUK = nts.uk.text;
    import block = nts.uk.ui.block;
    export module viewmodel {
        export class ScreenModel {
            currentData: KnockoutObservable<DataModel>;
            isUpdate: boolean = false;
            isEnableButtonProceedA: KnockoutObservable<boolean>;

            constructor() {
                let self = this,
                    dataModel = new DataModel(null);
                self.currentData = ko.observable(dataModel);
                self.isEnableButtonProceedA = ko.observable(true);
            }

            startPage(): JQueryPromise<any> {
                let self = this,
                    dfd = $.Deferred();
                block.invisible();
                new service.Service().getAllPerInfoCtg().done(function(data: IData) {
                    self.isUpdate = false;
                    self.currentData(new DataModel(data));
                    if (data && data.categoryList && data.categoryList.length > 0) {
                        self.isUpdate = true;
                        self.currentData().perInfoCtgSelectCode(data.categoryList[0].id);
                        self.currentData().isEnableButtonProceed(true);
                    } else {
                        self.register();
                    }
                    block.clear();
                    dfd.resolve();
                }).fail(res => {
                    alertError({ messageId: res.messageId }).then(function() {
                        nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                    });
                });

                return dfd.promise();
            }

            reloadData(newCtgName?: string) {
                let self = this,
                    dfd = $.Deferred();
                new service.Service().getAllPerInfoCtg().done(function(data: IData) {
                    self.isUpdate = false;
                    if (data && data.categoryList && data.categoryList.length > 0) {
                        self.currentData().categoryList(_.map(data.categoryList, item => { return new PerInfoCtgModel(item) }));
                        self.isUpdate = true;
                        self.currentData().isEnableButtonProceed(true);
                        if (newCtgName) {
                            let newCtg = _.find(data.categoryList, item => { return item.categoryName == newCtgName });
                            self.currentData().perInfoCtgSelectCode(newCtg ? newCtg.id : "");
                        }
                    } else {
                        self.register();
                    }
                    dfd.resolve();
                })
                return dfd.promise();
            }

            register() {
                let self = this;
                nts.uk.ui.errors.clearAll();
                self.currentData().perInfoCtgSelectCode("");
                self.currentData().currentCtgSelected(new PerInfoCtgModel(null));
                self.isUpdate = false;
                $("#category-name-control").focus();
                self.currentData().isEnableButtonProceed(true);
                self.currentData().isEnableButtonOpenDialog(false);
                self.currentData().isHisTypeUpdateModel(false);
            }

            addUpdateData() {
                let self = this;
                if (!self.currentData().currentCtgSelected().perInfoCtgName()) {
                    $("#category-name-control").focus();
                    return;
                }
                block.invisible();

                if (self.isUpdate) {
                    let updateCategory = new UpdatePerInfoCtgModel(self.currentData().currentCtgSelected());
                    new service.Service().updatePerInfoCtg(updateCategory).done(function() {
                        self.reloadData();
                        info({ messageId: "Msg_15" }).then(() => {
                            let ctrl = $("#category-name-control"),
                                str = ctrl.val();

                            ctrl.focus().val('').val(str);
                            block.clear();
                        });
                    }).fail(res => {
                        if (res.messageId == 'Msg_928') {
                            alertError({
                                messageId: res.messageId,
                                messageParams: ["個人情報カテゴリ"]
                            }).then(() => {
                                $("#category-name-control").focus();
                            });
                        } else {

                            alertError({ messageId: res.messageId });
                        }
                        block.clear();
                    });
                } else {
                    let newCategory = new AddPerInfoCtgModel(self.currentData().currentCtgSelected());
                    new service.Service().addPerInfoCtg(newCategory).done(() => {
                        self.reloadData(newCategory.categoryName);
                            confirm({ messageId: "Msg_213" }).ifYes(() => {
                                let params = {
                                    categoryId: self.currentData().perInfoCtgSelectCode(),
                                    currentCtg: ko.toJS(self.currentData().currentCtgSelected()),
                                    isAdd: ko.toJS(self.currentData().currentCtgSelected().addItemObjCls())
                                };
                                setShared('CPS005_A', params);
                                modal("/view/cps/005/b/index.xhtml").onClosed(() => {
                                    let ctgCode = self.currentData().perInfoCtgSelectCode();
                                    self.currentData().perInfoCtgSelectCode("");
                                    self.currentData().perInfoCtgSelectCode(ctgCode);
                                    let ctrl = $("#category-name-control"),
                                        str = ctrl.val();

                                    ctrl.focus().val('').val(str);
                                    block.clear();
                                });
                            }).ifNo(() => {
                                let ctrl = $("#category-name-control"),
                                        str = ctrl.val();

                                 ctrl.focus().val('').val(str);
                                block.clear();
                            })
                    }).fail(res => {

                        if (res.messageId == 'Msg_928') {
                            alertError({
                                messageId: res.messageId,
                                messageParams: ["個人情報カテゴリ"]
                            }).then(() => {
                                $("#category-name-control").focus();
                            });
                        } else {
                            alertError({ messageId: res.messageId });
                        }
                        block.clear();
                    });
                }
            }

            openDialogB() {
                let self = this,
                    params = {
                        categoryId: self.currentData().perInfoCtgSelectCode(),
                        currentCtg: ko.toJS(self.currentData().currentCtgSelected()),
                        isAdd: ko.toJS(self.currentData().currentCtgSelected().addItemObjCls())

                    };
                if (nts.uk.text.isNullOrEmpty(params.categoryId)) {
                    return;
                }
                block.invisible();

                setShared('CPS005_A', params);
                modal("/view/cps/005/b/index.xhtml").onClosed(() => {
                    let ctgCode = self.currentData().perInfoCtgSelectCode();
                    self.currentData().perInfoCtgSelectCode("");
                    self.currentData().perInfoCtgSelectCode(ctgCode);
                    block.clear();
                });
            }
        }
    }

    export class DataModel {
        categoryList: KnockoutObservableArray<PerInfoCtgModel> = ko.observableArray([]);
        perInfoCtgSelectCode: KnockoutObservable<string> = ko.observable("");
        currentCtgSelected: KnockoutObservable<PerInfoCtgModel> = ko.observable(new PerInfoCtgModel(null));
        isEnableButtonProceed: KnockoutObservable<boolean> = ko.observable(true);
        isEnableButtonOpenDialog: KnockoutObservable<boolean> = ko.observable(false);
        isHisTypeUpdateModel: KnockoutObservable<boolean> = ko.observable(false);
        rowCategoryItems: number = Math.round((window.screen.height - 391)/23) >= 20 ? 20 : Math.round((window.screen.height - 391)/23);
        historyClassification: Array<any> = [
            { code: 1, name: getText("CPS005_53") },
            { code: 2, name: getText("CPS005_54") },
        ];
        //<!-- mapping CategoryType enum value = 3 or 4 or 5 . But using enum HistoryType to display -->
        historyTypes: Array<any> = new Array<any>();
        //mapping CategoryType enum value = 1 or 2. Theo thiết kế không lấy từ enum CategoryType
        singleMultipleType: Array<any> = [
            { value: 1, name: getText("CPS005_55") },
            { value: 2, name: getText("CPS005_56") },
        ];
        constructor(data: IData) {
            let self = this;
            self.rowCategoryItems = self.rowCategoryItems -1;
            if (data) {
                self.categoryList(_.map(data.categoryList, item => { return new PerInfoCtgModel(item) }));
                self.historyTypes = data.historyTypes ? data.historyTypes.splice(0, 3) : [];
            }
            //subscribe select category code
            self.perInfoCtgSelectCode.subscribe(newId => {
                if (textUK.isNullOrEmpty(newId)) return;
                nts.uk.ui.errors.clearAll();
                let vm = __viewContext['screenModel'];
                vm.isUpdate = true;
                new service.Service().getPerInfoCtgWithItemsName(newId).done(function(data: IPersonInfoCtg) {
                    self.currentCtgSelected(new PerInfoCtgModel(data));
                    nts.uk.ui.errors.clearAll();
                    self.isHisTypeUpdateModel(true);
                    self.isEnableButtonProceed(true);
                    self.isEnableButtonOpenDialog(true);
                    if (self.currentCtgSelected().fixedIsSelected()) {
                        self.isEnableButtonProceed(false);
                    }
                    let ctrl = $("#category-name-control"),
                        str = ctrl.val();
                    if($('input.ntsSearchBox.nts-editor.ntsSearchBox_Component:focus').length == 0){
                         ctrl.focus().val('').val(str);
                    }
                });
            });
        }
    }

    export class PerInfoCtgModel {
        id: string = "";
        categoryName: string = "";
        perInfoCtgName: KnockoutObservable<string> = ko.observable("");
        historyFixedName: string = "";
        categoryType: number = 1;
        categoryTypeName: string = "";
        personEmployeeType: number;
        historyClassSelected: KnockoutObservable<number> = ko.observable(1);
        historyClassSelectedText: KnockoutObservable<string> = ko.observable("");
        // historyTypesSelected and singleMulTypeSelected == categoryType
        historyTypesSelected: KnockoutObservable<number> = ko.observable(1);
        singleMulTypeSelected: KnockoutObservable<number> = ko.observable(1);
        itemNameList: KnockoutObservableArray<PerInfoItemModel> = ko.observableArray([]);
        //all visiable
        historyTypesDisplay: KnockoutObservable<boolean> = ko.observable(true);
        fixedIsSelected: KnockoutObservable<boolean> = ko.observable(false);
        isChangeAbleCtgType: KnockoutObservable<boolean> = ko.observable(true);
        initValMasterObjCls: KnockoutObservable<boolean> = ko.observable(true);
        addItemObjCls: KnockoutObservable<boolean> = ko.observable(true);
        constructor(data: IPersonInfoCtg) {
            let self = this;
            if (data) {
                self.id = data.id || "";
                self.categoryName = data.categoryName || "";
                self.perInfoCtgName(data.categoryName || "");
                self.itemNameList(_.map(data.itemNameList, item => { return new PerInfoItemModel(item) }));
                self.historyFixedName = (data.categoryType == 1 || data.categoryType == 2) ? getText("CPS005_54") : getText("CPS005_53");
                self.categoryType = data.categoryType;
                self.personEmployeeType = data.personEmployeeType;
                self.initValMasterObjCls(data.initValMasterObjCls)
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
                } else {
                    self.historyClassSelectedText(getText("CPS005_54"));
                }
                self.fixedIsSelected(data.isFixed == 1 ? true : false);
                self.isChangeAbleCtgType(data.changeAbleCtgType);
            }
            //subscribe select history type (1: history, 2: not history)
            self.historyClassSelected.subscribe(newHisClassification => {
                if (textUK.isNullOrEmpty(newHisClassification)) return;
                self.historyTypesDisplay(false);
                if (newHisClassification == 1) {
                    self.historyTypesDisplay(true);
                }
            });
        }
    }

    export class PerInfoItemModel {
        itemName: string;
        constructor(itemName: string) {
            let self = this;
            self.itemName = itemName;
        }
    }

    export class AddPerInfoCtgModel {
        categoryName: string;
        categoryType: number;
        constructor(data: PerInfoCtgModel) {
            let self = this;
            self.categoryName = data.perInfoCtgName();
            if (data.historyClassSelected() == 2) {
                self.categoryType = data.singleMulTypeSelected();
            } else {
                self.categoryType = data.historyTypesSelected() + 2;
            }
        }
    }

    export class UpdatePerInfoCtgModel {
        id: string;
        categoryName: string;
        categoryType: number;
        constructor(data: PerInfoCtgModel) {
            let self = this;
            self.id = data.id;
            self.categoryName = data.perInfoCtgName();
            if (data.historyClassSelected() == 2) {
                self.categoryType = data.singleMulTypeSelected();
            } else {
                self.categoryType = data.historyTypesSelected() + 2;
            }
        }
    }

    interface IData {
        historyTypes: any;
        categoryList: Array<IPersonInfoCtg>;
    }

    interface IPersonInfoCtg {
        id: string;
        categoryName: string;
        isFixed?: number;
        categoryType?: number;
        personEmployeeType: number;
        itemNameList?: Array<string>;
        isChangeAbleCtgType: boolean;
        initValMasterObjCls: boolean;
        addItemObjCls: boolean;
    }
}

