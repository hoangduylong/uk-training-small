module nts.uk.com.view.cmf002.f.viewmodel {
    import close = nts.uk.ui.windows.close;
    import getText = nts.uk.resource.getText;
    import model = cmf002.share.model;
    import info = nts.uk.ui.dialog.info;
    import alertError = nts.uk.ui.dialog.alertError;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import block = nts.uk.ui.block;
    export class ScreenModel {
        condSetCd: KnockoutObservable<string> = ko.observable('');
        conditionSetName: KnockoutObservable<string> = ko.observable('');
        categoryName: KnockoutObservable<string> = ko.observable('');
        externalOutputCategoryItemData: KnockoutObservable<ExternalOutputCategoryItemData> = ko.observable(new ExternalOutputCategoryItemData({
            itemNo: '',
            itemName: '',
            categoryId: '',
            itemType: ''
        }));
        outputItemList: KnockoutObservableArray<IOutputItem> = ko.observableArray([]);
        categoryItemList: KnockoutObservableArray<any> = ko.observableArray([]);
        selectionItemList: KnockoutObservableArray<any> = ko.observableArray([]);
        selectedOutputItemCode: KnockoutObservable<number> = ko.observable(-1);
        selectedCategoryItemCodeList: KnockoutObservableArray<any> = ko.observableArray([]);
        selectedSelectionItemList: KnockoutObservableArray<number> = ko.observableArray([]);
        itemTypeItems: KnockoutObservableArray<model.ItemModel> = ko.observableArray(getItemType());
        selectedItemType: KnockoutObservable<number> = ko.observable(-1);
        selectedAddOutputItem: KnockoutObservableArray<any> = ko.observableArray([]);
        // getShared from screen B
        categoryId: KnockoutObservable<number> = ko.observable('');
        excursionMode: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            let self = this;
            paramC = getShared('CMF002_F_PARAMS');
            self.condSetCd(paramC.conditionSetCode);
            self.conditionSetName(paramC.conditionSetName);
            self.categoryId(paramC.categoryId);
            self.categoryName(paramC.categoryName);
            self.initScreen();
        }
        initScreen() {
            let self = this;
            block.invisible();
            service.getOutputItem(self.condSetCd()).done(function(data: Array<any>) {
                if (data && data.length) {
                    _.sortBy(data, [function(o) { return o.outputItemCode; }]);
                    self.outputItemList(data);
                }
            })
            service.getCtgData(self.categoryId()).done(function(data: Array<any>) {
                if (data && data.length) {
                    data = _.map(data, item => {
                        // [ver62] ドメインモデル「外部出力カテゴリ項目データ.予約語区分」の値から予約語に変換するかどうか判断する
                        const itemName: string = item.keywordAtr === 1
                            ? self.reverseWord(item.itemName)
                            : item.itemName;
                        item.itemName = itemName;
                        return item;
                    });
                    let listcategoryItemData = _.sortBy(data, ['itemNo']);
                    self.categoryItemList(listcategoryItemData);
                    self.selectedItemType.subscribe(code => {
                        if (code == 10) {
                            self.categoryItemList(listcategoryItemData);
                        } else {
                            self.categoryItemList(_.filter(listcategoryItemData, ['itemType', code]));
                        }
                    });
                }
            }).always(() => {
                block.clear();
            });
        }

        //終了する
        closeDialog() {
            let self = this;
            setShared('CMF002_C_PARAMS_FROM_F', { isUpdateExecution: self.excursionMode() });
            close();
        }

        btnRightClick() {
            let self = this;
            let count = 0;
            if (self.selectionItemList().length) {
                let _listselectionItemId = _.map(self.selectionItemList(), function(o) { return parseInt(o.id) });
                count = (_.max(_listselectionItemId) + 1)
            }
            if (self.selectedCategoryItemCodeList()) {
                let _dataTemp = [];
                for (let item of self.selectedCategoryItemCodeList()) {
                    let _selectedItem = _.find(self.categoryItemList(), function(x) { return x.itemNo == item });
                    let _outputSelection: IExternalOutputSelection = {
                        id: count.toString(),
                        itemNo: _selectedItem.itemNo,
                        itemName: _selectedItem.itemName,
                        categoryId: _selectedItem.categoryId,
                        itemType: _selectedItem.itemType
                    };
                    _dataTemp.push(_outputSelection);
                    count++;
                }
                self.selectionItemList.push.apply(self.selectionItemList, _dataTemp);
            }
        }

        btnLeftClick() {
            let self = this;
            if (self.selectedSelectionItemList()) {
                for (let id of self.selectedSelectionItemList()) {
                    let _selectedItem = _.find(self.selectionItemList(), function(x) { return x.id == id });
                    self.selectionItemList.remove(_selectedItem);
                }
            }
        }

        register() {
            let self = this;
            if (self.selectionItemList().length) {
                block.invisible();
                self.selectedAddOutputItem.removeAll();
                let _listOutputItemCode = _.map(self.outputItemList(), function(o) { return parseInt(o.outputItemCode) });
                for (let item of self.selectionItemList()) {
                    var _selectedItem = _.find(self.selectionItemList(), function(x) { return x.id == item.id });
                    self.selectedAddOutputItem.push(ko.toJS(new AddOutputItem(parseInt(_.max(_listOutputItemCode)), self.condSetCd(), _selectedItem.itemName, _selectedItem.itemType, _selectedItem.itemNo, _selectedItem.categoryId)));
                }
                let _outputItemCode = self.outputItemList().length == 0 ? 0 : parseInt(_.max(_listOutputItemCode));
                if ((_outputItemCode + self.selectedAddOutputItem().length) <= 999) {
                    service.addOutputItem(self.selectedAddOutputItem()).done(function() {
                        self.excursionMode(true);
                        info({ messageId: "Msg_15" });
                        service.getOutputItem(self.condSetCd()).done(function(data: Array<any>) {
                            if (data && data.length) {
                                _.sortBy(data, [function(o) { return o.outputItemCode; }]);
                                self.outputItemList(data);
                            }
                        })
                        self.selectionItemList.removeAll();
                    }).always(function() {
                        block.clear();
                    });
                    } else {
                    alertError({ messageId: 'Msg_1444' });
                    block.clear();
                }
            } else {
                alertError({ messageId: 'Msg_656' });
            }
        }

        start(): JQueryPromise<any> {
            let self = this;
            var dfd = $.Deferred();
            dfd.resolve();
            return dfd.promise();
        }

        // Reverse word
        private reverseWord(word: string): string {
            const mapReveseWord = {
                employment: '雇用呼称',
                department: '部門呼称',
                class: '分類呼称',
                jobTitle: '職位呼称',
                person: '社員呼称',
                office: '事業所呼称',
                work: '作業呼称',
                workPlace: '職場呼称',
                project: 'プロジェクト',
                adHocWork: '臨時勤務',
                substituteHoliday: '振休',
                substituteWork: '振出',
                compensationHoliday: '代休',
                exsessHoliday: '60H超過休暇',
                bindingTime: '拘束時間',
                payAbsenseDays: '給与欠勤日数',
                payAttendanceDays: '給与出勤日数',
                import: '取込',
                toppage: 'トップページ',
                code: 'コード',
                name: '名称',
            };
            const keyword: string = word.substring(
                word.lastIndexOf("{#") + 2,
                word.lastIndexOf("#}")
            );
            const reveseWord: string = mapReveseWord[keyword];
            if (!reveseWord) {
                return word;
            }
            return word.replace(`{#${keyword}#}`, reveseWord);
        }
    }

    //項目型
    export function getItemType(): Array<model.ItemModel> {
        return [
            new model.ItemModel(10, getText("CMF002_406")),
            new model.ItemModel(0, getText("Enum_ItemType_NUMERIC")),
            new model.ItemModel(1, getText("Enum_ItemType_CHARACTER")),
            new model.ItemModel(2, getText("Enum_ItemType_DATE")),
            new model.ItemModel(3, getText("Enum_ItemType_TIME")),
            new model.ItemModel(4, getText("Enum_ItemType_INS_TIME")),
            new model.ItemModel(7, getText("Enum_ItemType_IN_SERVICE"))
        ];
    }

    //出力項目(定型/ユーザ)
    export interface IOutputItem {
        outputItemCode: string;
        outputItemName: string;
    }

    export class OutputItem {
        outputItemCode: KnockoutObservable<string> = ko.observable('');
        outputItemname: KnockoutObservable<string> = ko.observable('');
        constructor(param: IOutputItem) {
            let self = this;
            self.outputItemCode(param.outputItemCode || '');
            self.outputItemname(param.outputItemName || '');
        }
    }

    //外部出力カテゴリ項目データ
    export interface IExternalOutputCategoryItemData {
        itemNo: any;
        itemName: string;
        categoryId: number;
        itemType: number;
    }

    export class ExternalOutputCategoryItemData {
        itemNo: KnockoutObservable<any> = ko.observable('');
        itemName: KnockoutObservable<string> = ko.observable('');
        categoryId: KnockoutObservable<number> = ko.observable('');
        itemType: KnockoutObservable<number> = ko.observable('');
        constructor(param: IExternalOutputCategoryItemData) {
            let self = this;
            self.itemNo(param.itemNo || '');
            self.itemName(param.itemName || '');
            self.categoryId(param.categoryId || '');
            self.itemType(param.itemType || '');
        }
    }


    export interface IExternalOutputSelection {
        id: number;
        itemNo: number;
        itemName: string;
        categoryId: number;
        itemType: number;
    }

    export class ExternalOutputSelection {
        id: number = 0;
        itemNo: KnockoutObservable<number> = ko.observable('');
        itemName: KnockoutObservable<string> = ko.observable('');
        categoryId: KnockoutObservable<number> = ko.observable('');
        itemType: KnockoutObservable<number> = ko.observable('');
        constructor(param: IExternalOutputSelection) {
            let self = this;
            self.id = param.id;
            self.itemNo(param.itemNo || '');
            self.itemName(param.itemName || '');
            self.categoryId(param.categoryId || '');
            self.itemType(param.itemType || '');
        }
    }


    export interface IAddOutputItem {
        outItemCd: number;
        condSetCd: string;
        outItemName: string;
        itemType: number;
        itemNo: number;
        categoryId: number;
    }

    export class AddOutputItem {
        outItemCd: KnockoutObservable<number> = ko.observable('');
        condSetCd: KnockoutObservable<string> = ko.observable('');
        outItemName: KnockoutObservable<string> = ko.observable('');
        itemType: KnockoutObservable<number> = ko.observable('');
        itemNo: KnockoutObservable<number> = ko.observable('');
        categoryId: KnockoutObservable<number> = ko.observable('');
        constructor(outItemCd: number, condSetCd: string, outItemName: string, itemType: number, itemNo: number, categoryId: number) {
            let self = this;
            self.outItemCd(outItemCd);
            self.condSetCd(condSetCd);
            self.outItemName(outItemName);
            self.itemType(itemType);
            self.itemNo(itemNo);
            self.categoryId(categoryId);
        }
    }
}
