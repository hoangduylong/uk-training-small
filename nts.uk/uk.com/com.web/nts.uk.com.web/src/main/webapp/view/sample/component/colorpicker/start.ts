__viewContext.ready(function () {
    class ScreenModel {
        value: KnockoutObservable<string>;
        value2: KnockoutObservable<string>;
        enable: KnockoutObservable<boolean>;
        
        constructor() {
            var self = this;
            
            self.value = ko.observable('');
            self.value2 = ko.observable('');
            self.enable = ko.observable(true);
            self.value2.subscribe(function (value) {
                console.log(value); 
            });
        }
    }
    
    this.bind(new ScreenModel());
    
});