module nts.uk.com.view.cps017.d.viewmodel {
    import getShared = nts.uk.ui.windows.getShared;
    import dialog = nts.uk.ui.dialog;
    import block = nts.uk.ui.block;

    export class ScreenModel {
        selectionName: KnockoutObservable<string> = ko.observable('');
        selectionItemId : KnockoutObservable<string> = ko.observable('');
        selectingHistId : KnockoutObservable<string> = ko.observable(''); 
        startDate: KnockoutObservable<string> = ko.observable('');
        
        data: any;
        constructor() {
            let self = this;
            let data = getShared('CPS017D_PARAMS');
            
            self.selectionName(data.name);
            self.selectionItemId(data.id);
            
            self.selectingHistId(data.histId);
            self.startDate(data.startDate);
            
        }
        /**
         * close dialog when click button キャンセル
         */
        closeDialog() {
            nts.uk.ui.windows.close();
        }

        /**
         * update history when click button 決定 
         */
        editHistory() {
            block.invisible();
            let self = this;
            let command = { 
                selectionItemId : self.selectionItemId(),
                selectingHistId : self.selectingHistId(),
                newStartDate : self.startDate()
            }
            service.editHistoryData(command).done(function() {
                dialog.info({ messageId: "Msg_15" }).then(function() {
                    nts.uk.ui.windows.close();
                });
            }).fail(function(res){
                if(res.messageId == 'Msg_127'){
                    $('#start-date-sel').ntsError('set', {messageId: res.messageId});
                }else{
                    nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                }
            }).always(() => {
                block.clear();
            });
        }
    }

}
