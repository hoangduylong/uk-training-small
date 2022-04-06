var sample;
(function (sample) {
    var datepicker;
    (function (datepicker) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.dateString = ko.observable('20000101');
                    self.yearMonth = ko.observable("200002");
                    self.year = ko.observable("2010");
                    self.fiscalYear = ko.observable("2011");
                    // Define styles
                    self.cssRangerY = [{ 2000: "round-gray" }, { 2009: "round-green" }, { 2011: "rect-pink" }, { 2017: "round-purple" }];
                    self.cssRangerYM = { 2000: [{ 1: "round-green" }, { 5: "round-yellow" }],
                        2002: [1, { 5: "round-gray" }] };
                    self.cssRangerYMD = {
                        2000: { 1: [{ 11: "round-green" }, { 12: "round-orange" }, { 15: "rect-pink" }], 3: [{ 1: "round-green" }, { 2: "round-purple" }, 3] },
                        2002: { 1: [{ 11: "round-green" }, { 12: "round-green" }, { 15: "round-green" }], 3: [{ 1: "round-green" }, { 2: "round-green" }, { 3: "round-green" }] }
                    };
                }
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = datepicker.viewmodel || (datepicker.viewmodel = {}));
    })(datepicker = sample.datepicker || (sample.datepicker = {}));
})(sample || (sample = {}));
//# sourceMappingURL=viewmodel.js.map