var sample;
(function (sample) {
    var importsettingform;
    (function (importsettingform) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.charset = ko.observable(3);
                    self.enable = ko.observable(true);
                }
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = importsettingform.viewmodel || (importsettingform.viewmodel = {}));
    })(importsettingform = sample.importsettingform || (sample.importsettingform = {}));
})(sample || (sample = {}));
//# sourceMappingURL=viewmodel.js.map