__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.value = ko.observable("Hello world!");
            self.isTransistReturnData = ko.observable(false);
        }
        ScreenModel.prototype.OpenModalSubWindow = function () {
            // Set parent value
            nts.uk.ui.windows.setShared("parentValue", this.value());
            nts.uk.ui.windows.setShared("isTransistReturnData", this.isTransistReturnData());
            nts.uk.ui.windows.sub.modal("/view/sample/functionwrap/window/subwindow.xhtml").onClosed(function () {
                // Get child value
                var returnValue = nts.uk.ui.windows.getShared("childValue");
                alert("My child say: " + returnValue);
            });
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map