import editoroption = nts.uk.ui.option;

__viewContext.ready(function() {
    class ScreenModel {
        value: KnockoutObservable<number>;
        numbereditor: any;
        numbereditor2: any;
        currencyeditor: any;
        currencyeditor2: any;
        valueHalfInt: KnockoutObservable<number>;

        constructor() {
            var self = this;
            self.value = ko.observable(123);
            self.valueHalfInt = ko.observable();

            // NumberEditor
            self.numbereditor = {
                value: ko.observable(),
                constraint: 'CommonAmount',
                option: {
                    width: "100",
                    defaultValue: 2,
                    unitID: 'DAYS'
                },
                required: ko.observable(true),
                enable: ko.observable(true),
                readonly: ko.observable(false),
            };
            // NumberEditor
            self.numbereditor2 = {
                value: ko.observable(12),
                constraint: 'CommonAmount',
                option: ko.mapping.fromJS({
                    width: "50",
                    grouplength: 3,
                    decimallength: 1
                }),
                required: ko.observable(true),
                enable: ko.observable(true),
                readonly: ko.observable(false)
            };
            // CurrencyEditor
            self.currencyeditor = {
                value: ko.observable(1200),
                constraint: '',
                option: new editoroption.CurrencyEditorOption({
                    width: "200",
                    numberGroup: true,
                    decimallength: 2,
                    currencyformat: "JPY"
                }),
                required: ko.observable(false),
                enable: ko.observable(true),
                readonly: ko.observable(false)
            };
            // CurrencyEditor
            self.currencyeditor2 = {
                value: ko.observable(200000),
                constraint: '',
                option: new editoroption.CurrencyEditorOption({
                    width: "200",
                    numberGroup: false,
                    decimallength: 2,
                    currencyformat: "USD"
                }),
                required: ko.observable(false),
                enable: ko.observable(true),
                readonly: ko.observable(false)
            };
        }
    }

    var viewmodel = new ScreenModel();
    this.bind(viewmodel);
});