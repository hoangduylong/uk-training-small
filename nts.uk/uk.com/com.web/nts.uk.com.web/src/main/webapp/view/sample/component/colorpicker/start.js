__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.value = ko.observable('');
            self.value2 = ko.observable('');
            self.enable = ko.observable(true);
            self.value2.subscribe(function (value) {
                console.log(value);
            });
        }
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map