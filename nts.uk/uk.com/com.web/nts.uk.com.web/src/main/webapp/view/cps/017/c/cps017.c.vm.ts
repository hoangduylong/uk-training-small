module nts.uk.com.view.cps017.c.viewmodel {
    import getShared = nts.uk.ui.windows.getShared;
    import block = nts.uk.ui.block;
    import dialog = nts.uk.ui.dialog;
    import formatDate = nts.uk.time.formatDate;

    export class ScreenModel {
        selectionName: KnockoutObservable<string> = ko.observable(null);
        selectionItemId: KnockoutObservable<string> = ko.observable('');
        selectingHistId: KnockoutObservable<string> = ko.observable('');
        startDate: KnockoutObservable<string> = ko.observable(formatDate(new Date()) || undefined);
        
        constructor() {
            let self = this;
            let data = getShared('CPS017C_PARAMS');
            //get name from screen main
            self.selectionName(data.name);
            self.selectionItemId(data.id);
            self.selectingHistId(data.histId);
        }

        closeDialog() {
            nts.uk.ui.windows.close();
        }

        addHistory() {
            block.invisible();
            let self = this;
            let command = { 
                selectionItemId : self.selectionItemId(),
                selectingHistId : self.selectingHistId(),
                startDate : self.startDate()
            }
            service.addHistoryData(command).done(function() {
                dialog.info({ messageId: "Msg_15" }).then(function() {
                    nts.uk.ui.windows.close();
                });

            }).fail(function(res) {
                $('#start-date-sel').ntsError('set', { messageId: res.messageId });
            }).always(() => {
                block.clear();
            });
        }
    }


}
