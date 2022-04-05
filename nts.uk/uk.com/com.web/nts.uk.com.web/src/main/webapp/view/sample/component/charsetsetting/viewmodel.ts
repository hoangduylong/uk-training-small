module sample.importsettingform.viewmodel {
    export class ScreenModel {
        charset: KnockoutObservable<number>;
        enable: KnockoutObservable<boolean>;
        
        constructor() {
            var self = this;
            self.charset = ko.observable(3);
            self.enable = ko.observable(true);
        }
    }
}