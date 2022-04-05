module nts.uk.com.view.cps017.b.viewmodel {
    import info = nts.uk.ui.dialog.info;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import block = nts.uk.ui.block;
    import close = nts.uk.ui.windows.close;
    export class ScreenModel {
        listSelection: KnockoutObservableArray<any> = ko.observableArray([]);
        currentSelectedId: KnockoutObservable<string> = ko.observable('');
        closeButton: boolean = true;
        constructor() {
        }

        //開始
        start(): JQueryPromise<any> {
            block.invisible();
            let self = this,
            selectedHisId = getShared('selectedHisId');
            let dfd = $.Deferred();
            nts.uk.ui.errors.clearAll();
            
            self.listSelection.subscribe(function(newSource){
                if(!nts.uk.util.isNullOrEmpty(newSource) && !nts.uk.util.isNullOrEmpty($('#item_register_grid2').children())){
                    let source = ko.toJS(newSource);
                    $('#item_register_grid2').igGrid("option", "dataSource", source);
                    $('#item_register_grid2').igGrid("dataBind");    
                }
            });
            
            service.getAllOrderSetting(selectedHisId).done((itemList: Array<ISelection>) => {
                if (itemList && itemList.length > 0) {
                    let i = 1;
                    itemList.forEach(x => {
                        self.listSelection.push({id: i, 
                            selectionID: x.selectionID,
                            histId: x.histId,
                            selectionCD: x.selectionCD,
                            selectionName: x.selectionName,
                            externalCD: x.externalCD,
                            memoSelection: x.memoSelection,
                            initSelection: x.initSelection == 1? true : false });
                        i++;
                        if(x.initSelection == 1){
                            self.currentSelectedId(x.selectionID);
                        }
                    });
                }
                dfd.resolve();
            }).always(() => {
                block.clear();
            });

            return dfd.promise();
        }
        /**
         * register
         */
        register(){
            block.invisible();
            let self = this;
            let lstData: Array<SelOrder> = [];
            _.each(self.listSelection(), function(item, index){
                lstData.push(new SelOrder(item.selectionID, item.histId, item.selectionCD, index+1, item.selectionID == self.currentSelectedId() ? true : false));
            });
            //console.log(lstData);
            service.updateSelOrder(lstData).done(function(){
                //情報メッセージ（#Msg_15）を表示する (Hiển thị InfoMessage Msg_15)
                info({ messageId: "Msg_15" }).then(function() {
                    self.closeButton = false;
                    setShared('closeButton', self.closeButton);
                    //close dialog
                    close();
                });
            }).always(() => {
                block.clear();
            });
        }
        /**
         * close dialog.
         */
        close(){
            let self = this;
            self.closeButton = true;
            setShared('closeButton', self.closeButton);
            close();
        }
    }
    
    //Selection
    interface ISelection {
        id?: number;
        selectionID?: string;
        histId?: string;
        selectionCD: string;
        selectionName: string;
        externalCD: string;
        memoSelection: string;
        initSelection: any;
    }
    export class SelOrder{
        selectionID: string;
        histId: string;
        code: string;
        dispOrder: number;
        initSelection: boolean;
        constructor(selectionID: string, histId: string,code: string,
                dispOrder: number, initSelection: boolean){
            this.selectionID = selectionID;
            this.histId = histId;
            this.code = code;
            this.dispOrder = dispOrder;
            this.initSelection = initSelection;
        }
    }
}

