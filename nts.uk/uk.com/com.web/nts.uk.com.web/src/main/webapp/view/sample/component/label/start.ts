__viewContext.ready(function() {
    class ScreenModel {
        text: KnockoutObservable<string>;
        constraint: KnockoutObservable<string>;
        constraints: KnockoutObservableArray<string>;
        inline: KnockoutObservable<boolean>;
        required: KnockoutObservable<boolean>;
        css: KnockoutObservable<string>;
        enable: KnockoutObservable<boolean>;

        constructor() {
            let self = this;

            self.text = ko.observable("レイアウトコード");
            self.constraint = ko.observable('ResidenceCode');
            self.constraints = ko.observableArray(['ResidenceCode', 'ResidenceCode']);
            self.inline = ko.observable(true);
            self.required = ko.observable(true)
            self.css = ko.observable("abc")
            self.enable = ko.observable(true);
        }

        changePrimitive() {
            let self = this;
            __viewContext.primitiveValueConstraints['ResidenceCode'].maxLength = Math.floor(Math.random() * 20) + 1;

            self.constraint.valueHasMutated();
            self.constraints.valueHasMutated();
        }
    }

    this.bind(new ScreenModel());

});