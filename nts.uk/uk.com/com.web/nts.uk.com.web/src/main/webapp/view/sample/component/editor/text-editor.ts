__viewContext.ready(function () {
    class ScreenModel {
        defaultvalue: KnockoutObservable<string>;
        value: KnockoutObservable<string>;
        valueKana: KnockoutObservable<string>;
        valueUan: KnockoutObservable<string>;
        valueEc: KnockoutObservable<string>;
        option: nts.uk.ui.option.ITextEditorOption;
        required: KnockoutObservable<boolean>;
        enable: KnockoutObservable<boolean>;
        readonly: KnockoutObservable<boolean>;
                
        constructor() {
            var self = this;
            self.defaultvalue = ko.observable('');
            self.value = ko.observable("");
            self.valueKana = ko.observable('');
            self.valueUan = ko.observable('');
            self.valueEc = ko.observable('');
            self.required = ko.observable(false),
            self.enable = ko.observable(true),
            self.readonly = ko.observable(false),

            self.option = new nts.uk.ui.option.TextEditorOption({
                textmode: "text",
                placeholder: "Placeholder for text editor",
                width: "",
                textalign: "left",
                autofill: true,
                filldirection: "left",
                fillcharacter: "0"
            });
        }
        
        clear(): void {
            $("#text-1").ntsError("clear");
        }
        
        setDefault(): void {
            var self = this;
            nts.uk.util.value.reset($("#text-1"), self.defaultvalue() !== '' ? self.defaultvalue() : undefined);
        }
        
        submit() {
            nts.uk.ui.dialog.info("submit: " + this.value());
        }
    }

    var viewmodel = new ScreenModel();
    this.bind(viewmodel); 
    
});