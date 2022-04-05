__viewContext.ready(function () {
    class ScreenModel {
        editor: any;
        
        constructor() {
            var self = this;
            // YearMonth Editor
            self.editor = {
                value: ko.observable(),
                start: ko.observable(),
                end: ko.observable(),
                required: ko.observable(false),
                enable: ko.observable(true),
                readonly: ko.observable(false)
            };
        }
    }

    var viewmodel = new ScreenModel();
    this.bind(viewmodel);    
});