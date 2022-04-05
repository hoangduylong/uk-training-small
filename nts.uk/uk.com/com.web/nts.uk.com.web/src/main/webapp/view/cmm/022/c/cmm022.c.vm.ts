module nts.uk.com.view.cmm022.c.viewmodel {
    import blockUI = nts.uk.ui.block;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import dialog = nts.uk.ui.dialog;
    
        export class ScreenModel {
            
            // list data de bind vao iggrid
            listMaster: KnockoutObservableArray<any> = ko.observableArray([]);
            
            // data gui ve man A
            setData: KnockoutObservable<any> = ko.observable();
            
            
            defaultItem = {
                commonMasterId: null,
                commonMasterCode: '',
                commonMasterName: '',
                commonMasterMemo: '',
            }
            
            // ma code cua item dang duoc select trong iggrid
            masterSelected: KnockoutObservable<CommonMaster> = ko.observable(new CommonMaster(this.defaultItem));
            constructor() {
                
                let self = this;
                
                self.masterSelected().commonMasterId.subscribe(function(id){
                    
                    self.masterSelected().updateData(_.filter(self.listMaster(), ['commonMasterId', id])[0]);
                    
                });

                setTimeout(() => {
                    
                    $(window).resize(function() {
                        
                        $("#multi-list").igGrid("option", "height", (window.innerHeight - 175) + "px");
                        
                        $("#height-panel").height(window.innerHeight - 125);
                    });                   
                }, 500); 

            }

            /**
             * start page
             */
            public start_page(): JQueryPromise<any> {
                
                let self = this;
                var dfd = $.Deferred();
                
                let shared = getShared('listMasterToC');

                _.sortBy(shared.commonMasters, ['commonMasterCode']);

                self.listMaster(shared.commonMasters);
                
                self.masterSelected().commonMasterId(shared.commonMasterId);
               
                dfd.resolve();

                return dfd.promise();
            }
            
            register(){
                
                let self = this,
                    param = ko.mapping.toJS(self);
                
                blockUI.grayout();
                
                service.update(param).done(function(data: any) {
                    service.getListMaster().done(function(data: any){
                        self.listMaster(data);

                        self.setData({
                            commonMasterId: self.masterSelected(),
                            masterList: self.listMaster(),
                            itemList: []
                        })

                        setShared('DialogCToMaster', self.setData());
                        
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                    });
                    
                }).fail(function(err) {
                    
                   dialog.bundledErrors(err);
                    
                }).always(function() {
                    blockUI.clear();
                });
            }
            
            // close dialog
            closeDialog() {

                let self = this;

                setShared('DialogCToMaster', {
                    masterList: self.listMaster(),
                    commonMasterId: self.masterSelected().commonMasterId()
                });
                nts.uk.ui.windows.close();
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
        
        updateData(param: ICommonMaster) {
            let self = this;
            self.commonMasterCode(param.commonMasterCode);
            self.commonMasterName(param.commonMasterName);
            self.commonMasterMemo(param.commonMasterMemo);
        }
    }
    
}