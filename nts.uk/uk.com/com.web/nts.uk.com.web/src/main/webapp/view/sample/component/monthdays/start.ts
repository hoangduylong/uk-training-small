__viewContext.ready(function () {
    class ScreenModel {
        value: KnockoutObservable<string>;
        text: KnockoutObservable<string>;
        enable: KnockoutObservable<boolean>;
        
        constructor() {
            var self = this;
            
            self.value = ko.observable('');
            self.text = ko.observable('');
            self.value.subscribe((newValue) => {
                self.text(nts.uk.time.formatMonthDayLocalized(newValue));
            });
            self.enable = ko.observable(true);
        }
    }
    
    this.bind(new ScreenModel());
    
});