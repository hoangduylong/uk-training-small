__viewContext.ready(function () {
    class ScreenModel {
        stampNumber: KnockoutObservable<string>;
        required: KnockoutObservable<boolean>;
                
        constructor() {
            var self = this;
            self.stampNumber = ko.observable("");
            self.required = ko.observable(false);
        }
        
    }

    var viewmodel = new ScreenModel();
    this.bind(viewmodel); 
    
});