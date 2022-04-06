__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.enable = ko.observable(true);
            self.required = ko.observable(true);
            self.startDateString = ko.observable("");
            self.endDateString = ko.observable("");
            self.dateValue = ko.observable({});
            self.dateValue2 = ko.observable({});
            self.startDateString.subscribe(function (value) {
                self.dateValue().startDate = value;
                self.dateValue.valueHasMutated();
            });
            self.endDateString.subscribe(function (value) {
                self.dateValue().endDate = value;
                self.dateValue.valueHasMutated();
            });
        }
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map