__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.modalValue = ko.observable("Goodbye world!");
            self.isTransistReturnData = ko.observable(nts.uk.ui.windows.getShared("isTransistReturnData"));
            self.numbereditor2 = {
                value: ko.observable(12),
                constraint: '',
                option: ko.mapping.fromJS(new nts.uk.ui.option.NumberEditorOption({
                    grouplength: 3,
                    decimallength: 2,
                    symbolChar: '%',
                    symbolPosition: 'right'
                })),
                required: ko.observable(false),
                enable: ko.observable(true),
                readonly: ko.observable(false)
            };
            // Reset child value
            //            nts.uk.ui.windows.setShared("childValue", null);
        }
        ScreenModel.prototype.CloseModalSubWindow = function () {
            // Set child value
            nts.uk.ui.windows.setShared("childValue", this.modalValue(), this.isTransistReturnData());
            nts.uk.ui.windows.close();
        };
        return ScreenModel;
    }());
    // Get parent value
    $("#parentInstruct").text("My parent say: " + nts.uk.ui.windows.getShared("parentValue"));
    this.bind(new ScreenModel());
});
//# sourceMappingURL=substart.js.map