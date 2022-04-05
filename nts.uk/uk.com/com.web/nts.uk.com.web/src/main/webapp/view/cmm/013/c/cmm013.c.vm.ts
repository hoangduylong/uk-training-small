module nts.uk.com.view.cmm013.c {

    export module viewmodel {
       
        import Constants = base.Constants;
        
        import SequenceMaster = base.SequenceMaster;
        
        export class ScreenModel {
            
            columns: KnockoutObservableArray<any>;    //nts.uk.ui.NtsGridListColumn       
            items: KnockoutObservableArray<SequenceMaster>;        
            currentCode: KnockoutObservable<string>;
            
            constructor() {
                let _self = this;
                
                _self.items = ko.observableArray([]);
                _self.currentCode = ko.observable(null);
                
                _self.columns = ko.observableArray([
                    { headerText: nts.uk.resource.getText('CMM013_23'), key: 'sequenceCode', width: 75},
                    { headerText: nts.uk.resource.getText('CMM013_24'), key: 'sequenceName', width: 135}
                ]); 
            }
            
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let _self = this;
                let dfd = $.Deferred<any>();

                // Load sequence data list
                let data: SequenceMaster[] = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_SELECT_SEQUENCE);
                _self.initNotSelectItem(data);
                let currentSelectedCode = nts.uk.ui.windows.getShared("currentSelectedCode");
                if (data) {
                    _self.items(data);
                    if (_.isEmpty(currentSelectedCode)) {
                        _self.currentCode(data[0].sequenceCode);
                    } else {
                        _self.currentCode(currentSelectedCode); 
                    }
                }
                dfd.resolve();               
                
                return dfd.promise();
            }
            initNotSelectItem(data: any) {
                let self = this;
                let noSelectItem = {
                    order: 0,
                    sequenceName: '選択なし',
                    sequenceCode: '',
                };
                data.unshift(noSelectItem);
            }
            /**
             * Select sequence master
             */
            public selectSequence(): void {               
                let _self = this;  
                             
                nts.uk.ui.windows.setShared(Constants.IS_ACCEPT_DIALOG_SELECT_SEQUENCE, true);
                if (_self.currentCode()) {
                    nts.uk.ui.block.grayout();
                    service.findBySequenceCode(_self.currentCode())
                        .done((data: SequenceMaster) => {                         
                            nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE, data);
                        })
                        .fail((res: any) => {                             
                            nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE, null);                     
                        })
                        .always(() => {
                            nts.uk.ui.block.clear();     
                            nts.uk.ui.windows.close();
                        });
                } else {
                    nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE, null);
                    nts.uk.ui.windows.close();                   
                }
            }
            
            /**
             * Close
             */
            public close(): void {
                nts.uk.ui.windows.setShared(Constants.IS_ACCEPT_DIALOG_SELECT_SEQUENCE, false);
                nts.uk.ui.windows.close();
            }           
        }
    }    
}