__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.ResidentCode = ko.observable('abc');
        }
        ScreenModel.prototype.setError = function () {
            $("#text").ntsError("set", "Errors.");
        };
        ScreenModel.prototype.clearError = function () {
            $("#text").ntsError("clear");
        };
        ScreenModel.prototype.closeDialog = function () {
            nts.uk.ui.windows.close();
        };
        ScreenModel.prototype.positionHis = function () {
            nts.uk.ui.windows.close();
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=dialog.start.js.map