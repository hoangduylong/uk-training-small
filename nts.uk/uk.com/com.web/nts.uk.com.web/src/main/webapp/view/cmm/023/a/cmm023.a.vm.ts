module nts.uk.com.view.cmm023.a.viewmodel {
    import alert = nts.uk.ui.dialog.alert;
    import getText = nts.uk.resource.getText;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import info = nts.uk.ui.dialog.info;
    import block = nts.uk.ui.block;

    export class ScreenModel {
        commonMasterId: KnockoutObservable<string> = ko.observable();
        selectedCommonMaster: KnockoutObservable<IGroupCommonMaster> = ko.observable();

        master: KnockoutObservableArray<IGroupCommonMaster> = ko.observableArray([]);

        items: KnockoutObservableArray<GroupCommonItem> = ko.observableArray([]);

        masterColumn: KnockoutObservableArray<NtsGridListColumn> = ko.observableArray([
            { headerText: getText('CMM023_A221_5'), key: 'commonMasterId', width: 100, hidden: true },
            { headerText: getText('CMM023_A221_6'), key: 'commonMasterCode', width: 80 },
            { headerText: getText('CMM023_A221_7'), key: 'commonMasterName', width: 160 },
            { headerText: getText('CMM023_A221_8'), key: 'commonMasterMemo', width: 160 },
        ]);

        constructor() {
            let self = this;

            block.grayout();

            self.commonMasterId.subscribe((commonMasterId) => {

                self.selectedCommonMaster(_.find(self.master(), ['commonMasterId', commonMasterId]));

                block.grayout();

                service.getItems({ commonMasterId: commonMasterId }).done((data) => {
                    block.clear();

                    self.items(_.map(data, x => new GroupCommonItem(x)));
                    if ($("#item-list").data("igGrid")) {
                        $("#item-list").ntsGrid("destroy");
                    }
                    $("#item-list").ntsGrid({
                        width: '590px',
                        height: '375px',
                        dataSource: self.items(),
                        primaryKey: 'commonMasterItemId',
                        rowVirtualization: true,
                        virtualization: true,
                        virtualizationMode: 'continuous',
                        columns: [
                            { headerText: getText('CMM023_A222_5'), key: 'commonMasterItemId', dataType: 'text', width: '80px', hidden: true },
                            { headerText: getText('CMM023_A222_6'), key: 'commonMasterItemCode', dataType: 'text', width: '80px' },
                            { headerText: getText('CMM023_A222_7'), key: 'commonMasterItemName', dataType: 'text', width: '180px' },
                            { headerText: getText('CMM023_A222_8'), key: 'useSetting', dataType: 'boolean', width: '70px', ntsControl: 'Checkbox' },
                            { headerText: getText('CMM023_A222_9'), key: 'usageStartDate', dataType: 'text', width: '260px', formatter: genDate },
                            { headerText: getText('CMM023_A222_9'), key: 'usageEndDate', dataType: 'text', width: '250px', hidden: true },

                        ],

                        ntsControls: [
                            { name: 'Checkbox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true }
                        ],
                        features: [

                        ]
                    });
                    if (_.isEmpty(data) && commonMasterId) {
                        alert({ messageId: "Msg_672" });
                    }

                }).fail(function(res) {

                    block.clear();
                    alert(res);

                });
            });

        }

        selectedInfo() {
            let self = this;
            if (!self.commonMasterId()) {
                return '';
            }
            let selectedCommonMaster = _.find(self.master(), ['commonMasterId', self.commonMasterId()]);

            return selectedCommonMaster.commonMasterCode + ' ' + selectedCommonMaster.commonMasterName
        }

        startPage(): JQueryPromise<any> {

            let self = this,
                dfd = $.Deferred();

            block.grayout();

            service.getMaster().done((data: Array<IGroupCommonMaster>) => {
                block.clear();
                self.master(data);
                self.commonMasterId(data[0] ? data[0].commonMasterId : null);

            }).fail((res) => {

                block.clear();
                alert(res);

            }).always(() => dfd.resolve());

            return dfd.promise();
        }

        saveData() {

            let self = this, updatedData = $("#item-list").ntsGrid("updatedCells");

            _.forEach(updatedData, function(updateItem) {
                let item = _.find(self.items(), { 'commonMasterItemId': updateItem.rowId });
                if (item) {
                    item.useSetting = updateItem.value;
                }
            });

            let command = { commonMasterId: self.commonMasterId(), masterItemIds: _.map(_.filter(self.items(), ['useSetting', true]), item => item.commonMasterItemId) };

            block.grayout();
            service.saveMaster(command).done(() => {
                block.clear();
                info({ messageId: "Msg_15" });


            }).fail(function(res) {

                block.clear();
                alert(res);
            });
        }

    }

    export class GroupCommonItem {
        // 共通項目ID
        commonMasterItemId: string;

        // 共通項目コード
        commonMasterItemCode: string;

        // 共通項目名
        commonMasterItemName: string;

        // 使用設定
        useSetting: boolean;

        // 使用開始日
        usageStartDate: Date;

        // 使用終了日
        usageEndDate: Date;

        constructor(data: IGroupCommonItem) {
            let self = this;
            self.commonMasterItemId = data.commonMasterItemId;
            self.commonMasterItemCode = data.commonMasterItemCode;
            self.commonMasterItemName = data.commonMasterItemName;
            self.useSetting = data ? data.useSetting == 1 ? true : false : false;
            self.usageStartDate = data.usageStartDate;
            self.usageEndDate = data.usageEndDate;
        }


    }

    export interface IGroupCommonMaster {
        // 共通マスタID
        commonMasterId: string;

        // 共通マスタコード
        commonMasterCode: string;

        // 共通マスタ名
        commonMasterName: string;

        // 備考
        commonMasterMemo: string;
    }


    export interface IGroupCommonItem {
        // 共通項目ID
        commonMasterItemId: string;

        // 共通項目コ    
        commonMasterItemCode: string;

        // 共通項目名
        commonMasterItemName: string;

        // 表示順
        displayNumber: number;

        // 使用開始日
        usageStartDate: Date;

        // 使用終了日
        usageEndDate: Date;

        // 使用設定
        useSetting: number;
    }

}
function genDate(value, row) {
    return row.usageStartDate + nts.uk.resource.getText('CMM023_A222_16') + row.usageEndDate;
}


