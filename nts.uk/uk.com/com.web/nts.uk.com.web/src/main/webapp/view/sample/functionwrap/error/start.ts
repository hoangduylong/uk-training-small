__viewContext.ready(function () {
    class ScreenModel {
        ResidentCode: KnockoutObservable<string>;
        NumberValue: KnockoutObservable<number>;
        numbereditor: any;

        constructor() {
            var self = this;
            self.ResidentCode = ko.observable('ABC');
            self.NumberValue = ko.observable(5);
        }
        
        setErrorToResidenceCode() {
            $('#residence-code').ntsError('set', 'えらーです  a a a a a a aa a a a a a a a a a a a a a a a a a a a a a a a a a a');
            
        }
        
        clearErrorToResidenceCode() {
            $('#residence-code').ntsError('clear');
        }
        
        validateResidenceCode() {
            $("#residence-code").ntsError("check");
        }
        
        clearSaveErrors() {
            $('.save-error').ntsError('clear');
        }
    }
    
    this.bind(new ScreenModel());
    
});