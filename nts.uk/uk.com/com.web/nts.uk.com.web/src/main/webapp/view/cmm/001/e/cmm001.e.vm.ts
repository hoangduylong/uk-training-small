module nts.uk.com.view.cmm001.e {
    
    export module viewmodel {

        export class ScreenModel {

            dataSource: KnockoutObservableArray<model.CopyItem>;
            selectedCopyItems: KnockoutObservableArray<model.CopyItem>;
            switchOptions: KnockoutObservableArray<any>;
            isCheckedAll: KnockoutObservable<boolean>;
            switchHeader: KnockoutObservable<number>;
            comName: string;

            constructor() {
                let self = this;

                self.switchOptions = ko.observableArray([{ copyMethod: '0', text: nts.uk.resource.getText('CMM001_70') }, { copyMethod: '1', text: nts.uk.resource.getText('CMM001_71') }, { copyMethod: '2', text: nts.uk.resource.getText('CMM001_72') }]);
                self.isCheckedAll = ko.observable(false);
                self.isCheckedAll.subscribe((value) => {
                    ko.utils.arrayForEach(self.dataSource(), function(item) {
                        item.flag(value);
                    });
                });
                self.switchHeader = ko.observable(0);
                self.switchHeader.subscribe((value) => {
                    let listItems = self.dataSource();
                    if (self.selectedCopyItems().length == 0) {
                        nts.uk.ui.dialog.alertError({ messageId: "Msg_1433" });
                        return;
                    }
                    ko.utils.arrayForEach(listItems, function(item) {
                        if (item.flag()) {
                            item.copyMethod(value);
                        }
                    });
                });
                self.dataSource = ko.observableArray([]);
                self.selectedCopyItems = ko.observableArray([]);
                self.selectedCopyItems = ko.computed(function() {
                    return self.dataSource().filter(function(item) {
                        if (item.flag() === true) {
                            if (item.copyMethod() != self.switchHeader())
                                item.copyMethod(self.switchHeader());
                            return item;
                        }
                    });
                });

                self.comName = nts.uk.text.format(nts.uk.resource.getText('CMM001_75'), nts.uk.ui.windows.getShared('companyName'));
            }

            start(): JQueryPromise<any> {
                var self = this;
                var dfd = $.Deferred();
                var cid = nts.uk.ui.windows.getShared('companyId');

                service.getAllMasterCopyCategory().then(function(masterCopyCateList: Array<model.MasterCopyCategory>) {
                    var copyItemList: model.CopyItem[];
                    copyItemList = [];
                    var preSystemType = '';
                    var itemData: model.MasterCopyCategory;
                    var nextItem: model.MasterCopyCategory;
                    if (masterCopyCateList != null) {
                        for (itemData of masterCopyCateList) {
                            if (itemData.systemType === preSystemType) {
                                copyItemList.push(new model.CopyItem(self.getSystemType(itemData.systemType), itemData.masterCopyId, itemData.masterCopyCategory, itemData.order, true));
                            } else {
                                copyItemList.push(new model.CopyItem(self.getSystemType(itemData.systemType), itemData.masterCopyId, itemData.masterCopyCategory, itemData.order, false));
                            }
                            preSystemType = itemData.systemType;
                        }
                    }
                    self.dataSource(copyItemList);
                    $("#copy-method-header").focus();
                    dfd.resolve();
                });
                return dfd.promise();
            }
            
            private getSystemType(systemTypeVal: number): string {
                var systemType : string;
                switch (systemTypeVal) {
                    case 0:
                        systemType = '共通';
                        break;
                    case 1:
                        systemType = '就業';
                        break;
                    case 2:
                        systemType = '給与';
                        break;
                    case 3:
                        systemType = '人事';
                        break;
                }
                return systemType;
            }

            openFDialog() {
                var self = this;
                var selectedItems: model.CopyItem[];
                let companyName = nts.uk.ui.windows.getShared('companyName');
                selectedItems = self.selectedCopyItems();
                if (selectedItems.length == 0) {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_1145" })
                }
                else {
                    nts.uk.ui.dialog.confirm({ messageId: "Msg_1162",messageParams: [companyName] }).ifYes(() => {
                        var cid = nts.uk.ui.windows.getShared('companyId');
                        var IMasterDataList: model.MasterCopyCategoryDto[] = [];
                        var copyMethod : number;
                        var item : model.CopyItem;
                        for (var i=0; i < selectedItems.length; i++) {
                        item = selectedItems[i];
                        copyMethod = item.copyMethod();
                        var IMasterCopyCategoryDto : model.MasterCopyCategoryDto = {masterCopyId: item.masterCopyId, categoryName: item.masterCopyCategory, order: item.order, systemType: item.systemType, copyMethod: copyMethod};
                            IMasterDataList.push(IMasterCopyCategoryDto);
                        }
                        var masterCopyDataCmd: model.MasterCopyDataCommand = { companyId: cid, masterDataList: IMasterDataList };
                        nts.uk.ui.windows.setShared('masterCopyDataCmd', masterCopyDataCmd);
                        nts.uk.ui.windows.sub.modal('/view/cmm/001/f/index.xhtml', { title: '', }).onClosed(function(): any {
                        });
                    });
                }
            }

            closeDialog() {
                nts.uk.ui.windows.close();
            }
        }
    }
    export module model {
        // master copy category model
        export class MasterCopyCategory {
            systemType: number;
            masterCopyId: string;
            masterCopyCategory: string;
            order: number;
            constructor(systemType: string, masterCopyId: string, masterCopyCategory: string, order: number) {
                this.systemType = systemType;
                this.masterCopyId = masterCopyId;
                this.masterCopyCategory = masterCopyCategory;
                this.order = order;
            }
        }

        // row model
        export class CopyItem {
            flag: KnockoutObservable<boolean>;
            copyMethod: KnockoutObservable<number>;
            systemType: string;
            masterCopyId: string;
            masterCopyCategory: string;
            order: number;
            isBorder: boolean;
            constructor(systemType: string, masterCopyId: string, masterCopyCategory: string, order: number, isBorder: boolean) {
                this.flag = ko.observable(false);
                this.copyMethod = ko.observable(0);
                this.systemType = systemType;
                this.masterCopyId = masterCopyId;
                this.masterCopyCategory = masterCopyCategory;
                this.order = order;
                this.isBorder = isBorder;
            }

        }

        // copy data command
        export interface MasterCopyDataCommand {
            companyId: string;
            masterDataList: MasterCopyCategoryDto[];
        }

        // master category dto
        export interface MasterCopyCategoryDto {
            masterCopyId: string;
            categoryName: string;
            order: number;
            systemType: string;
            copyMethod: number;
        }
        
        // error content dto
        export interface ErrorContentDto {
            systemType: string;
            categoryName: string;
            message: string;
            order: number;
        }
    }
}