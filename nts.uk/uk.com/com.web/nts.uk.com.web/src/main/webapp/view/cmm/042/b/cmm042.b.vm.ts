module cmm042.b.viewmodel {
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import showDialog = nts.uk.ui.dialog;
    import Text = nts.uk.resource.getText;
    import vl = nts.Setting.validate;
    import close = nts.uk.ui.windows.close;
    

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];


    export class ViewModel {
            userCode: KnockoutObservable<string> = ko.observable('');


        constructor() {
            let self = this;
            
            let dto: any = getShared('CMM042B_PARAM');
            self.userCode('');
            self.start();
        }

        start(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred();
                $("#A_INP_USER_CODE").focus();
                dfd.resolve();
            return dfd.promise();
        }

        pushDataToAScreen() {
            let self = this;

            if (nts.uk.ui.errors.hasError()) {
                return;
            }
            
            setShared('CMM042B_VALUE', {userCode: self.userCode() });
            close();
        }

        close() {
            close();
        }
    }
    
}