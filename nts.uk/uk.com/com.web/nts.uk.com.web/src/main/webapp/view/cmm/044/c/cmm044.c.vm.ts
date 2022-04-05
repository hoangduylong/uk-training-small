module cmm044.c.viewmodel {
    export class ScreenModel {
        period: KnockoutObservable<string> = ko.observable(null);
        startDate: KnockoutObservable<string> = ko.observable(null);
        endDate: KnockoutObservable<string> = ko.observable(null);
        targetId: KnockoutObservable<string> = ko.observable(null);
        targetCode: KnockoutObservable<string> = ko.observable(null);
        targetName: KnockoutObservable<string> = ko.observable(null);
        approverId: KnockoutObservable<string> = ko.observable(null);
        approverCode: KnockoutObservable<string> = ko.observable(null);
        approverName: KnockoutObservable<string> = ko.observable(null);
        emailContent: KnockoutObservable<string> = ko.observable(null);

        constructor() {
            const  self = this;
            const data = nts.uk.ui.windows.getShared('cmm044_Email');
            if (data) {
                self.startDate(data.startDate);
                self.endDate(data.endDate);
                self.period(nts.uk.time.formatDate(new Date(data.startDate), "yyyy/MM/dd") + " ～ " + nts.uk.time.formatDate(new Date(data.endDate), "yyyy/MM/dd"));
                self.targetId(data.targetId);
                self.targetCode(data.targetCode);
                self.targetName(data.targetName);
                self.approverId(data.approverId);
                self.approverCode(data.approverCode);
                self.approverName(data.approverName);
                self.emailContent(nts.uk.resource.getText("CMM044_40", [self.period(), self.targetCode(), self.targetName(), self.approverCode(), self.approverName()]));
            }
        }

        sendMail() {
            const self = this;
            nts.uk.ui.block.invisible();
            service.sendMail({ approverId: self.approverId(), emailContent: self.emailContent() }).then(() => {
                nts.uk.ui.dialog.info({messageId: "Msg_792"}).then(() => {
                    nts.uk.ui.windows.close();
                });
            }).fail(error => {
                nts.uk.ui.dialog.alert(error).then(() => {
                    if (error.messageId == "Msg_1057") {
                        nts.uk.ui.windows.close();
                    }
                });
            }).always(() => {
                nts.uk.ui.block.clear();
            });
        }

        closeDialog(): void {
            nts.uk.ui.windows.close();
        }

    }

}