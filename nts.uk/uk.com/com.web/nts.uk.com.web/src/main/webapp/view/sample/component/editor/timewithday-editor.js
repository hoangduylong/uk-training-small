__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.enable = ko.observable(true);
            self.readonly = ko.observable(false);
            self.timeOfDay = ko.observable(2400);
            self.time = ko.observable(null);
            self.time2 = ko.observable(3200);
            self.withDayAttr = ko.observable(false);
        }
        return ScreenModel;
    }());
    var viewmodel = new ScreenModel();
    this.bind(viewmodel);
});
//# sourceMappingURL=timewithday-editor.js.map