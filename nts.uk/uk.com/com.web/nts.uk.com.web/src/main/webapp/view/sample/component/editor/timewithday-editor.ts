__viewContext.ready(function () {
    class ScreenModel {
        enable: KnockoutObservable<boolean>;
        readonly: KnockoutObservable<boolean>;
        timeOfDay: KnockoutObservable<number>;
        time: KnockoutObservable<number>;
        time2: KnockoutObservable<number>;
        withDayAttr: KnockoutObservable<boolean>;
        
        constructor() {
            var self = this;
            self.enable = ko.observable(true);
            self.readonly = ko.observable(false);
            
            self.timeOfDay = ko.observable(2400);
            self.time = ko.observable(null);
            self.time2 = ko.observable(3200);
            
            self.withDayAttr = ko.observable(false);
        }
    }

    var viewmodel = new ScreenModel();
    this.bind(viewmodel);    
});