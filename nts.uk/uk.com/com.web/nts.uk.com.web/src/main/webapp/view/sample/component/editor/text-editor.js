__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
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
        ScreenModel.prototype.clear = function () {
            $("#text-1").ntsError("clear");
        };
        ScreenModel.prototype.setDefault = function () {
            var self = this;
            nts.uk.util.value.reset($("#text-1"), self.defaultvalue() !== '' ? self.defaultvalue() : undefined);
        };
        ScreenModel.prototype.submit = function () {
            nts.uk.ui.dialog.info("submit: " + this.value());
        };
        return ScreenModel;
    }());
    var viewmodel = new ScreenModel();
    this.bind(viewmodel);
});
//# sourceMappingURL=text-editor.js.map