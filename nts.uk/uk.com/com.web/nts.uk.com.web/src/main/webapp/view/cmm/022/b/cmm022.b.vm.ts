module nts.uk.com.view.cmm022.b.viewmodel {
    import setShared = nts.uk.ui.windows.setShared;
    import blockUI = nts.uk.ui.block;
    import getShared = nts.uk.ui.windows.getShared;

        export class ScreenModel {
            
            // list master de bind data vao iggrid left content
            listMaster: KnockoutObservableArray<any> = ko.observableArray([]);
            
            defaultMaster = {
                commonMasterId: null,
                commonMasterCode: '',
                commonMasterName: '',
                commonMasterMemo: '',
            }

            // common master dang select trong iggrid left content 
            masterSelected: KnockoutObservable<CommonMaster> = ko.observable(new CommonMaster(this.defaultMaster));
            
            defaultItem = {
                commonMasterItemId: null,
                commonMasterItemCode: "",
                commonMasterItemName: "",
                displayNumber: null,
                usageStartDate: moment(new Date()).format("YYYY/MM/DD"),
                usageEndDate: "9999/12/31"
            }
            
            // code cua master item dang duoc select trong iggrid right content
            itemSelected: KnockoutObservable<CommonMasterItem> = ko.observable(new CommonMasterItem(this.defaultItem));
            
            // list master item dang duoc select cua iggrid right content
            listItems: KnockoutObservableArray<any> = ko.observableArray([]);
            
            
            // data gui ve man A
            setData: KnockoutObservable<> = ko.observable();
            constructor() {
                let self = this;
                
                self.masterSelected().commonMasterId.subscribe(function(id) {

                    self.masterSelected().updateData(_.filter(self.listMaster(), ['commonMasterId', id])[0]);
                    
                    blockUI.grayout();
                        service.getListMasterItem({ commonMasterId: id }).done((data: any) => {

                            self.listItems(_.sortBy(data.listCommonMasterItem, ['displayNumber']));
                            
                            let item = _.filter(data.listCommonMasterItem, ['commonMasterItemId', self.itemSelected().commonMasterItemId()])[0];
                            if (!item) {
                                self.itemSelected().commonMasterItemId(self.listItems()[0].commonMasterItemId);
                            }
                        }).fail(function(err) {
                            
                            if(err.messageId == "Msg_1578"){
                                self.listItems([]);
                            }
                            
                            nts.uk.ui.dialog.error({ messageId: err.messageId });
                            
                        }).always(function() {
                            blockUI.clear();
                        });

                });
                
               

                setTimeout(() => {
                    
                    $(window).resize(function() {
//                                                
//                        $("#height-panel").height(window.innerHeight - 125);
//                        
//                        $("#multi-list").igGrid("option", "height", (window.innerHeight - 175) + "px");
//                        
//                        $("#item-list").igGrid("option", "height", (window.innerHeight - 300) + "px");
//                        
//                        $("#tree-up-down").height(window.innerHeight - 150);
                    });
                }, 100); 
            }
            
            

            /**
             * start page
             */
            public start_page(): JQueryPromise<any> {
                
                let self = this,

                    dfd = $.Deferred(),

                    shared = getShared('listMasterToB');
                
                _.sortBy(shared.commonMasters, ['commonMasterCode']);

                self.listMaster(shared.commonMasters);
                
                self.masterSelected().commonMasterId(shared.commonMasterId);
                
                self.itemSelected().commonMasterItemId(shared.commonMasterItemId);

                dfd.resolve();
                return dfd.promise();
            }
            
            public title() {
                let self = this;
                return self.masterSelected().commonMasterCode() + " " + self.masterSelected().commonMasterName();
            }
            
            public enabledSave() {
                let self = this;
                return self.listItems().length > 1;
            }
            
            register(){
                
                let self = this;
                
                for(let i = 0; i<self.listItems().length; i++){
                    self.listItems()[i].displayNumber = i+1;
                }
                
                let param = {
                    commonMasterId: self.masterSelected().commonMasterId(),
                    listMasterItem: self.listItems(),
                }
                
                blockUI.grayout();
                
                service.update(param).done(function(data: any) {
                    self.setData({
                        commonMasterId: self.masterSelected().commonMasterId(),
                        masterList: [],
                        itemList: self.listItems(),
                        commonMasterItemId: self.itemSelected().commonMasterItemId()
                        }
                    )
                    setShared('DialogBToMaster', self.setData());
                    nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                    
                }).fail(function(err) {
                    nts.uk.ui.dialog.error({ messageId: err.messageId });
                    
                }).always(function() {
                    blockUI.clear();
                });

            }
            
            // close dialog
            closeDialog() {
                let self = this;
                
                if (!self.setData()) {
                    self.setData({
                        commonMasterId: self.masterSelected().commonMasterId(),
                        commonMasterItemId: self.itemSelected().commonMasterItemId()
                    })
                }

                setShared('DialogBToMaster', self.setData());
                nts.uk.ui.windows.close();
            }

        }

    export interface IMasterItem {
        commonMasterItemId: string;
        commonMasterItemCode: string;
        commonMasterItemName: string;
        displayNumber: number;
        usageStartDate: string;
        usageEndDate: string;
    }
        
    class CommonMasterItem{
        commonMasterItemId:  KnockoutObservable<string> = ko.observable();
        commonMasterItemCode:  KnockoutObservable<string> = ko.observable();
        commonMasterItemName:  KnockoutObservable<string> = ko.observable();
        displayNumber: KnockoutObservable<number> = ko.observable();
        usageStartDate: KnockoutObservable<string> = ko.observable();
        usageEndDate: KnockoutObservable<string> = ko.observable();
        constructor(param: IMasterItem){
            let self = this;
            self.commonMasterItemId(param.commonMasterItemId);
            self.commonMasterItemCode(param.commonMasterItemCode);
            self.commonMasterItemName(param.commonMasterItemName);
            self.displayNumber(param.displayNumber);
            self.usageStartDate(param.usageStartDate);
            self.usageEndDate(param.usageEndDate);
        }
        
       
    }
        
    export interface ICommonMaster {
        commonMasterId: string;
        commonMasterCode: string;
        commonMasterName: string;
        commonMasterMemo: string;
    }

    class CommonMaster {
        commonMasterId: KnockoutObservable<string> = ko.observable();
        commonMasterCode: KnockoutObservable<string> = ko.observable();
        commonMasterName: KnockoutObservable<string> = ko.observable();
        commonMasterMemo: KnockoutObservable<string> = ko.observable();

        constructor(param: ICommonMaster) {
            let self = this;
            self.commonMasterId(param.commonMasterId);
            self.commonMasterCode(param.commonMasterCode);
            self.commonMasterName(param.commonMasterName);
            self.commonMasterMemo(param.commonMasterMemo);
        }

        updateData(data) {
            let self = this;
            self.commonMasterCode(data.commonMasterCode);
            self.commonMasterName(data.commonMasterName);
            self.commonMasterMemo(data.commonMasterMemo);
        }
    }
    
}