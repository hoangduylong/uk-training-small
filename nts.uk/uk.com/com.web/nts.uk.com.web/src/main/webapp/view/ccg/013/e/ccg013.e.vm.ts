module nts.uk.com.view.ccg013.e.viewmodel {
    export class ScreenModel {
        code: KnockoutObservable<string>;
        name: KnockoutObservable<string>;
        allowOverwrite: KnockoutObservable<boolean>;
        currentWebMenu: KnockoutObservable<any>;
        currentWebMenuCode: KnockoutObservable<string>;

        constructor() {
            var self = this;

            self.code = ko.observable('');
            self.name = ko.observable('');
            self.allowOverwrite = ko.observable(false);
            self.currentWebMenu = ko.observable(null);
            self.currentWebMenuCode = ko.observable('');
        }

        start() {
            var self = this;
            self.currentWebMenu(nts.uk.ui.windows.getShared("CCG013E_COPY"));
            nts.uk.text.padLeft(self.currentWebMenuCode(self.currentWebMenu().webMenuCode), '0', 3);
        }

        /**
         * Pass data to main screen
         * Close the popup
         */
        submit() {
            var self = this;
            nts.uk.ui.block.invisible();

            validateNameInput($("#web-name"), '#[CCG013_50]', self.name().trim(), 'WebMenuName');

            var code = self.code();
            var name = self.name();
            var allowOverwrite = self.allowOverwrite();

            var data = {
                currentWebMenuCode: self.currentWebMenuCode(),
                allowOverwrite: allowOverwrite,
                webMenuCode: code,
                webMenuName: name
            }

            $("#web-code").trigger("validate");
            $("#web-name").trigger("validate");

            if (nts.uk.ui.errors.hasError()) {
                nts.uk.ui.block.clear();
                return;
            }

            service.copy(data).done(function () {
                nts.uk.ui.windows.setShared("CCG013E_WEB_CODE_COPY", code);
                nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(() => {
                    nts.uk.ui.windows.close();
                });

            }).fail(function (error) {
                nts.uk.ui.dialog.alertError({ messageId: error.messageId });
            }).always(function () {
                nts.uk.ui.block.clear();
            });

        }

        /**
         * Click on button i1_9
         * Close the popup
         */
        closeDialog() {
            var self = this;
            nts.uk.ui.windows.setShared("CCG013E_WEB_CODE_COPY", self.currentWebMenuCode());
            nts.uk.ui.windows.close();
        }
    }
}