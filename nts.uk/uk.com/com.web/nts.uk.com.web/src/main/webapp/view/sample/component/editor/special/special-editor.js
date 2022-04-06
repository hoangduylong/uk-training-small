__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.stampNumber = ko.observable("");
            self.required = ko.observable(false);
        }
        return ScreenModel;
    }());
    var viewmodel = new ScreenModel();
    this.bind(viewmodel);
});
//# sourceMappingURL=special-editor.js.map