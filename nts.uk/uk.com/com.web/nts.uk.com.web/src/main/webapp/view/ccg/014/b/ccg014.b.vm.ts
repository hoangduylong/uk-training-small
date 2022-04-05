module ccg014.b.viewmodel {


    export class ScreenModel {
        titlecode: KnockoutObservable<string>;
        titlename: KnockoutObservable<string>;
        copyTitleCD: KnockoutObservable<string>;
        copyName: KnockoutObservable<string>;
        checkOverwritting: KnockoutObservable<boolean>;
        constructor(data) {
            var self = this;
            self.titlecode = ko.observable(data.titleMenuCD);
            self.titlename = ko.observable(data.name);
            self.copyTitleCD = ko.observable('');
            self.copyName = ko.observable('');
            self.checkOverwritting = ko.observable(true);
            if (nts.uk.util.isNullOrEmpty(self.copyTitleCD())) {
                _.defer(() => { $("#copycode").focus(); });
            }
        }

        /** Close Dialog */
        cancel_Dialog(): any {
            nts.uk.ui.windows.close();
        }

        clearError(): any {
            var self = this;
            if (self.titlecode !== null) { nts.uk.ui.errors.clearAll(); }
            if (self.titlename !== null) { nts.uk.ui.errors.clearAll(); }
        }

        /* Copy TitleMenu */
        submitClickButton() {
            var self = this;
            self.copyTitleCD(nts.uk.text.padLeft(self.copyTitleCD(), '0', 4));
            service.copyTitleMenu(self.titlecode(), self.copyTitleCD(), self.copyName(), self.checkOverwritting()).done(() => {
                nts.uk.ui.block.invisible();
                nts.uk.ui.windows.setShared("copyTitleMenuCD", self.copyTitleCD(), false);
                nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(() =>{
                    self.cancel_Dialog();    
                })
                
            }).fail((res: any) => {
                $("#copycode").focus();
                nts.uk.ui.dialog.alert({ messageId: res.messageId });
                
            }).always(() => {
                nts.uk.ui.block.clear();
            });
        }
    }
}