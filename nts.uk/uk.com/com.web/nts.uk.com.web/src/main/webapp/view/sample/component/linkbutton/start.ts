__viewContext.ready(function () {
    class ScreenModel {
        linkText: KnockoutObservable<string>;
        
        constructor() {
            var self = this;
            self.linkText = ko.observable("振込元銀行の登録へ");
        }
        
        doSomething() {
            var self = this;
//            self.linkText(self.linkText() + 'H');
            alert('click');
        }
    }
    
    this.bind(new ScreenModel());
    
});