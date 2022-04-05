module nts.uk.com.view.cps009.c.viewmodel {
    import error = nts.uk.ui.errors;
    import text = nts.uk.resource.getText;
    import close = nts.uk.ui.windows.close;
    import dialog = nts.uk.ui.dialog;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import block = nts.uk.ui.block;

    export class ViewModel {
        currentInitVal: KnockoutObservable<ItemInitValue> = ko.observable(new ItemInitValue("", "", ""));
        isCopy: KnockoutObservable<boolean> = ko.observable(false);
        codeCtg: KnockoutObservable<string> = ko.observable('');
        nameCtg: KnockoutObservable<string> = ko.observable('');
        codeInput: KnockoutObservable<string> = ko.observable('');
        nameInput: KnockoutObservable<string> = ko.observable('');
        param: any;
        constructor() {
            let self = this;
            self.param = getShared('CPS009C_PARAMS') || { settingId: '', settingCode: '', settingName: '' };
            self.codeCtg(self.param.settingCode);
            self.nameCtg(self.param.settingName);
        }

        copyInitValue() {
            let self = this,
                copyObj = {
                    idSource: self.param.settingId,
                    overWrite: self.isCopy(),
                    codeInput: self.currentInitVal().itemCode(),
                    nameInput: self.currentInitVal().itemName()
                }
            $('.nts-input').trigger("validate");
            if (!nts.uk.ui.errors.hasError()) {
                service.copyInitValue(copyObj).done(function(initSettingId) {
                    nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(function() {
                        setShared('CPS009C_COPY', initSettingId);
                        //close dialog
                        close();
                    });
                }).fail(function(res) {
                    //display message error.
                    nts.uk.ui.dialog.alertError({ messageId: res.messageId }).then(() => {
                        if (res.messageId == "Msg_3") {
                            $('#codeInput').focus();
                        }

                    })
                });
            };
        }

        cancelCopyInitValue() {
            close();
        }
    }

    export class ItemInitValue {

        id: KnockoutObservable<string>;

        itemCode: KnockoutObservable<string>;

        itemName: KnockoutObservable<string>;

        constructor(id: string, itemCode: string, itemName: string) {

            let self = this;

            self.id = ko.observable(id);

            self.itemCode = ko.observable(itemCode);

            self.itemName = ko.observable(itemName);

        }
    }
    export class DataCopy {
        id: string;
        codeNew: string;
        nameNew: string;
        copy: boolean;
    }
}