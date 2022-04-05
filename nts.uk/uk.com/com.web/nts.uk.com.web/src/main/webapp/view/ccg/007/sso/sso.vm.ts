module view.ccg007.sso {
    export module viewmodel {
        export class ScreenModel {
            errAcc: KnockoutObservable<boolean> = ko.observable(false);
            errMsg: KnockoutObservable<string> = ko.observable("");
            constructor(errAcc: boolean, errMsg: string) {
                let self = this;
                self.errAcc(errAcc);
                self.errMsg(errMsg);
            }

            account(){
                service.account().done(data => {
                    alert('domain: ' + data.domain + '\n' + 'user name: ' + data.userName)
                });
            }
        }
    }
}