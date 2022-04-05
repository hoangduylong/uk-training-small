module nts.uk.pr.view.ccg007.i {
    export module viewmodel {
        import blockUI = nts.uk.ui.block;
        import PassWordPolicyDto = service.PassWordPolicyDto;

        export class ScreenModel {
            
            passwordPolicy: KnockoutObservable<PassWordPolicyDto>;
            lowestDigits: KnockoutObservable<string>;
            numberOfDigits: KnockoutObservable<string>;
            symbolCharacters: KnockoutObservable<string>;
            alphabetDigit: KnockoutObservable<string>;
            historyCount: KnockoutObservable<string>;
            
            
            constructor() {
                var self = this;
                
                self.passwordPolicy = ko.observable(null);
                self.lowestDigits = ko.observable('');
                self.numberOfDigits = ko.observable('');
                self.symbolCharacters = ko.observable('');
                self.alphabetDigit = ko.observable('');
                self.historyCount = ko.observable('');
            }
            
            /**
             * Start page.
             */
            public startPage(): JQueryPromise<void> {
                let self = this;
                let dfd = $.Deferred<void>();

                // block ui
                nts.uk.ui.block.invisible();
                
                //get PasswordPolicy
                service.getPasswordPolicy().done(function (data) {
                    //set text
                    self.lowestDigits(nts.uk.text.format(nts.uk.resource.getText("CCG007_33"), data.lowestDigits));
                    self.alphabetDigit(nts.uk.text.format(nts.uk.resource.getText("CCG007_35"), data.alphabetDigit));
                    self.numberOfDigits(nts.uk.text.format(nts.uk.resource.getText("CCG007_36"), data.numberOfDigits));
                    self.symbolCharacters(nts.uk.text.format(nts.uk.resource.getText("CCG007_37"), data.symbolCharacters));
                    self.historyCount(nts.uk.text.format(nts.uk.resource.getText("CCG007_39"), data.historyCount));
                }).fail(function(res) {
                    //Return Dialog Error
                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                    blockUI.clear();
                });
                
                dfd.resolve();
                
                //clear block
                nts.uk.ui.block.clear();

                return dfd.promise();
            }
            
            /**
             * close dialog
             */
            public closeDialog(): void {
                nts.uk.ui.windows.close();
            }
        }
    }
}