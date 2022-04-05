module nts.uk.com.view.ccg027.template.vm {
    import ntsWindows = nts.uk.ui.windows;
    export class ViewModel {
        sendingAddressCheck: KnockoutObservable<boolean>;
        setCC: KnockoutObservable<boolean>;
        setBCC: KnockoutObservable<boolean>;
        setReply: KnockoutObservable<boolean>;
        setSubject: KnockoutObservable<boolean>;
        setBody: KnockoutObservable<boolean>;
        wording: KnockoutObservable<string>;
        mailSetting: KnockoutObservable<MailSetting>;

        constructor() {
            let self = this;
            self.sendingAddressCheck = ko.observable(true);
            self.setCC = ko.observable(true);
            self.setBCC = ko.observable(true);
            self.setReply = ko.observable(true);
            self.setSubject = ko.observable(true);
            self.setBody = ko.observable(true);
            self.wording = ko.observable('');
            self.mailSetting = ko.observable(new MailSetting('', '', [], [], ''));
        }

        openDialogCCG207() {
            var self = this;
            ntsWindows.setShared("sendingAddressCheck", self.sendingAddressCheck());
            ntsWindows.setShared("SetCC", self.setCC());
            ntsWindows.setShared("SetBCC", self.setBCC());
            ntsWindows.setShared("SetReply", self.setReply());
            ntsWindows.setShared("SetSubject", self.setSubject());
            ntsWindows.setShared("SetBody", self.setBody());
            ntsWindows.setShared("wording", self.wording());
            ntsWindows.setShared("MailSettings", self.mailSetting());

            ntsWindows.sub.modal("../a/index.xhtml").onClosed(() => {
            });

        }

    }

    class MailSetting {
        subject: string;
        text: string;
        mailAddressCC: Array<string>;
        mailAddressBCC: Array<string>;
        mailReply: string;

        constructor(subject: string, text: string, mailAddressCC: Array<string>, mailAddressBCC: Array<string>, mailReply: string) {
            this.subject = subject;
            this.text = text;
            this.mailAddressCC = mailAddressCC;
            this.mailAddressBCC = mailAddressBCC;
            this.mailReply = mailReply;
        }
    }

}