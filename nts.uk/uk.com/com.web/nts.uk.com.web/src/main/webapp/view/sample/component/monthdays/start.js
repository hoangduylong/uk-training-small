__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.value = ko.observable('');
            self.text = ko.observable('');
            self.value.subscribe(function (newValue) {
                self.text(nts.uk.time.formatMonthDayLocalized(newValue));
            });
            self.enable = ko.observable(true);
        }
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map