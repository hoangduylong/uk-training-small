__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.simpleValue = ko.observable("123");
            // MultilineEditor
            self.multilineeditor = {
                value: ko.observable(''),
                constraint: 'ResidenceCode',
                option: ko.mapping.fromJS(new nts.uk.ui.option.MultilineEditorOption({
                    resizeable: true,
                    placeholder: "Placeholder for text editor",
                    width: "",
                    textalign: "left"
                })),
                required: ko.observable(false),
                enable: ko.observable(true),
                readonly: ko.observable(false)
            };
        }
        return ScreenModel;
    }());
    var viewmodel = new ScreenModel();
    this.bind(viewmodel);
});
//# sourceMappingURL=multiline-editor.js.map