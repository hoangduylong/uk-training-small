module nts.uk.com.view.assy.addhist {
    export module viewmodel {
        
        export class ScreenModel {
            
            masterId: string;
            histId: string;
            startDate: KnockoutObservable<string>;
            endDate: KnockoutObservable<string>;
            constructor() {
                let self = this;
                self.startDate = ko.observable('');
                self.endDate = ko.observable(nts.uk.resource.getText("CMM011_27"));
            }

            public startPage(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred<any>();
                let assyShared: AssyShared = nts.uk.ui.windows.getShared("ASSY_COM_PARAM");
                self.masterId = assyShared.masterId;
                self.histId = assyShared.histId;
                dfd.resolve();
                return dfd.promise();
            }

            public execute() {
                let self = this;
                if (!self.validate()) {
                    return;
                }
                
                nts.uk.ui.block.grayout();
                let makeCmd = nts.uk.ui.windows.getShared("ASSY_COM_PARAM_CMD"),
                    ajax = nts.uk.ui.windows.getShared("ASSY_COM_PARAM_AJAX"),
                    cmd = makeCmd(self.masterId, self.histId, self.startDate(), self.endDate());
                     
                ajax(cmd).done(() => {
                    nts.uk.ui.block.clear();
                    nts.uk.ui.windows.setShared("HIST_ADD", true);
                    self.close();
                }).fail((res: any) => {
                    nts.uk.ui.block.clear();
                    self.showMessageError(res);
                });
            }
            
            private validate() {
                let self = this;
                $('#start-date').ntsError('clear');
                $('#start-date').ntsEditor('validate');

                return !$('.nts-input').ntsError('hasError');
            }
            
            public close() {
                nts.uk.ui.windows.close();
            }

            public showMessageError(res: any) {
                if (!res.businessException) {
                    return;
                }
                
                if (Array.isArray(res.errors)) {
                    nts.uk.ui.dialog.bundledErrors(res);
                } else {
                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                }
            }
        }
        
        interface AssyShared {
            masterId: string;
            histId: string;
        }
    }
}