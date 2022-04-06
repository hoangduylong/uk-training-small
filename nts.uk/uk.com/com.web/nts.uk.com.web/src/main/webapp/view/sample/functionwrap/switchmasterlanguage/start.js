__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
        }
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
function createButton() {
    $("#switch-language").ntsSwitchMasterLanguage();
    $("#switch-language").on("selectionChanged", function (event, arg1, arg2) {
        alert(event.detail.languageId);
    });
}
//# sourceMappingURL=start.js.map