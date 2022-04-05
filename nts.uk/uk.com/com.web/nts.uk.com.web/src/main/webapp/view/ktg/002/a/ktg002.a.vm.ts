module nts.uk.com.view.ktg002.a.viewmodel {
    export class ScreenModel {
        presenceAppTxt: KnockoutObservable<string>;
        presenceAppData: KnockoutObservableArray<any>;
        
        constructor() {
            let self = this;
            
            self.presenceAppData = ko.observableArray([
                { code: '0', name: nts.uk.resource.getText("KTG002_4") },
                { code: '1', name: nts.uk.resource.getText("KTG002_5") }
            ]);
            
            self.presenceAppTxt = ko.observable("");
        }

        startPage(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();
            
            dfd.resolve();
            return dfd.promise();
        }
    }
}