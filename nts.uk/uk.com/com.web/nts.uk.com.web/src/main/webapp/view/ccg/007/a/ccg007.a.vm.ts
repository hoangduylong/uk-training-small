module nts.uk.pr.view.ccg007.a {
    export module viewmodel {
        import ContractDto = service.ContractDto;
        import blockUI = nts.uk.ui.block;

        export class ScreenModel {
            contractCode: KnockoutObservable<string>;
            password: KnockoutObservable<string>;
            bottomLabel: KnockoutComputed<string>;
            
            constructor() {
                var self = this;
                self.contractCode = ko.observable('');
                self.password = ko.observable('');
                self.bottomLabel = ko.computed(() => {
                    return nts.uk.resource.getText("CCG007_11").replace("\n", "<br/>");
                });
            }

            start(): JQueryPromise<void> {
                var self = this;
                var dfd = $.Deferred<void>();
                dfd.resolve();
                return dfd.promise();
            }

            private AuthContract() {
                var self = this;
                blockUI.invisible();
                if (!nts.uk.ui.errors.hasError()) {
                    service.submitForm({ contractCode: _.escape(self.contractCode()), password: _.escape(self.password()) }).done(function () {
                        nts.uk.characteristics.remove("contractInfo");
                        nts.uk.characteristics.save("contractInfo", { contractCode: _.escape(self.contractCode()), contractPassword: _.escape(self.password()) });
                        nts.uk.ui.windows.setShared('contractCode', _.escape(self.contractCode()));
                        nts.uk.ui.windows.setShared('contractPassword', _.escape(self.password()));
                        nts.uk.ui.windows.setShared('isSubmit', true);
                        nts.uk.ui.windows.close();
                    }).fail(function (res: any) {
                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                    }).always(() => {
                        blockUI.clear();
                    });
                }
            }
        }
    }
}